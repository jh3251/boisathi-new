const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const uiCode = `
                      <button
                        type="button"
                        onClick={() => setExplorerModal({ isOpen: true })}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:opacity-90 rounded-xl text-xs font-black uppercase transition-all shadow-md active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        {lang === 'bn' ? 'স্থান যোগ করুন' : 'Add Location'}
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white hover:opacity-90 rounded-xl text-xs font-black uppercase transition-all shadow-md active:scale-95"
                      >
                        <Map className="w-4 h-4" />
                        {lang === 'bn' ? 'JSON ইম্পোর্ট' : 'Import JSON'}
                      </button>
                      <input 
                        type="file" 
                        accept=".json" 
                        ref={fileInputRef} 
                        onChange={handleImportLocations} 
                        className="hidden" 
                      />
`;

code = code.replace(
    /<button\s*type="button"\s*onClick=\{\(\) => setExplorerModal\(\{ isOpen: true \}\)\}\s*className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:opacity-90 rounded-xl text-xs font-black uppercase transition-all shadow-md active:scale-95"\s*>\s*<Plus className="w-4 h-4" \/>\s*\{lang === 'bn' \? 'স্থান যোগ করুন' : 'Add Location'\}\s*<\/button>/,
    uiCode
);

fs.writeFileSync('src/pages/DashboardPage.tsx', code, 'utf8');
console.log('Added Import JSON button to DashboardPage.tsx');
