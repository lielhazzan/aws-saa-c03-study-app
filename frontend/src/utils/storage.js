const API_BASE = 'http://localhost:8001';

export const saveExamResult = async (result) => {
  // result = { mode: 'mock' | 'quick', score: number (percentage), date: ISO string }
  try {
    await fetch(`${API_BASE}/api/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });
  } catch (err) {
    console.error("Failed to save result to DB:", err);
  }
};

export const getExamStats = async () => {
  const res = await fetch(`${API_BASE}/api/results/stats`);
  return res.json();
};

export const clearExamResults = async () => {
  await fetch(`${API_BASE}/api/results`, { method: 'DELETE' });
};
