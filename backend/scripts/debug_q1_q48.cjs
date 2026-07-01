const fs = require('fs');
const rawText = fs.readFileSync('parse_q1_q48.cjs', 'utf8');
const blocks = rawText.split('------------------------------------------------------------');
console.log('blocks.length', blocks.length);
if (blocks.length > 1) {
  const block = blocks[1];
  const lines = block.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
  console.log('lines', lines);
  
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
  console.log('textLines', textLines);
  console.log('optionLines', optionLines);
  console.log('answerLine', answerLine);
}
