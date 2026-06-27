const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'test-summaries/file_A178D8E2-910D-49B0-BD5E-7C9D7F9C815C.pdf';
let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    console.log("Number of pages:", data.numpages);
    console.log("Text preview:", data.text.substring(0, 500));
}).catch(err => {
    console.error("Error reading PDF:", err);
});
