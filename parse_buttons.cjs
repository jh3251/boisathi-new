const fs = require('fs');

const home = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');
const dashboard = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

console.log('HomePage has button:nth-of-type(3)?', home.includes('button'));
console.log('DashboardPage has button:nth-of-type(3)?', dashboard.includes('button'));
