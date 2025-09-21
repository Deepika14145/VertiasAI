import React from 'react';
import type { AnalysisResult } from '../types';
import { 
  VerdictCard, 
  EducationalBreakdownCard,
  DetailedAnalysisCard,
  BiasMeterCard,
  XaiDashboardCard,
  ImageAnalysisCard,
  PersuasionTechniquesCard
} from './analysis_cards/Index';

interface AnalysisReportProps {
  result: AnalysisResult;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ result }) => {
  const hasImageAnalysis = result.image_analysis_summary;

  return (
    <div className="mt-8 space-y-6 animate-fadeIn">
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
      <VerdictCard trustScore={result.trust_score} />
      
      <DetailedAnalysisCard
          summary={result.summary}
          sourceCredibility={result.source_credibility}
          emotionalTone={result.emotional_tone}
          contextAnalysis={result.context_analysis}
          claimCategory={result.claim_category}
      />
      
      <BiasMeterCard bias={result.political_bias} />
      
      {hasImageAnalysis && (
        <ImageAnalysisCard summary={result.image_analysis_summary!} />
      )}

      <XaiDashboardCard data={result.xai_data} />

      {result.persuasion_techniques && result.persuasion_techniques.length > 0 && (
          <PersuasionTechniquesCard techniques={result.persuasion_techniques} />
      )}
      
      <EducationalBreakdownCard explanation={result.educational_breakdown} />
    </div>
  );
};