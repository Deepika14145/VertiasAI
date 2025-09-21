
import React from 'react';
import type { Metrics } from '../../types';
import { AIBrainIcon, EmotionIcon, CredibilityIcon, ContextIcon, ProvenanceIcon } from '../icons';

interface ExplanationCardProps {
  aiExplanation: string;
  metrics: Metrics;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({ aiExplanation, metrics }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <AIBrainIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-800">AI Explanation</h3>
      </div>
      <p className="text-slate-600 leading-relaxed mb-6">{aiExplanation}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricItem icon={<EmotionIcon className="w-6 h-6 text-purple-600"/>} title="Emotional Tone" value={`${metrics.emotionalTone.level} (${metrics.emotionalTone.value}%)`} />
        <MetricItem icon={<CredibilityIcon className="w-6 h-6 text-green-600"/>} title="Source Credibility" value={metrics.sourceCredibility.description} />
        <MetricItem icon={<ContextIcon className="w-6 h-6 text-yellow-600"/>} title="Context" value={metrics.context} />
        <MetricItem icon={<ProvenanceIcon className="w-6 h-6 text-cyan-600"/>} title="Image/Video Provenance" value={metrics.imageVideoProvenance || 'N/A'} />
      </div>
    </div>
  );
};

interface MetricItemProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

const MetricItem: React.FC<MetricItemProps> = ({ icon, title, value }) => (
    <div className="bg-slate-50/80 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <h4 className="font-bold text-slate-700">{title}</h4>
        </div>
        <p className="text-slate-600 text-sm">{value}</p>
    </div>
);
