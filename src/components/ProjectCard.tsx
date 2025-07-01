import Image from 'next/image';
import { Card } from '@/components/ui/card';

type Props = {
  title: string;
  description?: string;
  coverImage?: string;
  githubUrl?: string;
  liveUrl?: string;
};

export default function ProjectCard({ title, description, coverImage, githubUrl, liveUrl }: Props) {
  return (
    <Card className="rounded-2xl overflow-hidden border border-border bg-[#1a1b21] shadow-md hover:shadow-xl transition-all">
      {coverImage && (
        <Image
          src={coverImage}
          alt={title}
          width={800}
          height={400}
          className="w-full h-52 object-cover"
        />
      )}
      <div className="p-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        {description && <p className="text-sm text-muted mt-1">{description}</p>}

        <div className="flex gap-4 mt-4 text-sm">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-brand">
              GitHub
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-brand">
              Live
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
