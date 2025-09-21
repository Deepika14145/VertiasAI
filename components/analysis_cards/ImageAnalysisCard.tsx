import React from 'react';
import { ProvenanceIcon } from '../icons';

interface ImageAnalysisCardProps {
  summary: string;
}

export const ImageAnalysisCard: React.FC<ImageAnalysisCardProps> = ({ summary }) => {
  return (
    <div className="glassmorphic-card p-6 rounded-2xl border-t-4 border-violet-500/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-violet-900/50 text-violet-400 rounded-lg">
            <ProvenanceIcon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-100">Image Forensics</h3>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">{summary}</p>
    </div>
  );
};