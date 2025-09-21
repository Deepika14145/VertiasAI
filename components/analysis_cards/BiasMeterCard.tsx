import React from 'react';
import type { PoliticalBias } from '../../types';
import { PoliticalBiasIcon } from '../icons';

interface BiasMeterCardProps {
  bias: PoliticalBias;
}

export const BiasMeterCard: React.FC<BiasMeterCardProps> = ({ bias }) => {
  // Normalize score from -100..100 to 0..100 for positioning
  const position = (bias.score + 100) / 2;

  return (
    <div className="glassmorphic-card p-6 rounded-2xl h-full border-t-4 border-violet-500/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-violet-900/50 text-violet-400 rounded-lg">
          <PoliticalBiasIcon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-100">Political Bias</h3>
      </div>
      <div className="text-center my-6">
        <p className="text-2xl font-bold text-white">{bias.leaning}</p>
      </div>
      <div className="relative w-full h-2 rounded-full">
        <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-cyan-500 via-violet-500 to-red-500 rounded-full"></div>
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-4 border-slate-800 shadow-lg"
          style={{ left: `calc(${position}% - 10px)` }}
          title={`Score: ${bias.score}`}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
        <span>Left</span>
        <span>Center</span>
        <span>Right</span>
      </div>
    </div>
  );
};
