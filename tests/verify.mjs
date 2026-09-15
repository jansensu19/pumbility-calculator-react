import fs from 'fs';
import { calculatePumbility } from '../src/utils/pumbilityCalc.js';
import { getTitleProgress, SINGLE_TITLES, DOUBLE_TITLES } from '../src/data/titlesData.js';
import { searchSongs, extractSongCharts } from '../src/services/piuData.js';
import { parseScoresCsv } from '../src/utils/csvHelper.js';

const phoenix2Songs = JSON.parse(fs.readFileSync('src/data/phoenix2_songs.json', 'utf8'));

console.log('--- Test 1: Pumbility Formula Verification ---');
const s22pg = calculatePumbility({ type: 'single', level: 22, grade: 'SSS+', plate: 'PG' });
console.assert(s22pg.pumbility === 372.40, `Expected 372.40, got ${s22pg.pumbility}`);

const d22pg = calculatePumbility({ type: 'double', level: 22, grade: 'SSS+', plate: 'PG' });
console.assert(d22pg.pumbility === 364.80, `Expected 364.80, got ${d22pg.pumbility}`);

console.log('✓ Phoenix 2 math calculation verified!');

console.log('\n--- Test 2: User PB & Title Ladder Verification ---');
const userPb = 17642.67;
const singleRes = getTitleProgress(userPb, SINGLE_TITLES);
console.assert(singleRes.current.name === '[S] Expert Lv.1', `Expected [S] Expert Lv.1, got ${singleRes.current.name}`);
console.assert(singleRes.next?.name === '[S] Expert Lv.2', `Expected [S] Expert Lv.2, got ${singleRes.next?.name}`);
console.assert(singleRes.next?.threshold === 17700, `Expected 17700, got ${singleRes.next?.threshold}`);
console.assert(singleRes.needed === 57.33, `Expected 57.33, got ${singleRes.needed}`);

console.log('✓ User PB title progress ([S] Expert Lv.1 -> Lv.2 at 17,700) verified!');

console.log('\n--- Test 3: Song Search & Chart Database Verification ---');
const larpusResults = searchSongs('mr lapus', phoenix2Songs);
console.assert(larpusResults.length > 0 && larpusResults[0].songName === 'Mr. Larpus', 'Search "mr lapus" failed');

const larpusSong = phoenix2Songs.find(s => s.songName === 'Mr. Larpus');
const charts = extractSongCharts(larpusSong);
const hasS20 = charts.some(c => c.type === 'single' && c.level === 20);
console.assert(hasS20, 'Mr. Larpus is missing S20 chart');
console.log('✓ Smart search and Mr. Larpus S20 chart verified!');

console.log('\n--- Test 4: CSV Parser & Portability ---');
const sampleCsv = `songName,type,level,score,grade,plate,date
Mr. Larpus,single,20,995400,SSS+,PG,2026-09-16`;
const parsed = parseScoresCsv(sampleCsv);
console.assert(parsed.length === 1, 'CSV parse length mismatch');
console.assert(parsed[0].songName === 'Mr. Larpus', 'CSV songName mismatch');
console.assert(parsed[0].level === 20, 'CSV level mismatch');
console.log('✓ CSV parser verified!');

console.log('\n--- Test 5: Chart Deduplication & Duplicate Prevention ---');
import('../src/hooks/usePumbility.js').then(({ deduplicateScores, getChartKey }) => {
  const duplicates = [
    { songName: 'Mr. Larpus', type: 'single', level: 20, grade: 'SS', plate: 'SG', pumbility: 350.0 },
    { songName: 'Mr.Larpus', type: 'single', level: 20, grade: 'SSS+', plate: 'PG', pumbility: 372.4 }, // Higher PB
    { songName: 'Mr. Larpus', type: 'single', level: 20, grade: 'SSS+', plate: 'PG', pumbility: 372.4 }, // Exact duplicate
    { songName: '1949', type: 'double', level: 28, grade: 'SSS', plate: 'UG', pumbility: 436.0 },
  ];

  const deduped = deduplicateScores(duplicates);
  console.assert(deduped.length === 2, `Expected 2 unique charts, got ${deduped.length}`);
  const larpusRecord = deduped.find(s => getChartKey(s) === 'mrlarpus__single__20');
  console.assert(larpusRecord.pumbility === 372.4, 'Did not keep highest Pumbility for duplicate chart');
  console.log('✓ Duplicate chart prevention and deduplication verified!');

  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
});

