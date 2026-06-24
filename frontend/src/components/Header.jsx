import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full mb-8 relative">
      {/* Decorative backdrop glow */}
      <div className="absolute top-[-50px] left-[10%] w-[300px] h-[100px] bg-indigo-500/10 rounded-full blur-[80px]" />
      <div className="absolute top-[-50px] right-[15%] w-[200px] h-[80px] bg-purple-500/10 rounded-full blur-[60px]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 text-white flex items-center justify-center">
            <BookOpen className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                EduFlick AI
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1">
              AI Smart Notes <span className="gradient-text">Analyzer</span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-1 font-light">
              Transform your messy notes, lecture transcripts, or study chapters into structured materials instantly.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Powered by Groq LLM API</span>
        </div>
      </div>
    </header>
  );
}
