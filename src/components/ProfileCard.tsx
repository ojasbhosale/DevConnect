import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

type Props = {
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
};

export default function ProfileCard({ username, full_name, avatar_url, bio, location }: Props) {
  return (
    <Link
      href={`/profile/${username}`}
      className="card card-hover rounded-2xl bg-[#1b1c20] p-6 border border-border shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src={avatar_url || ''} alt={full_name || username} />
          <AvatarFallback>{full_name?.[0] || username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{full_name || username}</h3>
          <p className="text-sm text-muted">@{username}</p>
        </div>
      </div>
      {bio && <p className="text-sm text-muted mb-2">{bio}</p>}
      {location && <p className="text-xs text-muted">📍 {location}</p>}
    </Link>
  );
}
