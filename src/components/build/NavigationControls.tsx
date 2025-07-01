// file: src/components/build/NavigationControls.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';

interface NavigationControlsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  canProceed: boolean;
  isLoading: boolean;
  onSave: () => void;
  totalSteps: number;
}

export default function NavigationControls({
  currentStep,
  setCurrentStep,
  canProceed,
  isLoading,
  onSave,
  totalSteps,
}: NavigationControlsProps) {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={() => setCurrentStep(currentStep - 1)}
        disabled={currentStep === 1}
        className="border-gray-600 text-gray-300 hover:bg-gray-800"
      >
        Previous
      </Button>

      <div className="flex gap-3">
        {currentStep < totalSteps ? (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!canProceed}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={onSave}
            disabled={isLoading || !canProceed}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Profile
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
