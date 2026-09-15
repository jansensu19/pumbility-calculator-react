import { useState, useMemo } from 'react';
import { Modal } from '../ui/Modal.jsx';
import {
  calculatePumbility,
  GRADE_POINTS,
  PLATE_BONUSES,
  getGradeFromScore,
} from '../../utils/pumbilityCalc.js';
import { searchSongs, extractSongCharts } from '../../services/piuData.js';
import { Search, Calculator, Sparkles, AlertTriangle } from 'lucide-react';

function ScoreForm({ editingScore, songlist, scores, onSave, onClose }) {
  const [songQuery, setSongQuery] = useState(() => editingScore?.songName || '');
  const [selectedSong, setSelectedSong] = useState(null);
  const [type, setType] = useState(() => editingScore?.type || 'single');
  const [level, setLevel] = useState(() => editingScore?.level || 20);
  const [grade, setGrade] = useState(() => editingScore?.grade || 'SSS+');
  const [plate, setPlate] = useState(() => editingScore?.plate || 'PG');
  const [rawScore, setRawScore] = useState(() => editingScore?.score ? String(editingScore.score) : '');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!songQuery.trim() || selectedSong) return [];
    return searchSongs(songQuery, songlist).slice(0, 6);
  }, [songQuery, songlist, selectedSong]);

  const resolvedSong = useMemo(() => {
    if (selectedSong) return selectedSong;
    if (!songQuery.trim()) return null;
    const clean = songQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
    return songlist.find(s => (s.songName || '').toLowerCase().replace(/[^a-z0-9]/g, '') === clean) || null;
  }, [selectedSong, songQuery, songlist]);

  const availableCharts = useMemo(() => {
    return extractSongCharts(resolvedSong);
  }, [resolvedSong]);

  const preview = useMemo(() => {
    return calculatePumbility({
      type,
      level,
      grade,
      plate,
      score: rawScore ? parseInt(rawScore, 10) : undefined,
    });
  }, [type, level, grade, plate, rawScore]);

  const existingScore = useMemo(() => {
    const qSong = songQuery.trim();
    if (!qSong) return null;
    const norm = qSong.toLowerCase().replace(/[^a-z0-9]/g, '');
    return (scores || []).find(
      s => (!editingScore || s.id !== editingScore.id) &&
           (s.songName || '').toLowerCase().replace(/[^a-z0-9]/g, '') === norm &&
           s.type === type &&
           Number(s.level) === Number(level)
    ) || null;
  }, [songQuery, type, level, scores, editingScore]);

  const isExactDuplicate = useMemo(() => {
    if (!existingScore) return false;
    return (
      existingScore.grade === grade &&
      existingScore.plate === plate &&
      Number(existingScore.score || 0) === Number(rawScore || 0)
    );
  }, [existingScore, grade, plate, rawScore]);

  const handleScoreChange = (val) => {
    setRawScore(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setGrade(getGradeFromScore(num));
    }
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setSongQuery(song.songName);
    setShowSuggestions(false);

    const charts = extractSongCharts(song);
    if (charts.length > 0) {
      const matchExisting = charts.find(c => c.type === type && c.level === Number(level));
      if (!matchExisting) {
        setType(charts[0].type);
        setLevel(charts[0].level);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isExactDuplicate) return;
    onSave({
      songName: songQuery.trim() || 'Custom Song',
      type,
      level: Number(level),
      grade,
      plate,
      score: rawScore ? parseInt(rawScore, 10) : null,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Song Title
        </label>
        <div className="relative">
          <input
            type="text"
            required
            placeholder="Search PIU song title..."
            value={songQuery}
            onChange={(e) => {
              setSongQuery(e.target.value);
              setSelectedSong(null);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-slate-700 bg-slate-950 py-1.5 shadow-xl">
            {suggestions.map((s) => (
              <button
                type="button"
                key={s.songID || s.songName}
                onClick={() => handleSelectSong(s)}
                className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-800 hover:text-white flex items-center justify-between gap-2"
              >
                <div className="truncate">
                  <div className="font-semibold text-white truncate">{s.songName}</div>
                  <div className="text-[11px] text-slate-400 truncate">{s.artist}</div>
                </div>
                <div className="text-[10px] text-cyan-400 font-mono shrink-0">
                  {(s.chartList || []).filter(c => c.level >= 10).slice(0, 3).map(c => (c.chartType === 'double' ? 'D' : 'S') + c.level).join(' ')}
                  {(s.chartList || []).filter(c => c.level >= 10).length > 3 ? '...' : ''}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {availableCharts.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Available Charts
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableCharts.map((c) => (
              <button
                type="button"
                key={`${c.type}-${c.level}`}
                onClick={() => {
                  setType(c.type);
                  setLevel(c.level);
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  type === c.type && level === c.level
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('single')}
              className={`rounded-xl py-2 text-xs font-black tracking-wider transition-all border ${
                type === 'single'
                  ? 'border-rose-500 bg-rose-500/20 text-rose-300 shadow-md shadow-rose-950/50'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              SINGLE (S)
            </button>
            <button
              type="button"
              onClick={() => setType('double')}
              className={`rounded-xl py-2 text-xs font-black tracking-wider transition-all border ${
                type === 'double'
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md shadow-emerald-950/50'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              DOUBLE (D)
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Level (10 - 28)
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-bold text-white focus:border-cyan-500 focus:outline-none"
          >
            {Array.from({ length: 19 }, (_, i) => i + 10).map((lvl) => (
              <option key={lvl} value={lvl}>
                Level {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Grade
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-bold text-white focus:border-cyan-500 focus:outline-none"
          >
            {Object.keys(GRADE_POINTS).map((g) => (
              <option key={g} value={g}>
                {g} ({GRADE_POINTS[g]} pts)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Clear Plate
          </label>
          <select
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-bold text-white focus:border-cyan-500 focus:outline-none"
          >
            {Object.keys(PLATE_BONUSES).map((p) => {
              const bonus = type === 'single' ? PLATE_BONUSES[p].single : PLATE_BONUSES[p].double;
              return (
                <option key={p} value={p}>
                  {p} (+{bonus.toFixed(2)}) - {PLATE_BONUSES[p].name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">
          Exact In-Game Score (Optional)
        </label>
        <input
          type="number"
          min="0"
          max="1000000"
          placeholder="e.g. 995400 (auto-updates grade)"
          value={rawScore}
          onChange={(e) => handleScoreChange(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      {existingScore && (
        <div className={`rounded-xl border p-3 text-xs flex items-start gap-2.5 transition-all ${
          isExactDuplicate
            ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
            : preview.pumbility > existingScore.pumbility
            ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
            : 'border-slate-700 bg-slate-900/60 text-slate-300'
        }`}>
          <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${
            isExactDuplicate ? 'text-amber-400' : 'text-cyan-400'
          }`} />
          <div className="leading-relaxed">
            {isExactDuplicate ? (
              <>
                <strong className="text-amber-200">Duplicate Score Detected:</strong> You already have this exact chart recorded with <strong>{existingScore.grade} ({existingScore.plate}) • {existingScore.pumbility.toFixed(2)} PB</strong>. Duplicate chart plays cannot be added.
              </>
            ) : preview.pumbility > existingScore.pumbility ? (
              <>
                <strong className="text-cyan-200">Personal Best Update:</strong> Existing record is <strong>{existingScore.grade} ({existingScore.plate}) • {existingScore.pumbility.toFixed(2)} PB</strong>. Saving will update your record to <strong>{preview.grade} ({preview.plate}) • {preview.pumbility.toFixed(2)} PB</strong> (+{(preview.pumbility - existingScore.pumbility).toFixed(2)} PB).
              </>
            ) : (
              <>
                <strong className="text-slate-200">Existing Chart Found:</strong> Your current record is <strong>{existingScore.grade} ({existingScore.plate}) • {existingScore.pumbility.toFixed(2)} PB</strong>. Saving will update your record for this chart.
              </>
            )}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-r from-slate-950 to-cyan-950/30 p-3.5 shadow-inner">
        <div className="flex items-center justify-between text-xs text-cyan-300 font-semibold mb-2">
          <span className="flex items-center gap-1.5">
            <Calculator className="h-3.5 w-3.5" /> Phoenix 2 Calculation
          </span>
          <span className="text-[11px] text-slate-400">
            Weight: {preview.weight.toFixed(2)}x {type === 'single' ? '(S = D+1)' : ''}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-300">
          <div>
            <span>({preview.gradePoints} + {preview.plateBonus.toFixed(2)}) × {preview.weight.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
              {preview.pumbility.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-cyan-300 ml-1">PB</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isExactDuplicate}
          className={`rounded-xl px-5 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
            isExactDuplicate
              ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/30 hover:brightness-110 active:scale-95'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {isExactDuplicate
            ? 'Already in Records'
            : existingScore
            ? 'Update Record'
            : editingScore
            ? 'Update Score'
            : 'Save Score'}
        </button>
      </div>
    </form>
  );
}

export function ScoreModal({ isOpen, onClose, onSave, editingScore, songlist, scores }) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingScore ? 'Edit Chart Score' : 'Add Chart Score'}
    >
      <ScoreForm
        key={editingScore ? editingScore.id : 'new'}
        editingScore={editingScore}
        songlist={songlist}
        scores={scores}
        onSave={onSave}
        onClose={onClose}
      />
    </Modal>
  );
}
