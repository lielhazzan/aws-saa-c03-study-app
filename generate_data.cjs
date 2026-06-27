const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'test-summaries', '1-Udemy-stefan', 'Udemy - Ultimate AWS Certified Solutions Architect Associate 2025 (2.2025)');
const outputFilePath = path.join(__dirname, 'src', 'data', 'courseData.json');

// Ensure data dir exists
if (!fs.existsSync(path.join(__dirname, 'src', 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'src', 'data'));
}

const courseData = [];

if (fs.existsSync(baseDir)) {
    const sections = fs.readdirSync(baseDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .sort((a, b) => {
            const numA = parseInt(a.split('.')[0]) || 0;
            const numB = parseInt(b.split('.')[0]) || 0;
            return numA - numB;
        });

    sections.forEach((sectionName, index) => {
        const sectionPath = path.join(baseDir, sectionName);
        const sectionFiles = fs.readdirSync(sectionPath);
        
        const videos = sectionFiles
            .filter(file => file.endsWith('.mp4'))
            .map(file => {
                const title = file.replace('.mp4', '');
                return {
                    title: title,
                    filename: file,
                    path: `/course-content/${sectionName}/${file}` // Assuming we serve it from public/course-content
                };
            })
            .sort((a, b) => {
                const numA = parseInt(a.title.split('.')[0]) || 0;
                const numB = parseInt(b.title.split('.')[0]) || 0;
                return numA - numB;
            });

        courseData.push({
            id: index + 1,
            title: sectionName,
            status: 'pending',
            videos: videos
        });
    });
}

fs.writeFileSync(outputFilePath, JSON.stringify(courseData, null, 2));
console.log('Course data generated successfully at', outputFilePath);
