const fs = require('fs');
const rawText = fs.readFileSync('parse_q1_q48.cjs', 'utf8');

// evaluate the logic of parse_q1_q48.cjs directly
// let's just run exactly what parse_q1_q48 does but with console logs inside the loop

const blocks = rawText.split('------------------------------------------------------------');
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
  
  if (!answerLine) {
    console.log("no answer line:", block.substring(0, 50));
    return;
  }

  const answerMatch = answerLine.match(/Answer:\s*([A-E])/i);
  if (!answerMatch) {
    console.log("no answer match:", answerLine);
    return;
  }

  if (answerLine.includes(',')) {
    console.log("multi select:", answerLine);
    return;
  }

  const answerLetter = answerMatch[1].toUpperCase();
  const letterToIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 };
  const correctAnswer = letterToIndex[answerLetter];

  const options = [];
  optionLines.forEach(opt => {
    let cleanOpt = opt.replace(/^[A-E]\)\s*/, '');
    options.push(cleanOpt);
  });

  if (text && options.length === 4 && correctAnswer !== undefined && correctAnswer >= 0 && correctAnswer < 4) {
    parsedQuestions.push({text});
  } else {
    console.log("failed conditions:", "text:", !!text, "options.length:", options.length, "correctAnswer:", correctAnswer);
  }
});

console.log('Parsed:', parsedQuestions.length);
