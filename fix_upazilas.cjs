const fs = require('fs');
let content = fs.readFileSync('src/constants.ts', 'utf8');

const removeSuffix = (str) => {
  return str.replace(/\s+(Division|District|Upazila|Thana)$/i, '')
            .replace(/\s+(বিভাগ|জেলা|উপজেলা|থানা)$/i, '');
};

const arrayRegex = /(export const DEFAULT_UPAZILAS: Upazila\[\] = \[)([\s\S]*?)(\];\n\nexport const DIVISIONS: Division\[\])/;

const match = content.match(arrayRegex);
if (match) {
  let [_, p1, upas, p3] = match;
  
  const processItems = (itemsStr) => {
    return itemsStr.split('\n').map(line => {
      line = line.replace(/name:\s*['"]([^'"]+)['"]/, (m, p) => `name: '${removeSuffix(p)}'`);
      line = line.replace(/nameBn:\s*['"]([^'"]+)['"]/, (m, p) => `nameBn: '${removeSuffix(p)}'`);
      return line;
    }).join('\n');
  };

  const newUpas = processItems(upas);

  content = content.replace(arrayRegex, `${p1}${newUpas}${p3}`);
  fs.writeFileSync('src/constants.ts', content, 'utf8');
  console.log('Fixed upazilas');
} else {
  console.log('Regex did not match!');
}
