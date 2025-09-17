import React from 'react';
import type { View } from '../types';
import { HomeIcon, MapIcon, FileTextIcon } from './ui/Icons';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const navItems: { id: View; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'quest', label: 'Your Quest', icon: MapIcon },
  { id: 'tailor', label: 'Tailor Resume', icon: FileTextIcon },
];

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-slate-800">ResumeQuest</h1>
          </div>
          <nav className="flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-current={currentView === item.id ? 'page' : undefined}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;