const fs = require('fs');
let content = fs.readFileSync('src/lib/content.ts', 'utf8');

// 1. Remove AI-Assisted Chip Design course
const aiCourseStart = content.indexOf('slug: "ai-assisted-chip-design",');
if (aiCourseStart !== -1) {
    const aiCourseObjectStart = content.lastIndexOf('{', aiCourseStart);
    const aiCourseObjectEnd = content.indexOf('},', aiCourseStart) + 2;
    content = content.slice(0, aiCourseObjectStart) + content.slice(aiCourseObjectEnd);
}

// 2. Remove AI discipline
const aiDiscStart = content.indexOf('id: "ai",');
if (aiDiscStart !== -1) {
    const aiDiscObjectStart = content.lastIndexOf('{', aiDiscStart);
    const aiDiscObjectEnd = content.indexOf('},', aiDiscStart) + 2;
    content = content.slice(0, aiDiscObjectStart) + content.slice(aiDiscObjectEnd);
}

// 3. Remove AI article
const aiArtStart = content.indexOf('slug: "ai-in-eda-honest-look",');
if (aiArtStart !== -1) {
    const aiArtObjectStart = content.lastIndexOf('{', aiArtStart);
    const aiArtObjectEnd = content.indexOf('},', aiArtStart) + 2;
    content = content.slice(0, aiArtObjectStart) + content.slice(aiArtObjectEnd);
}

fs.writeFileSync('src/lib/content.ts', content);
console.log('Done');
