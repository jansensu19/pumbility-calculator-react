import { Trophy, Zap, Award } from 'lucide-react';

export function SummaryCards({
  totalPumbility,
  singlePumbility,
  doublePumbility,
  averagePumbility,
  overallTier,
  singleTitle,
  doubleTitle,
  topCount,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-linear-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-5 shadow-xl shadow-cyan-950/20">
        <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
            <Trophy className="h-4 w-4" /> Top 50 Pumbility
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border tracking-wider ${overallTier.current.bg} ${overallTier.current.color}`}>
            {overallTier.current.badge}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            {totalPumbility.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm font-semibold text-cyan-300/70">PB</span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Next: <strong className="text-slate-200">{overallTier.next ? overallTier.next.name : 'Max Tier'}</strong></span>
            <span>{overallTier.next ? `+${overallTier.needed.toFixed(2)} PB` : 'Completed'}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${overallTier.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Top 50 filled: <strong className="text-cyan-300">{topCount}/50</strong></span>
          <span>Avg: <strong className="text-cyan-300">{averagePumbility.toFixed(2)}</strong> PB</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-rose-500/30 bg-linear-to-br from-slate-900 via-slate-900 to-rose-950/30 p-5 shadow-xl shadow-rose-950/20">
        <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-rose-400 uppercase flex items-center gap-1.5">
            <Zap className="h-4 w-4" /> Single Title
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black border border-rose-500/40 bg-rose-500/20 text-rose-300 tracking-wider">
            {singleTitle.current.name}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight text-white">
            {singlePumbility.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm font-semibold text-rose-300/70">PB</span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Next: <strong className="text-slate-200">{singleTitle.next ? singleTitle.next.name : 'Max Title'}</strong></span>
            <span>{singleTitle.next ? `+${singleTitle.needed.toFixed(2)} PB` : '100%'}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-rose-500 to-pink-500 transition-all duration-500"
              style={{ width: `${singleTitle.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Formula Scale: <strong className="text-rose-300">Level + 1</strong></span>
          <span>Pivot: <strong className="text-rose-300">S23 = D24</strong></span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-linear-to-r from-slate-900 via-slate-900 to-emerald-950/30 p-5 shadow-xl shadow-emerald-950/20">
        <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase flex items-center gap-1.5">
            <Award className="h-4 w-4" /> Double Title
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 tracking-wider">
            {doubleTitle.current.name}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight text-white">
            {doublePumbility.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm font-semibold text-emerald-300/70">PB</span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Next: <strong className="text-slate-200">{doubleTitle.next ? doubleTitle.next.name : 'Max Title'}</strong></span>
            <span>{doubleTitle.next ? `+${doubleTitle.needed.toFixed(2)} PB` : '100%'}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${doubleTitle.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Formula Scale: <strong className="text-emerald-300">Level Direct</strong></span>
          <span>Pivot: <strong className="text-emerald-300">D24 = 1.00</strong></span>
        </div>
      </div>
    </div>
  );
}
