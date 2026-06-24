import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ErrorAlert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="glass-panel border-red-500/30 bg-red-950/20 rounded-xl p-4 flex items-start gap-3.5 animate-fade-in">
      <div className="text-red-400 mt-0.5 flex-shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-red-200">Analysis Error</h4>
        <p className="text-xs md:text-sm text-red-300/80 mt-1 font-light leading-relaxed">
          {message}
        </p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-200 p-1 hover:bg-white/5 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
