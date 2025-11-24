
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ReportDisplay } from './components/ReportDisplay';
import { HistoryModal } from './components/HistoryModal';
import { LandingPage } from './components/LandingPage';
import { generateHealthReport } from './services/geminiService';
import { getLanguagesForLocation } from './data/languageData';
import type { UserInput, ReportData, SavedReport } from './types';

const HISTORY_KEY = 'chtra_history';
const SESSION_KEY = 'chtra_session';

const App: React.FC = () => {
  // Initialize user from local storage to persist session across refreshes
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_KEY);
      return savedSession ? JSON.parse(savedSession) : null;
    } catch (e) {
      return null;
    }
  });

  const [userInput, setUserInput] = useState<UserInput>({
    patientName: '',
    gender: 'Male',
    state: 'Bauchi',
    lga: 'All',
    symptoms: 'Severe abdominal pain, persistent vomiting, extreme fatigue, and profuse, watery diarrhea.',
    ageGroup: '46-65',
    preExistingConditions: 'None reported',
    detailedHistory: {
      pastDiagnoses: '',
      surgicalHistory: '',
      familyHistory: '',
      allergies: ''
    },
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
  
  // Language State
  const [appLanguage, setAppLanguage] = useState<string>('English');

  // Load history from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Persist user session changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  // Determine available languages based on location
  const availableLanguages = useMemo(() => {
    const localLangs = getLanguagesForLocation(userInput.state, userInput.lga);
    // Ensure English is always first, then local languages, then common fallbacks
    return Array.from(new Set(['English', ...localLangs, 'Hausa', 'Yoruba', 'Igbo', 'Pidgin']));
  }, [userInput.state, userInput.lga]);

  // Handle Shared URL Parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareData = params.get('share');
    if (shareData) {
      try {
        // Decode base64 -> unescape -> json parse
        const decodedInput = JSON.parse(decodeURIComponent(escape(atob(shareData))));
        // Ensure fields exist for backward compatibility
        if (!decodedInput.detailedHistory) {
            decodedInput.detailedHistory = {
                pastDiagnoses: '',
                surgicalHistory: '',
                familyHistory: '',
                allergies: ''
            };
        }
        if (!decodedInput.patientName) {
            decodedInput.patientName = '';
        }
        if (!decodedInput.gender) {
            decodedInput.gender = 'Male';
        }
        setUserInput(decodedInput);
        // If coming from a share link, auto-login as guest if not already logged in
        if (!user) {
             setUser({ name: 'Guest User', email: 'guest@chtra.com' });
        }
      } catch (e) {
        console.error("Failed to parse shared data", e);
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    setReport(null);
    // Session storage clearing is handled by the useEffect
  };

  const saveToHistory = (newReport: ReportData, input: UserInput) => {
    const newItem: SavedReport = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      userInput: input,
      reportData: newReport
    };

    const updatedHistory = [newItem, ...history].slice(0, 50); // Cap at 50
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const handleDeleteHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const handleLoadHistory = (item: SavedReport) => {
    // Ensure structure exists when loading old reports
    const loadedInput = item.userInput;
    if (!loadedInput.detailedHistory) {
        loadedInput.detailedHistory = {
            pastDiagnoses: '',
            surgicalHistory: '',
            familyHistory: '',
            allergies: ''
        };
    }
    if (!loadedInput.patientName) {
        loadedInput.patientName = '';
    }
    if (!loadedInput.gender) {
        loadedInput.gender = 'Male';
    }
    setUserInput(loadedInput);
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

    // Handle detailed medical history fields
    if (['pastDiagnoses', 'surgicalHistory', 'familyHistory', 'allergies'].includes(name)) {
      setUserInput(prev => ({
        ...prev,
        detailedHistory: {
          ...prev.detailedHistory,
          [name]: value
        }
      }));
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
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans overflow-hidden flex flex-col">
      <div className="flex-shrink-0 p-4 sm:p-6 border-b border-slate-800 bg-slate-900 z-10">
         <div className="max-w-7xl mx-auto">
            <Header 
                onHistoryClick={() => setIsHistoryOpen(true)} 
                onLogout={handleLogout}
                user={user}
                language={appLanguage}
                setLanguage={setAppLanguage}
                availableLanguages={availableLanguages}
            />
         </div>
      </div>
      
      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 p-4 sm:p-6 overflow-hidden">
          <div className="h-full overflow-y-auto custom-scrollbar pb-20 lg:pb-0">
             <InputForm 
                userInput={userInput}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                language={appLanguage}
            />
          </div>
          <div className="h-full overflow-y-auto custom-scrollbar pb-20 lg:pb-0 mt-6 lg:mt-0">
            <ReportDisplay 
                report={report}
                isLoading={isLoading}
                error={error}
                userInput={userInput}
                language={appLanguage}
            />
          </div>
      </main>

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
