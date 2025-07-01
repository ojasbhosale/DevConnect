// file: src/components/build/steps/LinksStep.tsx

import { Input } from '@/components/ui/input';
import { Github, Linkedin, Globe } from 'lucide-react';
import { Profile } from '@/types/build';

interface LinksStepProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

export default function LinksStep({ profile, setProfile }: LinksStepProps) {
  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Connect your profiles</h2>
        <p className="text-gray-400">Add links to your other profiles and portfolio</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <Github size={16} />
            GitHub Profile
          </label>
          <Input
            placeholder="https://github.com/yourusername"
            value={profile.github_url || ''}
            onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
            className={!validateUrl(profile.github_url || '') ? 'border-red-500' : ''}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <Linkedin size={16} />
            LinkedIn Profile
          </label>
          <Input
            placeholder="https://linkedin.com/in/yourusername"
            value={profile.linkedin_url || ''}
            onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
            className={!validateUrl(profile.linkedin_url || '') ? 'border-red-500' : ''}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <Globe size={16} />
            Portfolio Website
          </label>
          <Input
            placeholder="https://yourportfolio.com"
            value={profile.portfolio_url || ''}
            onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
            className={!validateUrl(profile.portfolio_url || '') ? 'border-red-500' : ''}
          />
        </div>
      </div>
    </div>
  );
}