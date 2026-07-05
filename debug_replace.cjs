const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const idx = content.indexOf('{/* Locations Search */}');
console.log(content.substring(idx - 50, idx + 50));
