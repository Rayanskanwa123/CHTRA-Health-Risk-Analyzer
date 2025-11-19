
import React, { useState } from 'react';
import type { SavedReport } from '../types';
import { AlertIcon } from './icons/AlertIcon';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: SavedReport[];
  onLoadReport: (saved: SavedReport) => void;
  onDeleteReport: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ 
  isOpen, 
  onClose, 
  history, 
  onLoadReport, 
  onDeleteReport 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredHistory = history.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.userInput.state.toLowerCase().includes(term) ||
      item.userInput.lga.toLowerCase().includes(term) ||
      item.userInput.symptoms.toLowerCase().includes(term) ||
      (item.reportData.parsedReport?.riskLevel || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-800 border border-slate-700 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
        <div className="p-4 border-b border-slate-700 bg-slate-900/50 rounded-t-lg space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">Assessment History</span>
            </h2>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-700 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search by state, LGA, symptoms or risk level..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-md pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <AlertIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{searchTerm ? 'No matching reports found.' : 'No saved reports found.'}</p>
              <p className="text-xs mt-1">{searchTerm ? 'Try a different search term.' : 'Generated reports are automatically saved here.'}</p>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                        item.reportData.parsedReport?.riskLevel === 'CRITICAL' ? 'bg-red-900/50 text-red-400' :
                        item.reportData.parsedReport?.riskLevel === 'HIGH' ? 'bg-orange-900/50 text-orange-400' :
                        item.reportData.parsedReport?.riskLevel === 'MODERATE' ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-green-900/50 text-green-400'
                      }`}>
                        {item.reportData.parsedReport?.riskLevel || 'REPORT'}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="text-slate-200 font-medium truncate">
                      {item.userInput.state} - {item.userInput.lga}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-1 mt-1">
                      {item.userInput.symptoms}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        onLoadReport(item);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 rounded border border-cyan-900 transition-colors"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => onDeleteReport(item.id)}
                      className="px-3 py-1.5 text-xs font-medium bg-red-900/10 text-red-400 hover:bg-red-900/30 rounded border border-red-900/30 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t border-slate-700 bg-slate-900/50 rounded-b-lg text-xs text-slate-500 text-center">
           Stored locally on your device. Clearing browser data will remove history.
        </div>
      </div>
    </div>
  );
};
