// file: src/app/profile/[username]/page.tsx

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  MapPin, 
  Github, 
  Linkedin, 
  Globe, 
  Code, 
  Calendar,
  Star,
  GitFork,
  ExternalLink,
  Mail,
  Share2
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ username: string }>;
}

interface Profile {
  id: string;
  username: string;
  full_name?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  created_at: string;
}

interface UserSkill {
  skill_id: string;
  skills: {
    name: string;
  };
}

interface Project {
  id: string;
  title: string;
  description?: string;
  github_url?: string;
  live_url?: string;
  cover_image?: string;
  tech_stack?: string[];
  created_at: string;
}


export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Component limitation
          }
        },
      },
    }
  );

  // Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (profileError || !profile) return notFound();

  // Fetch user skills
  const { data: userSkills } = await supabase
    .from('user_skills')
    .select('skill_id, skills(name)')
    .eq('user_id', profile.id);

  // Fetch projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false });

  const skills = userSkills?.map((us: UserSkill) => us.skills.name) || [];
  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          
          {/* Profile Header */}
          <div className="bg-gray-800/30 backdrop-blur-lg rounded-3xl border border-gray-700/50 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center text-center md:text-left">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                      {profile.avatar_url ? (
                        <img 
                          src={profile.avatar_url} 
                          alt={profile.full_name || profile.username}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User size={48} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <Mail size={16} />
                    Contact
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Share2 size={16} />
                    Share
                  </Button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {profile.full_name || profile.username}
                  </h1>
                  <p className="text-xl text-gray-400 mb-2">@{profile.username}</p>
                  
                  {profile.location && (
                    <p className="text-gray-400 flex items-center gap-2 mb-4">
                      <MapPin size={16} />
                      {profile.location}
                    </p>
                  )}
                </div>

                {profile.bio && (
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                    {profile.bio}
                  </p>
                )}

                {/* Social Links */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {profile.github_url && (
                    <a 
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-xl transition-all"
                    >
                      <Github size={20} />
                      <span>GitHub</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {profile.linkedin_url && (
                    <a 
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-xl transition-all"
                    >
                      <Linkedin size={20} />
                      <span>LinkedIn</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {profile.portfolio_url && (
                    <a 
                      href={profile.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-xl transition-all"
                    >
                      <Globe size={20} />
                      <span>Portfolio</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {/* Join Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                  <Calendar size={16} />
                  <span>Member since {joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{skills.length}</div>
              <div className="text-gray-400">Skills</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{projects?.length || 0}</div>
              <div className="text-gray-400">Projects</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {projects?.reduce((acc, p) => acc + (p.technologies?.length || 0), 0) || 0}
              </div>
              <div className="text-gray-400">Technologies</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {Math.floor(Math.random() * 50) + 10} {/* Placeholder for actual contributions */}
              </div>
              <div className="text-gray-400">Contributions</div>
            </div>
          </div>

          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-600/20 rounded-xl">
                  <Code className="text-blue-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Skills & Technologies</h2>
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                  {skills.length} skills
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-blue-500/30 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 justify-center py-2 px-4 text-sm font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          

          {/* Projects Section */}
          {/* Projects Section */}
          
          <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-xl">
                  <GitFork className="text-purple-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
                <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                  {projects?.length || 0} projects
                </Badge>
              </div>
            </div>

            {projects && projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:bg-gray-800/70 transition-all duration-300 group"
                  >
                    {project.cover_image && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-700">
                        <img 
                          src={project.cover_image} 
                          alt={project.title || 'Project Cover'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {project.title || 'Untitled Project'}
                    </h3>

                    {project.description ? (
                      <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                    ) : (
                      <p className="text-gray-500 italic mb-4">No description provided.</p>
                    )}

                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech_stack.slice(0, 4).map((tech: string) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-gray-600 text-gray-300"
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

                    <div className="flex gap-3 flex-wrap">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                        >
                          <ExternalLink size={14} />
                          Live Demo
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
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects yet</h3>
                <p className="text-gray-500">
                  {profile.username} hasn&apos;t shared any projects yet.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}