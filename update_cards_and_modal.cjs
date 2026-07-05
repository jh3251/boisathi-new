const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const targetStr = `                      return (
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

const replacementStr = `                      return (
                        <div
                          key={item.id}
                          onClick={onClickAction}
                          className={\`p-3 md:p-4 rounded-xl border border-zinc-100 hover:border-emerald-500 hover:shadow-sm transition duration-200 \${currentLevel !== 'union' ? 'cursor-pointer' : ''} group bg-white flex flex-col md:flex-row md:items-center justify-between gap-3\`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-black text-black text-sm md:text-base leading-tight group-hover:text-emerald-600 transition-colors">
                                {item.name}
                              </h4>
                              <span className="text-[10px] bg-zinc-50 text-zinc-500 font-bold px-1.5 py-0.5 rounded text-center leading-none">
                                {details}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                              <span className="font-mono">ID: {item.id}</span>
                              <span>&bull;</span>
                              <span>{subtitle}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 self-end md:self-auto">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditLocModal({ isOpen: true, level: currentLevel, item });
                                setEditLocNameEn(item.name);
                                setEditLocNameBn(item.nameBn);
                              }}
                              className="p-1.5 md:p-2 bg-zinc-50 hover:bg-emerald-50 text-zinc-400 hover:text-emerald-600 rounded-lg transition"
                              title={lang === 'bn' ? 'সম্পাদনা করুন' : 'Edit'}
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteLocModal({ isOpen: true, level: currentLevel, item });
                                setDeleteConfirmText('');
                              }}
                              className="p-1.5 md:p-2 bg-zinc-50 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded-lg transition"
                              title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            {currentLevel !== 'union' && (
                              <button className="flex items-center gap-1 pl-2 pr-3 py-1.5 md:py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[10px] font-black uppercase transition ml-1">
                                <span>{lang === 'bn' ? 'ভিতরে' : 'Inside'}</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  console.log('Modified list card format');
} else {
  console.log('Target string for list card not found');
}

// Add Delete Modal UI
const modalTargetStr = `            {/* EDIT LOCATION IN EXPLORER SUB-MODAL */}`;
const deleteModalStr = `            {/* DELETE LOCATION IN EXPLORER SUB-MODAL */}
            {deleteLocModal.isOpen && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setDeleteLocModal(prev => ({ ...prev, isOpen: false }))}></div>
                <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-6 md:p-8 animate-in zoom-in duration-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-black text-black text-base">
                          {lang === 'bn' ? 'স্থান মুছে ফেলুন' : 'Delete Location'}
                        </h4>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                          {deleteLocModal.item?.name}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setDeleteLocModal(prev => ({ ...prev, isOpen: false }))}
                      className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-full transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 text-[10px] text-red-800 font-semibold mb-4 leading-relaxed">
                    {lang === 'bn' 
                      ? 'সতর্কতা: এই স্থানটি মুছে ফেললে এর অধীনে থাকা সকল স্থান মুছে যাবে না, তবে এটি অনুসন্ধান থেকে বাদ পড়বে। আপনি কি নিশ্চিত?' 
                      : 'Warning: Deleting this location will hide it from the search index. Are you sure?'}
                  </div>

                  <form onSubmit={handleExplorerDeleteLocation} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">
                        {lang === 'bn' ? 'CONFIRM টাইপ করুন' : 'Type CONFIRM to delete'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="CONFIRM"
                        value={deleteConfirmText}
                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-black outline-none focus:bg-white focus:border-red-300 transition-all text-black"
                      />
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setDeleteLocModal(prev => ({ ...prev, isOpen: false }))}
                        className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 text-black rounded-xl text-xs font-black uppercase transition text-center font-bold"
                      >
                        {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        disabled={deleteConfirmText !== 'CONFIRM'}
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase transition text-center shadow-md active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        {lang === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

`;

if (content.includes(modalTargetStr)) {
  content = content.replace(modalTargetStr, deleteModalStr + modalTargetStr);
  console.log('Added delete modal UI');
} else {
  console.log('Target string for delete modal not found');
}

// Modify the grid template to be flex column
content = content.replace(
  'className="grid grid-cols-1 sm:grid-cols-2 gap-3"',
  'className="flex flex-col gap-2"'
);
content = content.replace(
  'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"',
  'className="flex flex-col gap-2"'
);

fs.writeFileSync('src/pages/DashboardPage.tsx', content);
