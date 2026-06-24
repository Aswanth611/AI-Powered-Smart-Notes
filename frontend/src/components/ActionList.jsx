import React from 'react';
import { ListTodo, CheckSquare, Square, ClipboardCheck } from 'lucide-react';

export default function ActionList({ actionItems = [], completedMap = {}, onToggle }) {
  if (!actionItems || actionItems.length === 0) return null;

  const total = actionItems.length;
  const completed = Object.values(completedMap).filter(Boolean).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-white/15 animate-fade-in delay-1">
      {/* Header section with checklist icon */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
            <ListTodo className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-semibold text-white">Action Items</h2>
        </div>
        <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
          {completed}/{total} Tasks
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="mb-6 bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          <span className="flex items-center gap-1.5 font-medium">
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
            Study Progression
          </span>
          <span className="font-bold text-white">{percentage}% Done</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {actionItems.map((item, index) => {
          const isDone = !!completedMap[index];
          return (
            <label
              key={index}
              onClick={() => onToggle(index)}
              className={`flex items-start gap-3.5 p-3.5 bg-white/[0.02] border border-white/[0.04] rounded-xl cursor-pointer hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200 select-none ${
                isDone ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0 transition-transform duration-150 active:scale-95">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
                ) : (
                  <Square className="w-5 h-5 text-gray-500 hover:text-indigo-400" />
                )}
              </div>
              <span
                className={`text-sm md:text-base text-gray-300 leading-relaxed font-light transition-all duration-300 ${
                  isDone ? 'line-through text-gray-500 decoration-indigo-400/60 decoration-2' : ''
                }`}
              >
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
