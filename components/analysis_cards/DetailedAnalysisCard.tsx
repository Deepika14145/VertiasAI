import React from 'react';
import type { SourceCredibility, EmotionalTone, ContextAnalysis } from '../../types';
import { DocumentIcon, CredibilityIcon, EmotionIcon, CalendarIcon, CategoryIcon, ShieldCheckIcon, WarningIcon } from '../icons';

interface DetailedAnalysisCardProps {
  summary: string;
  sourceCredibility: SourceCredibility;
  emotionalTone: EmotionalTone;
  contextAnalysis: ContextAnalysis;
  claimCategory: string;
}

const MetricItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-700/50 rounded-lg">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-300">{title}</h4>
      <div className="text-slate-400 text-sm">{children}</div>
    </div>
  </div>
);

const getCredibilityClass = (level: string) => {
  switch (level.toLowerCase()) {
    case 'high': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'low': return 'text-red-400';
    default: return 'text-slate-400';
  }
};

const getEmotionClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'very high':
      case 'high': 
        return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

export const DetailedAnalysisCard: React.FC<DetailedAnalysisCardProps> = ({ summary, sourceCredibility, emotionalTone, contextAnalysis, claimCategory }) => {
  return (
    <div className="glassmorphic-card p-6 rounded-2xl h-full border-t-4 border-cyan-500/50">
      {/* Summary */}
      <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-700/50">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-900/50 text-cyan-400 rounded-lg">
          <DocumentIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100">Claim Summary</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{summary}</p>
        </div>
      </div>
      
      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <MetricItem icon={<CredibilityIcon className="w-5 h-5 text-slate-300" />} title="Source Credibility">
          <p>
            <span className={`font-semibold ${getCredibilityClass(sourceCredibility.level)}`}>{sourceCredibility.level}</span>: {sourceCredibility.reason}
          </p>
        </MetricItem>
        
        <MetricItem icon={<EmotionIcon className="w-5 h-5 text-slate-300" />} title="Emotional Tone">
          <p>
            <span className={`font-semibold ${getEmotionClass(emotionalTone.level)}`}>{emotionalTone.level} ({emotionalTone.score}%)</span>
          </p>
        </MetricItem>

        <MetricItem icon={<CalendarIcon className="w-5 h-5 text-slate-300" />} title="Context Check">
            <div className="flex items-center gap-2">
                {contextAnalysis.is_timely ? <ShieldCheckIcon className="w-4 h-4 text-green-400"/> : <WarningIcon className="w-4 h-4 text-yellow-400" />}
                <p>{contextAnalysis.details}</p>
            </div>
        </MetricItem>

        <MetricItem icon={<CategoryIcon className="w-5 h-5 text-slate-300" />} title="Claim Category">
          <p className="font-semibold text-violet-300 bg-violet-900/50 px-2 py-0.5 rounded-md inline-block">{claimCategory}</p>
        </MetricItem>
      </div>
    </div>
  );
};
