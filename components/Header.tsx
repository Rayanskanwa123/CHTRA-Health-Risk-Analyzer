
import React from 'react';
import { AlertIcon } from './icons/AlertIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { TranslateIcon } from './icons/TranslateIcon';

interface HeaderProps {
  onHistoryClick?: () => void;
  onLogout?: () => void;
  user?: { name: string; email: string } | null;
  language?: string;
  setLanguage?: (lang: string) => void;
  availableLanguages?: string[];
}

export const Header: React.FC<HeaderProps> = ({ 
  onHistoryClick, 
  onLogout, 
  user,
  language = 'English',
  setLanguage,
  availableLanguages = ['English']
}) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 tracking-tight">
          CHTRA<span className="text-slate-500 text-lg font-light ml-2">Health Risk Analyzer</span>
        </h1>
        <p className="mt-1 text-slate-400 text-sm max-w-xl">
          AI-powered situational analysis for immediate health threats based on localized data.
        </p>
        <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
          <span className="bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50 text-cyan-600/80">Rapid Assessment</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50 text-cyan-600/80">Localized Data</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50 text-cyan-600/80">Clinical Support</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
            
            {setLanguage && (
              <div className="relative mr-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-slate-500">
                  <TranslateIcon className="w-3 h-3" />
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-7 pr-8 py-1.5 appearance-none hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Select Application Language"
                >
                  {availableLanguages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            )}

            {user && (
                <div className="hidden md:flex flex-col items-end mr-2 border-r border-slate-700 pr-3">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Logged in as</span>
                    <span className="text-sm font-medium text-cyan-400">{user.name}</span>
                </div>
            )}
            
            {onHistoryClick && (
            <button
                onClick={onHistoryClick}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg border border-slate-700 transition-all"
                title="View History"
            >
                <HistoryIcon className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
            </button>
            )}

            {onLogout && (
                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-slate-900 hover:bg-red-900/20 text-slate-400 hover:text-red-400 text-sm font-medium rounded-lg border border-slate-700 hover:border-red-900/50 transition-all"
                    title="Logout"
                >
                    Logout
                </button>
            )}
        </div>
        
        <div className="inline-flex items-center bg-amber-900/20 text-amber-500 border border-amber-900/50 rounded-full px-3 py-1 text-xs">
          <AlertIcon className="w-3 h-3 mr-1.5" />
          <span className="font-semibold opacity-80">Disclaimer:</span>&nbsp;Always seek professional medical guidance.
        </div>
      </div>
    </header>
  );
};
