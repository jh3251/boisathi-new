import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { useTranslation } from '../App';
import { SITE_LOGO_URL } from '../constants';
import { PlusCircle, Menu } from 'lucide-react';

export default function Navbar({ user, onLogout }: { user: UserProfile | null, onLogout: () => void }) {
  const { lang, setLang, t } = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 left-4 right-4 max-w-7xl mx-auto bg-white rounded-full shadow-sm border border-emerald-50 z-50 px-6 py-3 flex justify-between items-center">
      {/* Logo Section */}
      <Link to="/" className="flex items-center transition-transform hover:scale-105" aria-label="BoiSathi Home">
        <img src={SITE_LOGO_URL} alt="BoiSathi Logo" className="h-8 md:h-12 w-auto object-contain" />
      </Link>

      {/* Center/Right Section */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Language Toggle */}
        <div className="hidden md:flex bg-zinc-100 p-1 rounded-full items-center gap-1 cursor-pointer">
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'en' ? 'bg-accent text-white shadow-md' : 'text-zinc-400'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('bn')}
            className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'bn' ? 'bg-accent text-white shadow-md' : 'text-zinc-400'}`}
          >
            BD
          </button>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-xs font-black text-slate-800 hover:text-accent uppercase tracking-widest">{t('home')}</Link>
          <Link to="/about" className="text-xs font-black text-slate-800 hover:text-accent uppercase tracking-widest">{t('aboutUs')}</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/sell" className="group flex items-center justify-center gap-2 bg-accent text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full font-black text-[9px] md:text-[10px] uppercase shadow-md hover:bg-accent-hover transition-all">
            <PlusCircle className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
            {t('sellABookTitle')}
          </Link>

          {user ? (
             <div className="flex items-center gap-2">
               <Link to="/dashboard" className="hidden sm:block bg-zinc-900 text-white px-5 py-2.5 rounded-full font-black text-[10px] uppercase shadow-md hover:bg-black transition-all">
                 Dashboard
               </Link>
               <button onClick={onLogout} className="bg-zinc-900 text-white px-5 py-2.5 rounded-full font-black text-[10px] uppercase shadow-md hover:bg-black transition-all">
                 {t('logout')}
               </button>
             </div>
          ) : (
            <Link to="/auth" className="hidden sm:block bg-zinc-900 text-white px-5 py-2.5 rounded-full font-black text-[10px] uppercase shadow-md hover:bg-black transition-all">
              {t('login')}
            </Link>
          )}

          {/* Mobile Menu Icon */}
          <button className="md:hidden bg-zinc-100 p-2.5 rounded-xl text-slate-800 hover:bg-zinc-200 transition-colors">
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
