/**
 * Local Storage Helper with safe fallback
 */

const STORAGE_KEYS = {
  SCORES: 'pumbility_scores_v2',
  SETTINGS: 'pumbility_settings_v2',
  CACHED_SONGS: 'pumbility_songs_cache',
};

export function getSavedScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCORES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load scores from localStorage:', err);
    return [];
  }
}

export function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
    return true;
  } catch (err) {
    console.error('Failed to save scores to localStorage:', err);
    return false;
  }
}

export function clearSavedScores() {
  try {
    localStorage.removeItem(STORAGE_KEYS.SCORES);
    return true;
  } catch (err) {
    console.error('Failed to clear scores from localStorage:', err);
    return false;
  }
}

export function getCachedSonglist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CACHED_SONGS);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    // Cache TTL: 7 days
    const isExpired = Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000;
    return isExpired ? null : data;
  } catch {
    return null;
  }
}

export function saveCachedSonglist(songs) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.CACHED_SONGS,
      JSON.stringify({ data: songs, timestamp: Date.now() })
    );
  } catch (err) {
    console.warn('Could not cache song list (possibly storage quota full):', err);
  }
}

