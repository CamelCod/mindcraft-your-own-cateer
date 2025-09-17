
import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/views/HomeView';
import QuestView from './components/views/QuestView';
import TailorView from './components/views/TailorView';

export type View = 'home' | 'quest' | 'tailor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'quest':
        return <QuestView />;
      case 'tailor':
        return <TailorView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
