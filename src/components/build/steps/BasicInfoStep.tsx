// file: src/components/build/steps/BasicInfoStep.tsx

import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import { Profile } from '@/types/build';

interface BasicInfoStepProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

export default function BasicInfoStep({ profile, setProfile }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Let's start with the basics</h2>
        <p className="text-gray-400">Tell us your name and choose a unique username</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Username * <span className="text-red-400">Required</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
            <Input
              placeholder="johndoe"
              required
              value={profile.username || ''}
              onChange={(e) => setProfile({ ...profile, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
              className="pl-8"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Only lowercase letters, numbers, and underscores</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Full Name</label>
          <Input
            placeholder="John Doe"
            value={profile.full_name || ''}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="San Francisco, CA"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}