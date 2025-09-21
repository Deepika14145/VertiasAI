import React from 'react';
import { DocumentIcon } from '../icons';

interface AnalysisSummaryCardProps {
  summary: string;
}

export const AnalysisSummaryCard: React.FC<AnalysisSummaryCardProps> = ({ summary }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <DocumentIcon className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-bold text-slate-100">Analysis Summary</h3>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <p className="text-slate-800">{summary}</p>
      </div>
    </div>
  );
};
