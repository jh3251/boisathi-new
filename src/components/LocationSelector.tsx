import React from 'react';
import { DIVISIONS, DISTRICTS, UPAZILAS } from '../constants';
import { LocationInfo } from '../types';

interface LocationSelectorProps {
  value: Partial<LocationInfo>;
  onChange: (loc: any) => void;
}

export default function LocationSelector({ value, onChange }: LocationSelectorProps) {
  const handleDivChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const div = DIVISIONS.find(d => d.id === e.target.value);
    if (!div) return;
    onChange({
      divisionId: div.id,
      divisionName: div.name,
      districtId: '', districtName: '', upazilaId: '', upazilaName: ''
    });
  };

  const handleDistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = DISTRICTS.find(d => d.id === e.target.value);
    if (!dist) return;
    onChange({
      ...value,
      districtId: dist.id,
      districtName: dist.name,
      upazilaId: '', upazilaName: ''
    });
  };

  const handleUpaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const upa = UPAZILAS.find(d => d.id === e.target.value);
    if (!upa) return;
    onChange({
      ...value,
      upazilaId: upa.id,
      upazilaName: upa.name
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <select className="p-3 border rounded-xl" value={value.divisionId || ''} onChange={handleDivChange}>
        <option value="">Select Division</option>
        {DIVISIONS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <select className="p-3 border rounded-xl" value={value.districtId || ''} onChange={handleDistChange} disabled={!value.divisionId}>
        <option value="">Select District</option>
        {DISTRICTS.filter(d => d.divisionId === value.divisionId).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <select className="p-3 border rounded-xl" value={value.upazilaId || ''} onChange={handleUpaChange} disabled={!value.districtId}>
        <option value="">Select Upazila</option>
        {UPAZILAS.filter(u => u.districtId === value.districtId).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
      </select>
    </div>
  );
}
