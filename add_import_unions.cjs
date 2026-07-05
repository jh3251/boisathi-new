const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

if (!code.includes('fileInputRef')) {
    code = code.replace(
        "const [deleteLocModal, setDeleteLocModal] = useState({ isOpen: false, id: '', type: '' });",
        "const [deleteLocModal, setDeleteLocModal] = useState({ isOpen: false, id: '', type: '' });\n  const fileInputRef = React.useRef<HTMLInputElement>(null);"
    );
}

if (!code.includes('handleImportLocations')) {
    const importCode = `
  const handleImportLocations = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        if (!Array.isArray(data)) {
            alert(lang === 'bn' ? 'ফাইলটি সঠিক JSON অ্যারে নয়' : 'File must contain a JSON array');
            return;
        }

        let updatedDivs = [...divList];
        let updatedDists = [...distList];
        let updatedUpas = [...upaList];
        let updatedUnions = [...unionList];
        let addedCount = 0;

        data.forEach((item: any) => {
            if (locType === 'division' && item.id && item.name && item.nameBn) {
                if (!updatedDivs.find(d => d.id === item.id)) {
                    updatedDivs.push({ id: item.id, name: item.name, nameBn: item.nameBn });
                    addedCount++;
                }
            } else if (locType === 'district' && item.id && item.divisionId && item.name && item.nameBn) {
                if (!updatedDists.find(d => d.id === item.id)) {
                    updatedDists.push({ id: item.id, divisionId: item.divisionId, name: item.name, nameBn: item.nameBn });
                    addedCount++;
                }
            } else if (locType === 'upazila' && item.id && item.districtId && item.name && item.nameBn) {
                if (!updatedUpas.find(u => u.id === item.id)) {
                    updatedUpas.push({ id: item.id, districtId: item.districtId, name: item.name, nameBn: item.nameBn });
                    addedCount++;
                }
            } else if (locType === 'union' && item.id && item.upazilaId && item.name && item.nameBn) {
                if (!updatedUnions.find(u => u.id === item.id)) {
                    updatedUnions.push({ id: item.id, upazilaId: item.upazilaId, name: item.name, nameBn: item.nameBn });
                    addedCount++;
                }
            }
        });

        if (addedCount > 0) {
            setDivList(updatedDivs);
            setDistList(updatedDists);
            setUpaList(updatedUpas);
            setUnionList(updatedUnions);
            saveLocationsToStorage(updatedDivs, updatedDists, updatedUpas, updatedUnions);
            window.dispatchEvent(new CustomEvent('bk_locations_updated'));
            alert(lang === 'bn' ? \`\${addedCount} টি স্থান সফলভাবে যুক্ত হয়েছে\` : \`Successfully imported \${addedCount} locations\`);
        } else {
            alert(lang === 'bn' ? 'নতুন কোনো স্থান পাওয়া যায়নি' : 'No new valid locations found in file');
        }

      } catch (err) {
        alert(lang === 'bn' ? 'ফাইল পড়তে সমস্যা হয়েছে' : 'Error reading file');
      }
      
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };
`;
    code = code.replace(
        "const handleExplorerAddLocation = (e: React.FormEvent) => {",
        importCode + "\n  const handleExplorerAddLocation = (e: React.FormEvent) => {"
    );
}

const uiCode = `
                      <button
                        onClick={() => setAddLocModal({ isOpen: true, level: locType })}
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-black text-sm uppercase hover:bg-zinc-800 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        {lang === 'bn' ? 'স্থান যোগ করুন' : 'Add Location'}
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm uppercase hover:bg-emerald-700 transition-colors"
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
    /<button[^>]*>\s*<Plus className="w-4 h-4" \/>\s*\{lang === 'bn' \? 'স্থান যোগ করুন' : 'Add Location'\}\s*<\/button>/,
    uiCode
);

fs.writeFileSync('src/pages/DashboardPage.tsx', code, 'utf8');
console.log('Added Import JSON functionality to DashboardPage.tsx');
