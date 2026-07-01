const fs = require('fs');

const rawText = fs.readFileSync('parse_q1_q48.cjs', 'utf8');

// The rawText contains the string literal between backticks. Let's extract it.
const startTick = rawText.indexOf('`');
const endTick = rawText.indexOf('`', startTick + 1);
const questionsText = rawText.substring(startTick + 1, endTick);

const blocks = questionsText.split('------------------------------------------------------------');
const parsedQuestions = [];

blocks.forEach(block => {
  const lines = block.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 5) return;

  let textLines = [];
  let optionLines = [];
  let answerLine = null;
  
  lines.forEach(line => {
    if (/^[A-E]\)/.test(line)) {
      optionLines.push(line);
    } else if (line.startsWith('Answer:')) {
      answerLine = line;
    } else {
      textLines.push(line);
    }
  });

  if (textLines.length > 0 && /^Q\d+\./.test(textLines[0])) {
    textLines[0] = textLines[0].replace(/^Q\d+\.\s*/, '');
  }

  const text = textLines.join(' ');
  
  if (!answerLine) return;

  const answerMatch = answerLine.match(/Answer:\s*([A-E])/i);
  if (!answerMatch) return;

  if (answerLine.includes(',')) return;

  const answerLetter = answerMatch[1].toUpperCase();
  const letterToIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 };
  const correctAnswer = letterToIndex[answerLetter];

  const options = [];
  optionLines.forEach(opt => {
    let cleanOpt = opt.replace(/^[A-E]\)\s*/, '');
    options.push(cleanOpt);
  });

  if (text && options.length === 4 && correctAnswer !== undefined && correctAnswer >= 0 && correctAnswer < 4) {
    parsedQuestions.push({
      topic: "AWS Services",
      text: text,
      options: options,
      correctAnswer: correctAnswer,
      explanation: "No explanation provided."
    });
  }
});

const questionsPath = 'src/data/questions.json';
let data = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

let addedCount = 0;
parsedQuestions.forEach(nq => {
  if (!data.some(q => q.text.substring(0, 30) === nq.text.substring(0, 30))) {
    data.push(nq);
    addedCount++;
  }
});

fs.writeFileSync(questionsPath, JSON.stringify(data, null, 2));
console.log('Successfully parsed and added ' + addedCount + ' multiple choice questions.');
