const fs = require('fs');
const path = 'src/data/questions.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let migratedCount = 0;
data.forEach(q => {
  if (q.correctAnswer !== undefined) {
    // If it's single select
    q.correctAnswers = [q.correctAnswer];
    delete q.correctAnswer;
    migratedCount++;
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log(`Migrated ${migratedCount} questions to use correctAnswers array.`);
