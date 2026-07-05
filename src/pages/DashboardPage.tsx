import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { BookListing, UserProfile, Conversation, Union } from '../types';
import BookCard from '../components/BookCard';
import { PlusCircle, Package, Heart, Settings, LayoutGrid, Trash2, Save, Loader2, CheckCircle2, Info, AlertTriangle, MessageCircle, ChevronRight, User, Sliders, Shield, Globe, Users, BarChart3, Copy, MapPin, Plus, X, ChevronLeft, Search, Folder, Map, Edit2, RotateCcw } from 'lucide-react';
import { DIVISIONS, DISTRICTS, UPAZILAS, UNIONS, saveLocationsToStorage, syncLocationsWithStorage } from '../constants';
import { useTranslation } from '../App';

interface DashboardPageProps {
  user: UserProfile;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'ads' | 'saved' | 'account' | 'messages' | 'settings'>('ads');
  
  const isSuperAdmin = user.email === 'jhshifat21@gmail.com';
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [allListings, setAllListings] = useState<BookListing[]>([]);
  const [totalConvs, setTotalConvs] = useState<number>(0);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminTab, setAdminTab] = useState<'listings' | 'users' | 'seo' | 'locations'>('listings');
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');

  // Location manager states
  const [locType, setLocType] = useState<'division' | 'district' | 'upazila' | 'union'>('division');
  const [locationsSearch, setLocationsSearch] = useState('');

  // Location drill-down explorer states
  const [explorerModal, setExplorerModal] = useState<{
    isOpen: boolean;
    currentDivisionId?: string;
    currentDistrictId?: string;
    currentUpazilaId?: string;
  }>({ isOpen: false });
  const [explorerSearch, setExplorerSearch] = useState('');

  // Sub-modal states for adding location inside explorer
  const [addLocModal, setAddLocModal] = useState<{
    isOpen: boolean;
    level: 'division' | 'district' | 'upazila' | 'union';
    parentDivId?: string;
    parentDistId?: string;
    parentUpaId?: string;
  }>({ isOpen: false, level: 'division' });
  const [addLocNameEn, setAddLocNameEn] = useState('');
  const [addLocNameBn, setAddLocNameBn] = useState('');
  const [editLocModal, setEditLocModal] = useState<{
    isOpen: boolean;
    level: 'division' | 'district' | 'upazila' | 'union';
    item: any;
  }>({ isOpen: false, level: 'division', item: null });
  const [editLocNameEn, setEditLocNameEn] = useState('');
  const [editLocNameBn, setEditLocNameBn] = useState('');
  const [deleteLocModal, setDeleteLocModal] = useState<{
    isOpen: boolean;
    level: 'division' | 'district' | 'upazila' | 'union';
    item: any;
  }>({ isOpen: false, level: 'division', item: null });
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);



  const [locationSwitches, setLocationSwitches] = useState(() => {
    const saved = localStorage.getItem('bk_filter_switches');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return { division: true, district: true, upazila: true, union: true };
  });

  const [showSwitchesSaved, setShowSwitchesSaved] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | null }>({ message: '', type: null });
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev.message === message ? { message: '', type: null } : prev);
    }, 4000);
  };

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const requestConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleSaveLocationSwitches = () => {
    localStorage.setItem('bk_filter_switches', JSON.stringify(locationSwitches));
    setShowSwitchesSaved(true);
    setTimeout(() => setShowSwitchesSaved(false), 3000);
    window.dispatchEvent(new Event('bk_filter_switches_updated'));
  };
  
  // State variables representing the current list of locations
  const [divList, setDivList] = useState([...DIVISIONS]);
  const [distList, setDistList] = useState([...DISTRICTS]);
  const [upaList, setUpaList] = useState([...UPAZILAS]);
  const [unionList, setUnionList] = useState([...UNIONS]);

  // Form states for adding new location
  const [newDivId, setNewDivId] = useState('');
  const [newDivName, setNewDivName] = useState('');
  const [newDivNameBn, setNewDivNameBn] = useState('');

  const [newDistId, setNewDistId] = useState('');
  const [newDistDivId, setNewDistDivId] = useState('');
  const [newDistName, setNewDistName] = useState('');
  const [newDistNameBn, setNewDistNameBn] = useState('');

  const [newUpaId, setNewUpaId] = useState('');
  const [newUpaDistId, setNewUpaDistId] = useState('');
  const [newUpaName, setNewUpaName] = useState('');
  const [newUpaNameBn, setNewUpaNameBn] = useState('');

  const [newUnionId, setNewUnionId] = useState('');
  const [newUnionUpaId, setNewUnionUpaId] = useState('');
  const [newUnionName, setNewUnionName] = useState('');
  const [newUnionNameBn, setNewUnionNameBn] = useState('');

  const handleAddDivision = (e: React.FormEvent) => {
    e.preventDefault();
    const id = newDivId.trim().toLowerCase().replace(/\s+/g, '-');
    if (!id || !newDivName || !newDivNameBn) {
      showToast(lang === 'bn' ? 'সবগুলো ঘর পূরণ করুন' : 'Please fill all fields', 'error');
      return;
    }
    if (divList.some(d => d.id === id)) {
      showToast(lang === 'bn' ? 'এই বিভাগ আইডি ইতিমধ্যে বিদ্যমান' : 'Division ID already exists', 'error');
      return;
    }
    const updatedDivs = [...divList, { id, name: newDivName.trim(), nameBn: newDivNameBn.trim() }];
    setDivList(updatedDivs);
    saveLocationsToStorage(updatedDivs, distList, upaList, unionList);
    setNewDivId(''); setNewDivName(''); setNewDivNameBn('');
    showToast(lang === 'bn' ? 'বিভাগ সফলভাবে যোগ করা হয়েছে' : 'Division added successfully', 'success');
  };

  const handleAddDistrict = (e: React.FormEvent) => {
    e.preventDefault();
    const id = newDistId.trim().toLowerCase().replace(/\s+/g, '-');
    if (!id || !newDistDivId || !newDistName || !newDistNameBn) {
      showToast(lang === 'bn' ? 'সবগুলো ঘর পূরণ করুন' : 'Please fill all fields', 'error');
      return;
    }
    if (distList.some(d => d.id === id)) {
      showToast(lang === 'bn' ? 'এই জেলা আইডি ইতিমধ্যে বিদ্যমান' : 'District ID already exists', 'error');
      return;
    }
    const updatedDists = [...distList, { id, divisionId: newDistDivId, name: newDistName.trim(), nameBn: newDistNameBn.trim() }];
    setDistList(updatedDists);
    saveLocationsToStorage(divList, updatedDists, upaList, unionList);
    setNewDistId(''); setNewDistDivId(''); setNewDistName(''); setNewDistNameBn('');
    showToast(lang === 'bn' ? 'জেলা সফলভাবে যোগ করা হয়েছে' : 'District added successfully', 'success');
  };

  const handleAddUpazila = (e: React.FormEvent) => {
    e.preventDefault();
    const id = newUpaId.trim().toLowerCase().replace(/\s+/g, '-');
    if (!id || !newUpaDistId || !newUpaName || !newUpaNameBn) {
      showToast(lang === 'bn' ? 'সবগুলো ঘর পূরণ করুন' : 'Please fill all fields', 'error');
      return;
    }
    if (upaList.some(u => u.id === id)) {
      showToast(lang === 'bn' ? 'এই উপজেলা আইডি ইতিমধ্যে বিদ্যমান' : 'Upazila ID already exists', 'error');
      return;
    }
    const updatedUpas = [...upaList, { id, districtId: newUpaDistId, name: newUpaName.trim(), nameBn: newUpaNameBn.trim() }];
    setUpaList(updatedUpas);
    saveLocationsToStorage(divList, distList, updatedUpas, unionList);
    setNewUpaId(''); setNewUpaDistId(''); setNewUpaName(''); setNewUpaNameBn('');
    showToast(lang === 'bn' ? 'উপজেলা সফলভাবে যোগ করা হয়েছে' : 'Upazila added successfully', 'success');
  };

  const handleAddUnion = (e: React.FormEvent) => {
    e.preventDefault();
    const id = newUnionId.trim().toLowerCase().replace(/\s+/g, '-');
    if (!id || !newUnionUpaId || !newUnionName || !newUnionNameBn) {
      showToast(lang === 'bn' ? 'সবগুলো ঘর পূরণ করুন' : 'Please fill all fields', 'error');
      return;
    }
    if (unionList.some(u => u.id === id)) {
      showToast(lang === 'bn' ? 'এই ইউনিয়ন আইডি ইতিমধ্যে বিদ্যমান' : 'Union ID already exists', 'error');
      return;
    }
    const updatedUnions = [...unionList, { id, upazilaId: newUnionUpaId, name: newUnionName.trim(), nameBn: newUnionNameBn.trim() }];
    setUnionList(updatedUnions);
    saveLocationsToStorage(divList, distList, upaList, updatedUnions);
    setNewUnionId(''); setNewUnionUpaId(''); setNewUnionName(''); setNewUnionNameBn('');
    showToast(lang === 'bn' ? 'ইউনিয়ন সফলভাবে যোগ করা হয়েছে' : 'Union added successfully', 'success');
  };

  
  const handleImportLocations = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        if (!Array.isArray(data)) {
            showToast(lang === 'bn' ? 'ফাইলটি সঠিক JSON অ্যারে নয়' : 'File must contain a JSON array', 'error');
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
            showToast(lang === 'bn' ? `${addedCount} টি স্থান সফলভাবে যুক্ত হয়েছে` : `Successfully imported ${addedCount} locations`, 'success');
        } else {
            showToast(lang === 'bn' ? 'নতুন কোনো স্থান পাওয়া যায়নি' : 'No new valid locations found in file', 'info');
        }

      } catch (err) {
        showToast(lang === 'bn' ? 'ফাইল পড়তে সমস্যা হয়েছে' : 'Error reading file', 'error');
      }
      
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaults = () => {
    requestConfirm(
      lang === 'bn' ? "রিসেট নিশ্চিত করুন" : "Confirm Reset",
      lang === 'bn'
        ? "আপনি কি নিশ্চিত যে আপনি সব লোকেশন এবং ইউনিয়ন পুনরায় রিসেট করতে চান? এটি ৮টি বিভাগ, ৬৪টি জেলা, ৪৯৫টি উপজেলা এবং সমস্ত ৪৫৪০+ ইউনিয়ন ডিফল্ট ডেটাসেটে ফিরিয়ে আনবে।"
        : "Are you sure you want to reset all locations and unions to defaults? This will restore the complete database of 8 divisions, 64 districts, 495 upazilas, and all 4,540+ unions.",
      () => {
        localStorage.removeItem('bk_custom_divisions_v4');
        localStorage.removeItem('bk_custom_districts_v4');
        localStorage.removeItem('bk_custom_upazilas_v4');
        localStorage.removeItem('bk_custom_unions_v4');

        syncLocationsWithStorage();

        setDivList([...DIVISIONS]);
        setDistList([...DISTRICTS]);
        setUpaList([...UPAZILAS]);
        setUnionList([...UNIONS]);

        window.dispatchEvent(new CustomEvent('bk_locations_updated'));
        showToast(
          lang === 'bn'
            ? "লোকেশন সফলভাবে রিসেট হয়েছে! সমস্ত ৪৫৪০+ ইউনিয়ন লোড হয়েছে।"
            : "Locations successfully reset! All 4,540+ unions have been restored.",
          'success'
        );
      }
    );
  };

  const handleExplorerAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const rawEn = addLocNameEn.trim();
    const rawBn = addLocNameBn.trim();
    if (!rawEn || !rawBn) {
      showToast(lang === 'bn' ? 'সবগুলো ঘর পূরণ করুন' : 'Please fill all fields', 'error');
      return;
    }

    // Split by commas or newlines
    const namesEnList = rawEn
      .split(/[,\n]+/)
      .map(item => item.trim())
      .filter(Boolean);

    const namesBnList = rawBn
      .split(/[,\n]+/)
      .map(item => item.trim())
      .filter(Boolean);

    if (namesEnList.length !== namesBnList.length) {
      showToast(lang === 'bn' 
        ? `ইংরেজি নামের সংখ্যা (${namesEnList.length}) এবং বাংলা নামের সংখ্যা (${namesBnList.length}) সমান হতে হবে। অনুগ্রহ করে চেক করুন এবং সংশোধন করুন!`
        : `The number of English names (${namesEnList.length}) and Bangla names (${namesBnList.length}) must be exactly equal to pair them. Please verify and correct!`,
        'error'
      );
      return;
    }

    let currentDivs = [...divList];
    let currentDists = [...distList];
    let currentUpas = [...upaList];
    let currentUnions = [...unionList];

    let addedCount = 0;
    let duplicateCount = 0;

    for (let i = 0; i < namesEnList.length; i++) {
      const nameEn = namesEnList[i];
      const nameBn = namesBnList[i];
      const id = nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (!id) continue;

      if (addLocModal.level === 'division') {
        if (currentDivs.some(d => d.id === id)) {
          duplicateCount++;
          continue;
        }
        currentDivs.push({ id, name: nameEn, nameBn: nameBn });
        addedCount++;
      } else if (addLocModal.level === 'district') {
        if (!addLocModal.parentDivId) continue;
        if (currentDists.some(d => d.id === id)) {
          duplicateCount++;
          continue;
        }
        currentDists.push({ id, divisionId: addLocModal.parentDivId, name: nameEn, nameBn: nameBn });
        addedCount++;
      } else if (addLocModal.level === 'upazila') {
        if (!addLocModal.parentDistId) continue;
        if (currentUpas.some(u => u.id === id)) {
          duplicateCount++;
          continue;
        }
        currentUpas.push({ id, districtId: addLocModal.parentDistId, name: nameEn, nameBn: nameBn });
        addedCount++;
      } else if (addLocModal.level === 'union') {
        if (!addLocModal.parentUpaId) continue;
        if (currentUnions.some(un => un.id === id)) {
          duplicateCount++;
          continue;
        }
        currentUnions.push({ id, upazilaId: addLocModal.parentUpaId, name: nameEn, nameBn: nameBn });
        addedCount++;
      }
    }

    if (addedCount > 0) {
      if (addLocModal.level === 'division') {
        setDivList(currentDivs);
        saveLocationsToStorage(currentDivs, currentDists, currentUpas, currentUnions);
      } else if (addLocModal.level === 'district') {
        setDistList(currentDists);
        saveLocationsToStorage(currentDivs, currentDists, currentUpas, currentUnions);
      } else if (addLocModal.level === 'upazila') {
        setUpaList(currentUpas);
        saveLocationsToStorage(currentDivs, currentDists, currentUpas, currentUnions);
      } else if (addLocModal.level === 'union') {
        setUnionList(currentUnions);
        saveLocationsToStorage(currentDivs, currentDists, currentUpas, currentUnions);
      }

      // Dispatch global event for synchronization
      window.dispatchEvent(new CustomEvent('bk_locations_updated'));
    }

    if (duplicateCount > 0) {
      showToast(lang === 'bn'
        ? `${addedCount} টি স্থান সফলভাবে যোগ করা হয়েছে! ${duplicateCount} টি স্থান ইতিমধ্যে বিদ্যমান থাকায় বাদ দেওয়া হয়েছে।`
        : `Successfully added ${addedCount} locations! Skipped ${duplicateCount} duplicates which already existed.`,
        'info'
      );
    } else if (addedCount > 0) {
      showToast(lang === 'bn' ? 'স্থানগুলো সফলভাবে যোগ করা হয়েছে' : 'Locations added successfully', 'success');
    }

    // Close modal and reset fields
    setAddLocModal({ isOpen: false, level: 'division' });
    setAddLocNameEn('');
    setAddLocNameBn('');
  };

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



  const handleDeleteDivision = (id: string) => {
    requestConfirm(
      lang === 'bn' ? "বিভাগ ডিলিট করুন" : "Delete Division",
      lang === 'bn' 
        ? "আপনি কি নিশ্চিত যে আপনি এই বিভাগটি ডিলিট করতে চান? এর সাথে সংযুক্ত জেলা, উপজেলা ও ইউনিয়নগুলোও ডিলিট হয়ে যাবে।" 
        : "Are you sure you want to delete this division? This will also remove associated districts, upazilas, and unions.",
      () => {
        const updatedDivs = divList.filter(d => d.id !== id);
        const updatedDists = distList.filter(d => d.divisionId !== id);
        const associatedDistIds = distList.filter(d => d.divisionId === id).map(d => d.id);
        const updatedUpas = upaList.filter(u => !associatedDistIds.includes(u.districtId));
        const associatedUpaIds = upaList.filter(u => associatedDistIds.includes(u.districtId)).map(u => u.id);
        const updatedUnions = unionList.filter(un => !associatedUpaIds.includes(un.upazilaId));
        
        setDivList(updatedDivs);
        setDistList(updatedDists);
        setUpaList(updatedUpas);
        setUnionList(updatedUnions);
        saveLocationsToStorage(updatedDivs, updatedDists, updatedUpas, updatedUnions);
        window.dispatchEvent(new CustomEvent('bk_locations_updated'));
        showToast(lang === 'bn' ? 'বিভাগ ডিলিট করা হয়েছে' : 'Division deleted successfully', 'success');
      }
    );
  };

  const handleDeleteDistrict = (id: string) => {
    requestConfirm(
      lang === 'bn' ? "জেলা ডিলিট করুন" : "Delete District",
      lang === 'bn' 
        ? "আপনি কি নিশ্চিত যে আপনি এই জেলাটি ডিলিট করতে চান? এর সাথে সংযুক্ত উপজেলা ও ইউনিয়নগুলোও ডিলিট হয়ে যাবে।" 
        : "Are you sure you want to delete this district? This will also remove associated upazilas and unions.",
      () => {
        const updatedDists = distList.filter(d => d.id !== id);
        const updatedUpas = upaList.filter(u => u.districtId !== id);
        const associatedUpaIds = upaList.filter(u => u.districtId === id).map(u => u.id);
        const updatedUnions = unionList.filter(un => !associatedUpaIds.includes(un.upazilaId));
        
        setDistList(updatedDists);
        setUpaList(updatedUpas);
        setUnionList(updatedUnions);
        saveLocationsToStorage(divList, updatedDists, updatedUpas, updatedUnions);
        window.dispatchEvent(new CustomEvent('bk_locations_updated'));
        showToast(lang === 'bn' ? 'জেলা ডিলিট করা হয়েছে' : 'District deleted successfully', 'success');
      }
    );
  };

  const handleDeleteUpazila = (id: string) => {
    requestConfirm(
      lang === 'bn' ? "উপজেলা ডিলিট করুন" : "Delete Upazila",
      lang === 'bn' 
        ? "আপনি কি নিশ্চিত যে আপনি এই উপজেলাটি ডিলিট করতে চান? এর সাথে সংযুক্ত ইউনিয়নগুলোও ডিলিট হয়ে যাবে।" 
        : "Are you sure you want to delete this upazila? This will also remove associated unions.",
      () => {
        const updatedUpas = upaList.filter(u => u.id !== id);
        const updatedUnions = unionList.filter(un => un.upazilaId !== id);
        
        setUpaList(updatedUpas);
        setUnionList(updatedUnions);
        saveLocationsToStorage(divList, distList, updatedUpas, updatedUnions);
        window.dispatchEvent(new CustomEvent('bk_locations_updated'));
        showToast(lang === 'bn' ? 'উপজেলা ডিলিট করা হয়েছে' : 'Upazila deleted successfully', 'success');
      }
    );
  };

  const handleDeleteUnion = (id: string) => {
    requestConfirm(
      lang === 'bn' ? "ইউনিয়ন ডিলিট করুন" : "Delete Union",
      lang === 'bn' 
        ? "আপনি কি নিশ্চিত যে আপনি এই ইউনিয়নটি ডিলিট করতে চান?" 
        : "Are you sure you want to delete this union?",
      () => {
        const updatedUnions = unionList.filter(u => u.id !== id);
        setUnionList(updatedUnions);
        saveLocationsToStorage(divList, distList, upaList, updatedUnions);
        window.dispatchEvent(new CustomEvent('bk_locations_updated'));
        showToast(lang === 'bn' ? 'ইউনিয়ন ডিলিট করা হয়েছে' : 'Union deleted successfully', 'success');
      }
    );
  };

  const [listings, setListings] = useState<BookListing[]>([]);
  const [savedListings, setSavedListings] = useState<BookListing[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteProfileConfirm, setShowDeleteProfileConfirm] = useState(false);
  const [deletingProfile, setDeletingProfile] = useState(false);
  
  const { t, lang } = useTranslation();

  const [name, setName] = useState(user.displayName);
  const [username, setUsername] = useState(user.username || '');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userAds = await api.db.getUserListings(user.uid);
        setListings(userAds);
        
        const allListingsData = await api.db.getListings();
        setAllListings(allListingsData);
        
        let savedIds: string[] = [];
        try {
          const rawSaved = localStorage.getItem('bk_saved_v1');
          if (rawSaved && rawSaved !== 'undefined') {
            savedIds = JSON.parse(rawSaved);
          }
        } catch (e) {
          console.error("Failed to parse saved ids inside DashboardPage", e);
        }
        setSavedListings(allListingsData.filter(l => savedIds.includes(l.id)));

        if (isSuperAdmin) {
          setAdminLoading(true);
          try {
            const [usersList, convCount] = await Promise.all([
              (api.db as any).getAllUsers ? (api.db as any).getAllUsers() : [],
              (api.db as any).getAllConversationsCount ? (api.db as any).getAllConversationsCount() : 0
            ]);
            setAllUsers(usersList);
            setTotalConvs(convCount || 0);
          } catch (err) {
            console.error("Admin fetch error:", err);
          } finally {
            setAdminLoading(false);
          }
        }
      } catch (e) {
        console.error("Error fetching listings", e);
      }
      setLoading(false);
    };
    fetchData();

    const unsubConv = api.db.subscribeToConversations(user.uid, (data) => {
      setConversations(data);
    });

    return () => unsubConv();
  }, [user.uid, isSuperAdmin]);

  // Sort conversations client-side to avoid needing a Firestore composite index
  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }, [conversations]);

  const confirmDelete = async () => {
    if (!deletingId) return;
    const idToDelete = deletingId;
    setDeletingId(null); 
    const previousListings = [...listings];
    setListings(listings.filter(l => l.id !== idToDelete));
    try {
      await api.db.deleteListing(idToDelete);
      showToast(lang === 'bn' ? "বিজ্ঞাপন সফলভাবে ডিলিট হয়েছে" : "Listing deleted successfully", "success");
    } catch (e) {
      setListings(previousListings);
      showToast(lang === 'bn' ? "বিজ্ঞাপন ডিলিট করতে ব্যর্থ হয়েছে" : "Failed to delete the listing.", "error");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateError('');
    try {
      await api.auth.updateProfile(name.trim(), undefined, username.trim());
      await api.auth.reloadUser();
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err: any) {
      setUpdateError(err.message || "Failed to update profile.");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteProfile = async () => {
    setDeletingProfile(true);
    try {
      await api.auth.deleteAccount();
      navigate('/');
    } catch (err: any) {
      showToast(lang === 'bn' ? "অ্যাকাউন্ট ডিলিট করতে ব্যর্থ হয়েছে" : "Failed to delete account.", "error");
    } finally {
      setDeletingProfile(false);
      setShowDeleteProfileConfirm(false);
    }
  };

  const handleAdminDeleteListing = async (listingId: string) => {
    requestConfirm(
      lang === 'bn' ? "বিজ্ঞাপন ডিলিট করুন" : "Delete Listing",
      lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই বিজ্ঞাপনটি ডিলিট করতে চান?' : 'Are you sure you want to delete this listing?',
      async () => {
        try {
          await api.db.deleteListing(listingId);
          setAllListings(prev => prev.filter(l => l.id !== listingId));
          setListings(prev => prev.filter(l => l.id !== listingId));
          showToast(lang === 'bn' ? "বিজ্ঞাপন সফলভাবে ডিলিট করা হয়েছে" : "Listing deleted successfully", "success");
        } catch (e) {
          showToast(lang === 'bn' ? "বিজ্ঞাপন ডিলিট করতে ব্যর্থ হয়েছে" : "Failed to delete the listing.", "error");
        }
      }
    );
  };

  const sitemapXml = useMemo(() => {
    const origin = window.location.origin;
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    xml += `  <url>\n    <loc>${origin}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/#/about</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/#/contact</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
    allListings.forEach(book => {
      xml += `  <url>\n    <loc>${origin}/#/book/${book.id}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;
    return xml;
  }, [allListings]);

  const handleCopySitemap = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2000);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto px-4 mt-2 md:mt-8 pb-20">
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 shadow-2xl shadow-emerald-900/5 border border-emerald-50">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-10">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-100 rounded-[10px] md:rounded-2xl flex items-center justify-center font-black text-sm md:text-xl text-black overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
              <span className="text-black font-black uppercase">{(name || user.displayName || 'A').charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <p className="font-black text-black leading-tight text-sm md:text-lg truncate">{name || 'Anonymous'}</p>
              <p className="text-[9px] md:text-[10px] text-accent font-black uppercase mt-0.5 truncate">
                {isSuperAdmin ? (lang === 'bn' ? 'সুপার অ্যাডমিন' : 'SUPER ADMIN') : (lang === 'bn' ? 'মেম্বার' : 'MEMBER')}
              </p>
            </div>
          </div>
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 md:gap-3 no-scrollbar pb-2 lg:pb-0">
            <button onClick={() => setActiveTab('ads')} className={`flex-shrink-0 lg:w-full flex items-center justify-start gap-2 md:gap-4 p-3 md:p-4 font-black rounded-xl md:rounded-2xl transition text-[9px] md:text-xs uppercase ${activeTab === 'ads' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-emerald-50/50 text-black hover:bg-emerald-100'}`}>
              <LayoutGrid className="w-3.5 h-3.5 md:w-5 md:h-5" /> Ads
            </button>
            <button onClick={() => setActiveTab('messages')} className={`flex-shrink-0 lg:w-full flex items-center justify-start gap-2 md:gap-4 p-3 md:p-4 font-black rounded-xl md:rounded-2xl transition text-[9px] md:text-xs uppercase ${activeTab === 'messages' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-emerald-50/50 text-black hover:bg-emerald-100'}`}>
              <MessageCircle className={`w-3.5 h-3.5 md:w-5 md:h-5 ${activeTab === 'messages' ? 'text-white' : 'text-accent'}`} /> Messages
            </button>
            <button onClick={() => setActiveTab('saved')} className={`flex-shrink-0 lg:w-full flex items-center justify-start gap-2 md:gap-4 p-3 md:p-4 font-black rounded-xl md:rounded-2xl transition text-[9px] md:text-xs uppercase ${activeTab === 'saved' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-emerald-50/50 text-black hover:bg-emerald-100'}`}>
              <Heart className={`w-3.5 h-3.5 md:w-5 md:h-5 ${activeTab === 'saved' ? 'text-white' : 'text-accent'}`} /> Saved
            </button>
            <button onClick={() => setActiveTab('account')} className={`flex-shrink-0 lg:w-full flex items-center justify-start gap-2 md:gap-4 p-3 md:p-4 font-black rounded-xl md:rounded-2xl transition text-[9px] md:text-xs uppercase ${activeTab === 'account' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-emerald-50/50 text-black hover:bg-emerald-100'}`}>
              <Settings className={`w-3.5 h-3.5 md:w-5 md:h-5 ${activeTab === 'account' ? 'text-white' : 'text-accent'}`} /> Profile
            </button>
            {isSuperAdmin && (
              <button onClick={() => setActiveTab('settings')} className={`flex-shrink-0 lg:w-full flex items-center justify-start gap-2 md:gap-4 p-3 md:p-4 font-black rounded-xl md:rounded-2xl transition text-[9px] md:text-xs uppercase ${activeTab === 'settings' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-emerald-50/50 text-black hover:bg-emerald-100'}`}>
                <Sliders className={`w-3.5 h-3.5 md:w-5 md:h-5 ${activeTab === 'settings' ? 'text-white' : 'text-accent'}`} /> Settings
              </button>
            )}
          </nav>
        </div>
      </aside>

      <main className="lg:col-span-3 space-y-4 md:space-y-8">
        {activeTab === 'ads' && (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#f0fdf4] p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-100/50 gap-4 md:gap-6">
              <div className="flex items-center gap-3 md:gap-5">
                <div className="p-2.5 md:p-3 bg-white rounded-xl md:rounded-2xl shadow-sm"><Package className="w-5 h-5 md:w-6 md:h-6 text-accent" /></div>
                <div><h2 className="text-lg md:text-2xl font-serif font-black text-black leading-none">Your Ads</h2><p className="text-zinc-400 text-[9px] md:text-[10px] font-black uppercase mt-1.5">{listings.length} Items Live</p></div>
              </div>
              <Link to="/sell" className="w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl hover:bg-zinc-800 transition text-[9px] md:text-[10px] font-black uppercase shadow-xl shadow-black/10"><PlusCircle className="w-4 h-4" /> New Ad</Link>
            </div>
            {loading ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">{[...Array(2)].map((_, i) => (<div key={i} className="bg-white rounded-[1.5rem] md:rounded-[2rem] h-64 animate-pulse border border-emerald-50"></div>))}</div> : listings.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">{listings.map(book => (<BookCard key={book.id} book={book} showActions onDelete={(id) => setDeletingId(id)} onEdit={(id) => navigate(`/edit/${id}`)} />))}</div>) : (<div className="text-center py-12 md:py-20 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-dashed border-emerald-100 shadow-sm px-6"><h3 className="text-lg md:text-xl font-black text-black mb-2">Nothing listed</h3><Link to="/sell" className="bg-accent text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-[10px]">Post New Ad</Link></div>)}
          </>
        )}
        {activeTab === 'messages' && (
          <>
            <div className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-50 shadow-sm mb-4 md:mb-6">
              <div className="p-2.5 md:p-3 bg-emerald-50 rounded-xl"><MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-accent" /></div>
              <div><h2 className="text-lg md:text-xl font-black text-black leading-none">Chats</h2><p className="text-zinc-400 text-[8px] md:text-[9px] font-black uppercase mt-1 md:mt-1.5">{sortedConversations.length} Active Conversations</p></div>
            </div>
            {sortedConversations.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {sortedConversations.map(conv => {
                  const otherId = conv.participants.find(p => p !== user.uid) || '';
                  const otherName = conv.participantNames[otherId];
                  return (
                    <Link 
                      key={conv.id} 
                      to={`/chat/${conv.id}`}
                      className="flex items-center gap-3 md:gap-4 bg-white p-3 md:p-6 rounded-[1.2rem] md:rounded-[1.5rem] border border-emerald-50 hover:bg-zinc-50 transition shadow-sm group"
                    >
                      <div className="w-10 h-10 md:w-16 md:h-16 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-accent shadow-sm flex-shrink-0">
                        {conv.bookImageUrl ? <img src={conv.bookImageUrl} className="w-full h-full object-cover rounded-xl md:rounded-2xl" alt="" /> : <User className="w-5 h-5 md:w-6 md:h-6" />}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-black text-black text-sm md:text-lg leading-tight truncate">{otherName}</h3>
                        <p className="text-[9px] md:text-[11px] font-black text-accent uppercase tracking-wider mb-0.5 md:mb-1">{conv.bookTitle}</p>
                        <p className="text-[10px] md:text-sm text-zinc-400 font-medium truncate max-w-md">{conv.lastMessage || 'Start conversation...'}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-zinc-300 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 md:py-20 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-emerald-50 shadow-sm px-6"><h3 className="text-lg md:text-xl font-black text-black">No messages yet</h3></div>
            )}
          </>
        )}
        {activeTab === 'saved' && (
          <>
            <div className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-50 shadow-sm mb-4 md:mb-6">
              <div className="p-2.5 md:p-3 bg-red-50 rounded-xl"><Heart className="w-4 h-4 md:w-5 h-5 text-red-500 fill-current" /></div>
              <div><h2 className="text-lg md:text-xl font-black text-black leading-none">Bookmarked</h2><p className="text-zinc-400 text-[8px] md:text-[9px] font-black uppercase mt-1 md:mt-1.5">{savedListings.length} Saved Books</p></div>
            </div>
            {savedListings.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">{savedListings.map(book => (<BookCard key={book.id} book={book} />))}</div>) : (<div className="text-center py-12 md:py-20 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-emerald-50 shadow-sm px-6"><h3 className="text-lg md:text-xl font-black text-black">No saved items</h3><Link to="/" className="mt-6 md:mt-10 inline-block bg-accent text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-black uppercase text-[9px] md:text-[10px]">Browse Feed</Link></div>)}
          </>
        )}

        {activeTab === 'account' && (
          <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-emerald-900/5 border border-emerald-50">
            <h2 className="text-3xl font-serif font-black text-black mb-8">Profile Settings</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-10 max-w-xl">
              {updateError && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[13px] font-semibold border border-red-100 flex items-center gap-3 animate-in fade-in duration-300">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  {updateError}
                </div>
              )}
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-3 ml-1">{t('fullName')}</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full px-6 py-4 bg-[#f0fdf4] border border-emerald-100/50 rounded-2xl outline-none font-black text-black text-base" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-3 ml-1">{t('userName')}</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-emerald-400 text-lg">@</span>
                    <input 
                      type="text" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))} 
                      className="w-full pl-14 pr-6 py-4 bg-[#f0fdf4] border border-emerald-100/50 rounded-2xl outline-none font-black text-black text-base" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black uppercase mb-3 ml-1">{t('emailAddress')}</label>
                  <input 
                    type="text" 
                    value={user.email} 
                    disabled 
                    className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-black text-zinc-400 opacity-60 text-base cursor-not-allowed" 
                  />
                </div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                <button type="submit" disabled={updating} className="w-full sm:w-auto bg-black text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-4 shadow-xl disabled:opacity-50">
                  {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {t('saveProfile')}
                </button>
                {updateSuccess && <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase"><CheckCircle2 className="w-5 h-5" /> Saved!</div>}
              </div>
              <div className="pt-10 border-t border-emerald-50">
                <button type="button" onClick={() => setShowDeleteProfileConfirm(true)} className="text-red-600 font-black text-[10px] uppercase flex items-center gap-3 hover:text-red-700 transition">
                  <Trash2 className="w-4 h-4" />
                  {t('deleteProfile')}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'settings' && isSuperAdmin && (
          <div className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-emerald-900/5 border border-emerald-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 text-[9px] md:text-[10px] font-black uppercase rounded-full tracking-wider">
                      SUPER ADMIN PANEL
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-black mt-2">
                    {lang === 'bn' ? 'সুপার অ্যাডমিন সেটিংস' : 'Super Admin Settings'}
                  </h2>
                  <p className="text-zinc-500 font-bold text-xs mt-1">
                    {lang === 'bn'
                      ? 'সাইট মডারেশন, ব্যবহারকারী পরিচালনা এবং সাইটম্যাপ এসইও টুলস।'
                      : 'Site-wide moderation, user management, and SEO sitemap controls.'}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl font-black text-xs">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  SECURE ACCESS
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white rounded-[1.5rem] p-6 border border-emerald-50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 font-black text-[10px] uppercase tracking-wider">
                    {lang === 'bn' ? 'মোট লিস্টিং' : 'Total Listings'}
                  </p>
                  <p className="text-2xl md:text-3xl font-serif font-black text-black mt-1">
                    {allListings.length}
                  </p>
                </div>
                <div className="p-3.5 bg-[#f0fdf4] rounded-2xl">
                  <Package className="w-6 h-6 text-emerald-600" />
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] p-6 border border-emerald-50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 font-black text-[10px] uppercase tracking-wider">
                    {lang === 'bn' ? 'মোট ব্যবহারকারী' : 'Total Users'}
                  </p>
                  <p className="text-2xl md:text-3xl font-serif font-black text-black mt-1">
                    {allUsers.length || 1}
                  </p>
                </div>
                <div className="p-3.5 bg-emerald-50 rounded-2xl">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] p-6 border border-emerald-50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 font-black text-[10px] uppercase tracking-wider">
                    {lang === 'bn' ? 'মোট চ্যাট' : 'Total Chats'}
                  </p>
                  <p className="text-2xl md:text-3xl font-serif font-black text-black mt-1">
                    {totalConvs}
                  </p>
                </div>
                <div className="p-3.5 bg-emerald-50 rounded-2xl">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Sub Tabs */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-emerald-900/5 border border-emerald-50 space-y-6">
              <div className="flex border-b border-zinc-100 pb-2 overflow-x-auto no-scrollbar gap-6 md:gap-8">
                <button
                  onClick={() => { setAdminTab('listings'); setAdminSearch(''); }}
                  className={`font-black text-xs uppercase pb-3 transition relative flex items-center gap-2 ${
                    adminTab === 'listings' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  {lang === 'bn' ? 'বিজ্ঞাপন মডারেশন' : 'Moderate Listings'}
                </button>
                <button
                  onClick={() => { setAdminTab('users'); setAdminSearch(''); }}
                  className={`font-black text-xs uppercase pb-3 transition relative flex items-center gap-2 ${
                    adminTab === 'users' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  {lang === 'bn' ? 'ব্যবহারকারী পরিচালনা' : 'User Directory'}
                </button>
                <button
                  onClick={() => { setAdminTab('locations'); setAdminSearch(''); }}
                  className={`font-black text-xs uppercase pb-3 transition relative flex items-center gap-2 ${
                    adminTab === 'locations' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  {t('manageLocations')}
                </button>
                <button
                  onClick={() => { setAdminTab('seo'); setAdminSearch(''); }}
                  className={`font-black text-xs uppercase pb-3 transition relative flex items-center gap-2 ${
                    adminTab === 'seo' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  Sitemap & SEO
                </button>
              </div>

              {/* Sub Tab Contents */}
              {adminLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                </div>
              ) : (
                <>
                  {/* SEARCH FIELD for listings and users */}
                  {adminTab !== 'seo' && adminTab !== 'locations' && (
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={
                          adminTab === 'listings'
                            ? (lang === 'bn' ? 'শিরোনাম বা স্থান দিয়ে সার্চ করুন...' : 'Search listings by title or location...')
                            : (lang === 'bn' ? 'নাম বা ইমেইল দিয়ে সার্চ করুন...' : 'Search users by name or email...')
                        }
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none font-medium text-sm text-black focus:border-zinc-300"
                      />
                    </div>
                  )}

                  {/* Tab 1: Listings Moderation */}
                  {adminTab === 'listings' && (
                    <div className="space-y-4">
                      {allListings.filter(l => 
                        l.title.toLowerCase().includes(adminSearch.toLowerCase()) || 
                        (l.locationText || '').toLowerCase().includes(adminSearch.toLowerCase())
                      ).length === 0 ? (
                        <div className="text-center py-10 text-zinc-400 font-bold text-sm">
                          {lang === 'bn' ? 'কোন বিজ্ঞাপন পাওয়া যায়নি' : 'No listings found'}
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-zinc-800">
                            <thead>
                              <tr className="border-b border-zinc-100">
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400">{lang === 'bn' ? 'বইয়ের বিবরণ' : 'Book Info'}</th>
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400">{lang === 'bn' ? 'শ্রেণী' : 'Class'}</th>
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400">{lang === 'bn' ? 'মূল্য' : 'Price'}</th>
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400">{lang === 'bn' ? 'মালিক' : 'Seller'}</th>
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allListings
                                .filter(l => 
                                  l.title.toLowerCase().includes(adminSearch.toLowerCase()) || 
                                  (l.locationText || '').toLowerCase().includes(adminSearch.toLowerCase())
                                )
                                .map(book => (
                                  <tr key={book.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition">
                                    <td className="py-4 pr-3">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-12 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                                          {book.images && book.images[0] ? (
                                            <img src={book.images[0]} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                          ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-300 font-bold text-xs bg-zinc-50">No Image</div>
                                          )}
                                        </div>
                                        <div className="min-w-0">
                                          <p className="font-black text-black text-sm truncate">{book.title}</p>
                                          <p className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">{book.locationText}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-4 text-xs font-bold text-zinc-700">{book.classLevel}</td>
                                    <td className="py-4 text-sm font-black text-emerald-600">
                                      {book.price === 0 ? (lang === 'bn' ? 'ফ্রি' : 'FREE') : `৳${book.price}`}
                                    </td>
                                    <td className="py-4 text-xs font-medium text-zinc-500 max-w-[120px] truncate">
                                      {book.sellerName || 'Unknown Seller'}
                                    </td>
                                    <td className="py-4 text-right">
                                      <button
                                        onClick={() => handleAdminDeleteListing(book.id)}
                                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                                        title="Delete Listing"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 2: User Directory */}
                  {adminTab === 'users' && (
                    <div className="space-y-4">
                      {allUsers.filter(u => 
                        (u.displayName || '').toLowerCase().includes(adminSearch.toLowerCase()) || 
                        (u.email || '').toLowerCase().includes(adminSearch.toLowerCase()) ||
                        (u.username || '').toLowerCase().includes(adminSearch.toLowerCase())
                      ).length === 0 ? (
                        <div className="text-center py-10 text-zinc-400 font-bold text-sm">
                          {lang === 'bn' ? 'কোন ব্যবহারকারী পাওয়া যায়নি' : 'No users found'}
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-zinc-800">
                            <thead>
                              <tr className="border-b border-zinc-100">
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400">{lang === 'bn' ? 'ব্যবহারকারী' : 'User'}</th>
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400">{lang === 'bn' ? 'ইউজারনেম' : 'Username'}</th>
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400">{lang === 'bn' ? 'ইমেইল এড্রেস' : 'Email Address'}</th>
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400 text-center">{lang === 'bn' ? 'বই লিস্টিং' : 'Listed Books'}</th>
                                <th className="pb-3 text-[10px] font-black uppercase text-zinc-400 text-right">{lang === 'bn' ? 'রেজিস্ট্রেশন' : 'Registered'}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allUsers
                                .filter(u => 
                                  (u.displayName || '').toLowerCase().includes(adminSearch.toLowerCase()) || 
                                  (u.email || '').toLowerCase().includes(adminSearch.toLowerCase()) ||
                                  (u.username || '').toLowerCase().includes(adminSearch.toLowerCase())
                                )
                                .map(u => {
                                  const listedCount = allListings.filter(l => l.sellerId === u.uid).length;
                                  const regDate = u.createdAt ? new Date(u.createdAt).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';
                                  return (
                                    <tr key={u.uid} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition">
                                      <td className="py-4 pr-3">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 bg-emerald-100 rounded-full overflow-hidden flex items-center justify-center font-black text-xs text-black border border-white">
                                            {u.photoURL ? (
                                              <img src={u.photoURL} alt={u.displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                            ) : (
                                              <span>{(u.displayName || 'U').charAt(0).toUpperCase()}</span>
                                            )}
                                          </div>
                                          <div>
                                            <p className="font-black text-black text-sm flex items-center gap-1.5">
                                              {u.displayName || 'Anonymous'}
                                              {u.email === 'jhshifat21@gmail.com' && (
                                                <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[8px] font-black uppercase rounded">SUPER</span>
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-4 text-xs font-bold text-zinc-500">
                                        {u.username ? `@${u.username}` : 'N/A'}
                                      </td>
                                      <td className="py-4 text-xs font-semibold text-zinc-700">{u.email}</td>
                                      <td className="py-4 text-center">
                                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                                          listedCount > 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-zinc-50 text-zinc-400'
                                        }`}>
                                          {listedCount}
                                        </span>
                                      </td>
                                      <td className="py-4 text-right text-xs font-medium text-zinc-400">
                                        {regDate}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 3: Sitemap & SEO */}
                  {adminTab === 'seo' && (
                    <div className="space-y-6">
                      <div className="bg-[#f0fdf4] border border-emerald-100/50 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-1 max-w-xl">
                          <h4 className="font-black text-black text-base">{t('seoTools')}</h4>
                          <p className="text-zinc-500 font-medium text-xs leading-relaxed">
                            {t('sitemapDesc')}
                          </p>
                        </div>
                        <button
                          onClick={handleCopySitemap}
                          className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase shadow-lg hover:opacity-90 transition flex-shrink-0"
                        >
                          <Copy className="w-4 h-4" />
                          {copiedSitemap ? (lang === 'bn' ? 'কপি হয়েছে!' : 'COPIED!') : t('copySitemap')}
                        </button>
                      </div>

                      <div className="border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                          <span className="font-black text-zinc-500 text-[10px] uppercase">sitemap.xml</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">XML Schema 0.9</span>
                        </div>
                        <div className="bg-zinc-950 p-6 font-mono text-xs text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed max-h-[350px] no-scrollbar">
                          {sitemapXml}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 4: Location Management */}
                  {adminTab === 'locations' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      {/* Search Filter Availability Config */}
                      <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-1">
                          <h4 className="font-serif font-black text-black text-base">
                            {lang === 'bn' ? 'সার্চ ফিল্টারিং অপশনস নিয়ন্ত্রণ' : 'Search Filtering Options Control'}
                          </h4>
                          <p className="text-zinc-500 font-bold text-xs">
                            {lang === 'bn' 
                              ? 'হোমপেজে সার্চ ফিল্টারিংয়ের জন্য কোন কোন স্তরগুলো ব্যবহার করা হবে তা নির্ধারণ করুন।' 
                              : 'Determine which location levels will be available for search filtering on the homepage.'}
                          </p>
                          
                          {/* Switches row */}
                          <div className="flex flex-wrap items-center gap-6 mt-4">
                            {/* Division Switch */}
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-zinc-100 shadow-sm">
                              <span className="text-xs font-black uppercase text-zinc-500">
                                {lang === 'bn' ? 'বিভাগ' : 'Division'}
                              </span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={locationSwitches.division} 
                                  onChange={(e) => setLocationSwitches({...locationSwitches, division: e.target.checked})} 
                                  className="sr-only peer" 
                                />
                                <div className="w-7 h-4 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:bg-accent after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3 relative"></div>
                              </label>
                            </div>

                            {/* District Switch */}
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-zinc-100 shadow-sm">
                              <span className="text-xs font-black uppercase text-zinc-500">
                                {lang === 'bn' ? 'জেলা' : 'District'}
                              </span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={locationSwitches.district} 
                                  onChange={(e) => setLocationSwitches({...locationSwitches, district: e.target.checked})} 
                                  className="sr-only peer" 
                                />
                                <div className="w-7 h-4 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:bg-accent after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3 relative"></div>
                              </label>
                            </div>

                            {/* Upazila Switch */}
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-zinc-100 shadow-sm">
                              <span className="text-xs font-black uppercase text-zinc-500">
                                {lang === 'bn' ? 'উপজেলা' : 'Upazila'}
                              </span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={locationSwitches.upazila} 
                                  onChange={(e) => setLocationSwitches({...locationSwitches, upazila: e.target.checked})} 
                                  className="sr-only peer" 
                                />
                                <div className="w-7 h-4 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:bg-accent after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3 relative"></div>
                              </label>
                            </div>

                            {/* Union Switch */}
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-zinc-100 shadow-sm">
                              <span className="text-xs font-black uppercase text-zinc-500">
                                {lang === 'bn' ? 'ইউনিয়ন' : 'Union'}
                              </span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={locationSwitches.union} 
                                  onChange={(e) => setLocationSwitches({...locationSwitches, union: e.target.checked})} 
                                  className="sr-only peer" 
                                />
                                <div className="w-7 h-4 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:bg-accent after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3 relative"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 flex-shrink-0 w-full md:w-auto">
                          <button
                            onClick={handleSaveLocationSwitches}
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase shadow-lg hover:opacity-90 transition active:scale-95"
                          >
                            <Save className="w-4 h-4" />
                            {lang === 'bn' ? 'কনফিগারেশন সেভ করুন' : 'SAVE CONFIG'}
                          </button>
                          {showSwitchesSaved && (
                            <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1 self-center md:self-end animate-in fade-in duration-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {lang === 'bn' ? 'কনফিগারেশন সেভ হয়েছে!' : 'Configuration Saved!'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Nested navigation for location types */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex bg-zinc-100 p-1.5 rounded-2xl max-w-lg w-full">
                        <button
                          type="button"
                          onClick={() => { setLocType('division'); setLocationsSearch(''); }}
                          className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
                            locType === 'division' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          {lang === 'bn' ? 'বিভাগ' : 'Division'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setLocType('district'); setLocationsSearch(''); }}
                          className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
                            locType === 'district' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          {lang === 'bn' ? 'জেলা' : 'District'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setLocType('upazila'); setLocationsSearch(''); }}
                          className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
                            locType === 'upazila' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          {lang === 'bn' ? 'উপজেলা' : 'Upazila'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setLocType('union'); setLocationsSearch(''); }}
                          className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase transition-all ${
                            locType === 'union' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          {lang === 'bn' ? 'ইউনিয়ন' : 'Union'}
                        </button>
                      </div>

                      
                      <button
                        type="button"
                        onClick={() => setExplorerModal({ isOpen: true })}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:opacity-90 rounded-xl text-xs font-black uppercase transition-all shadow-md active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        {lang === 'bn' ? 'স্থান যোগ করুন' : 'Add Location'}
                      </button>
                      <input 
                        type="file" 
                        accept=".json" 
                        ref={fileInputRef} 
                        onChange={handleImportLocations} 
                        className="hidden" 
                      />

                      </div>
                      {/* Locations Search */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={
                            locType === 'division'
                              ? (lang === 'bn' ? 'বিভাগের নাম দিয়ে সার্চ করুন...' : 'Search divisions...')
                              : locType === 'district'
                              ? (lang === 'bn' ? 'জেলার নাম দিয়ে সার্চ করুন...' : 'Search districts...')
                              : locType === 'upazila'
                              ? (lang === 'bn' ? 'উপজেলার নাম দিয়ে সার্চ করুন...' : 'Search upazilas...')
                              : (lang === 'bn' ? 'ইউনিয়নের নাম দিয়ে সার্চ করুন...' : 'Search unions...')
                          }
                          value={locationsSearch}
                          onChange={(e) => setLocationsSearch(e.target.value)}
                          className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none font-medium text-sm text-black focus:border-zinc-300"
                        />
                      </div>

                      <div className="flex flex-col gap-8">
                        {/* List Column */}
                        <div className="w-full">
                          <div className="border border-zinc-100 rounded-[1.5rem] overflow-hidden bg-white shadow-sm">
                            <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                              <span className="font-black text-zinc-500 text-[10px] uppercase">
                                {locType === 'division' 
                                  ? (lang === 'bn' ? 'মোট বিভাগ' : 'All Divisions') 
                                  : locType === 'district' 
                                  ? (lang === 'bn' ? 'মোট জেলা' : 'All Districts') 
                                  : locType === 'upazila'
                                  ? (lang === 'bn' ? 'মোট উপজেলা' : 'All Upazilas')
                                  : (lang === 'bn' ? 'মোট ইউনিয়ন' : 'All Unions')}
                              </span>
                              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                                {locType === 'division' 
                                  ? divList.filter(d => d.name.toLowerCase().includes(locationsSearch.toLowerCase()) || d.nameBn.includes(locationsSearch)).length
                                  : locType === 'district'
                                  ? distList.filter(d => d.name.toLowerCase().includes(locationsSearch.toLowerCase()) || d.nameBn.includes(locationsSearch)).length
                                  : locType === 'upazila'
                                  ? upaList.filter(u => u.name.toLowerCase().includes(locationsSearch.toLowerCase()) || u.nameBn.includes(locationsSearch)).length
                                  : unionList.filter(un => un.name.toLowerCase().includes(locationsSearch.toLowerCase()) || un.nameBn.includes(locationsSearch)).length
                                }
                              </span>
                            </div>

                            <div className="divide-y divide-zinc-50 max-h-[500px] overflow-y-auto no-scrollbar">
                              {/* RENDER DIVISIONS LIST */}
                              {locType === 'division' && (
                                divList
                                  .filter(d => d.name.toLowerCase().includes(locationsSearch.toLowerCase()) || d.nameBn.includes(locationsSearch))
                                  .map(d => (
                                    <div 
                                      key={d.id} 
                                      onClick={() => {
                                        setExplorerModal({ isOpen: true, currentDivisionId: d.id });
                                        setExplorerSearch('');
                                      }}
                                      className="p-5 flex items-center justify-between hover:bg-zinc-50/80 transition cursor-pointer group"
                                      title={lang === 'bn' ? 'জেলাগুলো দেখতে ক্লিক করুন' : 'Click to view districts'}
                                    >
                                      <div>
                                        <p className="font-black text-black text-sm group-hover:text-accent transition-colors flex items-center gap-2">
                                          {d.name}
                                          <span className="text-[9px] text-zinc-400 font-bold group-hover:text-accent transition-colors flex items-center gap-0.5">
                                            ({distList.filter(dist => dist.divisionId === d.id).length} {lang === 'bn' ? 'জেলা' : 'Districts'}) <ChevronRight className="w-3 h-3" />
                                          </span>
                                        </p>
                                        <p className="text-zinc-500 font-bold text-xs mt-0.5">{d.nameBn}</p>
                                        <p className="text-[9px] font-mono text-zinc-400 mt-1 uppercase">ID: {d.id}</p>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteDivision(d.id);
                                        }}
                                        className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                                        title="Delete Division"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))
                              )}

                              {/* RENDER DISTRICTS LIST */}
                              {locType === 'district' && (
                                distList
                                  .filter(d => d.name.toLowerCase().includes(locationsSearch.toLowerCase()) || d.nameBn.includes(locationsSearch))
                                  .map(d => {
                                    const parentDiv = divList.find(div => div.id === d.divisionId);
                                    return (
                                      <div 
                                        key={d.id} 
                                        onClick={() => {
                                          setExplorerModal({ isOpen: true, currentDivisionId: d.divisionId, currentDistrictId: d.id });
                                          setExplorerSearch('');
                                        }}
                                        className="p-5 flex items-center justify-between hover:bg-zinc-50/80 transition cursor-pointer group"
                                        title={lang === 'bn' ? 'উপজেলাগুলো দেখতে ক্লিক করুন' : 'Click to view upazilas'}
                                      >
                                        <div>
                                          <p className="font-black text-black text-sm group-hover:text-accent transition-colors flex items-center gap-2">
                                            {d.name}
                                            <span className="text-[9px] text-zinc-400 font-bold group-hover:text-accent transition-colors flex items-center gap-0.5">
                                              ({upaList.filter(upa => upa.districtId === d.id).length} {lang === 'bn' ? 'উপজেলা' : 'Upazilas'}) <ChevronRight className="w-3 h-3" />
                                            </span>
                                          </p>
                                          <p className="text-zinc-500 font-bold text-xs mt-0.5">{d.nameBn}</p>
                                          <div className="flex items-center gap-2 mt-1">
                                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 text-[9px] font-black uppercase rounded">
                                              {parentDiv ? (lang === 'bn' ? parentDiv.nameBn : parentDiv.name) : d.divisionId}
                                            </span>
                                            <span className="text-[9px] font-mono text-zinc-400 uppercase">ID: {d.id}</span>
                                          </div>
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteDistrict(d.id);
                                          }}
                                          className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                                          title="Delete District"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    );
                                  })
                              )}

                              {/* RENDER UPAZILAS LIST */}
                              {locType === 'upazila' && (
                                upaList
                                  .filter(u => u.name.toLowerCase().includes(locationsSearch.toLowerCase()) || u.nameBn.includes(locationsSearch))
                                  .map(u => {
                                    const parentDist = distList.find(d => d.id === u.districtId);
                                    const parentDiv = parentDist ? divList.find(div => div.id === parentDist.divisionId) : null;
                                    return (
                                      <div 
                                        key={u.id} 
                                        onClick={() => {
                                          setExplorerModal({ isOpen: true, currentDivisionId: parentDist?.divisionId, currentDistrictId: u.districtId, currentUpazilaId: u.id });
                                          setExplorerSearch('');
                                        }}
                                        className="p-5 flex items-center justify-between hover:bg-zinc-50/80 transition cursor-pointer group"
                                        title={lang === 'bn' ? 'ইউনিয়নগুলো দেখতে ক্লিক করুন' : 'Click to view unions'}
                                      >
                                        <div>
                                          <p className="font-black text-black text-sm group-hover:text-accent transition-colors flex items-center gap-2">
                                            {u.name}
                                            <span className="text-[9px] text-zinc-400 font-bold group-hover:text-accent transition-colors flex items-center gap-0.5">
                                              ({unionList.filter(un => un.upazilaId === u.id).length} {lang === 'bn' ? 'ইউনিয়ন' : 'Unions'}) <ChevronRight className="w-3 h-3" />
                                            </span>
                                          </p>
                                          <p className="text-zinc-500 font-bold text-xs mt-0.5">{u.nameBn}</p>
                                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                            {parentDist && (
                                              <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 text-[9px] font-black uppercase rounded">
                                                {lang === 'bn' ? parentDist.nameBn : parentDist.name}
                                              </span>
                                            )}
                                            {parentDiv && (
                                              <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-600 text-[9px] font-black uppercase rounded">
                                                {lang === 'bn' ? parentDiv.nameBn : parentDiv.name}
                                              </span>
                                            )}
                                            <span className="text-[9px] font-mono text-zinc-400 uppercase">ID: {u.id}</span>
                                          </div>
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteUpazila(u.id);
                                          }}
                                          className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                                          title="Delete Upazila"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    );
                                  })
                              )}

                              {/* RENDER UNIONS LIST */}
                              {locType === 'union' && (
                                unionList
                                  .filter(un => un.name.toLowerCase().includes(locationsSearch.toLowerCase()) || un.nameBn.includes(locationsSearch))
                                  .map(un => {
                                    const parentUpa = upaList.find(u => u.id === un.upazilaId);
                                    const parentDist = parentUpa ? distList.find(d => d.id === parentUpa.districtId) : null;
                                    return (
                                      <div 
                                        key={un.id} 
                                        onClick={() => {
                                          setExplorerModal({ isOpen: true, currentDivisionId: parentDist?.divisionId, currentDistrictId: parentUpa?.districtId, currentUpazilaId: un.upazilaId });
                                          setExplorerSearch('');
                                        }}
                                        className="p-5 flex items-center justify-between hover:bg-zinc-50/80 transition cursor-pointer group"
                                        title={lang === 'bn' ? 'বিশদ পথ দেখতে ক্লিক করুন' : 'Click to view path'}
                                      >
                                        <div>
                                          <p className="font-black text-black text-sm group-hover:text-accent transition-colors flex items-center gap-2">
                                            {un.name}
                                            <span className="text-[9px] text-zinc-400 font-bold group-hover:text-accent transition-colors flex items-center gap-0.5">
                                              ({lang === 'bn' ? 'বিশদ দেখুন' : 'View Path'} <ChevronRight className="w-3 h-3" />)
                                            </span>
                                          </p>
                                          <p className="text-zinc-500 font-bold text-xs mt-0.5">{un.nameBn}</p>
                                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                            {parentUpa && (
                                              <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 text-[9px] font-black uppercase rounded">
                                                {lang === 'bn' ? parentUpa.nameBn : parentUpa.name}
                                              </span>
                                            )}
                                            {parentDist && (
                                              <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-600 text-[9px] font-black uppercase rounded">
                                                {lang === 'bn' ? parentDist.nameBn : parentDist.name}
                                              </span>
                                            )}
                                            <span className="text-[9px] font-mono text-zinc-400 uppercase">ID: {un.id}</span>
                                          </div>
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteUnion(un.id);
                                          }}
                                          className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                                          title="Delete Union"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    );
                                  })
                              )}

                              {/* No match case */}
                              {((locType === 'division' && divList.filter(d => d.name.toLowerCase().includes(locationsSearch.toLowerCase()) || d.nameBn.includes(locationsSearch)).length === 0) ||
                                (locType === 'district' && distList.filter(d => d.name.toLowerCase().includes(locationsSearch.toLowerCase()) || d.nameBn.includes(locationsSearch)).length === 0) ||
                                (locType === 'upazila' && upaList.filter(u => u.name.toLowerCase().includes(locationsSearch.toLowerCase()) || u.nameBn.includes(locationsSearch)).length === 0) ||
                                (locType === 'union' && unionList.filter(un => un.name.toLowerCase().includes(locationsSearch.toLowerCase()) || un.nameBn.includes(locationsSearch)).length === 0)) && (
                                <div className="text-center py-10 text-zinc-400 font-bold text-sm">
                                  {lang === 'bn' ? 'কোন ফলাফল পাওয়া যায়নি' : 'No matches found'}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modals... */}
      {deletingId && (activeTab === 'ads') && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setDeletingId(null)}></div>
          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-sm p-8 text-center animate-in zoom-in">
             <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"><Trash2 className="w-8 h-8 text-red-500" /></div>
             <h3 className="text-xl font-black text-black mb-3">Delete this ad?</h3>
             <div className="space-y-4"><button onClick={confirmDelete} className="w-full bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-[10px]">Confirm Delete</button><button onClick={() => setDeletingId(null)} className="w-full bg-emerald-50 text-black py-4 rounded-2xl font-black uppercase text-[10px]">Cancel</button></div>
          </div>
        </div>
      )}
      {showDeleteProfileConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowDeleteProfileConfirm(false)}></div>
          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 md:p-12 text-center animate-in zoom-in">
             <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"><AlertTriangle className="w-8 h-8 text-red-500" /></div>
             <h3 className="text-2xl font-black text-black mb-4">{t('confirmDeleteProfile')}</h3>
             <p className="text-zinc-500 font-bold text-sm mb-10">{t('deleteProfileWarning')}</p>
             <div className="flex flex-col gap-4"><button onClick={handleDeleteProfile} disabled={deletingProfile} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-3">{deletingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}Confirm Deletion</button><button onClick={() => setShowDeleteProfileConfirm(false)} className="w-full bg-zinc-100 text-black py-5 rounded-2xl font-black text-[10px] uppercase">Go Back</button></div>
          </div>
        </div>
      )}

      {/* LOCATION EXPLORER MODAL */}
      {explorerModal.isOpen && (() => {
        const currentDiv = divList.find(d => d.id === explorerModal.currentDivisionId);
        const currentDist = distList.find(d => d.id === explorerModal.currentDistrictId);
        const currentUpa = upaList.find(u => u.id === explorerModal.currentUpazilaId);

        let currentLevel: 'division' | 'district' | 'upazila' | 'union' = 'division';
        let itemsToDisplay: any[] = [];
        let levelTitleEn = 'All Divisions';
        let levelTitleBn = 'সব বিভাগ';

        if (explorerModal.currentUpazilaId) {
          currentLevel = 'union';
          itemsToDisplay = unionList.filter(un => un.upazilaId === explorerModal.currentUpazilaId);
          levelTitleEn = `Unions in ${currentUpa ? currentUpa.name : ''}`;
          levelTitleBn = `${currentUpa ? currentUpa.nameBn : ''} এর ইউনিয়নসমূহ`;
        } else if (explorerModal.currentDistrictId) {
          currentLevel = 'upazila';
          itemsToDisplay = upaList.filter(u => u.districtId === explorerModal.currentDistrictId);
          levelTitleEn = `Upazilas in ${currentDist ? currentDist.name : ''}`;
          levelTitleBn = `${currentDist ? currentDist.nameBn : ''} এর উপজেলাসমূহ`;
        } else if (explorerModal.currentDivisionId) {
          currentLevel = 'district';
          itemsToDisplay = distList.filter(d => d.divisionId === explorerModal.currentDivisionId);
          levelTitleEn = `Districts in ${currentDiv ? currentDiv.name : ''}`;
          levelTitleBn = `${currentDiv ? currentDiv.nameBn : ''} এর জেলাসমূহ`;
        } else {
          currentLevel = 'division';
          itemsToDisplay = divList;
        }

        const filteredItems = itemsToDisplay.filter(item => {
          const query = explorerSearch.toLowerCase();
          return item.name.toLowerCase().includes(query) || item.nameBn.includes(query) || (item.id && item.id.toLowerCase().includes(query));
        });

        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setExplorerModal({ isOpen: false })}></div>
            <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl h-[75vh] flex flex-col overflow-hidden animate-in zoom-in duration-200">
              
              {/* MODAL HEADER */}
              <div className="px-6 py-5 md:px-8 md:py-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-black leading-tight">
                      {lang === 'bn' ? 'স্থান অন্বেষণকারী' : 'Location Explorer'}
                    </h3>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mt-0.5">
                      {lang === 'bn' ? 'ধাপে ধাপে এলাকা খুঁজুন' : 'Drill down geographical tree'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setAddLocModal({
                        isOpen: true,
                        level: currentLevel,
                        parentDivId: explorerModal.currentDivisionId,
                        parentDistId: explorerModal.currentDistrictId,
                        parentUpaId: explorerModal.currentUpazilaId
                      });
                      setAddLocNameEn('');
                      setAddLocNameBn('');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase transition shadow-sm active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {lang === 'bn' ? 'যোগ করুন' : 'Add Location'}
                    </span>
                  </button>
                  <button 
                    onClick={() => setExplorerModal({ isOpen: false })} 
                    className="p-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* BREADCRUMB NAVIGATION */}
              <div className="px-6 py-3.5 md:px-8 border-b border-zinc-100 bg-zinc-50 flex items-center flex-wrap gap-2 text-xs font-bold text-zinc-500">
                {/* ROOT LINK */}
                <button 
                  onClick={() => setExplorerModal({ isOpen: true })}
                  className={`hover:text-emerald-600 transition ${!explorerModal.currentDivisionId ? 'text-emerald-600 font-extrabold underline decoration-2' : ''}`}
                >
                  {lang === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'}
                </button>

                {explorerModal.currentDivisionId && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                    <button 
                      onClick={() => setExplorerModal({ isOpen: true, currentDivisionId: explorerModal.currentDivisionId })}
                      className={`hover:text-emerald-600 transition ${!explorerModal.currentDistrictId ? 'text-emerald-600 font-extrabold underline decoration-2' : ''}`}
                    >
                      {currentDiv ? (lang === 'bn' ? currentDiv.nameBn : currentDiv.name) : explorerModal.currentDivisionId}
                    </button>
                  </>
                )}

                {explorerModal.currentDistrictId && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                    <button 
                      onClick={() => setExplorerModal({ isOpen: true, currentDivisionId: explorerModal.currentDivisionId, currentDistrictId: explorerModal.currentDistrictId })}
                      className={`hover:text-emerald-600 transition ${!explorerModal.currentUpazilaId ? 'text-emerald-600 font-extrabold underline decoration-2' : ''}`}
                    >
                      {currentDist ? (lang === 'bn' ? currentDist.nameBn : currentDist.name) : explorerModal.currentDistrictId}
                    </button>
                  </>
                )}

                {explorerModal.currentUpazilaId && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                    <span className="text-emerald-600 font-extrabold">
                      {currentUpa ? (lang === 'bn' ? currentUpa.nameBn : currentUpa.name) : explorerModal.currentUpazilaId}
                    </span>
                  </>
                )}
              </div>

              {/* SEARCH BOX IN MODAL */}
              <div className="px-6 py-4 md:px-8 border-b border-zinc-100 flex items-center justify-between gap-4 bg-white">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? `এখানে খুঁজুন...` : `Search here...`}
                    value={explorerSearch}
                    onChange={(e) => setExplorerSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-black outline-none focus:bg-white focus:border-accent transition-all"
                  />
                </div>
                {explorerSearch && (
                  <button 
                    onClick={() => setExplorerSearch('')} 
                    className="text-zinc-500 hover:text-black font-black text-[10px] uppercase bg-zinc-100 px-3 py-2 rounded-lg transition"
                  >
                    {lang === 'bn' ? 'মুছুন' : 'Clear'}
                  </button>
                )}
              </div>

              {/* CURRENT LEVEL HEADING */}
              <div className="px-6 py-3.5 md:px-8 bg-zinc-50/50 border-b border-zinc-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                  {lang === 'bn' ? levelTitleBn : levelTitleEn}
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                  {filteredItems.length} {lang === 'bn' ? 'টি পাওয়া গেছে' : 'found'}
                </span>
              </div>

              {/* ITEMS GRID */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-white">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-16 text-zinc-400 font-bold text-sm">
                    {lang === 'bn' ? 'কোন ম্যাচিং স্থান পাওয়া যায়নি!' : 'No matching locations found!'}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {filteredItems.map(item => {
                      // Calculate nested count and details for child item types
                      let subtitle = '';
                      let details = '';
                      let onClickAction = () => {};

                      if (currentLevel === 'division') {
                        const childCount = distList.filter(d => d.divisionId === item.id).length;
                        subtitle = lang === 'bn' ? `${childCount} টি জেলা` : `${childCount} Districts`;
                        details = item.nameBn;
                        onClickAction = () => {
                          setExplorerModal({ isOpen: true, currentDivisionId: item.id });
                          setExplorerSearch('');
                        };
                      } else if (currentLevel === 'district') {
                        const childCount = upaList.filter(u => u.districtId === item.id).length;
                        subtitle = lang === 'bn' ? `${childCount} টি উপজেলা` : `${childCount} Upazilas`;
                        details = item.nameBn;
                        onClickAction = () => {
                          setExplorerModal({ isOpen: true, currentDivisionId: explorerModal.currentDivisionId, currentDistrictId: item.id });
                          setExplorerSearch('');
                        };
                      } else if (currentLevel === 'upazila') {
                        const childCount = unionList.filter(un => un.upazilaId === item.id).length;
                        subtitle = lang === 'bn' ? `${childCount} টি ইউনিয়ন` : `${childCount} Unions`;
                        details = item.nameBn;
                        onClickAction = () => {
                          setExplorerModal({ isOpen: true, currentDivisionId: explorerModal.currentDivisionId, currentDistrictId: explorerModal.currentDistrictId, currentUpazilaId: item.id });
                          setExplorerSearch('');
                        };
                      } else {
                        // Union level (Terminal)
                        subtitle = lang === 'bn' ? 'ইউনিয়ন এলাকা' : 'Union area';
                        details = item.nameBn;
                        onClickAction = () => {}; // terminal
                      }

                      return (
                        <div
                          key={item.id}
                          onClick={onClickAction}
                          className={`p-3 md:p-4 rounded-xl border border-zinc-100 hover:border-emerald-500 hover:shadow-sm transition duration-200 ${currentLevel !== 'union' ? 'cursor-pointer' : ''} group bg-white flex flex-col md:flex-row md:items-center justify-between gap-3`}
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
                      );
                    })}
                  </div>
                )}
              </div>

              {/* MODAL FOOTER */}
              <div className="px-6 py-4 md:px-8 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between text-xs font-bold text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>
                    {lang === 'bn' 
                      ? `অন্বেষণ স্তর: ${currentLevel === 'division' ? 'বিভাগ' : currentLevel === 'district' ? 'জেলা' : currentLevel === 'upazila' ? 'উপজেলা' : 'ইউনিয়ন'}` 
                      : `Exploring Level: ${currentLevel.toUpperCase()}`
                    }
                  </span>
                </div>
                <button 
                  onClick={() => setExplorerModal({ isOpen: false })} 
                  className="px-5 py-2.5 bg-black text-white hover:opacity-90 rounded-xl uppercase text-[10px] tracking-wider transition"
                >
                  {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>

            </div>

            {/* DELETE LOCATION IN EXPLORER SUB-MODAL */}
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

            {/* EDIT LOCATION IN EXPLORER SUB-MODAL */}
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

            {/* ADD LOCATION IN EXPLORER SUB-MODAL */}
            {addLocModal.isOpen && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setAddLocModal(prev => ({ ...prev, isOpen: false }))}></div>
                <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-6 md:p-8 animate-in zoom-in duration-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-black text-black text-base">
                          {lang === 'bn' ? 'নতুন স্থান যোগ করুন' : 'Add New Location'}
                        </h4>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                          {lang === 'bn' 
                            ? `${addLocModal.level === 'division' ? 'বিভাগ' : addLocModal.level === 'district' ? 'জেলা' : addLocModal.level === 'upazila' ? 'উপজেলা' : 'ইউনিয়ন'} হিসেবে যোগ হবে`
                            : `Adding as ${addLocModal.level.toUpperCase()}`
                          }
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setAddLocModal(prev => ({ ...prev, isOpen: false }))}
                      className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-full transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Parent location badge */}
                  {(addLocModal.level !== 'division') && (
                    <div className="mb-4 p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs font-bold text-zinc-500 flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400">
                        {lang === 'bn' ? 'মূল স্থান (Parent Location):' : 'Parent Location:'}
                      </span>
                      <span className="text-black font-extrabold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        {addLocModal.level === 'district' && currentDiv && (lang === 'bn' ? currentDiv.nameBn : currentDiv.name)}
                        {addLocModal.level === 'upazila' && currentDist && (lang === 'bn' ? currentDist.nameBn : currentDist.name)}
                        {addLocModal.level === 'union' && currentUpa && (lang === 'bn' ? currentUpa.nameBn : currentUpa.name)}
                      </span>
                    </div>
                  )}

                  <form onSubmit={handleExplorerAddLocation} className="space-y-4">
                    {/* Multi-add Guidance Note */}
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-[10px] text-emerald-800 font-semibold leading-relaxed">
                      {lang === 'bn' ? (
                        <span>
                          💡 <strong>পরামর্শ:</strong> আপনি একসাথে একাধিক স্থান যোগ করতে পারেন! ইংরেজি ও বাংলা উভয় ঘরেই নামগুলো কমা (,) অথবা নতুন লাইনে লিখে আলাদা করুন। উভয় ঘরের নামের সংখ্যা অবশ্যই সমান হতে হবে।
                        </span>
                      ) : (
                        <span>
                          💡 <strong>Tip:</strong> You can add multiple locations at once! Separate the names with commas (,) or put each on a new line in both fields. Ensure both fields contain the exact same number of items.
                        </span>
                      )}
                    </div>

                    {/* English Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">
                        {lang === 'bn' ? 'ইংরেজি নাম (কমা বা নিউলাইন দিয়ে একাধিক লিখতে পারেন)' : 'English Name(s) (separate with comma or newline)'}
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder={
                          addLocModal.level === 'division' ? 'e.g. Dhaka, Chittagong' :
                          addLocModal.level === 'district' ? 'e.g. Faridpur District, Gazipur District' :
                          addLocModal.level === 'upazila' ? 'e.g. Sreepur, Kaliakair' : 'e.g. Bharaura, Sreemangal'
                        }
                        value={addLocNameEn}
                        onChange={(e) => setAddLocNameEn(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-black outline-none focus:bg-white focus:border-accent transition-all text-black resize-none"
                      />
                    </div>

                    {/* Bangla Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">
                        {lang === 'bn' ? 'বাংলা নাম (ইংরেজি নামের ক্রমানুসারে কমা বা নিউলাইন দিয়ে লিখুন)' : 'Bangla Name(s) (in the same order, separated with comma or newline)'}
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder={
                          addLocModal.level === 'division' ? 'উদা: ঢাকা, চট্টগ্রাম' :
                          addLocModal.level === 'district' ? 'উদা: ফরিদপুর জেলা, গাজীপুর জেলা' :
                          addLocModal.level === 'upazila' ? 'উদা: শ্রীপুর, কালিয়াকৈর' : 'উদা: ভাড়াউড়া, শ্রীমঙ্গল'
                        }
                        value={addLocNameBn}
                        onChange={(e) => setAddLocNameBn(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-xs font-black outline-none focus:bg-white focus:border-accent transition-all text-black resize-none"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAddLocModal(prev => ({ ...prev, isOpen: false }))}
                        className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 text-black rounded-xl text-xs font-black uppercase transition text-center font-bold"
                      >
                        {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase transition shadow-sm font-bold"
                      >
                        {lang === 'bn' ? 'যোগ করুন' : 'Add Location'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Toast Notification */}
            {toast.message && (
              <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 bg-zinc-950 text-white rounded-2xl shadow-2xl max-w-sm animate-in slide-in-from-bottom duration-300 border border-zinc-800">
                <div className={`w-2 h-2 rounded-full shrink-0 ${toast.type === 'error' ? 'bg-rose-500' : toast.type === 'info' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div className="flex-1 text-xs font-black tracking-wide">{toast.message}</div>
                <button onClick={() => setToast({ message: '', type: null })} className="text-zinc-400 hover:text-white transition p-0.5">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Confirmation Modal */}
            {confirmModal.isOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-[90] animate-in fade-in duration-200">
                <div className="bg-white rounded-[2rem] max-w-md w-full p-6 md:p-8 shadow-2xl border border-zinc-100 animate-in zoom-in-95 duration-200">
                  <h3 className="text-xl md:text-2xl font-serif font-black text-black">
                    {confirmModal.title}
                  </h3>
                  <p className="text-zinc-500 font-bold text-xs mt-3 leading-relaxed">
                    {confirmModal.message}
                  </p>
                  <div className="mt-6 pt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                      className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 text-black rounded-xl text-xs font-black uppercase transition text-center font-bold"
                    >
                      {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                    </button>
                    <button
                      type="button"
                      onClick={confirmModal.onConfirm}
                      className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase transition shadow-md font-bold"
                    >
                      {lang === 'bn' ? 'নিশ্চিত করুন' : 'Confirm'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};

export default DashboardPage;