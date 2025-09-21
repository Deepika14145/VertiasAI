
export interface SourceCredibility {
  level: string;
  reason: string;
}

export interface EmotionalTone {
  level: string;
  score: number;
}

export interface ContextAnalysis {
  is_timely: boolean;
  details: string;
}

export interface PoliticalBias {
  leaning: string;
  score: number; // -100 (Left) to 100 (Right)
}

export interface XaiDataPoint {
  subject: string;
  value: number; // 0-100
}

export interface AnalysisResult {
  trust_score: number;
  summary: string;
  claim_category: string;
  source_credibility: SourceCredibility;
  emotional_tone: EmotionalTone;
  context_analysis: ContextAnalysis;
  political_bias: PoliticalBias;
  image_analysis_summary: string | null;
  persuasion_techniques: string[];
  educational_breakdown: string;
  xai_data: XaiDataPoint[];
}

// --- Keep old types for components that might be re-used later ---

export interface Metrics {
  emotionalTone: {
    level: string;
    value: number;
  };
  sourceCredibility: {
    description: string;
  };
  context: string;
  imageVideoProvenance?: string;
}

export interface XaiData {
  subject: string;
  value: number;
  fullMark: number;
}

export interface ManipulationExample {
  title: string;
  description: string;
  original: string;
  manipulated: string;

}

interface GraphNode {
  id: string;
  radius?: number;
  group: string;
}

interface GraphLink {
  source: string;
  target: string;
}

export interface TrustGraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
