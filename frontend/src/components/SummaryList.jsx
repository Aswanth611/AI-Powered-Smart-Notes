import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function SummaryList({ summaries = [] }) {
  if (!summaries || summaries.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-white/15 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-semibold text-white">Key Summaries</h2>
      </div>

      <div className="space-y-4">
        {summaries.map((point, index) => (
          <div
            key={index}
            className="flex items-start gap-3.5 p-3.5 bg-white/[0.02] border border-white/[0.04] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200"
          >
            <div className="text-emerald-400 flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
