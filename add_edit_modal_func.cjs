const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const targetStr = `    setAddLocModal({ isOpen: false, level: 'division' });
    setAddLocNameEn('');
    setAddLocNameBn('');
  };`;

const insertStr = `
  const handleExplorerEditLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLocNameEn.trim() || !editLocNameBn.trim()) return;

    let updated = false;

    if (editLocModal.level === 'division') {
      const idx = divList.findIndex(d => d.id === editLocModal.item.id);
      if (idx !== -1) {
        divList[idx].name = editLocNameEn.trim();
        divList[idx].nameBn = editLocNameBn.trim();
        setDivList([...divList]);
        updated = true;
      }
    } else if (editLocModal.level === 'district') {
      const idx = distList.findIndex(d => d.id === editLocModal.item.id);
      if (idx !== -1) {
        distList[idx].name = editLocNameEn.trim();
        distList[idx].nameBn = editLocNameBn.trim();
        setDistList([...distList]);
        updated = true;
      }
    } else if (editLocModal.level === 'upazila') {
      const idx = upaList.findIndex(u => u.id === editLocModal.item.id);
      if (idx !== -1) {
        upaList[idx].name = editLocNameEn.trim();
        upaList[idx].nameBn = editLocNameBn.trim();
        setUpaList([...upaList]);
        updated = true;
      }
    } else if (editLocModal.level === 'union') {
      const idx = unionList.findIndex(u => u.id === editLocModal.item.id);
      if (idx !== -1) {
        unionList[idx].name = editLocNameEn.trim();
        unionList[idx].nameBn = editLocNameBn.trim();
        setUnionList([...unionList]);
        updated = true;
      }
    }

    if (updated) {
      saveLocationsToStorage(divList, distList, upaList, unionList);
      window.dispatchEvent(new CustomEvent('bk_locations_updated'));
    }

    setEditLocModal(prev => ({ ...prev, isOpen: false }));
  };
`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, targetStr + '\n' + insertStr);
  fs.writeFileSync('src/pages/DashboardPage.tsx', content);
  console.log('Added handle function');
} else {
  console.log('Target string not found');
}
