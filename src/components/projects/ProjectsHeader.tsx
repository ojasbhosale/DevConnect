// file: src/components/projects/ProjectsHeader.tsx

import { Code, Folder, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProjectsHeaderProps {
  projectCount: number;
}

export default function ProjectsHeader({ projectCount }: ProjectsHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back
      </Button>
      
      <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-600/20 rounded-xl">
            <Code className="text-blue-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Manage Your Projects
            </h1>
            <p className="text-gray-400">
              Showcase your work and let others discover your amazing projects
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-2 text-gray-300">
            <Folder size={20} />
            <span className="font-medium">{projectCount} Projects</span>
          </div>
          <div className="text-sm text-gray-500">
            Add projects to showcase your skills and experience
          </div>
        </div>
      </div>
    </div>
  );
}