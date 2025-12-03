import React, { useState, useRef } from 'react';
import { GeminiService } from '../services/api';

const Vision: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic validation
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        // Clean up result when new image is loaded
        setResult('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image || !mimeType) return;
    
    setIsLoading(true);
    setResult('');
    
    try {
      // Extract pure Base64 (remove data:image/xxx;base64, prefix)
      const base64Data = image.split(',')[1];
      const response = await GeminiService.analyzeImage(base64Data, mimeType, prompt);
      setResult(response);
    } catch (error) {
      setResult("Error analyzing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setMimeType('');
    setResult('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 h-[calc(100vh-140px)] overflow-y-auto">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left Column: Input */}
        <div className="space-y-6">
          <div className={`
            border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all h-64
            ${image ? 'border-indigo-500 bg-slate-800/30' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'}
          `}>
            {image ? (
              <div className="relative w-full h-full flex items-center justify-center group">
                <img src={image} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg shadow-lg" />
                <button 
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
              >
                <svg className="w-12 h-12 text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-slate-300 font-medium">Click to upload an image</p>
                <p className="text-slate-500 text-sm mt-2">JPG, PNG supported</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2 font-medium">Prompt (Optional)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What's in this image? (Default)"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-none"
              />
            </div>
            
            <button
              onClick={handleAnalyze}
              disabled={!image || isLoading}
              className={`
                w-full py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center space-x-2
                ${!image || isLoading 
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Result */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 flex flex-col min-h-[300px]">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Analysis Result
          </h3>
          <div className="flex-1 bg-slate-900/50 rounded-xl p-4 border border-slate-800 overflow-y-auto">
            {result ? (
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap animate-fade-in">{result}</p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600">
                {isLoading ? (
                  <p className="animate-pulse">Gemini is looking at your image...</p>
                ) : (
                  <>
                    <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <p>Results will appear here</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Vision;