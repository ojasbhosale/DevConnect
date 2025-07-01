// File: src/lib/types.ts

export type Profile = {
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
};

export type Project = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  tech_stack?: string[];
  github_url?: string;
  live_url?: string;
  cover_image?: string;
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
};

export type UserSkill = {
  user_id: string;
  skill_id: string;
};

// Auto-generated `Database` type from Supabase (or declare manually if needed)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
      };
      projects: {
        Row: Project;
      };
      skills: {
        Row: Skill;
      };
      user_skills: {
        Row: UserSkill;
      };
    };
  };
};
