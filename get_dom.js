const fs = require('fs');

// We just want to parse what div:nth-of-type(5) is in DashboardPage.tsx
// It's probably the 5th div child of something. 
// We can just look at the return statement of DashboardPage.tsx
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');
const returnIdx = content.indexOf('return (');
console.log(content.substring(returnIdx, returnIdx + 1000));
