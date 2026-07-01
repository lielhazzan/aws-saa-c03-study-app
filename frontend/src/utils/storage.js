const API_BASE = 'http://localhost:8001';

export const saveExamResult = async (result) => {
  await fetch(`${API_BASE}/api/results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  });
};

export const getExamStats = async () => {
  const res = await fetch(`${API_BASE}/api/results/stats`);
  return res.json();
};

export const clearExamResults = async () => {
  await fetch(`${API_BASE}/api/results`, { method: 'DELETE' });
};
