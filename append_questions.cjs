const fs = require('fs');

const scratchpadPath = 'C:/Users/User/.gemini/antigravity-ide/brain/29e857fb-5f86-4b2c-bb59-109c16f10ac8/browser/scratchpad_s86vciin.md';
const content = fs.readFileSync(scratchpadPath, 'utf8');

const jsonStart = content.indexOf('```json') + 7;
const jsonEnd = content.lastIndexOf('```');
const jsonStr = content.substring(jsonStart, jsonEnd).trim();
const scraped = JSON.parse(jsonStr);

const existingPath = './src/data/questions.json';
const existing = require(existingPath);

let nextId = existing.length > 0 ? Math.max(...existing.map(q => q.id)) + 1 : 1;

for (const q of scraped) {
  q.id = nextId++;
  q.topic = "Practice Exam (Real)";
  existing.push(q);
}

fs.writeFileSync(existingPath, JSON.stringify(existing, null, 2));
console.log(`Added ${scraped.length} questions. Total: ${existing.length}`);
