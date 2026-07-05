import React from 'react';
import { SITE_LOGO_URL } from '../constants';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 bg-emerald-100/50 rounded-full animate-ping"></div>
        <div className="absolute w-32 h-32 border border-emerald-100 rounded-full animate-pulse"></div>
        
        <div className="bg-white p-4 rounded-full shadow-2xl shadow-emerald-900/10 z-10 animate-float">
          <img src={SITE_LOGO_URL} alt="Loading..." className="h-10 md:h-12 w-auto" />
        </div>
      </div>
      <p className="mt-12 text-[10px] md:text-xs font-bold text-accent uppercase tracking-[0.3em] animate-pulse">Loading...</p>
    </div>
  );
}
