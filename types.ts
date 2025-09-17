export type ApplicationFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Rarely';

export type View = 'home' | 'quest' | 'tailor';

export interface SurveyResponse {
  frustration: string;
  applicationFrequency: ApplicationFrequency;
  wantsConciergeDemo: boolean;
  email: string;
  jobDescription: string;
}
// FIX: Added Quest-related types to resolve errors in QuestView.tsx
export type QuestNodeStatus = 'locked' | 'pending' | 'completed';

export interface QuestNode {
  id: string;
  title: string;
  question: string;
  answer: string | null;
  status: QuestNodeStatus;
}

export interface QuestZone {
  id: string;
  name: string;
  isUnlocked: boolean;
  nodes: QuestNode[];
}