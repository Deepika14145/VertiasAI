import React from 'react';
import { LightbulbIcon } from '../icons';

interface EducationalBreakdownCardProps {
  explanation: string;
}

export const EducationalBreakdownCard: React.FC<EducationalBreakdownCardProps> = ({ explanation }) => {
  return (
    <div className="bg-gradient-to-br from-cyan-900/30 to-slate-900/30 p-6 rounded-2xl border border-cyan-500/20">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-900/50 text-cyan-400 rounded-lg">
            <LightbulbIcon className="w-5 h-5" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-100">Educational Breakdown</h3>
            <p className="text-sm text-cyan-300">Learn to Spot Misinformation</p>
        </div>
      </div>
      <p className="text-slate-300 leading-relaxed pl-14">{explanation}</p>
    </div>
  );
};
