import React from 'react';
import { ShieldCheckIcon, DeviceTabletIcon, RefreshIcon, MaximizeIcon, StarIcon, ArrowLeftIcon } from './icons';

interface HeaderProps {
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack }) => {
  return (
    <header className="bg-slate-900/30 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeftIcon className="w-6 h-6 text-slate-300" />
          </button>
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wide">Veritas AI</h1>
            <span className="hidden md:inline-block text-slate-400 font-light">| Misinformation Combat Tool</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold px-4 py-2 rounded-full text-sm shadow-lg">
            <StarIcon className="w-5 h-5" />
            <span>Fact-Check Points: 1,250</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <DeviceTabletIcon className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <RefreshIcon className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <MaximizeIcon className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};