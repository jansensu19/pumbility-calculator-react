import { useState, useMemo } from 'react';
import { PlateBadge, GradeBadge, ChartTypeBadge } from './PlateBadge.jsx';
import { Search, Edit2, Trash2, ArrowUpDown, Sparkles } from 'lucide-react';

export function ScoreTable({
  scores,
  top50Overall,
  top50Singles,
  top50Doubles,
  onEdit,
  onDelete,
  onOpenAddModal,
  onLoadSamples,
}) {
  const [activeTab, setActiveTab] = useState('top50'); // 'top50' | 'singles' | 'doubles' | 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('pumbility-desc'); // 'pumbility-desc' | 'level-desc' | 'date-desc'

  const activeDataset = useMemo(() => {
    switch (activeTab) {
      case 'singles':
        return top50Singles;
      case 'doubles':
        return top50Doubles;
      case 'all':
        return scores;
      case 'top50':
      default:
        return top50Overall;
    }
  }, [activeTab, top50Overall, top50Singles, top50Doubles, scores]);

  const filteredScores = useMemo(() => {
    let list = [...activeDataset];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.songName.toLowerCase().includes(q) ||
          `${s.type === 'single' ? 's' : 'd'}${s.level}`.includes(q)
      );
    }

    if (sortBy === 'level-desc') {
      list.sort((a, b) => b.level - a.level || b.pumbility - a.pumbility);
    } else if (sortBy === 'date-desc') {
      list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    } else {
      list.sort((a, b) => b.pumbility - a.pumbility);
    }

    return list;
  }, [activeDataset, searchQuery, sortBy]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800/80">
          <button
            onClick={() => setActiveTab('top50')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'top50'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Top 50 Overall ({top50Overall.length})
          </button>
          <button
            onClick={() => setActiveTab('singles')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'singles'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Top 50 Singles ({top50Singles.length})
          </button>
          <button
            onClick={() => setActiveTab('doubles')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'doubles'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Top 50 Doubles ({top50Doubles.length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Saved ({scores.length})
          </button>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <input
              type="text"
              placeholder="Filter songs or charts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 pl-8 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
          </div>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs font-semibold text-slate-300 focus:border-cyan-500 focus:outline-none"
            >
              <option value="pumbility-desc">Pumbility (High)</option>
              <option value="level-desc">Chart Level (High)</option>
              <option value="date-desc">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {filteredScores.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-slate-400 text-sm font-medium">No scores found in this category.</p>
          <p className="text-slate-500 text-xs mt-1">Add your first chart score or load demo data to get started!</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 hover:brightness-110"
            >
              + Add Chart Score
            </button>
            <button
              onClick={onLoadSamples}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Load Sample Data
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold tracking-wider uppercase">
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-3 w-20">Chart</th>
                <th className="py-3 px-4">Song Name</th>
                <th className="py-3 px-3 text-center">Grade</th>
                <th className="py-3 px-3 text-center">Plate</th>
                <th className="py-3 px-3 text-right">Score</th>
                <th className="py-3 px-4 text-right font-black">Pumbility</th>
                <th className="py-3 px-3 text-center w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredScores.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="py-3 px-3 text-center font-bold text-slate-500 group-hover:text-cyan-400">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-3">
                    <ChartTypeBadge type={item.type} level={item.level} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-200">
                    {item.songName}
                    {item.date && (
                      <span className="block text-[10px] font-normal text-slate-500">
                        {item.date}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <GradeBadge grade={item.grade} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <PlateBadge plate={item.plate} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-400">
                    {item.score ? item.score.toLocaleString() : '—'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-sm font-black text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">
                      {item.pumbility.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold ml-1">PB</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={() => onEdit(item)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                        title="Edit score"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors"
                        title="Delete score"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
