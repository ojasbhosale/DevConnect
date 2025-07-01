// file: src/types/build.ts

export interface Profile {
  id?: string;
  username?: string;
  full_name?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  [key: string]: unknown;
}

export interface BuildStep {
  id: number;
  title: string;
  icon: string;
}

export interface StepContentProps {
  currentStep: number;
  profile: Profile;
  setProfile: (profile: Profile) => void;
  userSkills: string[];
  setUserSkills: (skills: string[]) => void;
  completionPercentage: number;
}