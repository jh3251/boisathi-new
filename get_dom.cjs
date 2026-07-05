const fs = require('fs');

let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');
const returnIdx = content.indexOf('return (');
console.log(content.substring(returnIdx, returnIdx + 2000));
