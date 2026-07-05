import React, { useState, useEffect } from 'react';

export default function AdBanner() {
  const [adsenseCode, setAdsenseCode] = useState(() => {
    return localStorage.getItem('bk_adsense_code') || '';
  });

  const [adsenseEnabled, setAdsenseEnabled] = useState(() => {
    return localStorage.getItem('bk_adsense_enabled') !== 'false';
  });

  useEffect(() => {
    const handleUpdate = () => {
      setAdsenseCode(localStorage.getItem('bk_adsense_code') || '');
      setAdsenseEnabled(localStorage.getItem('bk_adsense_enabled') !== 'false');
    };
    window.addEventListener('bk_adsense_updated', handleUpdate);
    return () => {
      window.removeEventListener('bk_adsense_updated', handleUpdate);
    };
  }, []);

  if (!adsenseEnabled) {
    return null;
  }

  if (!adsenseCode) {
    return (
      <div className="bg-zinc-50 rounded-[2rem] w-full p-8 flex flex-col items-center justify-center border-dashed border-2 border-zinc-200 text-zinc-400 my-4 shadow-sm select-none">
        <span className="text-sm font-sans font-black tracking-wider uppercase opacity-60">Sponsored Advertisement Space</span>
        <span className="text-[10px] font-medium opacity-40 mt-1">Configure Google AdSense Code in Super Admin Settings</span>
      </div>
    );
  }

  return (
    <div className="w-full my-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 p-2 flex flex-col items-center justify-center">
        <div className="w-full relative min-h-[90px] md:min-h-[120px]">
          <iframe
            srcDoc={`
              <html>
                <head>
                  <style>
                    body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; height: 100vh; overflow: hidden; }
                  </style>
                </head>
                <body>
                  ${adsenseCode}
                </body>
              </html>
            `}
            className="w-full h-[90px] md:h-[120px] border-none overflow-hidden"
            title="Google AdSense Frame"
            scrolling="no"
          />
        </div>
        <div className="text-[8px] font-bold text-zinc-300 uppercase tracking-widest mt-1">ADVERTISEMENT</div>
      </div>
    </div>
  );
}
