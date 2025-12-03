import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Vision from './pages/Vision';
import Speech from './pages/Speech';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home onNavigate={setCurrentView} />;
      case ViewState.CHAT:
        return <Chat />;
      case ViewState.VISION:
        return <Vision />;
      case ViewState.SPEECH:
        return <Speech />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => setCurrentView(ViewState.HOME)}
          >
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-1.5 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">MyAIWebApp</span>
          </div>
          
          <div className="hidden md:block">
            <Navigation currentView={currentView} onNavigate={setCurrentView} />
          </div>
          
          <div className="text-xs text-slate-500 border border-slate-800 rounded-full px-3 py-1">
             v1.0.0
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-6 pb-24 md:pb-6">
        {renderView()}
      </main>

      {/* Mobile Navigation (Bottom) */}
      <div className="md:hidden">
        <Navigation currentView={currentView} onNavigate={setCurrentView} />
      </div>
    </div>
  );
}

export default App;