
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ReportDisplay } from './components/ReportDisplay';
import { generateHealthReport } from './services/geminiService';
import type { UserInput, ReportData } from './types';

const App: React.FC = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle context checkboxes
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

    // Handle context notes textarea
    if (name === 'contextNotes') {
      setUserInput(prev => ({ ...prev, context: { ...prev.context, notes: value }}));
      return;
    }

    // Handle all other standard inputs
    setUserInput(prev => {
      const newState = { ...prev, [name]: value };
      // When state changes, reset the LGA to 'All' to avoid invalid combinations
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
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
          />
        </main>
      </div>
    </div>
  );
};

export default App;