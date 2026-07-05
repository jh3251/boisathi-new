const fs = require('fs');

let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');
const returnIdx = content.lastIndexOf('return (');
console.log(content.substring(returnIdx - 100, returnIdx + 2000));
