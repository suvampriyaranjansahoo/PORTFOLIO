export type ProjectCategory = 'all' | 'product' | 'analytics' | 'engineering' | 'ai';

export interface ProjectMetric {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface CaseStudyTab {
  title: string;
  content: string;
  bulletPoints?: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle?: string;
  tagline: string;
  meta: string;
  stats: { value: string; label: string }[];
  tabs: {
    problem: CaseStudyTab;
    data: CaseStudyTab;
    analysis: CaseStudyTab;
    method: CaseStudyTab;
    insight: CaseStudyTab;
    recommendation: CaseStudyTab;
  };
}

export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  question: string;
  category: ProjectCategory;
  meta: string;
  featured?: boolean;
  metrics: ProjectMetric[];
  description: string;
  flow?: string;
  githubUrl: string;
  caseStudyId?: string;
  tags: string[];
}

export interface ResumeRole {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  pdfFileName: string;
  summary: string;
  focusSkills: { category: string; items: string }[];
  topBullets: string[];
}

export interface RiceItem {
  id: string;
  theme: string;
  app: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  reasoning: string;
  category: string;
}

export interface AcademicMilestone {
  id: string;
  institution: string;
  location: string;
  degree: string;
  score: string;
  scoreType: string;
  period: string;
  year: string;
  honors?: string;
  highlights: string[];
  coursework: string[];
  badge: string;
}

export interface NeuralSettings {
  connectionDensity: number;    // 0.4 to 2.0 (default 1.0)
  pulseFrequency: number;       // 0.3 to 2.5 (default 1.0)
  particleSpeed: number;        // 0.3 to 2.5 (default 1.0)
  sensitivity?: number;         // 0.6 to 2.4 (default 1.4)
  visibility?: number;          // 0.6 to 2.2 (default 1.2)
  interactionStrength?: number; // 0.5 to 2.0 (default 1.2)
}


