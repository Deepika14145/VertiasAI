import React from 'react';
import { FlagIcon } from '../icons';

interface RedFlagsCardProps {
  flags: string[];
}

export const RedFlagsCard: React.FC<RedFlagsCardProps> = ({ flags }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <FlagIcon className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-bold text-slate-100">Detected Red Flags</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {flags.map((flag, index) => (
          <span key={index} className="bg-yellow-500/10 text-yellow-400 text-sm font-medium px-3 py-1.5 rounded-full border border-yellow-500/20">
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
};
