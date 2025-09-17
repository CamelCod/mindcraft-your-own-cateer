// FIX: import Quest-related types
import type { SurveyResponse, QuestZone, QuestNode } from '../types';

const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

const SURVEY_STORAGE_KEY = 'bbw_survey_submissions';

/**
 * Retrieves survey submissions from localStorage.
 * This simulates retrieving persistent data on app load.
 * @returns An array of SurveyResponse objects.
 */
export const getSurveySubmissions = (): SurveyResponse[] => {
    try {
        const storedData = localStorage.getItem(SURVEY_STORAGE_KEY);
        if (storedData) {
            return JSON.parse(storedData) as SurveyResponse[];
        }
    } catch (error) {
        console.error("Failed to parse survey submissions from localStorage:", error);
    }
    return [];
};


/**
 * Simulates a webhook submission by saving survey data to localStorage.
 * @param data The survey data to be saved.
 * @returns A promise that resolves to { success: true } if successful.
 */
export const postSurveyData = async (data: SurveyResponse): Promise<{ success: true }> => {
  console.log('--- SIMULATING WEBHOOK SUBMISSION to localStorage ---');
  await simulateDelay(1000);
  
  if (data.email.includes('error')) {
      throw new Error("Simulated server error.");
  }

  try {
      const existingSubmissions = getSurveySubmissions();
      const newSubmissions = [...existingSubmissions, data];
      localStorage.setItem(SURVEY_STORAGE_KEY, JSON.stringify(newSubmissions));
      console.log('Data saved to localStorage:', newSubmissions);
  } catch (error) {
      console.error("Failed to save survey data to localStorage:", error);
      throw new Error("Failed to save data locally.");
  }

  return { success: true };
};

// FIX: Added mock database and API functions for QuestView
const questDB: QuestZone[] = [
    {
      id: 'zone-1',
      name: 'Island of Self-Discovery',
      isUnlocked: true,
      nodes: [
        { id: 'node-1-1', title: 'Origin Story', question: 'What is your professional origin story?', answer: null, status: 'pending' },
        { id: 'node-1-2', title: 'Core Skills', question: 'What are your 3 core skills?', answer: null, status: 'locked' },
        { id: 'node-1-3', title: 'Proudest Moment', question: 'Describe your proudest professional achievement.', answer: null, status: 'locked' },
      ],
    },
    {
      id: 'zone-2',
      name: 'The Volcanic Projects',
      isUnlocked: false,
      nodes: [
        { id: 'node-2-1', title: 'Project Lava', question: 'Describe a challenging project and how you handled it.', answer: null, status: 'locked' },
        { id: 'node-2-2', title: 'Team Magma', question: 'How do you collaborate in a team setting?', answer: null, status: 'locked' },
      ],
    },
    {
      id: 'zone-3',
      name: 'Future-Proof Peaks',
      isUnlocked: false,
      nodes: [
        { id: 'node-3-1', title: 'Career Goals', question: 'What are your long-term career aspirations?', answer: null, status: 'locked' },
      ],
    },
];

export const getQuestMap = async (): Promise<QuestZone[]> => {
    await simulateDelay(800);
    // Deep copy to avoid direct mutation of DB state in client
    return JSON.parse(JSON.stringify(questDB));
};

export const postQuestAnswer = async (nodeId: string, answer: string): Promise<{ map: QuestZone[] }> => {
    await simulateDelay(1000);
    
    let nodeFound = false;
    let allNodesInZoneComplete = false;
    let currentZoneIndex = -1;
    
    for (let i = 0; i < questDB.length; i++) {
        const zone = questDB[i];
        const nodeIndex = zone.nodes.findIndex(n => n.id === nodeId);

        if (nodeIndex > -1) {
            nodeFound = true;
            currentZoneIndex = i;
            zone.nodes[nodeIndex].answer = answer;
            zone.nodes[nodeIndex].status = 'completed';

            // Unlock next node in the same zone
            if (nodeIndex + 1 < zone.nodes.length) {
                const nextNode = zone.nodes[nodeIndex + 1];
                if (nextNode.status === 'locked') {
                    nextNode.status = 'pending';
                }
            } else {
                // Last node in the zone
                allNodesInZoneComplete = zone.nodes.every(n => n.status === 'completed');
            }
            break;
        }
    }

    if (!nodeFound) {
        throw new Error("Node not found");
    }

    // If all nodes in the current zone are complete, unlock the next zone
    if (allNodesInZoneComplete && currentZoneIndex + 1 < questDB.length) {
        const nextZone = questDB[currentZoneIndex + 1];
        nextZone.isUnlocked = true;
        if (nextZone.nodes.length > 0 && nextZone.nodes[0].status === 'locked') {
            nextZone.nodes[0].status = 'pending';
        }
    }
    
    return { map: JSON.parse(JSON.stringify(questDB)) };
};
