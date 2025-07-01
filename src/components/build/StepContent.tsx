// file: src/components/build/StepContent.tsx

import { StepContentProps } from '@/types/build';
import BasicInfoStep from './steps/BasicInfoStep';
import AboutYouStep from './steps/AboutYouStep';
import SkillsStep from './steps/SkillsStep';
import LinksStep from './steps/LinksStep';
import PreviewStep from './steps/PreviewStep';

export default function StepContent({
  currentStep,
  profile,
  setProfile,
  userSkills,
  setUserSkills,
  completionPercentage
}: StepContentProps) {
  switch (currentStep) {
    case 1:
      return (
        <BasicInfoStep
          profile={profile}
          setProfile={setProfile}
        />
      );

    case 2:
      return (
        <AboutYouStep
          profile={profile}
          setProfile={setProfile}
        />
      );

    case 3:
      return (
        <SkillsStep
          userSkills={userSkills}
          setUserSkills={setUserSkills}
        />
      );

    case 4:
      return (
        <LinksStep
          profile={profile}
          setProfile={setProfile}
        />
      );

    case 5:
      return (
        <PreviewStep
          profile={profile}
          userSkills={userSkills}
          completionPercentage={completionPercentage}
        />
      );

    default:
      return null;
  }
}