/**
 * Pump It Up Phoenix 2 - Title System & Rank Definitions
 * 
 * Overall Gem Tiers:
 * Bronze -> Silver -> Gold -> Platinum -> Diamond (1-5) -> Red Beryl (1-5) -> Alexandrite (1-5) -> Abyss Absolute
 * 
 * Single [S] & Double [D] Titles:
 * Intermediate (Lv.1 - Lv.10: 5,000 - 14,000, step 1,000)
 * Advanced (Lv.1 - Lv.10: 15,000 - 17,250, step 250)
 * Expert (Lv.1 - Lv.10: 17,500 - 18,900, Lv.1-6 step 200, Lv.6-10 step 100)
 * The Master (19,000)
 */

export const OVERALL_TIERS = [
  { name: 'Bronze', threshold: 0, color: 'text-amber-700', bg: 'bg-amber-900/20 border-amber-800/40', badge: 'BRONZE' },
  { name: 'Silver', threshold: 10000, color: 'text-slate-300', bg: 'bg-slate-500/20 border-slate-400/40', badge: 'SILVER' },
  { name: 'Gold', threshold: 13000, color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-400/40', badge: 'GOLD' },
  { name: 'Platinum', threshold: 15000, color: 'text-cyan-300', bg: 'bg-cyan-500/20 border-cyan-400/40', badge: 'PLATINUM' },
  
  // Diamond (1-5)
  { name: 'Diamond 1', threshold: 17000, color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-400/40', badge: 'DIAMOND I' },
  { name: 'Diamond 2', threshold: 17200, color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-400/40', badge: 'DIAMOND II' },
  { name: 'Diamond 3', threshold: 17400, color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-400/40', badge: 'DIAMOND III' },
  { name: 'Diamond 4', threshold: 17600, color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-400/40', badge: 'DIAMOND IV' },
  { name: 'Diamond 5', threshold: 17800, color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-400/40', badge: 'DIAMOND V' },

  // Red Beryl (1-5)
  { name: 'Red Beryl 1', threshold: 18000, color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-400/40', badge: 'RED BERYL I' },
  { name: 'Red Beryl 2', threshold: 18200, color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-400/40', badge: 'RED BERYL II' },
  { name: 'Red Beryl 3', threshold: 18400, color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-400/40', badge: 'RED BERYL III' },
  { name: 'Red Beryl 4', threshold: 18600, color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-400/40', badge: 'RED BERYL IV' },
  { name: 'Red Beryl 5', threshold: 18800, color: 'text-rose-400', bg: 'bg-rose-500/20 border-rose-400/40', badge: 'RED BERYL V' },

  // Alexandrite (1-5)
  { name: 'Alexandrite 1', threshold: 19000, color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-400/40', badge: 'ALEXANDRITE I' },
  { name: 'Alexandrite 2', threshold: 19200, color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-400/40', badge: 'ALEXANDRITE II' },
  { name: 'Alexandrite 3', threshold: 19400, color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-400/40', badge: 'ALEXANDRITE III' },
  { name: 'Alexandrite 4', threshold: 19600, color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-400/40', badge: 'ALEXANDRITE IV' },
  { name: 'Alexandrite 5', threshold: 19800, color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-400/40', badge: 'ALEXANDRITE V' },

  // Abyss Absolute
  { name: 'Abyss Absolute', threshold: 20000, color: 'text-purple-300 font-extrabold shadow-purple-500/50', bg: 'bg-purple-950/40 border-purple-500/50 shadow-lg shadow-purple-950/50', badge: 'ABYSS ABSOLUTE' },
];

export const SINGLE_TITLES = [
  { name: 'Beginner', threshold: 0 },
  // Intermediate Lv.1 - Lv.10 (5,000 to 14,000; step 1,000)
  { name: '[S] Intermediate Lv.1', threshold: 5000 },
  { name: '[S] Intermediate Lv.2', threshold: 6000 },
  { name: '[S] Intermediate Lv.3', threshold: 7000 },
  { name: '[S] Intermediate Lv.4', threshold: 8000 },
  { name: '[S] Intermediate Lv.5', threshold: 9000 },
  { name: '[S] Intermediate Lv.6', threshold: 10000 },
  { name: '[S] Intermediate Lv.7', threshold: 11000 },
  { name: '[S] Intermediate Lv.8', threshold: 12000 },
  { name: '[S] Intermediate Lv.9', threshold: 13000 },
  { name: '[S] Intermediate Lv.10', threshold: 14000 },

  // Advanced Lv.1 - Lv.10 (15,000 to 17,250; step 250)
  { name: '[S] Advanced Lv.1', threshold: 15000 },
  { name: '[S] Advanced Lv.2', threshold: 15250 },
  { name: '[S] Advanced Lv.3', threshold: 15500 },
  { name: '[S] Advanced Lv.4', threshold: 15750 },
  { name: '[S] Advanced Lv.5', threshold: 16000 },
  { name: '[S] Advanced Lv.6', threshold: 16250 },
  { name: '[S] Advanced Lv.7', threshold: 16500 },
  { name: '[S] Advanced Lv.8', threshold: 16750 },
  { name: '[S] Advanced Lv.9', threshold: 17000 },
  { name: '[S] Advanced Lv.10', threshold: 17250 },

  // Expert Lv.1 - Lv.10 (17,500 to 18,900; Lv.1-6 step 200, Lv.6-10 step 100)
  { name: '[S] Expert Lv.1', threshold: 17500 },
  { name: '[S] Expert Lv.2', threshold: 17700 },
  { name: '[S] Expert Lv.3', threshold: 17900 },
  { name: '[S] Expert Lv.4', threshold: 18100 },
  { name: '[S] Expert Lv.5', threshold: 18300 },
  { name: '[S] Expert Lv.6', threshold: 18500 },
  { name: '[S] Expert Lv.7', threshold: 18600 },
  { name: '[S] Expert Lv.8', threshold: 18700 },
  { name: '[S] Expert Lv.9', threshold: 18800 },
  { name: '[S] Expert Lv.10', threshold: 18900 },

  // The Master
  { name: '[S] The Master', threshold: 19000 },
];

export const DOUBLE_TITLES = [
  { name: 'Beginner', threshold: 0 },
  // Intermediate Lv.1 - Lv.10 (5,000 to 14,000; step 1,000)
  { name: '[D] Intermediate Lv.1', threshold: 5000 },
  { name: '[D] Intermediate Lv.2', threshold: 6000 },
  { name: '[D] Intermediate Lv.3', threshold: 7000 },
  { name: '[D] Intermediate Lv.4', threshold: 8000 },
  { name: '[D] Intermediate Lv.5', threshold: 9000 },
  { name: '[D] Intermediate Lv.6', threshold: 10000 },
  { name: '[D] Intermediate Lv.7', threshold: 11000 },
  { name: '[D] Intermediate Lv.8', threshold: 12000 },
  { name: '[D] Intermediate Lv.9', threshold: 13000 },
  { name: '[D] Intermediate Lv.10', threshold: 14000 },

  // Advanced Lv.1 - Lv.10 (15,000 to 17,250; step 250)
  { name: '[D] Advanced Lv.1', threshold: 15000 },
  { name: '[D] Advanced Lv.2', threshold: 15250 },
  { name: '[D] Advanced Lv.3', threshold: 15500 },
  { name: '[D] Advanced Lv.4', threshold: 15750 },
  { name: '[D] Advanced Lv.5', threshold: 16000 },
  { name: '[D] Advanced Lv.6', threshold: 16250 },
  { name: '[D] Advanced Lv.7', threshold: 16500 },
  { name: '[D] Advanced Lv.8', threshold: 16750 },
  { name: '[D] Advanced Lv.9', threshold: 17000 },
  { name: '[D] Advanced Lv.10', threshold: 17250 },

  // Expert Lv.1 - Lv.10 (17,500 to 18,900; Lv.1-6 step 200, Lv.6-10 step 100)
  { name: '[D] Expert Lv.1', threshold: 17500 },
  { name: '[D] Expert Lv.2', threshold: 17700 },
  { name: '[D] Expert Lv.3', threshold: 17900 },
  { name: '[D] Expert Lv.4', threshold: 18100 },
  { name: '[D] Expert Lv.5', threshold: 18300 },
  { name: '[D] Expert Lv.6', threshold: 18500 },
  { name: '[D] Expert Lv.7', threshold: 18600 },
  { name: '[D] Expert Lv.8', threshold: 18700 },
  { name: '[D] Expert Lv.9', threshold: 18800 },
  { name: '[D] Expert Lv.10', threshold: 18900 },

  // The Master
  { name: '[D] The Master', threshold: 19000 },
];

/**
 * Calculates current tier/title progress.
 * @param {number} pumbility 
 * @param {Array<{name: string, threshold: number}>} tierList 
 * @returns {{ current: Object, next: Object|null, progress: number, needed: number }}
 */
export function getTitleProgress(pumbility, tierList) {
  const pb = Number(pumbility) || 0;
  let currentIndex = 0;

  for (let i = tierList.length - 1; i >= 0; i--) {
    if (pb >= tierList[i].threshold) {
      currentIndex = i;
      break;
    }
  }

  const current = tierList[currentIndex];
  const next = currentIndex < tierList.length - 1 ? tierList[currentIndex + 1] : null;

  if (!next) {
    return {
      current,
      next: null,
      progress: 100,
      needed: 0,
    };
  }

  const range = next.threshold - current.threshold;
  const gained = pb - current.threshold;
  const progress = Math.min(100, Math.max(0, Math.round((gained / range) * 100)));
  const needed = Number((next.threshold - pb).toFixed(2));

  return {
    current,
    next,
    progress,
    needed: Math.max(0, needed),
  };
}
