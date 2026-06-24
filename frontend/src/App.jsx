import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import NotesInput from './components/NotesInput';
import SummaryList from './components/SummaryList';
import ActionList from './components/ActionList';
import Loader from './components/Loader';
import ErrorAlert from './components/ErrorAlert';
import { BookOpen, Sparkles, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [notesText, setNotesText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [completedMap, setCompletedMap] = useState({});

  // Reset completion checklist whenever new results are received
  useEffect(() => {
    if (result) {
      setCompletedMap({});
    }
  }, [result]);

  const handleClear = () => {
    setNotesText('');
    setResult(null);
    setError(null);
    setCompletedMap({});
  };

  const handleToggleActionItem = (index) => {
    setCompletedMap((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleAnalyze = async () => {
    const trimmedText = notesText.trim();
    
    // 1. Empty input validation
    if (!trimmedText) {
      setError('Please enter your notes before analyzing.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Send request to Express backend
      const response = await axios.post('http://localhost:5000/api/analyze', {
        text: trimmedText
      });

      if (response.data) {
        setResult(response.data);
      } else {
        // 2. Invalid API Response
        setError('AI returned invalid data.');
      }
    } catch (err) {
      console.error('API Error:', err);
      // 3. Network or server error
      const backendError = err.response?.data?.error;
      setError(backendError || 'Unable to analyze notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill some default demo content for user convenience
  const loadDemoNotes = () => {
    setNotesText(
      "Photosynthesis is the process where plants convert sunlight into chemical energy. " +
      "Chlorophyll absorbs light energy from the sun. " +
      "Carbon dioxide combines with water to produce glucose and oxygen. " +
      "The light-dependent reactions happen in the thylakoid membrane and release oxygen. " +
      "The light-independent reactions, or Calvin Cycle, happen in the stroma to build sugar molecules. " +
      "Students should review the chemical equation for photosynthesis and draw the chloroplast diagram. " +
      "Be prepared to explain the difference between C3 and C4 pathway adaptations in the next exam. " +
      "Memorize the key inputs and outputs of glycolysis vs photosynthesis."
    );
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        <Header />

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6">
            <ErrorAlert message={error} onClose={() => setError(null)} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SECTION: Input Notes */}
          <div className="lg:col-span-5 space-y-6">
            <NotesInput
              text={notesText}
              onChange={setNotesText}
              onClear={handleClear}
              onAnalyze={handleAnalyze}
              loading={loading}
            />

            {/* Quick Demo Pre-fill Card */}
            {!result && !loading && (
              <div className="glass-panel rounded-2xl p-5 border-dashed border-white/10 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Need sample notes?</h4>
                  <p className="text-xs text-gray-400 font-light">Load biology notes to test the analyzer immediately.</p>
                </div>
                <button
                  onClick={loadDemoNotes}
                  className="text-xs font-semibold px-3.5 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 text-indigo-300 rounded-lg transition-all"
                >
                  Load Sample
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SECTION: Loader / Placeholder / Output Dashboard */}
          <div className="lg:col-span-7">
            {loading && <Loader />}

            {!loading && !result && (
              <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[400px] border-dashed border-white/10">
                <div className="p-4 bg-indigo-500/5 rounded-full border border-white/5 text-indigo-400/60">
                  <FileText className="w-10 h-10" />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-lg font-semibold text-white">No active study materials</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Paste your raw lecture notes or video transcripts on the left and click <strong className="text-indigo-300">Analyze Notes</strong> to synthesize summaries and checkable action tasks.
                  </p>
                </div>
              </div>
            )}

            {!loading && result && (
              <div className="space-y-8 animate-fade-in">
                {/* Visual Dashboard Stats Card */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-panel rounded-xl p-4 flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Concepts Synthesized</p>
                      <h5 className="text-lg font-bold text-white">{result.summary?.length || 0} Points</h5>
                    </div>
                  </div>

                  <div className="glass-panel rounded-xl p-4 flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                      <Award className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tasks Formulated</p>
                      <h5 className="text-lg font-bold text-white">{result.actionItems?.length || 0} Actionable</h5>
                    </div>
                  </div>
                </div>

                {/* Left/Top outputs: Summaries */}
                <SummaryList summaries={result.summary} />

                {/* Right/Bottom outputs: Action checklist */}
                <ActionList
                  actionItems={result.actionItems}
                  completedMap={completedMap}
                  onToggle={handleToggleActionItem}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="mt-16 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} EduFlick AI. All rights reserved. Created for Smart Notes Analyzing workflows.</p>
      </footer>
    </div>
  );
}
