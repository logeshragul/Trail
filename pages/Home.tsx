import React from 'react';
import { ViewState } from '../types';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] text-center px-4 animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-75"></div>
        <div className="relative bg-slate-900 rounded-full p-6">
          <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
        MyAIWebApp
      </h1>
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8">
        Experience the next generation of AI capabilities. Chat, analyze images, and generate speech with the power of Gemini.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12">
        <div 
          onClick={() => onNavigate(ViewState.CHAT)}
          className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Chat</h3>
          <p className="text-slate-400 text-sm">Engage in intelligent conversations with context awareness.</p>
        </div>

        <div 
          onClick={() => onNavigate(ViewState.VISION)}
          className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Vision Analysis</h3>
          <p className="text-slate-400 text-sm">Upload images to get detailed descriptions and insights.</p>
        </div>

        <div 
          onClick={() => onNavigate(ViewState.SPEECH)}
          className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-pink-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Text to Speech</h3>
          <p className="text-slate-400 text-sm">Convert your text into natural-sounding lifelike speech.</p>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-800 pt-8 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>Created By: <span className="text-indigo-400 font-medium">M. Logesh Ragul</span></p>
          <p className="mt-2 md:mt-0">Developed By: <span className="text-slate-300">MyAIWebApp Team</span></p>
        </div>
      </div>
    </div>
  );
};

export default Home;