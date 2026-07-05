const fs = require('fs');
let content = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

const targetStr = `  const [addLocNameEn, setAddLocNameEn] = useState('');
  const [addLocNameBn, setAddLocNameBn] = useState('');`;

const insertStr = `  const [editLocModal, setEditLocModal] = useState<{
    isOpen: boolean;
    level: 'division' | 'district' | 'upazila' | 'union';
    item: any;
  }>({ isOpen: false, level: 'division', item: null });
  const [editLocNameEn, setEditLocNameEn] = useState('');
  const [editLocNameBn, setEditLocNameBn] = useState('');
`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, targetStr + '\n' + insertStr);
  fs.writeFileSync('src/pages/DashboardPage.tsx', content);
  console.log('Added state');
} else {
  console.log('Target string not found');
}
