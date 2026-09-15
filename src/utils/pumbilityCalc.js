/**
 * Pump It Up Phoenix 2 - Pumbility Calculation Engine
 * Formula: (Base Grade Points + Plate Bonus) * Weight Multiplier
 * 2 decimal places.
 */

export const GRADE_POINTS = {
  'SSS+': 375.0,
  'SSS': 372.5,
  'SS+': 370.0,
  'SS': 367.5,
  'S+': 365.0,
  'S': 362.5,
  'AAA+': 357.5,
  'AAA': 352.5,
  'AA+': 347.5,
  'AA': 342.5,
  'A+': 337.5,
  'A': 330.0,
  'B': 320.0,
  'C': 300.0,
  'D': 250.0,
  'F': 0.0,
};

export const PLATE_BONUSES = {
  PG: { name: 'Perfect Game', single: 5.00, double: 5.00, description: 'All Perfects' },
  UG: { name: 'Ultimate Game', single: 4.25, double: 4.00, description: 'Greats or better' },
  EG: { name: 'Extreme Game', single: 3.50, double: 3.50, description: 'Goods or better' },
  SG: { name: 'Superb Game', single: 2.00, double: 2.00, description: 'Full Combo (0 Misses)' },
  MG: { name: 'Marvelous Game', single: 1.50, double: 1.50, description: '1-5 Misses' },
  TG: { name: 'Talented Game', single: 1.00, double: 1.00, description: '6-10 Misses' },
  FG: { name: 'Fair Game', single: 0.50, double: 0.50, description: '11-20 Misses' },
  RG: { name: 'Rough Game', single: 0.00, double: 0.00, description: '21+ Misses / Stage Pass' },
};

/**
 * Calculates weight multiplier for chart level in Phoenix 2.
 * Doubles scale: 0.52 + (0.02 * level) for level 10-24, accelerates by +0.04 per level above 24.
 * Singles scale: 1 level higher than Doubles (S22 = D23, S23 = D24).
 * @param {'single'|'double'|'S'|'D'} type 
 * @param {number} level 
 * @returns {number}
 */
export function getWeightMultiplier(type, level) {
  const isSingle = typeof type === 'string' && (type.toLowerCase().startsWith('s'));
  const effectiveLevel = isSingle ? level + 1 : level;

  if (effectiveLevel < 10) {
    return 0;
  }

  if (effectiveLevel <= 24) {
    // 0.52 + 0.02 * level
    // Floating point precision fix: (52 + 2 * effectiveLevel) / 100
    return (52 + 2 * effectiveLevel) / 100;
  }

  // Level 25+ accelerates by +0.04 per level
  // D24 = 1.00, D25 = 1.04, D26 = 1.08, D27 = 1.12, D28 = 1.16
  return (100 + 4 * (effectiveLevel - 24)) / 100;
}

/**
 *
 * @param {number} score (0 to 1,000,000)
 * @returns {string}
 */
export function getGradeFromScore(score) {
  const s = Number(score) || 0;
  if (s >= 995000) return 'SSS+';
  if (s >= 990000) return 'SSS';
  if (s >= 985000) return 'SS+';
  if (s >= 980000) return 'SS';
  if (s >= 975000) return 'S+';
  if (s >= 970000) return 'S';
  if (s >= 960000) return 'AAA+';
  if (s >= 950000) return 'AAA';
  if (s >= 940000) return 'AA+';
  if (s >= 920000) return 'AA';
  if (s >= 900000) return 'A+';
  if (s >= 825000) return 'A';
  if (s >= 700000) return 'B';
  if (s >= 600000) return 'C';
  if (s >= 450000) return 'D';
  return 'F';
}

/**
 * Calculates Pumbility for a single chart play.
 * 2 decimal places.
 * @param {Object} params
 * @param {'single'|'double'|'S'|'D'} params.type
 * @param {number} params.level
 * @param {string} [params.grade]
 * @param {string} [params.plate]
 * @param {number} [params.score]
 * @returns {{ pumbility: number, weight: number, gradePoints: number, plateBonus: number, grade: string, plate: string }}
 */
export function calculatePumbility({ type, level, grade, plate, score }) {
  const chartType = (type && type.toLowerCase().startsWith('s')) ? 'single' : 'double';
  const chartLevel = Number(level) || 0;
  
  // If score is provided and grade is omitted, derive grade
  const resolvedGrade = grade || (score !== undefined ? getGradeFromScore(score) : 'SSS+');
  const resolvedPlate = (plate && PLATE_BONUSES[plate]) ? plate : 'RG';

  const basePoints = GRADE_POINTS[resolvedGrade] ?? 0;
  const plateBonusObj = PLATE_BONUSES[resolvedPlate] ?? PLATE_BONUSES.RG;
  const plateBonus = chartType === 'single' ? plateBonusObj.single : plateBonusObj.double;
  const weight = getWeightMultiplier(chartType, chartLevel);

  if (weight === 0 || basePoints === 0) {
    return {
      pumbility: 0,
      weight,
      gradePoints: basePoints,
      plateBonus,
      grade: resolvedGrade,
      plate: resolvedPlate,
    };
  }

  // formula: (grade points + plate bonus) * weight
  const rawPumbility = (basePoints + plateBonus) * weight;
  
  // 2 decimal places
  // We add EPSILON before floor to avoid JS floating point inaccuracies (e.g. 372.3999999999999)
  const floored = Math.floor((rawPumbility + 0.000001) * 100) / 100;

  return {
    pumbility: Number(floored.toFixed(2)),
    weight,
    gradePoints: basePoints,
    plateBonus,
    grade: resolvedGrade,
    plate: resolvedPlate,
  };
}

