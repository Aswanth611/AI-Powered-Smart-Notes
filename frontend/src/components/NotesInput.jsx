import React from 'react';
import { Trash2, Brain, Loader2 } from 'lucide-react';

export default function NotesInput({ text, onChange, onClear, onAnalyze, loading }) {
  const charCount = text.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-white/15">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-400" />
          <span>Raw Study Material</span>
        </h2>
        <span className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
          {charCount.toLocaleString()} characters
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste your lecture notes, transcript, or chapter content here..."
            disabled={loading}
            className="w-full min-h-[300px] glass-input rounded-xl p-4 text-sm md:text-base resize-y leading-relaxed"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          {text && (
            <button
              type="button"
              onClick={onClear}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Notes</span>
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white gradient-btn rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Notes...</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                <span>Analyze Notes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
