'use client';

import { useRef } from 'react';
import { Upload, User } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { Profile } from '@/types/build';
import { toast } from '@/hooks/use-toast';

interface AboutYouStepProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

export default function AboutYouStep({ profile, setProfile }: AboutYouStepProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `avatar-${Date.now()}.${fileExt}`;
    const filePath = `${profile.username || 'temp'}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (publicUrlData?.publicUrl) {
      setProfile({ ...profile, avatar_url: publicUrlData.publicUrl });
      toast({ title: 'Image uploaded successfully ✅' });
    } else {
      toast({ title: 'Failed to retrieve image URL', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Tell your story</h2>
        <p className="text-gray-400">Add a photo and describe what you do</p>
      </div>

      <div className="space-y-6">
        {/* Profile Picture Upload */}
        <div className="text-center">
          <label className="block text-sm font-medium text-white mb-4">Profile Picture</label>
          <div className="flex flex-col items-center space-y-4">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500/20"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-700 text-gray-400">
                <User size={28} />
              </div>
            )}

            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm transition-all"
            >
              <Upload size={16} />
              Upload Image
            </button>
          </div>
        </div>

        {/* Bio Section */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Bio</label>
          <textarea
            placeholder="I'm a full-stack developer passionate about building amazing user experiences..."
            value={profile.bio || ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">{profile.bio?.length || 0}/500 characters</p>
        </div>
      </div>
    </div>
  );
}
