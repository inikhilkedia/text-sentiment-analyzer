export interface AnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  magnitude: number;
}

export interface Analysis {
  id: string;
  text: string;
  result: AnalysisResult;
  timestamp: string;
  user: string;
} 