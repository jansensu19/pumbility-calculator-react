import { calculatePumbility, getGradeFromScore } from './pumbilityCalc.js';

/**
 * Escapes CSV field value if it contains commas, quotes, or newlines
 */
function escapeCsvValue(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Exports score list to CSV string and triggers browser download
 * @param {Array<Object>} scores 
 * @param {string} [filename]
 */
export function exportScoresToCsv(scores, filename = 'pumbility_scores.csv') {
  const headers = ['id', 'songName', 'type', 'level', 'score', 'grade', 'plate', 'pumbility', 'date'];
  
  const rows = scores.map(item => [
    escapeCsvValue(item.id || ''),
    escapeCsvValue(item.songName || 'Unknown'),
    escapeCsvValue(item.type || 'single'),
    escapeCsvValue(item.level || 0),
    escapeCsvValue(item.score || ''),
    escapeCsvValue(item.grade || 'SSS+'),
    escapeCsvValue(item.plate || 'RG'),
    escapeCsvValue(item.pumbility || 0),
    escapeCsvValue(item.date || new Date().toISOString().split('T')[0]),
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parses CSV text into verified score objects
 * @param {string} csvText 
 * @returns {Array<Object>}
 */
export function parseScoresCsv(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];

  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headerLine = lines[0].toLowerCase();
  const headers = headerLine.split(',').map(h => h.trim().replace(/^"|"$/g, ''));

  const getColIndex = (names) => {
    for (const name of names) {
      const idx = headers.indexOf(name);
      if (idx !== -1) return idx;
    }
    return -1;
  };

  const songIdx = getColIndex(['songname', 'song', 'title', 'name']);
  const typeIdx = getColIndex(['type', 'mode', 'charttype']);
  const levelIdx = getColIndex(['level', 'lvl']);
  const scoreIdx = getColIndex(['score', 'points']);
  const gradeIdx = getColIndex(['grade', 'rank']);
  const plateIdx = getColIndex(['plate', 'clear', 'medal']);
  const dateIdx = getColIndex(['date', 'createdat']);

  const parsed = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split taking care of quotes
    const values = [];
    let inQuotes = false;
    let curVal = '';

    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex];
      if (char === '"' && (charIndex === 0 || line[charIndex - 1] !== '\\')) {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(curVal.trim().replace(/^"|"$/g, ''));
        curVal = '';
      } else {
        curVal += char;
      }
    }
    values.push(curVal.trim().replace(/^"|"$/g, ''));

    const songName = songIdx !== -1 && values[songIdx] ? values[songIdx] : `Song #${i}`;
    let type = typeIdx !== -1 && values[typeIdx] ? values[typeIdx].toLowerCase() : 'single';
    if (type.startsWith('d')) type = 'double';
    else type = 'single';

    const level = levelIdx !== -1 ? (parseInt(values[levelIdx], 10) || 10) : 10;
    const rawScore = scoreIdx !== -1 && values[scoreIdx] ? parseInt(values[scoreIdx], 10) : null;
    
    let grade = gradeIdx !== -1 && values[gradeIdx] ? values[gradeIdx].toUpperCase() : null;
    if (!grade && rawScore) {
      grade = getGradeFromScore(rawScore);
    }
    if (!grade) grade = 'SSS+';

    const plate = plateIdx !== -1 && values[plateIdx] ? values[plateIdx].toUpperCase() : 'RG';

    const { pumbility, weight, gradePoints, plateBonus } = calculatePumbility({
      type,
      level,
      grade,
      plate,
      score: rawScore || undefined,
    });

    const date = dateIdx !== -1 && values[dateIdx] ? values[dateIdx] : new Date().toISOString().split('T')[0];

    parsed.push({
      id: `score-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      songName,
      type,
      level,
      score: rawScore,
      grade,
      plate,
      pumbility,
      weight,
      gradePoints,
      plateBonus,
      date,
    });
  }

  return parsed;
}

