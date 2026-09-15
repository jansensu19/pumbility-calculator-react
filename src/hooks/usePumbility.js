import { useState, useEffect, useMemo } from 'react';
import { getSavedScores, saveScores, clearSavedScores } from '../utils/storage.js';
import { calculatePumbility } from '../utils/pumbilityCalc.js';
import {
  OVERALL_TIERS,
  SINGLE_TITLES,
  DOUBLE_TITLES,
  getTitleProgress,
} from '../data/titlesData.js';

export function getChartKey(item) {
  const normName = (item.songName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const type = (item.type || 'single').toLowerCase().startsWith('d') ? 'double' : 'single';
  const level = Number(item.level) || 0;
  return `${normName}__${type}__${level}`;
}

export function deduplicateScores(list) {
  if (!Array.isArray(list)) return [];
  const map = new Map();
  for (const item of list) {
    const key = getChartKey(item);
    if (!map.has(key)) {
      map.set(key, item);
    } else {
      const existing = map.get(key);
      if ((item.pumbility || 0) > (existing.pumbility || 0)) {
        map.set(key, item);
      }
    }
  }
  return Array.from(map.values());
}

export function usePumbility() {
  const [scores, setScores] = useState(() => deduplicateScores(getSavedScores()));

  useEffect(() => {
    saveScores(scores);
  }, [scores]);

  const sortedAllScores = useMemo(() => {
    return [...scores].sort((a, b) => (b.pumbility || 0) - (a.pumbility || 0));
  }, [scores]);

  const top50Overall = useMemo(() => {
    return sortedAllScores.slice(0, 50);
  }, [sortedAllScores]);

  const top50Singles = useMemo(() => {
    return sortedAllScores
      .filter(s => s.type === 'single')
      .slice(0, 50);
  }, [sortedAllScores]);

  const top50Doubles = useMemo(() => {
    return sortedAllScores
      .filter(s => s.type === 'double')
      .slice(0, 50);
  }, [sortedAllScores]);

  const totalPumbility = useMemo(() => {
    const sum = top50Overall.reduce((acc, curr) => acc + (curr.pumbility || 0), 0);
    return Number(sum.toFixed(2));
  }, [top50Overall]);

  const singlePumbility = useMemo(() => {
    const sum = top50Singles.reduce((acc, curr) => acc + (curr.pumbility || 0), 0);
    return Number(sum.toFixed(2));
  }, [top50Singles]);

  const doublePumbility = useMemo(() => {
    const sum = top50Doubles.reduce((acc, curr) => acc + (curr.pumbility || 0), 0);
    return Number(sum.toFixed(2));
  }, [top50Doubles]);

  const averagePumbility = useMemo(() => {
    if (top50Overall.length === 0) return 0;
    return Number((totalPumbility / top50Overall.length).toFixed(2));
  }, [totalPumbility, top50Overall]);

  const overallTier = useMemo(() => {
    return getTitleProgress(totalPumbility, OVERALL_TIERS);
  }, [totalPumbility]);

  const singleTitle = useMemo(() => {
    return getTitleProgress(singlePumbility, SINGLE_TITLES);
  }, [singlePumbility]);

  const doubleTitle = useMemo(() => {
    return getTitleProgress(doublePumbility, DOUBLE_TITLES);
  }, [doublePumbility]);

  const addScore = (scoreData) => {
    const calc = calculatePumbility({
      type: scoreData.type,
      level: scoreData.level,
      grade: scoreData.grade,
      plate: scoreData.plate,
      score: scoreData.score,
    });

    const newRecord = {
      id: `score-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      songName: scoreData.songName || 'Custom Chart',
      type: scoreData.type,
      level: Number(scoreData.level),
      grade: calc.grade,
      plate: calc.plate,
      score: scoreData.score ? Number(scoreData.score) : null,
      pumbility: calc.pumbility,
      weight: calc.weight,
      gradePoints: calc.gradePoints,
      plateBonus: calc.plateBonus,
      date: scoreData.date || new Date().toISOString().split('T')[0],
    };

    const targetKey = getChartKey(newRecord);

    setScores(prev => {
      const existingIndex = prev.findIndex(item => getChartKey(item) === targetKey);
      if (existingIndex === -1) {
        return [newRecord, ...prev];
      }

      const existing = prev[existingIndex];
      // Prevent duplicate identical record
      if (
        existing.grade === newRecord.grade &&
        existing.plate === newRecord.plate &&
        Number(existing.score || 0) === Number(newRecord.score || 0)
      ) {
        return prev;
      }

      // Update existing chart record with new score
      const nextList = [...prev];
      nextList[existingIndex] = {
        ...existing,
        ...newRecord,
        id: existing.id,
      };
      return nextList;
    });

    return newRecord;
  };

  const updateScore = (id, scoreData) => {
    const calc = calculatePumbility({
      type: scoreData.type,
      level: scoreData.level,
      grade: scoreData.grade,
      plate: scoreData.plate,
      score: scoreData.score,
    });

    const updatedItem = {
      songName: scoreData.songName,
      type: scoreData.type,
      level: Number(scoreData.level),
      grade: calc.grade,
      plate: calc.plate,
      score: scoreData.score ? Number(scoreData.score) : null,
      pumbility: calc.pumbility,
      weight: calc.weight,
      gradePoints: calc.gradePoints,
      plateBonus: calc.plateBonus,
      date: scoreData.date,
    };

    setScores(prev => {
      const targetKey = getChartKey(updatedItem);
      const conflictIndex = prev.findIndex(item => item.id !== id && getChartKey(item) === targetKey);
      if (conflictIndex !== -1) {
        return prev
          .filter(item => item.id !== prev[conflictIndex].id)
          .map(item => item.id === id ? { ...item, ...updatedItem } : item);
      }
      return prev.map(item => item.id === id ? { ...item, ...updatedItem } : item);
    });
  };

  const deleteScore = (id) => {
    setScores(prev => prev.filter(s => s.id !== id));
  };

  const clearAll = () => {
    clearSavedScores();
    setScores([]);
  };

  const importScores = (newScores, replace = false) => {
    if (replace) {
      setScores(deduplicateScores(newScores));
    } else {
      setScores(prev => deduplicateScores([...newScores, ...prev]));
    }
  };

  const loadSampleScores = () => {
    const sample = [
      { songName: 'The Stranger', type: 'single', level: 22, grade: 'SSS+', plate: 'PG' },
      { songName: 'Ghost Bloody Train', type: 'double', level: 25, grade: 'SSS+', plate: 'UG' },
      { songName: 'L (PIU Edit)', type: 'double', level: 27, grade: 'SS+', plate: 'MG' },
      { songName: 'Can I friend you on Bassbook? lol', type: 'single', level: 22, grade: 'SSS+', plate: 'PG' },
      { songName: 'T.B.H', type: 'single', level: 20, grade: 'SSS+', plate: 'PG' },
      { songName: 'Do the Dance', type: 'double', level: 22, grade: 'SSS', plate: 'UG' },
      { songName: 'BANG BANG', type: 'double', level: 23, grade: 'SSS+', plate: 'PG' },
      { songName: '404 (New Era)', type: 'single', level: 21, grade: 'SSS+', plate: 'EG' },
      { songName: 'Enjoy The Show', type: 'double', level: 25, grade: 'SS+', plate: 'SG' },
      { songName: 'Lachryma (Re:Queen\'M)', type: 'single', level: 23, grade: 'SSS+', plate: 'PG' },
      { songName: '1949', type: 'double', level: 25, grade: 'SSS', plate: 'UG' },
      { songName: 'Gargoyle', type: 'double', level: 24, grade: 'SSS+', plate: 'PG' },
      { songName: 'Gun Rock', type: 'single', level: 20, grade: 'SSS+', plate: 'PG' },
      { songName: 'Canon D', type: 'double', level: 23, grade: 'SS+', plate: 'SG' },
      { songName: 'Conflict', type: 'single', level: 19, grade: 'SSS+', plate: 'UG' },
      { songName: 'Brain Power', type: 'double', level: 22, grade: 'SSS', plate: 'EG' },
      { songName: '1950', type: 'single', level: 20, grade: 'SS', plate: 'MG' },
      { songName: 'Beethoven Virus', type: 'double', level: 21, grade: 'SSS+', plate: 'PG' },
      { songName: 'Red Snow', type: 'double', level: 22, grade: 'S+', plate: 'SG' },
      { songName: 'Chase Me', type: 'single', level: 19, grade: 'SSS', plate: 'UG' },
    ];

    const parsedSample = sample.map(s => {
      const calc = calculatePumbility(s);
      return {
        id: `sample-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        songName: s.songName,
        type: s.type,
        level: s.level,
        grade: calc.grade,
        plate: calc.plate,
        pumbility: calc.pumbility,
        weight: calc.weight,
        gradePoints: calc.gradePoints,
        plateBonus: calc.plateBonus,
        date: new Date().toISOString().split('T')[0],
      };
    });

    setScores(parsedSample);
  };

  return {
    scores: sortedAllScores,
    top50Overall,
    top50Singles,
    top50Doubles,
    totalPumbility,
    singlePumbility,
    doublePumbility,
    averagePumbility,
    overallTier,
    singleTitle,
    doubleTitle,
    addScore,
    updateScore,
    deleteScore,
    clearAll,
    importScores,
    loadSampleScores,
  };
}
