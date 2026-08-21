import { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/portfolioData';

export interface ReadingTimeResult {
  words: number;
  minutes: number;
  displayText: string;
  detailText: string;
}

/**
 * Counts total words in a string, stripping markup or excess whitespace
 */
export function countWords(text?: string | null): number {
  if (!text) return 0;
  // Replace symbols/punctuation with spaces and split by whitespace
  const clean = text.trim().replace(/[\r\n\t]+/g, ' ');
  const words = clean.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

/**
 * Calculates estimated reading time based on 200 words per minute (standard reading speed)
 */
export function calculateReadingTime(words: number, wordsPerMinute: number = 200): ReadingTimeResult {
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return {
    words,
    minutes,
    displayText: `${minutes} min read`,
    detailText: `${minutes} min read (${words.toLocaleString()} words)`
  };
}

/**
 * Calculates total words and reading time for an entire Case Study (including all tabs, bullets, snippets, and stats)
 */
export function getCaseStudyReadingTime(studyOrId: CaseStudy | string | undefined | null): ReadingTimeResult {
  if (!studyOrId) {
    return { words: 0, minutes: 1, displayText: '1 min read', detailText: '1 min read (~200 words)' };
  }

  let study: CaseStudy | undefined;

  if (typeof studyOrId === 'string') {
    const key = studyOrId.toLowerCase().replace(/[-_]/g, '');
    study = CASE_STUDIES[studyOrId] || 
            Object.values(CASE_STUDIES).find(s => s.id.toLowerCase().replace(/[-_]/g, '') === key || key.includes(s.id.toLowerCase()));
  } else {
    study = studyOrId;
  }

  if (!study) {
    return { words: 0, minutes: 1, displayText: '1 min read', detailText: '1 min read (~200 words)' };
  }

  let totalWords = 0;

  // Header & Meta
  totalWords += countWords(study.title);
  totalWords += countWords(study.subtitle);
  totalWords += countWords(study.tagline);
  totalWords += countWords(study.meta);

  // Stats
  if (study.stats) {
    study.stats.forEach(s => {
      totalWords += countWords(s.value);
      totalWords += countWords(s.label);
    });
  }

  // Tabs
  if (study.tabs) {
    Object.values(study.tabs).forEach(tab => {
      if (!tab) return;
      totalWords += countWords(tab.title);
      totalWords += countWords(tab.content);
      if (tab.bulletPoints) {
        tab.bulletPoints.forEach(bp => {
          totalWords += countWords(bp);
        });
      }
      if (tab.codeSnippet) {
        // Code lines: count non-trivial tokens/words for comprehensive depth estimation
        totalWords += countWords(tab.codeSnippet.code);
      }
    });
  }

  return calculateReadingTime(totalWords);
}

/**
 * Calculates reading time for a single tab of a case study
 */
export function getTabReadingTime(content: string, bulletPoints?: string[], codeSnippet?: string): ReadingTimeResult {
  let words = countWords(content);
  if (bulletPoints) {
    bulletPoints.forEach(bp => {
      words += countWords(bp);
    });
  }
  if (codeSnippet) {
    words += countWords(codeSnippet);
  }
  return calculateReadingTime(words);
}

/**
 * Calculates reading time for the STAR method summary
 */
export function getStarReadingTime(star: { situation: string; task: string; action: string; result: string }): ReadingTimeResult {
  const words = countWords(star.situation) + countWords(star.task) + countWords(star.action) + countWords(star.result);
  return calculateReadingTime(words, 180); // slightly more deliberate pace for high-density STAR bullet points
}
