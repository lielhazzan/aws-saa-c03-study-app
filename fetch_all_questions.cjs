const https = require('https');

https.get('https://get-certified-exams.onrender.com/assets/index-CvNEPD3K.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    require('fs').writeFileSync('bundle.js', data);
    console.log('Saved bundle.js, size:', data.length);
  });
}).on('error', err => {
  console.error(err);
});
