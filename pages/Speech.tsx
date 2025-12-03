import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/api';
import { AVAILABLE_VOICES, SpeechVoice } from '../types';

const Speech: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<SpeechVoice>(AVAILABLE_VOICES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize AudioContext on user interaction to comply with browser policies
  const initAudioContext = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;
    initAudioContext();
    setIsLoading(true);

    try {
      const audioBuffer = await GeminiService.textToSpeech(text, selectedVoice.name);
      
      if (audioBuffer && audioContext) {
        // Play the audio
        setIsPlaying(true);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.onended = () => setIsPlaying(false);
        source.start();
      }
    } catch (error) {
      alert("Failed to generate speech. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-4 h-[calc(100vh-140px)] flex flex-col">
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 md:p-8 flex flex-col flex-1">
        
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-200 flex items-center">
            <svg className="w-6 h-6 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            Text to Speech
          </h2>
          
          <div className="flex items-center space-x-2 bg-slate-900 rounded-lg p-1 border border-slate-700">
            {AVAILABLE_VOICES.map(voice => (
              <button
                key={voice.name}
                onClick={() => setSelectedVoice(voice)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedVoice.name === voice.name
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {voice.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 mb-6 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={initAudioContext}
            placeholder="Type something here to hear it spoken..."
            className="w-full h-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 resize-none leading-relaxed placeholder-slate-600"
          />
          <div className="absolute bottom-4 right-4 text-xs text-slate-500 bg-slate-900/80 px-2 py-1 rounded">
            {text.length} chars
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!text.trim() || isLoading || isPlaying}
          className={`
            w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center
            ${!text.trim() || isLoading || isPlaying
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-pink-500/20 transform hover:-translate-y-0.5'}
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Audio...
            </>
          ) : isPlaying ? (
            <>
              <span className="flex items-center space-x-1 mr-2">
                <span className="w-1 h-4 bg-white animate-pulse"></span>
                <span className="w-1 h-6 bg-white animate-pulse delay-75"></span>
                <span className="w-1 h-3 bg-white animate-pulse delay-150"></span>
              </span>
              Playing...
            </>
          ) : (
            <>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Generate & Play
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Speech;