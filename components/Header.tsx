
import React from 'react';
import { AlertIcon } from './icons/AlertIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400">
        CHTRA: Health Risk Analyzer
      </h1>
      <p className="mt-2 text-slate-400 max-w-3xl mx-auto">
        AI-powered situational analysis for immediate health threats based on localized data.
      </p>
      <div className="mt-4 inline-flex items-center bg-amber-900/50 text-amber-300 border border-amber-700 rounded-full px-4 py-2 text-sm">
        <AlertIcon className="w-5 h-5 mr-2" />
        <span className="font-semibold">Disclaimer:</span>&nbsp;This is an AI-powered tool and not a substitute for professional medical advice.
      </div>
    </header>
  );
};
