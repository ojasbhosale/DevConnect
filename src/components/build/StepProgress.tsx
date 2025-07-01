// file: src/components/build/StepProgress.tsx

import { User, Sparkles, Code, Globe, Eye, CheckCircle } from 'lucide-react';
import { BuildStep } from '@/types/build';

interface StepProgressProps {
  steps: BuildStep[];
  currentStep: number;
}

const iconMap = {
  User,
  Sparkles,
  Code,
  Globe,
  Eye,
};

export default function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const Icon = iconMap[step.icon as keyof typeof iconMap];
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                  isCompleted 
                    ? 'bg-green-600 text-white' 
                    : isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-400'
                }`}
              >
                {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${isCompleted ? 'bg-green-600' : 'bg-gray-700'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}