export function PlateBadge({ plate, size = 'md' }) {
  const p = (plate || 'RG').toUpperCase();

  const styles = {
    PG: 'bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 text-slate-950 font-black shadow-amber-500/40 shadow-sm border-amber-300',
    UG: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black shadow-cyan-500/40 shadow-sm border-cyan-300',
    EG: 'bg-gradient-to-r from-emerald-400 to-teal-600 text-slate-950 font-extrabold border-emerald-300',
    SG: 'bg-gradient-to-r from-violet-500 to-purple-700 text-white font-bold border-purple-400',
    MG: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold border-orange-400',
    TG: 'bg-slate-700 text-slate-200 border-slate-600',
    FG: 'bg-slate-800 text-slate-400 border-slate-700',
    RG: 'bg-slate-900 text-slate-500 border-slate-800',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 rounded',
    md: 'text-xs px-2.5 py-1 rounded-md',
    lg: 'text-sm px-3 py-1.5 rounded-lg',
  };

  return (
    <span
      className={`inline-flex items-center justify-center tracking-wider border transition-all ${
        styles[p] || styles.RG
      } ${sizeClasses[size] || sizeClasses.md}`}
      title={p}
    >
      {p}
    </span>
  );
}

export function GradeBadge({ grade, size = 'md' }) {
  const g = grade || 'SSS+';

  const styles = {
    'SSS+': 'text-amber-400 font-black drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    'SSS': 'text-amber-300 font-extrabold',
    'SS+': 'text-yellow-400 font-extrabold',
    'SS': 'text-yellow-300 font-bold',
    'S+': 'text-emerald-400 font-bold',
    'S': 'text-emerald-300 font-semibold',
    'AAA+': 'text-cyan-400 font-semibold',
    'AAA': 'text-cyan-300',
    'AA+': 'text-blue-400',
    'AA': 'text-blue-300',
    'A+': 'text-indigo-400',
    'A': 'text-slate-300',
    'B': 'text-slate-400',
    'C': 'text-slate-500',
    'D': 'text-red-400',
    'F': 'text-red-600',
  };

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-bold',
    xl: 'text-xl font-black',
  };

  return (
    <span className={`tracking-wide ${styles[g] || 'text-slate-300'} ${sizeClasses[size] || sizeClasses.md}`}>
      {g}
    </span>
  );
}

export function ChartTypeBadge({ type, level, size = 'md' }) {
  const isSingle = (type || 'single').toLowerCase().startsWith('s');
  const label = `${isSingle ? 'S' : 'D'}${level}`;

  const bgStyle = isSingle
    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-950/40'
    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span className={`inline-flex items-center font-black tracking-wider rounded-md border shadow-sm ${bgStyle} ${sizeClasses[size] || sizeClasses.md}`}>
      {label}
    </span>
  );
}
