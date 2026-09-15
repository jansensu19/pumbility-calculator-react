import phoenix2Songs from '../data/phoenix2_songs.json' with { type: 'json' };
import { getCachedSonglist, saveCachedSonglist } from '../utils/storage.js';

function cleanStr(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

const SEARCH_ALIASES = {
  'lapus': 'larpus',
  'mrlapus': 'mrlarpus',
  'banya': 'banya',
  'queem': 'queen',
  'queenm': 'queen',
};

export async function getPiuSonglist(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = getCachedSonglist();
    if (cached && Array.isArray(cached) && cached.length >= phoenix2Songs.length) {
      return cached;
    }
  }

  saveCachedSonglist(phoenix2Songs);
  return phoenix2Songs;
}

export function searchSongs(query, songlist = phoenix2Songs) {
  if (!query || !query.trim()) {
    return songlist.slice(0, 40);
  }

  let qClean = cleanStr(query);
  for (const [alias, target] of Object.entries(SEARCH_ALIASES)) {
    if (qClean.includes(alias)) {
      qClean = qClean.replaceAll(alias, target);
    }
  }

  const qWords = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map(w => {
      const cw = cleanStr(w);
      return SEARCH_ALIASES[cw] || cw;
    })
    .filter(Boolean);

  return songlist.filter(s => {
    const nameClean = cleanStr(s.songName);
    const artistClean = cleanStr(s.artist);

    if (nameClean.includes(qClean) || artistClean.includes(qClean)) {
      return true;
    }

    if (qWords.length > 0 && qWords.every(w => nameClean.includes(w) || artistClean.includes(w))) {
      return true;
    }

    return false;
  }).slice(0, 30);
}

export function extractSongCharts(song) {
  if (!song || !song.chartList) return [];
  return song.chartList
    .filter(c => c.level >= 10)
    .map(c => ({
      type: c.chartType === 'double' ? 'double' : 'single',
      level: c.level,
      label: `${c.chartType === 'double' ? 'D' : 'S'}${c.level}`,
    }))
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'single' ? -1 : 1;
      return a.level - b.level;
    });
}
