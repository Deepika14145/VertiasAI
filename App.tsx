import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { AnalysisReport } from './components/AnalysisReport';
import { analyzeContent } from './services/geminiService';
import type { AnalysisResult } from './types';
import { LoadingSpinner, ShieldCheckIcon, AIBrainIcon, DashboardIcon, ManipulateIcon, GraphIcon, AnalyzeIcon, ChromeIcon, StarIcon } from './components/icons';

// --- Landing Page Component ---

interface LandingPageProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-6 text-center transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10">
    <div className="flex items-center justify-center w-12 h-12 bg-slate-700/50 border border-slate-600 rounded-full mb-4 mx-auto">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const HeroBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute top-[30%] left-[50%] w-96 h-96 bg-violet-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[20%] left-[30%] w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300 animate-fadeIn overflow-x-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      
      <header className="bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-700/50">
        <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-slate-100 to-slate-400 text-transparent bg-clip-text">Veritas AI</h1>
          </div>
          <button
            onClick={onStart}
            className="hidden sm:flex items-center gap-2 px-5 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-full hover:bg-slate-700 hover:text-white transition-colors font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Launch Analyzer
            <AnalyzeIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <section className="text-center py-20 md:py-32 relative">
          <HeroBackground />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 mb-4 leading-tight">
              Combat Misinformation with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Confidence</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-slate-400 mb-8">
              Veritas AI uses advanced artificial intelligence to analyze content, detect bias, and reveal manipulation techniques, empowering you to navigate the digital world with clarity.
            </p>
            <button
              onClick={onStart}
              className="flex items-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-full hover:shadow-[0_0_20px_theme(colors.cyan.500/50%)] transition-all duration-300 font-bold text-lg shadow-lg transform hover:-translate-y-1"
            >
              Start Analyzing Now
              <AnalyzeIcon className="w-6 h-6" />
            </button>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-slate-800/40 rounded-3xl backdrop-blur-sm border border-slate-700/50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100">A New Standard in Content Verification</h2>
            <p className="text-slate-400 mt-2">Go beyond simple true-or-false fact-checking.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
            <FeatureCard 
              icon={<AIBrainIcon className="w-6 h-6 text-cyan-400" />}
              title="Comprehensive Analysis"
              description="Get detailed reports on emotional tone, source credibility, political bias, and more."
            />
            <FeatureCard 
              icon={<DashboardIcon className="w-6 h-6 text-cyan-400" />}
              title="Explainable AI (XAI)"
              description="Understand the 'why' with our transparent XAI dashboard, visualizing every factor in our assessment."
            />
            <FeatureCard 
              icon={<ManipulateIcon className="w-6 h-6 text-cyan-400" />}
              title="Manipulation Simulator"
              description="Learn to spot deceptive techniques. Our AI shows you how original content can be twisted."
            />
            <FeatureCard 
              icon={<GraphIcon className="w-6 h-6 text-cyan-400" />}
              title="Chain-of-Trust Graph"
              description="Trace the origins and spread of a claim, mapping its journey across different sources."
            />
          </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-100">Simple, Fast, and Insightful</h2>
                <p className="text-slate-400 mt-2">Get your comprehensive analysis in three easy steps.</p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                <div className="hidden md:block absolute top-12 left-0 w-full h-px">
                    <svg width="100%" height="2" className="stroke-slate-700">
                        <line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" strokeDasharray="8 8" />
                    </svg>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center justify-center w-24 h-24 bg-slate-800 border-2 border-slate-700 rounded-full mx-auto mb-4 shadow-lg">
                        <span className="text-3xl font-bold text-cyan-400">1</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-slate-200">Input Content</h3>
                    <p className="text-slate-400 text-sm">Paste text, a URL, or upload an image or video file you want to check.</p>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center justify-center w-24 h-24 bg-slate-800 border-2 border-slate-700 rounded-full mx-auto mb-4 shadow-lg">
                        <span className="text-3xl font-bold text-cyan-400">2</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-slate-200">AI Analysis</h3>
                    <p className="text-slate-400 text-sm">Our engine evaluates the content against multiple credibility vectors in real-time.</p>
                </div>
                <div className="relative z-10">
                    <div className="flex items-center justify-center w-24 h-24 bg-slate-800 border-2 border-slate-700 rounded-full mx-auto mb-4 shadow-lg">
                        <span className="text-3xl font-bold text-cyan-400">3</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-slate-200">Get Your Report</h3>
                    <p className="text-slate-400 text-sm">Receive a clear, actionable, and easy-to-understand report in seconds.</p>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                  <span className="text-sm font-bold uppercase text-cyan-400 tracking-widest">Power Up Your Browser</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mt-2 mb-4">Verify Content on Any Website</h2>
                  <p className="text-slate-400 mb-8 text-lg">
                      Install the Veritas AI Chrome Extension to analyze articles, social media, and images directly in your browser. Get instant insights without switching tabs.
                  </p>
                  <button
                      type="button"
                      className="flex items-center justify-center gap-3 w-fit px-8 py-4 bg-slate-100 text-slate-800 rounded-full hover:bg-white transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1"
                  >
                      <ChromeIcon className="w-6 h-6" />
                      Add to Chrome - It's Free
                  </button>
              </div>
              <div className="md:order-1 bg-slate-800/50 p-4 rounded-2xl shadow-2xl border border-slate-700 transform md:-rotate-3">
                  <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="aspect-[4/3] bg-slate-900 rounded-lg flex flex-col items-center justify-center p-8 border border-slate-700">
                      <div className="p-4 bg-slate-800 border border-slate-700 rounded-full">
                          <ShieldCheckIcon className="w-12 h-12 text-cyan-400" />
                      </div>
                      <p className="mt-4 font-semibold text-slate-300 text-center">Analyze with one click.</p>
                      <p className="text-sm text-slate-400 text-center">Get the Veritas AI report directly on the page you're viewing.</p>
                  </div>
              </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-800/50">
        <p>&copy; 2024 Veritas AI. Empowering a more informed digital citizenry.</p>
      </footer>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAnalyzer, setShowAnalyzer] = useState<boolean>(false);
  const [analyzedImageUrl, setAnalyzedImageUrl] = useState<string | null>(null);
  const [initialText, setInitialText] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string, file: File | null) => {
    if (!text && !file) {
      setError("Please enter text, a URL, or attach a file to analyze.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setAnalysisResult(null);
    setAnalyzedImageUrl(null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAnalyzedImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    
    try {
      const result = await analyzeContent(text, file);
      setAnalysisResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during analysis. Please try again.";
      setError(errorMessage);
      console.error(err);
      setAnalyzedImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to read URL params on initial load and set up the analyzer view.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToAnalyze = params.get('url');
    const textToAnalyze = params.get('text');

    if (urlToAnalyze || textToAnalyze) {
      const content = urlToAnalyze || textToAnalyze || '';
      
      setInitialText(content);
      if (urlToAnalyze) {
        setSourceUrl(urlToAnalyze);
      }
      setShowAnalyzer(true);

      // Clean the URL to avoid re-triggering on refresh
      if (window.history.replaceState) {
        const cleanUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Effect to automatically trigger analysis when the app is opened via URL params.
  useEffect(() => {
    // This triggers if `sourceUrl` was set from the "extension" flow, and analysis hasn't started.
    // We check `initialText` to ensure we have content to analyze.
    if (sourceUrl && initialText && !isLoading && !analysisResult) {
      handleAnalyze(initialText, null);
    }
  }, [sourceUrl, initialText, isLoading, analysisResult, handleAnalyze]);

  const handleStart = () => {
    setShowAnalyzer(true);
  };

  const handleBackToHome = () => {
    setShowAnalyzer(false);
    setAnalysisResult(null);
    setIsLoading(false);
    setError(null);
    setAnalyzedImageUrl(null);
    setInitialText('');
    setSourceUrl(null);
  };
  
  if (!showAnalyzer) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen font-sans text-slate-200">
      <Header onBack={handleBackToHome} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {sourceUrl && (
            <div className="mb-4 text-center text-sm text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              Analysis requested for: <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{sourceUrl}</a>
            </div>
          )}
          <InputForm onAnalyze={handleAnalyze} isLoading={isLoading} initialText={initialText} />
          {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
          {isLoading && (
            <div className="flex flex-col items-center justify-center mt-10 text-center">
              <LoadingSpinner className="w-12 h-12 text-cyan-500" />
              <p className="mt-4 text-lg font-semibold text-slate-300 tracking-wide">Analyzing content...</p>
              <p className="text-slate-400 max-w-md">Our AI is checking sources, evaluating tone, and identifying potential manipulation techniques. This might take a moment.</p>
            </div>
          )}
          {analysisResult && <AnalysisReport result={analysisResult} />}
        </div>
      </main>
       <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-800/50 mt-12">
        <p>&copy; 2024 Veritas AI. Empowering a more informed digital citizenry.</p>
      </footer>
    </div>
  );
};

export default App;