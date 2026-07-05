const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');
const searchIdx = content.indexOf('ITEMS GRID');
console.log(content.substring(searchIdx, searchIdx + 4000));
