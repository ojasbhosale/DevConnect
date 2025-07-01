// file: src/app/build/projects/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

import ProjectsHeader from '@/components/projects/ProjectsHeader';
import ProjectsList from '@/components/projects/ProjectsList';
import ProjectForm from '@/components/projects/ProjectForm';
import { Button } from '@/components/ui/button';

export interface Project {
  id?: string;
  user_id?: string;
  title: string;
  description?: string;
  tech_stack?: string[];
  github_url?: string;
  live_url?: string;
  cover_image?: string;
  created_at?: string;
}

export default function BuildProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/auth');

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setIsLoading(false);
  };

  const handleSaveProject = async (projectData: Project) => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/auth');

    try {
      if (editingProject?.id) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast({ title: 'Project updated successfully!' });
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert({ ...projectData, user_id: user.id });

        if (error) throw error;
        toast({ title: 'Project created successfully!' });
      }

      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error: any) {
      toast({ 
        title: 'Error saving project', 
        description: error.message, 
        variant: 'destructive' 
      });
    }
    setIsLoading(false);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setIsLoading(true);
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (!error) {
      toast({ title: 'Project deleted successfully!' });
      fetchProjects();
    } else {
      toast({ 
        title: 'Error deleting project', 
        description: error.message, 
        variant: 'destructive' 
      });
    }
    setIsLoading(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ProjectsHeader projectCount={projects.length} />
        
        <div className="mb-8">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            disabled={isLoading}
          >
            <Plus size={20} />
            Add New Project
          </Button>
        </div>

        {showForm && (
          <div className="mb-8">
            <ProjectForm
              project={editingProject}
              onSave={handleSaveProject}
              onCancel={handleCloseForm}
              isLoading={isLoading}
            />
          </div>
        )}

        <ProjectsList
          projects={projects}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}