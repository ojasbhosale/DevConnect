// file: src/components/projects/ProjectForm.tsx

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { X, Plus, Trash2, Upload, Link, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/app/build/projects/page';

interface ProjectFormProps {
  project?: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const POPULAR_TECHNOLOGIES = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
  'Vue.js', 'Angular', 'Svelte', 'Express.js', 'FastAPI', 'Django',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Docker', 'AWS',
  'Vercel', 'Netlify', 'Firebase', 'Supabase', 'Tailwind CSS', 'Sass'
];

export default function ProjectForm({ project, onSave, onCancel, isLoading }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    tech_stack: [],
    github_url: '',
    live_url: '',
    cover_image: ''
  });
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
  };

  const handleInputChange = (field: keyof Project, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTechnology = (tech: string) => {
    if (tech && !formData.tech_stack?.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        tech_stack: [...(prev.tech_stack || []), tech]
      }));
    }
    setNewTech('');
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack?.filter(t => t !== tech) || []
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTech.trim()) {
      e.preventDefault();
      addTechnology(newTech.trim());
    }
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          <X size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-white">Project Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter project title"
            className="bg-gray-900/50 border-gray-700 text-white"
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-white">Description</Label>
          <textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your project..."
            rows={4}
            className="w-full bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          />
        </div>

        {/* Technologies */}
        <div>
          <Label className="text-white">Technologies Used</Label>
          
          {/* Current Technologies */}
          {formData.tech_stack && formData.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tech_stack.map((tech) => (
                <Badge
                  key={tech}
                  className="bg-blue-600/20 text-blue-300 border-blue-500/30 flex items-center gap-1"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="hover:text-red-400"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add Technology */}
          <div className="flex gap-2 mb-3">
            <Input
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add technology"
              className="bg-gray-900/50 border-gray-700 text-white"
            />
            <Button
              type="button"
              onClick={() => addTechnology(newTech.trim())}
              disabled={!newTech.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} />
            </Button>
          </div>

          {/* Popular Technologies */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Popular technologies:</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TECHNOLOGIES.filter(tech => !formData.tech_stack?.includes(tech))
                .slice(0, 12).map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="cursor-pointer border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                  onClick={() => addTechnology(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="github_url" className="text-white flex items-center gap-2">
              <Github size={16} />
              GitHub URL
            </Label>
            <Input
              id="github_url"
              type="url"
              value={formData.github_url || ''}
              onChange={(e) => handleInputChange('github_url', e.target.value)}
              placeholder="https://github.com/username/project"
              className="bg-gray-900/50 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="live_url" className="text-white flex items-center gap-2">
              <Link size={16} />
              Live Demo URL
            </Label>
            <Input
              id="live_url"
              type="url"
              value={formData.live_url || ''}
              onChange={(e) => handleInputChange('live_url', e.target.value)}
              placeholder="https://your-project.com"
              className="bg-gray-900/50 border-gray-700 text-white"
            />
          </div>
        </div>

        {/* Cover Image Upload */}
        <div>
        <Label htmlFor="cover_image" className="text-white flex items-center gap-2">
            <Upload size={16} />
            Upload Cover Image
        </Label>
        <Input
            id="cover_image"
            type="file"
            accept="image/*"
            onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const filePath = `projects/${Date.now()}-${file.name}`;

            const { error: uploadError } = await supabase.storage
                .from('project-covers')
                .upload(filePath, file);

            if (uploadError) {
                alert('Image upload failed: ' + uploadError.message);
                return;
            }

            const { data } = supabase
                .storage
                .from('project-covers')
                .getPublicUrl(filePath);

            if (data?.publicUrl) {
                setFormData((prev) => ({
                ...prev,
                cover_image: data.publicUrl,
                }));
            }
            }}
            className="bg-gray-900/50 border-gray-700 text-white"
        />

        {formData.cover_image && (
            <div className="mt-3">
            <img
                src={formData.cover_image}
                alt="Cover preview"
                className="w-full max-w-md h-32 object-cover rounded-lg border border-gray-700"
            />
            </div>
        )}
        </div>


        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading || !formData.title.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}