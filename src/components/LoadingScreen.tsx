import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-emerald-600 font-semibold animate-pulse">Loading...</p>
    </div>
  );
}
