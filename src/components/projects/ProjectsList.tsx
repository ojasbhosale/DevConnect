// file: src/components/projects/ProjectsList.tsx

import { Edit, Trash2, ExternalLink, Github, Calendar, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/app/build/projects/page';

interface ProjectsListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  isLoading: boolean;
}

export default function ProjectsList({ projects, onEdit, onDelete, isLoading }: ProjectsListProps) {
  if (isLoading && projects.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-800/30 rounded-xl p-6 animate-pulse">
            <div className="w-full h-32 bg-gray-700 rounded-lg mb-4" />
            <div className="h-6 bg-gray-700 rounded mb-2" />
            <div className="h-4 bg-gray-700 rounded mb-4 w-2/3" />
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-700 rounded w-16" />
              <div className="h-6 bg-gray-700 rounded w-20" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-700 rounded w-16" />
              <div className="h-8 bg-gray-700 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-12 text-center">
        <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <Code className="text-gray-400" size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No projects yet</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Start showcasing your work by adding your first project. Include details about the technologies used, links to live demos, and source code.
        </p>
        <div className="text-sm text-gray-500">
          Projects help potential collaborators and employers understand your skills and experience.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Your Projects</h2>
        <div className="text-sm text-gray-400">{projects.length} project{projects.length !== 1 ? 's' : ''}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  isLoading: boolean;
}

function ProjectCard({ project, onEdit, onDelete, isLoading }: ProjectCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 hover:bg-gray-800/50 transition-all duration-300 group">
      {/* Cover Image */}
      {project.cover_image && (
        <div className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-700">
          <img 
            src={project.cover_image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Project Title */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      {project.description && (
        <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
          {project.description}
        </p>
      )}

      {/* Technologies */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs border-gray-600 text-gray-300 bg-gray-800/50"
            >
              {tech}
            </Badge>
          ))}
          {project.tech_stack.length > 4 && (
            <Badge
              variant="outline"
              className="text-xs border-gray-600 text-gray-400"
            >
              +{project.tech_stack.length - 4} more
            </Badge>
          )}
        </div>
      )}

      {/* Created Date */}
      {project.created_at && (
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Calendar size={12} />
          <span>Created {formatDate(project.created_at)}</span>
        </div>
      )}

      {/* Links and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-700/50">
        {/* External Links */}
        <div className="flex gap-3">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-gray-300 text-sm transition-colors"
            >
              <Github size={14} />
              <span>Code</span>
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(project)}
            disabled={isLoading}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white h-8 px-3"
          >
            <Edit size={14} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => project.id && onDelete(project.id)}
            disabled={isLoading}
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white h-8 px-3"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}