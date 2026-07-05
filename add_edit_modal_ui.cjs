const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const targetStr = `            {/* ADD LOCATION IN EXPLORER SUB-MODAL */}`;

const insertStr = `            {/* EDIT LOCATION IN EXPLORER SUB-MODAL */}
            {editLocModal.isOpen && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setEditLocModal(prev => ({ ...prev, isOpen: false }))}></div>
                <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-6 md:p-8 animate-in zoom-in duration-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                        <Edit2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-black text-black text-base">
                          {lang === 'bn' ? 'স্থান সম্পাদনা করুন' : 'Edit Location'}
                        </h4>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                          ID: {editLocModal.item?.id}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setEditLocModal(prev => ({ ...prev, isOpen: false }))}
                      className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-full transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleExplorerEditLocation} className="space-y-4">
                    {/* English Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">
                        {lang === 'bn' ? 'ইংরেজি নাম' : 'English Name'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editLocNameEn}
                        onChange={(e) => setEditLocNameEn(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-black outline-none focus:bg-white focus:border-accent transition-all text-black"
                      />
                    </div>

                    {/* Bangla Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">
                        {lang === 'bn' ? 'বাংলা নাম' : 'Bangla Name'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editLocNameBn}
                        onChange={(e) => setEditLocNameBn(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-black outline-none focus:bg-white focus:border-accent transition-all text-black"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setEditLocModal(prev => ({ ...prev, isOpen: false }))}
                        className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 text-black rounded-xl text-xs font-black uppercase transition text-center font-bold"
                      >
                        {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase transition text-center shadow-md active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {lang === 'bn' ? 'সেভ করুন' : 'Save'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, insertStr + targetStr);
  fs.writeFileSync('src/pages/DashboardPage.tsx', content);
  console.log('Added edit modal');
} else {
  console.log('Target string not found');
}
