// file: src/components/build/CompletionStatus.tsx

'use client';

import { CheckCircle, AlertCircle } from 'lucide-react';

interface CompletionStatusProps {
  completionPercentage: number;
}

export default function CompletionStatus({ completionPercentage }: CompletionStatusProps) {
  return (
    <div className="mt-6 text-center">
      <div className="inline-flex items-center gap-2 text-sm text-gray-400">
        {completionPercentage < 100 ? (
          <>
            <AlertCircle size={16} className="text-yellow-400" />
            Complete your profile to make the best impression
          </>
        ) : (
          <>
            <CheckCircle size={16} className="text-green-400" />
            Your profile is complete and ready to go!
          </>
        )}
      </div>
    </div>
  );
}
