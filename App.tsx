import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/views/HomeView';
import QuestView from './components/views/QuestView';
import ValidationView from './components/views/ValidationView';
import type { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderView = () => {
    switch (currentView) {
      case 'quest':
        return <QuestView />;
      case 'tailor':
        return <ValidationView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;