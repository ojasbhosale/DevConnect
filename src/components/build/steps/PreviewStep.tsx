// file: src/components/build/steps/PreviewStep.tsx

import { Badge } from '@/components/ui/badge';
import { User, MapPin, Github, Linkedin, Globe, CheckCircle } from 'lucide-react';
import { Profile } from '@/types/build';

interface PreviewStepProps {
  profile: Profile;
  userSkills: string[];
  completionPercentage: number;
}

export default function PreviewStep({
  profile,
  userSkills,
  completionPercentage,
}: PreviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Preview your profile</h2>
        <p className="text-gray-400">Here's how your profile will look to others</p>
      </div>

      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white">
              {profile.full_name || profile.username || 'Your Name'}
            </h3>
            <p className="text-gray-400 mb-2">@{profile.username || 'username'}</p>
            {profile.location && (
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <MapPin size={14} />
                {profile.location}
              </p>
            )}
          </div>
        </div>

        {profile.bio && (
          <p className="text-gray-300 mb-6 leading-relaxed">{profile.bio}</p>
        )}

        {userSkills.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {userSkills.map((skill) => (
                <Badge key={skill} className="bg-blue-600 text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 flex-wrap">
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Github size={16} />
              GitHub
            </a>
          )}
          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          )}
          {profile.portfolio_url && (
            <a
              href={profile.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Globe size={16} />
              Portfolio
            </a>
          )}
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="text-green-400" size={20} />
          <span className="font-medium text-white">
            Profile Complete: {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
