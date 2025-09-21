import React, { useState, useRef } from 'react';
import { PaperclipIcon, AnalyzeIcon } from './icons';

interface InputFormProps {
  onAnalyze: (text: string, file: File | null) => void;
  isLoading: boolean;
  initialText?: string;
}

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading, initialText }) => {
  const [text, setText] = useState<string>(initialText || '');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(text, file);
  };
  
  const removeFile = () => {
    setFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div className="glassmorphic-card rounded-2xl p-6 group relative">
      <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-lg"></div>
      <div className="relative">
        <h2 className="text-xl font-bold text-slate-100 mb-4">Analyze Content for Misinformation</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-36 p-4 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition resize-none text-slate-200 placeholder-slate-400"
            placeholder="Paste text, a URL, or attach a file to analyze..."
          />
          <div className="flex justify-between items-center mt-4">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleAttachClick}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/70 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors font-medium text-sm"
              >
                <PaperclipIcon className="w-5 h-5" />
                Attach File
              </button>
              {file && <div className="text-sm text-slate-400 mt-2">
                  Attached: {file.name}
                  <button type="button" onClick={removeFile} className="ml-2 text-red-400 hover:text-red-500 font-bold">x</button>
              </div>}
            </div>
            <button
              type="submit"
              disabled={isLoading || (!text && !file)}
              className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-full hover:shadow-[0_0_20px_theme(colors.cyan.500/50%)] transition-all duration-300 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed disabled:shadow-none font-semibold shadow-lg transform hover:-translate-y-0.5"
            >
              <AnalyzeIcon className="w-5 h-5"/>
              <span>{isLoading ? 'Analyzing...' : 'Analyze Content'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
