
import type { Question, TailoredResume, UserProfile, QuestZone, QuestNode } from '../types';

// --- MOCK DATA ---
const MOCK_QUESTIONS: Question[] = [
  { id: 'q1', text: 'What is your most significant accomplishment in your previous role?' },
  { id: 'q2', text: 'Describe a challenging project and how you overcame obstacles.' },
  { id: 'q3', text: 'What are your top 3 technical skills that you are most proficient in?' },
  { id: 'q4', text: 'How do you approach learning a new technology or programming language?' },
  { id: 'q5', text: 'Can you give an example of how you have collaborated with a cross-functional team?' },
  { id: 'q6', text: 'What are your career goals for the next 5 years?' },
  { id: 'q7', text: 'Describe your ideal work environment.' },
];

let recentResumes: TailoredResume[] = [];

// --- GAMIFICATION MOCK DATA ---

let MOCK_USER_PROFILE: UserProfile = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  name: 'Resume Adventurer',
};

let MOCK_QUEST_MAP: QuestZone[] = [
  {
    id: 'zone1',
    name: 'Experience Shore',
    isUnlocked: true,
    nodes: [
      { id: 'n1', title: 'Key Accomplishment', question: 'What is your most significant accomplishment in your previous role?', status: 'pending', xp: 25 },
      { id: 'n2', title: 'Project Challenge', question: 'Describe a challenging project and how you overcame obstacles.', status: 'locked', xp: 25 },
    ],
  },
  {
    id: 'zone2',
    name: 'Skills Volcano',
    isUnlocked: false,
    nodes: [
      { id: 'n3', title: 'Top 3 Skills', question: 'What are your top 3 technical skills that you are most proficient in?', status: 'locked', xp: 25 },
      { id: 'n4', title: 'Learning Approach', question: 'How do you approach learning a new technology or programming language?', status: 'locked', xp: 25 },
    ],
  },
  {
    id: 'zone3',
    name: 'Collaboration Fields',
    isUnlocked: false,
    nodes: [
        { id: 'n5', title: 'Teamwork Example', question: 'Can you give an example of how you have collaborated with a cross-functional team?', status: 'locked', xp: 30 },
    ]
  }
];


// --- MOCK API FUNCTIONS ---

const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const uploadResumeAnchor = async (file: File): Promise<{ lastUpdated: string }> => {
  console.log('Uploading resume:', file.name);
  await simulateDelay(1500);
  return { lastUpdated: new Date().toLocaleString() };
};

export const tailorResume = async (jobDescription: string): Promise<{ docxPath: string, pdfPath: string, docxFilename: string, pdfFilename: string }> => {
    console.log('Ingesting job description and tailoring resume...');
    await simulateDelay(3000);
    
    const timestamp = new Date().getTime();
    const docxFilename = `resume-${timestamp}.docx`;
    const pdfFilename = `resume-${timestamp}.pdf`;
    
    const dummyContent = `This is a mock document tailored for the job description:\n\n"${jobDescription.substring(0, 200)}..."`;
    const base64Content = btoa(unescape(encodeURIComponent(dummyContent)));
    
    const docxDataUri = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64Content}`;
    const pdfDataUri = `data:application/pdf;base64,${base64Content}`;

    const newResume: TailoredResume = {
      id: `res-${timestamp}`,
      jobTitle: `Resume for job description starting with "${jobDescription.substring(0, 30)}..."`,
      createdAt: new Date().toLocaleString(),
      docxPath: docxDataUri,
      pdfPath: pdfDataUri,
      docxFilename: docxFilename,
      pdfFilename: pdfFilename,
    };

    recentResumes.unshift(newResume);
    if (recentResumes.length > 5) {
        recentResumes.pop();
    }

    return { docxPath: newResume.docxPath, pdfPath: newResume.pdfPath, docxFilename, pdfFilename };
};


export const getLatestResumes = async (): Promise<TailoredResume[]> => {
    await simulateDelay(600);
    return [...recentResumes];
};

// --- GAMIFICATION API ---
export const getUserProfile = async (): Promise<UserProfile> => {
    await simulateDelay(400);
    return { ...MOCK_USER_PROFILE };
};

export const getQuestMap = async (): Promise<QuestZone[]> => {
    await simulateDelay(800);
    // Deep copy to prevent mutation issues in mock data
    return JSON.parse(JSON.stringify(MOCK_QUEST_MAP));
}

export const postQuestAnswer = async (nodeId: string, answer: string): Promise<{ profile: UserProfile, map: QuestZone[] }> => {
    await simulateDelay(1000);
    
    let nodeFound: QuestNode | null = null;
    let zoneOfNode: QuestZone | null = null;

    for (const zone of MOCK_QUEST_MAP) {
        const node = zone.nodes.find(n => n.id === nodeId);
        if (node) {
            nodeFound = node;
            zoneOfNode = zone;
            break;
        }
    }

    if (nodeFound && nodeFound.status !== 'completed') {
        nodeFound.answer = answer;
        nodeFound.status = 'completed';
        
        // Grant XP
        MOCK_USER_PROFILE.xp += nodeFound.xp;

        // Level up logic
        if (MOCK_USER_PROFILE.xp >= MOCK_USER_PROFILE.xpToNextLevel) {
            MOCK_USER_PROFILE.level += 1;
            MOCK_USER_PROFILE.xp -= MOCK_USER_PROFILE.xpToNextLevel;
            MOCK_USER_PROFILE.xpToNextLevel = Math.floor(MOCK_USER_PROFILE.xpToNextLevel * 1.5);
        }

        // Unlock next node in the same zone
        const nodeIndex = zoneOfNode!.nodes.findIndex(n => n.id === nodeId);
        if (nodeIndex + 1 < zoneOfNode!.nodes.length) {
            zoneOfNode!.nodes[nodeIndex + 1].status = 'pending';
        }

        // Check if zone is completed to unlock next zone
        const allNodesCompleted = zoneOfNode!.nodes.every(n => n.status === 'completed');
        if (allNodesCompleted) {
            const zoneIndex = MOCK_QUEST_MAP.findIndex(z => z.id === zoneOfNode!.id);
            if (zoneIndex + 1 < MOCK_QUEST_MAP.length) {
                MOCK_QUEST_MAP[zoneIndex + 1].isUnlocked = true;
                if(MOCK_QUEST_MAP[zoneIndex + 1].nodes.length > 0) {
                    MOCK_QUEST_MAP[zoneIndex + 1].nodes[0].status = 'pending';
                }
            }
        }
    }

    return { profile: await getUserProfile(), map: await getQuestMap() };
}
