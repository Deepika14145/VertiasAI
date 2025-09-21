import React from 'react';
import { FlagIcon } from '../icons';

interface PersuasionTechniquesCardProps {
  techniques: string[];
}

export const PersuasionTechniquesCard: React.FC<PersuasionTechniquesCardProps> = ({ techniques }) => {
  return (
    <div className="glassmorphic-card p-6 rounded-2xl border-t-4 border-yellow-500/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-yellow-900/50 text-yellow-400 rounded-lg">
            <FlagIcon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-100">Detected Persuasion Techniques</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {techniques.map((technique, index) => (
          <span key={index} className="bg-yellow-500/10 text-yellow-300 text-sm font-medium px-3 py-1.5 rounded-full border border-yellow-500/20">
            {technique}
          </span>
        ))}
      </div>
    </div>
  );
};
