const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const targetStr = `                      return (
                        <div
                          key={item.id}
                          onClick={onClickAction}
                          className={\`p-5 rounded-2xl border border-zinc-100 hover:border-emerald-500 hover:shadow-lg transition duration-200 \${currentLevel !== 'union' ? 'cursor-pointer' : ''} group bg-white flex flex-col justify-between\`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                                ID: {item.id}
                              </span>
                              {currentLevel !== 'union' && (
                                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition duration-200" />
                              )}
                            </div>
                            <h4 className="font-black text-black text-base group-hover:text-emerald-600 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-zinc-500 font-semibold text-xs mt-0.5">
                              {details}
                            </p>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-zinc-50 flex items-center justify-between">
                            <span className="text-[10px] bg-zinc-50 text-zinc-500 font-bold px-2 py-1 rounded-lg">
                              {subtitle}
                            </span>
                            {currentLevel !== 'union' && (
                              <span className="text-[9px] font-black uppercase text-emerald-600">
                                {lang === 'bn' ? 'ভিতরে যান' : 'Go Inside'}
                              </span>
                            )}
                          </div>
                        </div>
                      );`;

const replacementStr = `                      return (
                        <div
                          key={item.id}
                          onClick={onClickAction}
                          className={\`p-4 rounded-xl border border-zinc-100 hover:border-emerald-500 hover:shadow-md transition duration-200 \${currentLevel !== 'union' ? 'cursor-pointer' : ''} group bg-white flex flex-col justify-between\`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                                ID: {item.id}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditLocModal({ isOpen: true, level: currentLevel, item });
                                    setEditLocNameEn(item.name);
                                    setEditLocNameBn(item.nameBn);
                                  }}
                                  className="p-1 hover:bg-emerald-50 text-zinc-400 hover:text-emerald-600 rounded-md transition"
                                  title={lang === 'bn' ? 'সম্পাদনা করুন' : 'Edit Location'}
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <h4 className="font-black text-black text-[15px] leading-tight group-hover:text-emerald-600 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-zinc-500 font-semibold text-[11px] mt-0.5">
                              {details}
                            </p>
                          </div>
                          
                          <div className="mt-3 pt-2.5 border-t border-zinc-50 flex items-center justify-between">
                            <span className="text-[9px] bg-zinc-50 text-zinc-500 font-bold px-2 py-1 rounded-md">
                              {subtitle}
                            </span>
                            {currentLevel !== 'union' && (
                              <span className="text-[9px] font-black uppercase text-emerald-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
                                {lang === 'bn' ? 'ভিতরে যান' : 'Go Inside'}
                                <ChevronRight className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                        </div>
                      );`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/pages/DashboardPage.tsx', content);
  console.log('Modified cards');
} else {
  console.log('Target string not found');
}
