import React from 'react';
import { Loader2, Sparkles, Brain } from 'lucide-react';

export default function Loader() {
  return (
    <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-6 animate-pulse relative overflow-hidden border border-indigo-500/20">
      {/* Laser scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent h-1/2 w-full animate-[bounce_3s_infinite]" />

      <div className="relative">
        <div className="p-4 bg-indigo-500/10 rounded-full border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <Brain className="w-8 h-8 animate-bounce" />
        </div>
        <div className="absolute top-0 right-0 p-1 bg-purple-500/20 rounded-full text-purple-300">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
        </div>
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="text-lg font-semibold text-white flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
          <span>Analyzing Content</span>
        </h3>
        <p className="text-sm text-gray-400 font-light">
          AI is organizing your notes, extracting core educational takeaways, and mapping action items...
        </p>
      </div>
    </div>
  );
}
