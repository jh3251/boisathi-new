const fs = require('fs');

let content = fs.readFileSync('src/constants.ts', 'utf8');

// 1. Reorder divisions
const divRegex = /export const DEFAULT_DIVISIONS: Division\[\] = \[([\s\S]*?)\];/;
const divMatch = content.match(divRegex);
if (divMatch) {
  const newDivs = `
  { id: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা' },
  { id: 'khulna', name: 'Khulna', nameBn: 'খুলনা' },
  { id: 'chattogram', name: 'Chattogram', nameBn: 'চট্টগ্রাম' },
  { id: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী' },
  { id: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট' },
  { id: 'rangpur', name: 'Rangpur', nameBn: 'রংপুর' },
  { id: 'mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
  { id: 'barishal', name: 'Barishal', nameBn: 'বরিশাল' },
`;
  content = content.replace(divRegex, `export const DEFAULT_DIVISIONS: Division[] = [${newDivs}];`);
}

// 2. Remove suffixes from names
// We can do this by regex replacing name: 'Something Upazila' -> name: 'Something'
// Same for nameBn: 'সামথিং উপজেলা' -> nameBn: 'সামথিং'

const removeSuffix = (str) => {
  return str.replace(/\s+(Division|District|Upazila|Thana)$/i, '')
            .replace(/\s+(বিভাগ|জেলা|উপজেলা|থানা)$/i, '');
};

const arrayRegex = /(export const DEFAULT_DISTRICTS: District\[\] = \[)([\s\S]*?)(\];\n\nexport const DEFAULT_UPAZILAS: Upazila\[\] = \[)([\s\S]*?)(\];\n\nexport const DEFAULT_UNIONS: Union\[\] = \[)/;

const match = content.match(arrayRegex);
if (match) {
  let [_, p1, dists, p3, upas, p5] = match;
  
  const processItems = (itemsStr) => {
    return itemsStr.split('\n').map(line => {
      // Find name: '...'
      line = line.replace(/name:\s*['"]([^'"]+)['"]/, (m, p) => `name: '${removeSuffix(p)}'`);
      // Find nameBn: '...'
      line = line.replace(/nameBn:\s*['"]([^'"]+)['"]/, (m, p) => `nameBn: '${removeSuffix(p)}'`);
      return line;
    }).join('\n');
  };

  const newDists = processItems(dists);
  const newUpas = processItems(upas);

  content = content.replace(arrayRegex, `${p1}${newDists}${p3}${newUpas}${p5}`);
}

fs.writeFileSync('src/constants.ts', content, 'utf8');
console.log('Done');
