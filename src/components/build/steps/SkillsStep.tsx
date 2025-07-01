// file: src/components/build/steps/SkillsStep.tsx

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/hooks/use-toast';

const POPULAR_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 
  'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin',
  'Vue.js', 'Angular', 'Svelte', 'Express.js', 'Django', 'Flask',
  'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'FastAPI',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GraphQL', 'REST API',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Firebase',
  'Git', 'CI/CD', 'Jest', 'Cypress', 'Selenium', 'Linux'
];

interface SkillsStepProps {
  userSkills: string[];
  setUserSkills: (skills: string[]) => void;
}

export default function SkillsStep({ userSkills, setUserSkills }: SkillsStepProps) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = async (skillName: string) => {
    if (!skillName.trim() || userSkills.includes(skillName)) return;

    // First, ensure skill exists in skills table
    let skillId;
    const { data: existingSkill } = await supabase
      .from('skills')
      .select('id')
      .eq('name', skillName)
      .single();

    if (existingSkill) {
      skillId = existingSkill.id;
    } else {
      const { data: newSkillData, error } = await supabase
        .from('skills')
        .insert({ name: skillName })
        .select('id')
        .single();

      if (error || !newSkillData) {
        toast({ title: 'Error adding skill', variant: 'destructive' });
        return;
      }
      skillId = newSkillData.id;
    }

    // Add to user_skills
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('user_skills')
      .insert({ user_id: user.id, skill_id: skillId });

    if (!error) {
      setUserSkills([...userSkills, skillName]);
      setNewSkill('');
      toast({ title: 'Skill added successfully!' });
    }
  };

  const handleRemoveSkill = async (skillName: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: skill } = await supabase
      .from('skills')
      .select('id')
      .eq('name', skillName)
      .single();

    if (!skill) return;

    const { error } = await supabase
      .from('user_skills')
      .delete()
      .eq('user_id', user.id)
      .eq('skill_id', skill.id);

    if (!error) {
      setUserSkills(userSkills.filter(s => s !== skillName));
      toast({ title: 'Skill removed' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">What are your skills?</h2>
        <p className="text-gray-400">Add technologies and tools you work with</p>
      </div>

      <div className="space-y-6">
        {/* Current Skills */}
        {userSkills.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Your Skills ({userSkills.length})</h3>
            <div className="flex flex-wrap gap-2">
              {userSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="default"
                  className="bg-blue-600 text-white px-3 py-1 flex items-center gap-2"
                >
                  {skill}
                  <X 
                    size={14} 
                    className="cursor-pointer hover:text-red-300" 
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Add New Skill */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Add Skills</h3>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Type a skill and press Enter"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(newSkill);
                }
              }}
            />
            <Button 
              onClick={() => handleAddSkill(newSkill)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>

        {/* Popular Skills */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Popular Skills</h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.filter(skill => !userSkills.includes(skill)).slice(0, 20).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer border-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                onClick={() => handleAddSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}