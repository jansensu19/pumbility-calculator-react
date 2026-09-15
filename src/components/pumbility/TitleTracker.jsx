import { useState } from 'react';
import { OVERALL_TIERS, SINGLE_TITLES, DOUBLE_TITLES } from '../../data/titlesData.js';
import { ChevronDown, ChevronUp, Shield, Zap, Award } from 'lucide-react';

export function TitleTracker({
  totalPumbility,
  overallTier,
  singlePumbility = 0,
  singleTitle,
  doublePumbility = 0,
  doubleTitle,
}) {
  const [activeTab, setActiveTab] = useState('overall'); // 'overall' | 'single' | 'double'
  const [isExpanded, setIsExpanded] = useState(false);

  const overallMilestones = [
    { name: 'Bronze', threshold: 0 },
    { name: 'Silver', threshold: 10000 },
    { name: 'Gold', threshold: 13000 },
    { name: 'Platinum', threshold: 15000 },
    { name: 'Diamond', threshold: 17000 },
    { name: 'Red Beryl', threshold: 18000 },
    { name: 'Alexandrite', threshold: 19000 },
    { name: 'Abyss Absolute', threshold: 20000 },
  ];

  const singleMilestones = [
    { name: 'Intermediate', threshold: 5000, desc: 'Lv.1 - 10' },
    { name: 'Advanced', threshold: 15000, desc: 'Lv.1 - 10' },
    { name: 'Expert', threshold: 17500, desc: 'Lv.1 - 10' },
    { name: 'The Master', threshold: 19000, desc: 'Peak Mastery' },
  ];

  const doubleMilestones = [
    { name: 'Intermediate', threshold: 5000, desc: 'Lv.1 - 10' },
    { name: 'Advanced', threshold: 15000, desc: 'Lv.1 - 10' },
    { name: 'Expert', threshold: 17500, desc: 'Lv.1 - 10' },
    { name: 'The Master', threshold: 19000, desc: 'Peak Mastery' },
  ];

  const currentScore =
    activeTab === 'overall'
      ? totalPumbility
      : activeTab === 'single'
      ? singlePumbility
      : doublePumbility;

  const currentTitleObj =
    activeTab === 'overall'
      ? overallTier
      : activeTab === 'single'
      ? singleTitle
      : doubleTitle;

  const currentList =
    activeTab === 'overall'
      ? OVERALL_TIERS
      : activeTab === 'single'
      ? SINGLE_TITLES
      : DOUBLE_TITLES;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {activeTab === 'overall' ? (
            <Shield className="h-4 w-4 text-cyan-400" />
          ) : activeTab === 'single' ? (
            <Zap className="h-4 w-4 text-rose-400" />
          ) : (
            <Award className="h-4 w-4 text-emerald-400" />
          )}
          <h3 className="text-sm font-bold text-white tracking-wide">
            Title & Rank Ladders
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('overall')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              activeTab === 'overall'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overall Gem Tiers
          </button>
          <button
            onClick={() => setActiveTab('single')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              activeTab === 'single'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            [S] Single Titles
          </button>
          <button
            onClick={() => setActiveTab('double')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              activeTab === 'double'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            [D] Double Titles
          </button>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors self-end sm:self-auto"
        >
          <span>{isExpanded ? 'Hide Details' : 'View All Levels'}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'overall' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {overallMilestones.map((m) => {
              const reached = currentScore >= m.threshold;
              const isCurrent = currentTitleObj?.current?.name?.startsWith(m.name);

              return (
                <div
                  key={m.name}
                  className={`rounded-xl p-2.5 text-center border transition-all ${
                    isCurrent
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-md shadow-cyan-950 ring-1 ring-cyan-400/50'
                      : reached
                      ? 'border-slate-700 bg-slate-800/40 text-slate-200'
                      : 'border-slate-800/60 bg-slate-950/40 text-slate-600'
                  }`}
                >
                  <div className="text-[11px] font-black uppercase tracking-wider truncate">
                    {m.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {m.threshold.toLocaleString()}
                  </div>
                  {isCurrent && (
                    <span className="inline-block mt-1 text-[9px] font-bold text-cyan-300 bg-cyan-950/80 px-1 rounded">
                      CURRENT
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {(activeTab === 'single' || activeTab === 'double') && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(activeTab === 'single' ? singleMilestones : doubleMilestones).map((m) => {
              const reached = currentScore >= m.threshold;
              const isCurrent = currentTitleObj?.current?.name?.includes(m.name);

              return (
                <div
                  key={m.name}
                  className={`rounded-xl p-3 text-center border transition-all ${
                    isCurrent
                      ? activeTab === 'single'
                        ? 'border-rose-400 bg-rose-500/20 text-rose-300 shadow-md shadow-rose-950 ring-1 ring-rose-400/50'
                        : 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-md shadow-emerald-950 ring-1 ring-emerald-400/50'
                      : reached
                      ? 'border-slate-700 bg-slate-800/40 text-slate-200'
                      : 'border-slate-800/60 bg-slate-950/40 text-slate-600'
                  }`}
                >
                  <div className="text-xs font-black uppercase tracking-wider">
                    {m.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {m.threshold.toLocaleString()} PB
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {m.desc}
                  </div>
                  {isCurrent && (
                    <span className={`inline-block mt-1.5 text-[9px] font-black px-1.5 py-0.5 rounded ${
                      activeTab === 'single' ? 'bg-rose-950/90 text-rose-300' : 'bg-emerald-950/90 text-emerald-300'
                    }`}>
                      ACTIVE ({currentTitleObj.current.name})
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="mt-5 border-t border-slate-800 pt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-3">Title / Level</th>
                <th className="py-2 px-3 text-right">Min Threshold</th>
                <th className="py-2 px-3 text-right">Progress Needed</th>
                <th className="py-2 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {currentList.map((tier) => {
                const reached = currentScore >= tier.threshold;
                const isCurrent = currentTitleObj?.current?.name === tier.name;
                const diff = (tier.threshold - currentScore).toFixed(2);

                return (
                  <tr
                    key={tier.name}
                    className={
                      isCurrent
                        ? activeTab === 'single'
                          ? 'bg-rose-500/10 font-bold'
                          : activeTab === 'double'
                          ? 'bg-emerald-500/10 font-bold'
                          : 'bg-cyan-500/10 font-bold'
                        : ''
                    }
                  >
                    <td className="py-2 px-3 text-slate-200">
                      {tier.name}
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-slate-300">
                      {tier.threshold.toLocaleString()} PB
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-slate-400">
                      {isCurrent ? (
                        <span className={activeTab === 'single' ? 'text-rose-400' : activeTab === 'double' ? 'text-emerald-400' : 'text-cyan-400'}>
                          Current ({currentScore.toFixed(2)} PB)
                        </span>
                      ) : reached ? (
                        <span className="text-emerald-400">Achieved</span>
                      ) : (
                        `+${diff} PB`
                      )}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {isCurrent ? (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          activeTab === 'single'
                            ? 'bg-rose-500 text-white'
                            : activeTab === 'double'
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-cyan-500 text-slate-950'
                        }`}>
                          ACTIVE
                        </span>
                      ) : reached ? (
                        <span className="text-emerald-400 text-xs font-bold">✓ Cleared</span>
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
