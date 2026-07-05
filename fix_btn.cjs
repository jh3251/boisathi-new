const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

content = content.replace(
  "onClick={() => document.getElementById('add-location-form')?.scrollIntoView({ behavior: 'smooth' })}",
  "onClick={() => setExplorerModal({ isOpen: true })}"
);

fs.writeFileSync('src/pages/DashboardPage.tsx', content);
console.log('fixed');
