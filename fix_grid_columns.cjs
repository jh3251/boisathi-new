const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

// The original grid was grid-cols-1 sm:grid-cols-2 md:grid-cols-3
// Now that the modal is smaller (max-w-2xl), 3 columns might be too squished.
// Let's make it 2 columns.
content = content.replace(
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
  'grid grid-cols-1 sm:grid-cols-2 gap-3'
);

fs.writeFileSync('src/pages/DashboardPage.tsx', content);
