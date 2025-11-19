
import React, { useState } from 'react';
import { ShieldIcon } from './icons/ShieldIcon';
import { MicroscopeIcon } from './icons/MicroscopeIcon';
import { FirstAidIcon } from './icons/FirstAidIcon';
import { AlertIcon } from './icons/AlertIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon'; // Reusing generic icon for features if needed or just generic svg

interface LandingPageProps {
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginSuccess }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Normalize inputs to handle accidental whitespace or case sensitivity
    const normalizedEmail = loginEmail.trim().toLowerCase();
    const normalizedPassword = loginPassword.trim();

    setLoginError('');

    // 1. Check Hardcoded Demo User
    if (normalizedEmail === 'me@chtra.com' && normalizedPassword === '3930') {
      onLoginSuccess({ name: 'Demo User', email: normalizedEmail });
      return;
    }

    // 2. Check Local Storage Users (created via Sign Up)
    try {
        const storedUsers = JSON.parse(localStorage.getItem('chtra_users') || '[]');
        const validUser = storedUsers.find((u: any) => 
            u.email === normalizedEmail && u.password === normalizedPassword
        );

        if (validUser) {
            onLoginSuccess({ name: validUser.name, email: validUser.email });
            return;
        }
    } catch (err) {
        console.error("Error reading user storage", err);
    }

    setLoginError('Invalid credentials. Please check your email and password.');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (signupName && signupEmail && signupPassword) {
       const normalizedEmail = signupEmail.trim().toLowerCase();
       const normalizedPassword = signupPassword.trim();

       try {
           const storedUsers = JSON.parse(localStorage.getItem('chtra_users') || '[]');
           
           // Check if user already exists
           if (storedUsers.some((u: any) => u.email === normalizedEmail)) {
               setSignupError('An account with this email already exists.');
               return;
           }

           const newUser = { 
               name: signupName, 
               email: normalizedEmail, 
               password: normalizedPassword 
           };

           // Save to local storage
           localStorage.setItem('chtra_users', JSON.stringify([...storedUsers, newUser]));
           
           // Automatically log in
           onLoginSuccess({ name: signupName, email: normalizedEmail });

       } catch (err) {
           console.error("Error saving user", err);
           // Fallback for demo if storage fails (e.g. private mode restrictions)
           onLoginSuccess({ name: signupName, email: normalizedEmail });
       }
    } else {
        setSignupError('Please fill in all fields.');
    }
  };

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
    setLoginError('');
  };

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
    setSignupError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center text-slate-900 font-bold text-xl">C</div>
          <span className="text-2xl font-bold text-white tracking-tight">CHTRA</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => setIsSignupOpen(true)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-cyan-900/20"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-800 text-cyan-400 text-xs font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                AI-Powered Assessment
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Intelligent health risk analyzer for communities
              </h1>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
                Empower your community with immediate, data-driven health risk assessments. localized analysis for effective response and prevention.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsSignupOpen(true)}
                  className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-cyan-900/20 flex items-center justify-center gap-2"
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-medium text-slate-400">
                        {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p>Trusted by healthcare workers across Nigeria</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full opacity-30 -z-10 transform translate-x-10 translate-y-10"></div>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800">
                <img 
                  src="https://i.ibb.co/Lz4bj21c/VMGHealth-379560544.webp" 
                  alt="Healthcare professional using tablet" 
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose CHTRA?</h2>
            <p className="text-slate-400">Our platform combines advanced AI with localized datasets to provide accurate, actionable health intelligence when it matters most.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MicroscopeIcon className="w-6 h-6 text-cyan-400" />,
                title: "AI-Driven Diagnosis",
                desc: "Sophisticated algorithms analyze symptoms against local disease patterns to identify likely conditions with high accuracy."
              },
              {
                icon: <ShieldIcon className="w-6 h-6 text-emerald-400" />,
                title: "Preventive Action",
                desc: "Get immediate, actionable advice on first aid and preventive measures tailored to the specific environment."
              },
              {
                icon: <FirstAidIcon className="w-6 h-6 text-red-400" />,
                title: "Resource Mapping",
                desc: "Instantly locate the nearest and most appropriate healthcare facilities based on the severity of the condition."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-cyan-500/30 transition-all hover:shadow-lg group">
                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded bg-cyan-500 flex items-center justify-center text-slate-900 font-bold text-xs">C</div>
                <span className="text-xl font-bold text-white tracking-tight">CHTRA</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Advancing community health through intelligent, data-driven risk assessment and rapid response tools.
              </p>
              <div className="flex gap-4">
                {['twitter', 'facebook', 'linkedin'].map(social => (
                  <a key={social} href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all">
                    <span className="sr-only">{social}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Data Sources</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><button onClick={() => setIsAboutOpen(true)} className="hover:text-cyan-400 transition-colors text-left">About Us</button></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} CHTRA. All rights reserved.</p>
            <p>Designed for healthcare professionals.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-xl font-bold text-white">Welcome Back</h3>
              <button onClick={() => setIsLoginOpen(false)} className="text-slate-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              {loginError && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-300 text-sm">
                  {loginError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors mt-2"
              >
                Login
              </button>
              <p className="text-center text-sm text-slate-400 mt-4">
                Don't have an account? <button type="button" onClick={openSignup} className="text-cyan-400 hover:underline">Sign up</button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
             <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-xl font-bold text-white">Create Account</h3>
              <button onClick={() => setIsSignupOpen(false)} className="text-slate-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSignup} className="p-6 space-y-4">
              {signupError && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded text-red-300 text-sm">
                  {signupError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  placeholder="Dr. John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  placeholder="name@hospital.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  placeholder="Create a strong password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors mt-2"
              >
                Create Account
              </button>
              <p className="text-center text-sm text-slate-400 mt-4">
                Already have an account? <button type="button" onClick={openLogin} className="text-cyan-400 hover:underline">Login</button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* About Us Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden relative">
             <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-xl font-bold text-white">About CHTRA</h3>
              <button onClick={() => setIsAboutOpen(false)} className="text-slate-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4 text-slate-300 overflow-y-auto max-h-[60vh] custom-scrollbar">
                <p>
                    <strong>CHTRA</strong> (Comprehensive Health and Threat Response Agent) is an advanced AI-powered platform designed to bridge the gap in healthcare accessibility for communities in Nigeria.
                </p>
                <p>
                    Our mission is to empower healthcare workers and individuals with immediate, data-driven health risk assessments. By combining user-reported symptoms with localized environmental data, active health alerts, and facility mapping, CHTRA provides actionable insights when they matter most.
                </p>
                <h4 className="text-cyan-400 font-bold mt-4">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Real-time symptom analysis using Gemini 3 Pro Preview.</li>
                    <li>Integration with Nigerian environmental datasets (flood zones, industrial areas).</li>
                    <li>Active health alert cross-referencing (e.g., Cholera outbreaks).</li>
                    <li>Geolocation-based facility recommendations.</li>
                </ul>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mt-6 text-sm">
                    <strong className="text-amber-500 block mb-1">Disclaimer</strong>
                    CHTRA is an informational tool and does not provide medical diagnoses. It is designed to support, not replace, professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.
                </div>
            </div>
            <div className="p-6 border-t border-slate-700 bg-slate-900/30 text-center">
                <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} CHTRA Health Systems</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
