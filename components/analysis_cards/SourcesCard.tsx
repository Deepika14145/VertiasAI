
import React from 'react';
import { LinkIcon } from '../icons';

interface SourcesCardProps {
  sources: string[];
}

export const SourcesCard: React.FC<SourcesCardProps> = ({ sources }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <LinkIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-800">Grounding Sources</h3>
      </div>
      <div className="space-y-2">
        {sources.map((source, index) => (
          <a
            key={index}
            href={`https://${source}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-slate-50 rounded-lg text-blue-600 hover:bg-slate-100 hover:text-blue-700 transition-colors truncate"
          >
            {source}
          </a>
        ))}
      </div>
    </div>
  );
};
