const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const targetStr = `{/* Nested navigation for location types */}
                      <div className="flex bg-zinc-100 p-1.5 rounded-2xl max-w-lg">`;

const replaceStr = `{/* Nested navigation for location types */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex bg-zinc-100 p-1.5 rounded-2xl max-w-lg w-full">`;

content = content.replace(targetStr, replaceStr);

const targetStr2 = `{lang === 'bn' ? 'ইউনিয়ন' : 'Union'}
                        </button>
                      </div>
                      {/* Locations Search */}`;

const replaceStr2 = `{lang === 'bn' ? 'ইউনিয়ন' : 'Union'}
                        </button>
                      </div>
                      <button
                        onClick={() => document.getElementById('add-location-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-black uppercase transition-all shadow-md active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        {lang === 'bn' ? 'স্থান যোগ করুন' : 'Add Location'}
                      </button>
                      </div>
                      {/* Locations Search */}`;

content = content.replace(targetStr2, replaceStr2);

fs.writeFileSync('src/pages/DashboardPage.tsx', content);
console.log('patched');
