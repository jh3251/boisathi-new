const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const startIdx = content.indexOf('                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">');
const endIdx = content.indexOf('                        {/* List Column (Span 3) */}');

let targetContent = content.substring(startIdx, endIdx);
let replacementContent = `                      <div className="flex flex-col gap-8">
`;
content = content.substring(0, startIdx) + replacementContent + content.substring(endIdx);

content = content.replace(
  '                        {/* List Column (Span 3) */}\n                        <div className="lg:col-span-3">',
  '                        {/* List Column */}\n                        <div className="w-full">'
);

fs.writeFileSync('src/pages/DashboardPage.tsx', content);
console.log('removed form');
