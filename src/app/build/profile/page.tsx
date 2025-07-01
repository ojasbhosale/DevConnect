// file: src/app/build/profile/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

import BuildHeader from '@/components/build/BuildHeader';
import StepProgress from '@/components/build/StepProgress';
import StepContent from '@/components/build/StepContent';
import NavigationControls from '@/components/build/NavigationControls';
import CompletionStatus from '@/components/build/CompletionStatus';

import { Profile, BuildStep } from '@/types/build';

const STEPS: BuildStep[] = [
  { id: 1, title: 'Basic Info', icon: 'User' },
  { id: 2, title: 'About You', icon: 'Sparkles' },
  { id: 3, title: 'Skills', icon: 'Code' },
  { id: 4, title: 'Links', icon: 'Globe' },
  { id: 5, title: 'Preview', icon: 'Eye' }
];

export default function BuildProfilePage() {
  const [profile, setProfile] = useState<Profile>({});
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getProfileAndSkills = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/auth');

      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Get user skills
      const { data: userSkillsData } = await supabase
        .from('user_skills')
        .select('skill_id, skills(name)')
        .eq('user_id', user.id);

      if (userSkillsData) {
        const skillNames = userSkillsData.map((us: any) => us.skills.name);
        setUserSkills(skillNames);
      }
    };

    getProfileAndSkills();
  }, [router]);

  useEffect(() => {
    // Calculate completion percentage
    const fields = [
      profile.username,
      profile.full_name,
      profile.bio,
      profile.location,
      profile.avatar_url,
      profile.github_url,
      profile.linkedin_url,
      userSkills.length > 0
    ];
    
    const completed = fields.filter(Boolean).length;
    setCompletionPercentage(Math.round((completed / fields.length) * 100));
  }, [profile, userSkills]);

  const handleSave = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/auth');

    if (!profile.username?.trim()) {
      toast({ title: 'Username is required', variant: 'destructive' });
      setIsLoading(false);
      return;
    }

    const updatedProfile = {
      ...profile,
      id: user.id,
    };

    const { error } = await supabase.from('profiles').upsert(updatedProfile);
    
    if (!error) {
      toast({ title: 'Profile saved successfully!', description: 'Your profile is now live!' });
      router.push(`/profile/${updatedProfile.username}`);
    } else {
      toast({ title: 'Error saving profile', description: error.message, variant: 'destructive' });
    }
    setIsLoading(false);
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return profile.username?.trim();
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BuildHeader />
        
        <StepProgress 
          steps={STEPS}
          currentStep={currentStep}
        />

        <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 mb-8">
          <StepContent
            currentStep={currentStep}
            profile={profile}
            setProfile={setProfile}
            userSkills={userSkills}
            setUserSkills={setUserSkills}
            completionPercentage={completionPercentage}
          />
        </div>

        <NavigationControls
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          canProceed={canProceed()}
          isLoading={isLoading}
          onSave={handleSave}
          totalSteps={STEPS.length}
        />

        <CompletionStatus completionPercentage={completionPercentage} />
      </div>
    </div>
  );
}