import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ReportDisplay } from './components/ReportDisplay';
import { HistoryModal } from './components/HistoryModal';
import { LandingPage } from './components/LandingPage';
import { generateHealthReport } from './services/geminiService';
import type { UserInput, ReportData, SavedReport } from './types';

const STORAGE_KEY = 'chtra_history';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const [userInput, setUserInput] = useState<UserInput>({
    state: 'Bauchi',
    lga: 'All',
    symptoms: 'Severe abdominal pain, persistent vomiting, extreme fatigue, and profuse, watery diarrhea.',
    ageGroup: '46-65',
    preExistingConditions: 'None reported',
    context: {
      factors: ['Flood-Prone', 'Rural'],
      notes: 'Mid-rainy season, recent localized flooding reported in the area.'
    }
  });
  
  const [report, setReport] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedReport[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load history from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Handle Shared URL Parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareData = params.get('share');
    if (shareData) {
      try {
        // Decode base64 -> unescape -> json parse
        const decodedInput = JSON.parse(decodeURIComponent(escape(atob(shareData))));
        setUserInput(decodedInput);
        // If coming from a share link, we might want to auto-login or show the app
        // For this demo, let's auto-login a guest if a share link is present
        setUser({ name: 'Guest User', email: 'guest@chtra.com' });
      } catch (e) {
        console.error("Failed to parse shared data", e);
      }
    }
  }, []);

  const saveToHistory = (newReport: ReportData, input: UserInput) => {
    const newItem: SavedReport = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      userInput: input,
      reportData: newReport
    };

    const updatedHistory = [newItem, ...history].slice(0, 50); // Cap at 50
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const handleDeleteHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleLoadHistory = (item: SavedReport) => {
    setUserInput(item.userInput);
    setReport(item.reportData);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'contextFactor' && type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      setUserInput(prev => {
        const currentFactors = prev.context.factors;
        const newFactors = checked
          ? [...currentFactors, value]
          : currentFactors.filter(factor => factor !== value);
        return { ...prev, context: { ...prev.context, factors: newFactors }};
      });
      return;
    }

    if (name === 'contextNotes') {
      setUserInput(prev => ({ ...prev, context: { ...prev.context, notes: value }}));
      return;
    }

    setUserInput(prev => {
      const newState = { ...prev, [name]: value };
      if (name === 'state') {
        newState.lga = 'All';
      }
      return newState;
    });
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const generatedReport = await generateHealthReport(userInput);
      setReport(generatedReport);
      saveToHistory(generatedReport, userInput);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, history]);

  // Render Landing Page if not logged in
  if (!user) {
    return <LandingPage onLoginSuccess={setUser} />;
  }

  // Render Main Application
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header onHistoryClick={() => setIsHistoryOpen(true)} />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputForm 
            userInput={userInput}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <ReportDisplay 
            report={report}
            isLoading={isLoading}
            error={error}
            userInput={userInput}
          />
        </main>
      </div>

      <HistoryModal 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadReport={handleLoadHistory}
        onDeleteReport={handleDeleteHistory}
      />
    </div>
  );
};

export default App;