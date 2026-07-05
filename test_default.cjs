const fs = require('fs');
let constants = fs.readFileSync('src/constants.ts', 'utf8');

constants = constants.replace(
  `syncLocationsWithStorage();`,
  `console.log("DEFAULT_UNIONS length at sync time:", DEFAULT_UNIONS?.length);\nsyncLocationsWithStorage();`
);

fs.writeFileSync('src/constants.ts', constants, 'utf8');
