const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const targetStr = `    setEditLocModal(prev => ({ ...prev, isOpen: false }));
  };`;

const insertStr = `
  const handleExplorerDeleteLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirmText !== 'CONFIRM') return;

    let updated = false;

    if (deleteLocModal.level === 'division') {
      const idx = divList.findIndex(d => d.id === deleteLocModal.item.id);
      if (idx !== -1) {
        divList.splice(idx, 1);
        setDivList([...divList]);
        updated = true;
      }
    } else if (deleteLocModal.level === 'district') {
      const idx = distList.findIndex(d => d.id === deleteLocModal.item.id);
      if (idx !== -1) {
        distList.splice(idx, 1);
        setDistList([...distList]);
        updated = true;
      }
    } else if (deleteLocModal.level === 'upazila') {
      const idx = upaList.findIndex(u => u.id === deleteLocModal.item.id);
      if (idx !== -1) {
        upaList.splice(idx, 1);
        setUpaList([...upaList]);
        updated = true;
      }
    } else if (deleteLocModal.level === 'union') {
      const idx = unionList.findIndex(u => u.id === deleteLocModal.item.id);
      if (idx !== -1) {
        unionList.splice(idx, 1);
        setUnionList([...unionList]);
        updated = true;
      }
    }

    if (updated) {
      saveLocationsToStorage(divList, distList, upaList, unionList);
      window.dispatchEvent(new CustomEvent('bk_locations_updated'));
    }

    setDeleteLocModal(prev => ({ ...prev, isOpen: false }));
    setDeleteConfirmText('');
  };
`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, targetStr + '\n' + insertStr);
  fs.writeFileSync('src/pages/DashboardPage.tsx', content);
  console.log('Added delete function');
} else {
  console.log('Target string not found');
}
