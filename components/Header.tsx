
import React from 'react';
import type { View } from '../App';
import { DocumentTextIcon, MapIcon, WrenchScrewdriverIcon } from './ui/Icons';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'home', label: 'Profile Anchor', icon: <DocumentTextIcon /> },
    { view: 'quest', label: 'Your Quest', icon: <MapIcon /> },
    { view: 'tailor', label: 'Tailor Resume', icon: <WrenchScrewdriverIcon /> },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-bold text-slate-900">
            Boring-But-Works Resume
          </h1>
          <nav className="hidden sm:flex items-center space-x-2 rounded-lg bg-slate-100 p-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  currentView === item.view
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <nav className="sm:hidden flex items-center justify-around border-t border-slate-200">
             {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`flex flex-col items-center space-y-1 w-full py-2 text-xs font-medium transition-colors duration-200 ${
                  currentView === item.view
                    ? 'text-blue-600'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
