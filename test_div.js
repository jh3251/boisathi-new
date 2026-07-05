const fs = require('fs');
let content = fs.readFileSync('src/constants.ts', 'utf8');
const arrayRegex = /(export const DEFAULT_DIVISIONS: Division\[\] = \[)([\s\S]*?)(\];)/;
const match = content.match(arrayRegex);
if(match) console.log(match[2]);
