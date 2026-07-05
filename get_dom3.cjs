const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');
const searchIdx = content.indexOf('LIST ITEMS');
console.log(content.substring(searchIdx, searchIdx + 3000));
