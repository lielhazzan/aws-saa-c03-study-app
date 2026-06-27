// src/utils/storage.js

const EXAM_HISTORY_KEY = 'aws_exam_history';

export const getExamHistory = () => {
  try {
    const data = localStorage.getItem(EXAM_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse exam history", e);
    return [];
  }
};

export const saveExamResult = (result) => {
  // result = { mode: 'mock' | 'quick', score: number (percentage), date: ISO string }
  const history = getExamHistory();
  history.push(result);
  localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history));
};

export const getAverageMockScore = () => {
  const history = getExamHistory().filter(h => h.mode === 'mock');
  if (history.length === 0) return 0;
  
  const sum = history.reduce((acc, curr) => acc + curr.score, 0);
  return Math.round(sum / history.length);
};

export const getTotalExamsTaken = () => {
  return getExamHistory().length;
};
