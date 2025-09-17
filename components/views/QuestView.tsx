
import React, { useState, useEffect, useCallback } from 'react';
import type { QuestZone, QuestNode } from '../../types';
import { getQuestMap, postQuestAnswer } from '../../services/apiService';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';

// --- Modal Component ---
const QuestionModal: React.FC<{
  node: QuestNode;
  onClose: () => void;
  onSave: (nodeId: string, answer: string) => Promise<void>;
}> = ({ node, onClose, onSave }) => {
  const [answer, setAnswer] = useState(node.answer || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(node.id, answer);
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-800">{node.title}</h3>
          <p className="text-slate-600 mt-2 mb-4">{node.question}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={6}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition"
            placeholder="Your detailed answer here..."
            disabled={isSaving}
          />
        </div>
        <div className="bg-slate-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button onClick={onClose} disabled={isSaving} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50">
            Cancel
          </button>
          <Button onClick={handleSave} isLoading={isSaving} disabled={!answer.trim() || isSaving}>
            Save & Continue Quest
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Main Quest View ---
const QuestView: React.FC = () => {
  const [mapData, setMapData] = useState<QuestZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<QuestNode | null>(null);

  const fetchMap = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getQuestMap();
      setMapData(data);
    } catch (err) {
      setError('Failed to load the quest map.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMap();
  }, [fetchMap]);
  
  const handleSaveAnswer = useCallback(async (nodeId: string, answer: string) => {
    try {
      const { map: newMap } = await postQuestAnswer(nodeId, answer);
      setMapData(newMap);
    } catch(err) {
      setError('Failed to save your answer. Please try again.');
    }
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center p-10"><Spinner /> Loading Quest Map...</div>;
  }

  if (error) {
    return <p className="text-center text-red-600 font-medium p-10">{error}</p>;
  }
  
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 sm:p-6">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Your Profile Quest</h2>
        <p className="text-sm text-slate-500 mt-1">Complete nodes on each island to build your profile and level up.</p>
      </div>
      
      <div className="space-y-8">
        {mapData.map((zone, zoneIndex) => (
          <div key={zone.id} className={`p-4 rounded-lg transition-opacity ${zone.isUnlocked ? 'opacity-100' : 'opacity-50 bg-slate-50'}`}>
            <h3 className="font-bold text-xl text-slate-700 mb-4">{zone.name}</h3>
            {zoneIndex > 0 && <div className="border-l-2 border-dashed border-slate-300 h-8 ml-5 -mt-4"></div>}
            <div className="relative flex flex-wrap gap-4">
              {zone.nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  disabled={node.status === 'locked' || !zone.isUnlocked}
                  className="flex flex-col items-center justify-center w-24 h-24 p-2 rounded-full text-center text-xs font-semibold shadow-md transition-all duration-200 disabled:cursor-not-allowed disabled:saturate-50"
                  style={{
                    backgroundColor: node.status === 'completed' ? '#dcfce7' : node.status === 'pending' ? '#dbeafe' : '#f1f5f9',
                    color: node.status === 'completed' ? '#166534' : node.status === 'pending' ? '#1e40af' : '#64748b',
                    border: `2px solid ${node.status === 'completed' ? '#4ade80' : node.status === 'pending' ? '#60a5fa' : '#cbd5e1'}`
                  }}
                  title={node.title}
                >
                  {node.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {mapData.every(zone => zone.nodes.every(n => n.status === 'completed')) && (
          <p className="text-center text-green-600 font-medium p-10">Congratulations, Adventurer! You have completed your profile quest!</p>
      )}

      {selectedNode && (
        <QuestionModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onSave={handleSaveAnswer}
        />
      )}
    </div>
  );
};

export default QuestView;
