
import React, { useState } from 'react';
import { RebuttalIcon, CopyIcon, CheckIcon } from '../icons';

interface RebuttalCardProps {
  templates: string[];
}

export const RebuttalCard: React.FC<RebuttalCardProps> = ({ templates }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-3 mb-2">
        <RebuttalIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-800">Rebuttal Templates</h3>
      </div>
      <p className="text-slate-500 mb-4 text-sm">Use these calm and informative templates to respond to misinformation online.</p>
      <div className="space-y-3">
        {templates.map((template, index) => (
          <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <p className="text-slate-700 flex-grow">{template}</p>
            <button
              onClick={() => copyToClipboard(template, index)}
              className="p-2 text-slate-500 hover:bg-slate-200 rounded-md transition-colors"
              aria-label="Copy template"
            >
              {copiedIndex === index ? <CheckIcon className="w-5 h-5 text-green-600" /> : <CopyIcon className="w-5 h-5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
