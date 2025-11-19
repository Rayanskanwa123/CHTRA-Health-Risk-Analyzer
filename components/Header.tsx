
import React from 'react';
import { AlertIcon } from './icons/AlertIcon';
import { HistoryIcon } from './icons/HistoryIcon';

interface HeaderProps {
  onHistoryClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHistoryClick }) => {
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
        {onHistoryClick && (
          <button
            onClick={onHistoryClick}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg border border-slate-700 transition-all"
          >
            <HistoryIcon className="w-4 h-4" />
            <span>History</span>
          </button>
        )}
        
        <div className="inline-flex items-center bg-amber-900/20 text-amber-500 border border-amber-900/50 rounded-full px-3 py-1 text-xs">
          <AlertIcon className="w-3 h-3 mr-1.5" />
          <span className="font-semibold opacity-80">Disclaimer:</span>&nbsp;Always seek professional medical guidance.
        </div>
      </div>
    </header>
  );
};
