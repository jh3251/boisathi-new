import React, { useState, useEffect } from 'react';
import { DIVISIONS, DISTRICTS, UPAZILAS, UNIONS, syncLocationsWithStorage } from '../constants';
import { LocationInfo } from '../types';
import { useTranslation } from '../App';

interface LocationSelectorProps {
  value: Partial<LocationInfo>;
  onChange: (loc: any) => void;
}

export default function LocationSelector({ value, onChange }: LocationSelectorProps) {
  const { lang, t } = useTranslation();
  const [, setLocUpdate] = useState(0);

  // Sync and force re-render when locations update
  useEffect(() => {
    const handleLocsUpdate = () => {
      syncLocationsWithStorage();
      setLocUpdate(prev => prev + 1);
    };
    window.addEventListener('bk_locations_updated', handleLocsUpdate);
    return () => {
      window.removeEventListener('bk_locations_updated', handleLocsUpdate);
    };
  }, []);

  const handleDivChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const div = DIVISIONS.find(d => d.id === e.target.value);
    if (!div) {
      onChange({
        divisionId: '', divisionName: '',
        districtId: '', districtName: '',
        upazilaId: '', upazilaName: '',
        unionId: '', unionName: ''
      });
      return;
    }
    onChange({
      divisionId: div.id,
      divisionName: div.name,
      districtId: '', districtName: '', 
      upazilaId: '', upazilaName: '',
      unionId: '', unionName: ''
    });
  };

  const handleDistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = DISTRICTS.find(d => d.id === e.target.value);
    if (!dist) {
      onChange({
        ...value,
        districtId: '', districtName: '',
        upazilaId: '', upazilaName: '',
        unionId: '', unionName: ''
      });
      return;
    }
    onChange({
      ...value,
      districtId: dist.id,
      districtName: dist.name,
      upazilaId: '', upazilaName: '',
      unionId: '', unionName: ''
    });
  };

  const handleUpaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const upa = UPAZILAS.find(d => d.id === e.target.value);
    if (!upa) {
      onChange({
        ...value,
        upazilaId: '', upazilaName: '',
        unionId: '', unionName: ''
      });
      return;
    }
    onChange({
      ...value,
      upazilaId: upa.id,
      upazilaName: upa.name,
      unionId: '', unionName: ''
    });
  };

  const handleUnionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uni = UNIONS.find(u => u.id === e.target.value);
    if (!uni) {
      onChange({
        ...value,
        unionId: '',
        unionName: ''
      });
      return;
    }
    onChange({
      ...value,
      unionId: uni.id,
      unionName: uni.name
    });
  };

  // Check if switches are defined to disable or enable location types
  const [switches] = useState(() => {
    const saved = localStorage.getItem('bk_filter_switches');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return { division: true, district: true, upazila: true, union: true };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Division */}
      {switches.division !== false && (
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            {t('division' as any) || (lang === 'bn' ? 'বিভাগ' : 'Division')}
          </label>
          <select 
            className="w-full px-4 py-3 md:px-5 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none font-bold text-xs md:text-sm text-black appearance-none cursor-pointer focus:bg-white focus:border-accent transition-all"
            value={value.divisionId || ''} 
            onChange={handleDivChange}
          >
            <option value="">{lang === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Select Division'}</option>
            {DIVISIONS.map(d => (
              <option key={d.id} value={d.id}>
                {lang === 'bn' && d.nameBn ? d.nameBn : d.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* District */}
      {switches.district !== false && (
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            {t('district' as any) || (lang === 'bn' ? 'জেলা' : 'District')}
          </label>
          <select 
            className="w-full px-4 py-3 md:px-5 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none font-bold text-xs md:text-sm text-black appearance-none cursor-pointer focus:bg-white focus:border-accent transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            value={value.districtId || ''} 
            onChange={handleDistChange} 
            disabled={switches.division !== false && !value.divisionId}
          >
            <option value="">{lang === 'bn' ? 'জেলা নির্বাচন করুন' : 'Select District'}</option>
            {DISTRICTS.filter(d => !value.divisionId || d.divisionId === value.divisionId).map(d => (
              <option key={d.id} value={d.id}>
                {lang === 'bn' && d.nameBn ? d.nameBn : d.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Upazila */}
      {switches.upazila !== false && (
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            {t('upazilaThana' as any) || (lang === 'bn' ? 'উপজেলা/থানা' : 'Upazila/Thana')}
          </label>
          <select 
            className="w-full px-4 py-3 md:px-5 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none font-bold text-xs md:text-sm text-black appearance-none cursor-pointer focus:bg-white focus:border-accent transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            value={value.upazilaId || ''} 
            onChange={handleUpaChange} 
            disabled={switches.district !== false && !value.districtId}
          >
            <option value="">{lang === 'bn' ? 'উপজেলা নির্বাচন করুন' : 'Select Upazila'}</option>
            {UPAZILAS.filter(u => !value.districtId || u.districtId === value.districtId).map(u => (
              <option key={u.id} value={u.id}>
                {lang === 'bn' && u.nameBn ? u.nameBn : u.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Union */}
      {switches.union !== false && (
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            {t('union' as any) || (lang === 'bn' ? 'ইউনিয়ন' : 'Union')}
          </label>
          <select 
            className="w-full px-4 py-3 md:px-5 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none font-bold text-xs md:text-sm text-black appearance-none cursor-pointer focus:bg-white focus:border-accent transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            value={value.unionId || ''} 
            onChange={handleUnionChange} 
            disabled={switches.upazila !== false && !value.upazilaId}
          >
            <option value="">{lang === 'bn' ? 'ইউনিয়ন নির্বাচন করুন' : 'Select Union'}</option>
            {UNIONS.filter(un => !value.upazilaId || un.upazilaId === value.upazilaId).map(un => (
              <option key={un.id} value={un.id}>
                {lang === 'bn' && un.nameBn ? un.nameBn : un.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
