const fs = require('fs');

const inputFile = 'questions.json';
const outputFile = 'src/data/questions.json';

try {
  const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  const questionsList = inputData.data || inputData; // depends on format

  let existingData = [];
  if (fs.existsSync(outputFile)) {
    existingData = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  }

  let addedCount = 0;

  questionsList.forEach(q => {
    // Only process multi select (or >1 correct options)
    const correctOptions = q.options.filter(o => o.isCorrect);
    if (correctOptions.length <= 1) return; // Skip single answers since we already got them

    const correctIndices = [];
    q.options.forEach((o, i) => {
      if (o.isCorrect) correctIndices.push(i);
    });

    const newQuestion = {
      topic: q.domain || (q.serviceTags && q.serviceTags[0]) || "AWS Services",
      text: q.questionText,
      options: q.options.map(o => o.text),
      correctAnswers: correctIndices,
      explanation: q.explanation || "No explanation provided."
    };

    // Avoid duplicates
    const isDuplicate = existingData.some(eq => eq.text.substring(0, 50) === newQuestion.text.substring(0, 50));
    
    if (!isDuplicate) {
      existingData.push(newQuestion);
      addedCount++;
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(existingData, null, 2));
  console.log(`Successfully added ${addedCount} multi-select questions from the JSON file.`);

} catch (err) {
  console.error("Error processing JSON:", err);
}
