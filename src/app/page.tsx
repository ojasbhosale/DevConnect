'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProfileCard from '@/components/ProfileCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Users, Code, Star, TrendingUp } from 'lucide-react';

type Profile = {
  id: string;
  username: string;
  full_name?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  skills?: string[];
  created_at?: string;
};

const POPULAR_SKILLS = ['React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 'JavaScript', 'Go', 'Rust'];

export default function HomePage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'featured' | 'all'>('featured');

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      
      let query = supabase
        .from('profiles')
        .select('*')
        .not('username', 'is', null);

      if (search) {
        query = query.or(`username.ilike.%${search}%,full_name.ilike.%${search}%,bio.ilike.%${search}%`);
      }

      // Add skills filter if needed (assuming you have a skills column)
      if (selectedSkills.length > 0) {
        // This would work if you have a skills array column
        // query = query.overlaps('skills', selectedSkills);
      }

      const { data, error } = await query.order('created_at', { ascending: false }).limit(50);

      if (!error && data) {
        setProfiles(data);
        if (!search && selectedSkills.length === 0) {
          // Set featured profiles as the first few profiles
          setFeaturedProfiles(data.slice(0, 6));
        }
      }
      setLoading(false);
    };

    fetchProfiles();
  }, [search, selectedSkills]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedSkills([]);
  };

  const displayProfiles = view === 'featured' ? featuredProfiles : profiles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Discover Amazing Developers
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with talented developers, explore their projects, and build meaningful professional relationships.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search developers by name, username, or bio..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white/10 backdrop-blur-lg border-white/20 text-white placeholder-gray-400 rounded-2xl focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="text-blue-400" size={24} />
                </div>
                <div className="text-2xl font-bold text-white">{profiles.length}+</div>
                <div className="text-sm text-gray-400">Developers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Code className="text-purple-400" size={24} />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="text-yellow-400" size={24} />
                </div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Skills</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Skills */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Filter size={20} />
              Popular Skills
            </h3>
            {selectedSkills.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-gray-300 border-gray-600 hover:bg-gray-800"
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedSkills.includes(skill)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800 hover:border-gray-500'
                }`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">
              {view === 'featured' ? 'Featured Developers' : 'All Developers'}
            </h2>
            <div className="flex bg-gray-800 rounded-lg p-1">
              <Button
                variant={view === 'featured' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('featured')}
                className={view === 'featured' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}
              >
                <TrendingUp size={16} className="mr-2" />
                Featured
              </Button>
              <Button
                variant={view === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('all')}
                className={view === 'all' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}
              >
                <Users size={16} className="mr-2" />
                All ({profiles.length})
              </Button>
            </div>
          </div>
        </div>

        {/* Profiles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-700 rounded-full mb-4" />
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-3 bg-gray-700 rounded mb-4 w-2/3" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded" />
                  <div className="h-3 bg-gray-700 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : displayProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProfiles.map((profile) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No developers found</h3>
            <p className="text-gray-500 mb-4">
              {search || selectedSkills.length > 0 
                ? 'Try adjusting your search or filters' 
                : 'Be the first to create a profile!'}
            </p>
            {(search || selectedSkills.length > 0) && (
              <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700">
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}