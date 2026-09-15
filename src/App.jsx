import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar.jsx';
import { SummaryCards } from './components/pumbility/SummaryCards.jsx';
import { TitleTracker } from './components/pumbility/TitleTracker.jsx';
import { ScoreTable } from './components/pumbility/ScoreTable.jsx';
import { ScoreModal } from './components/pumbility/ScoreModal.jsx';
import { usePumbility } from './hooks/usePumbility.js';
import { getPiuSonglist } from './services/piuData.js';
import { Info } from 'lucide-react';

export default function App() {
  const {
    scores,
    top50Overall,
    top50Singles,
    top50Doubles,
    totalPumbility,
    singlePumbility,
    doublePumbility,
    averagePumbility,
    overallTier,
    singleTitle,
    doubleTitle,
    addScore,
    updateScore,
    deleteScore,
    clearAll,
    importScores,
    loadSampleScores,
  } = usePumbility();

  const [songlist, setSonglist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScore, setEditingScore] = useState(null);

  useEffect(() => {
    getPiuSonglist().then((data) => {
      if (Array.isArray(data)) {
        setSonglist(data);
      }
    });
  }, []);

  const handleOpenAddModal = () => {
    setEditingScore(null);
    setIsModalOpen(true);
  };

  const handleEditScore = (score) => {
    setEditingScore(score);
    setIsModalOpen(true);
  };

  const handleSaveScore = (scoreData) => {
    if (editingScore) {
      updateScore(editingScore.id, scoreData);
    } else {
      addScore(scoreData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-rose-600/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          scores={scores}
          totalPumbility={totalPumbility}
          tierName={overallTier.current.name}
          onOpenAddModal={handleOpenAddModal}
          onImportScores={importScores}
          onClearAll={clearAll}
          onLoadSamples={loadSampleScores}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-sm">
            <Info className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Phoenix 2 Formula active:</strong>{' '}
              Pumbility is calculated as{' '}
              <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 font-mono">
                (Grade Points + Plate Bonus) × Weight
              </code>
              . Singles are weighted one level higher (<code className="text-rose-300 font-mono">S = D+1</code>), and intermediate values round down to 2 decimals. Your overall rating is determined by your <strong>Top 50</strong> scores!
            </div>
          </div>

          <SummaryCards
            totalPumbility={totalPumbility}
            singlePumbility={singlePumbility}
            doublePumbility={doublePumbility}
            averagePumbility={averagePumbility}
            overallTier={overallTier}
            singleTitle={singleTitle}
            doubleTitle={doubleTitle}
            topCount={top50Overall.length}
          />

          <TitleTracker
            totalPumbility={totalPumbility}
            overallTier={overallTier}
            singlePumbility={singlePumbility}
            singleTitle={singleTitle}
            doublePumbility={doublePumbility}
            doubleTitle={doubleTitle}
          />

          <ScoreTable
            scores={scores}
            top50Overall={top50Overall}
            top50Singles={top50Singles}
            top50Doubles={top50Doubles}
            onEdit={handleEditScore}
            onDelete={deleteScore}
            onOpenAddModal={handleOpenAddModal}
            onLoadSamples={loadSampleScores}
          />
        </main>

        <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              Pump It Up Phoenix 2 Pumbility Calculator & Tracker • Built with React 19, Tailwind CSS v4, and Vite
            </p>
            <p className="text-slate-600 text-[11px]">
              Formula reverse-engineered by the Pump It Up arcade community.
            </p>
          </div>
        </footer>
      </div>

      <ScoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveScore}
        editingScore={editingScore}
        songlist={songlist}
        scores={scores}
      />
    </div>
  );
}
