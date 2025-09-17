
export interface Question {
  id: string;
  text: string;
}

export interface TailoredResume {
  id: string;
  jobTitle: string;
  createdAt: string;
  docxPath: string; // Will now be a data URI for client-side download
  pdfPath: string; // Will now be a data URI for client-side download
  docxFilename?: string;
  pdfFilename?: string;
}

// --- Gamification Types ---

export interface UserProfile {
  level: number;
  xp: number;
  xpToNextLevel: number;
  name: string;
}

export interface QuestNode {
  id: string;
  title: string;
  question: string;
  status: 'locked' | 'pending' | 'completed';
  xp: number;
  answer?: string;
}

export interface QuestZone {
  id: string;
  name: string;
  nodes: QuestNode[];
  isUnlocked: boolean;
}
