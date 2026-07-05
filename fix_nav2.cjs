const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const targetStr = `                      {/* Locations Search */}`;

const replaceStr = `                      <button
                        type="button"
                        onClick={() => document.getElementById('add-location-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:opacity-90 rounded-xl text-xs font-black uppercase transition-all shadow-md active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        {lang === 'bn' ? 'স্থান যোগ করুন' : 'Add Location'}
                      </button>
                      </div>
                      {/* Locations Search */}`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/pages/DashboardPage.tsx', content);
console.log('fixed');
