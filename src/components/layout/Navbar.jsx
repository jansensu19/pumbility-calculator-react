import { useRef } from 'react';
import { Plus, Download, Upload, Trash2, Sparkles, Trophy } from 'lucide-react';
import { exportScoresToCsv, parseScoresCsv } from '../../utils/csvHelper.js';
import piuPadIcon from '../../assets/piupad.svg';

export function Navbar({
  scores,
  totalPumbility,
  tierName,
  onOpenAddModal,
  onImportScores,
  onClearAll,
  onLoadSamples,
}) {
  const fileInputRef = useRef(null);

  const handleExportCsv = () => {
    if (scores.length === 0) {
      alert('No scores to export! Add some scores first.');
      return;
    }
    exportScoresToCsv(scores, `pumbility_phoenix2_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const parsed = parseScoresCsv(text);
        if (parsed.length > 0) {
          const replace = window.confirm(
            `Found ${parsed.length} scores in CSV. Do you want to REPLACE your current list?\n(Click Cancel to MERGE instead)`
          );
          onImportScores(parsed, replace);
        } else {
          alert('Could not parse any valid scores from the CSV file.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearClick = () => {
    if (scores.length === 0) return;
    if (window.confirm('Are you sure you want to clear all scores? This action cannot be undone.')) {
      onClearAll();
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={piuPadIcon}
            alt="Pump It Up"
            className="h-10 w-10 shrink-0 rounded-xl border border-slate-700/80 p-1 shadow-lg shadow-cyan-950/40 ring-1 ring-white/10 bg-slate-950"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight text-white sm:text-lg">
                PUMBILITY
              </h1>
              <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-black text-cyan-400 border border-cyan-500/40">
                PHOENIX 2
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 font-medium">
              Skill & Title Rating Calculator
            </p>
          </div>
        </div>

        {scores.length > 0 && (
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 text-xs">
            <Trophy className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-slate-300 font-semibold">{tierName}</span>
            <span className="text-cyan-400 font-black">
              {totalPumbility.toFixed(2)} PB
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
          />

          {scores.length === 0 && (
            <button
              onClick={onLoadSamples}
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              title="Load demo scores"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Demo Data
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            title="Import scores from CSV"
          >
            <Upload className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden md:inline">Import</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            title="Export scores to CSV"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden md:inline">Export CSV</span>
          </button>

          {scores.length > 0 && (
            <button
              onClick={handleClearClick}
              className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-900 transition-all"
              title="Clear all scores"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-1.5 text-xs font-black text-slate-950 shadow-md shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            <span>Add Score</span>
          </button>
        </div>
      </div>
    </header>
  );
}

