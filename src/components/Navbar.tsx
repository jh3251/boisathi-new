import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { useTranslation } from '../App';
import { SITE_LOGO_URL } from '../constants';
import { PlusCircle, Menu, X, User } from 'lucide-react';

export default function Navbar({ user, onLogout }: { user: UserProfile | null, onLogout: () => void }) {
  const { lang, setLang, t } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 max-w-7xl mx-auto bg-white rounded-full shadow-sm border border-emerald-50 z-50 px-4 md:px-6 py-2.5 md:py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center transition-transform hover:scale-105" aria-label="BoiSathi Home">
          <img src={SITE_LOGO_URL} alt="BoiSathi Logo" className="h-7 md:h-12 w-auto object-contain" />
        </Link>

        {/* Center/Right Section */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Language Toggle */}
          <div className="flex bg-zinc-100 p-0.5 md:p-1 rounded-full items-center gap-0.5 md:gap-1 cursor-pointer">
            <button 
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-black transition-all ${lang === 'en' ? 'bg-accent text-white shadow-md' : 'text-zinc-400'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('bn')}
              className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-black transition-all ${lang === 'bn' ? 'bg-accent text-white shadow-md' : 'text-zinc-400'}`}
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
          <div className="flex items-center gap-1.5 md:gap-3">
            <Link to="/sell" className="group flex items-center justify-center gap-1 md:gap-2 bg-accent text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-full font-black text-[9px] md:text-[10px] uppercase shadow-md hover:bg-accent-hover transition-all">
              <PlusCircle className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">{t('sellABookTitle')}</span>
              <span className="sm:hidden">Sell</span>
            </Link>

            <Link 
              to={user ? "/dashboard" : "/auth"} 
              className="bg-zinc-100 p-1.5 md:p-2 rounded-full text-slate-800 hover:bg-zinc-200 transition-colors flex items-center justify-center"
              aria-label="Profile"
            >
               <User className="w-4 h-4 md:w-5 md:h-5" />
            </Link>

            {user ? (
               <div className="hidden sm:flex items-center gap-2">
                 <Link to="/dashboard" className="bg-zinc-900 text-white px-5 py-2.5 rounded-full font-black text-[10px] uppercase shadow-md hover:bg-black transition-all">
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
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="sm:hidden bg-zinc-100 p-2 rounded-xl text-slate-800 hover:bg-zinc-200 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white sm:hidden flex flex-col p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-10">
            <img src={SITE_LOGO_URL} alt="BoiSathi Logo" className="h-8 w-auto object-contain" />
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-zinc-100 p-2 rounded-xl text-slate-800 hover:bg-zinc-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex bg-zinc-100 p-1 rounded-full items-center gap-1 cursor-pointer w-max mb-2">
              <button 
                onClick={() => setLang('en')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${lang === 'en' ? 'bg-accent text-white shadow-md' : 'text-zinc-400'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('bn')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${lang === 'bn' ? 'bg-accent text-white shadow-md' : 'text-zinc-400'}`}
              >
                BD
              </button>
            </div>

            <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="text-sm font-black text-slate-800 hover:text-accent uppercase tracking-widest border-b border-zinc-100 pb-3">{t('home')}</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className="text-sm font-black text-slate-800 hover:text-accent uppercase tracking-widest border-b border-zinc-100 pb-3">{t('aboutUs')}</Link>
            
            {user ? (
              <>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/dashboard" className="text-sm font-black text-slate-800 hover:text-accent uppercase tracking-widest border-b border-zinc-100 pb-3">
                  Dashboard
                </Link>
                <button 
                  onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} 
                  className="text-left text-sm font-black text-red-600 hover:text-red-700 uppercase tracking-widest border-b border-zinc-100 pb-3"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/auth" className="text-sm font-black text-slate-800 hover:text-accent uppercase tracking-widest border-b border-zinc-100 pb-3">
                {t('login')}
              </Link>
            )}

            <Link 
              onClick={() => setIsMobileMenuOpen(false)} 
              to="/sell" 
              className="mt-2 flex items-center justify-center gap-2 bg-accent text-white px-4 py-3 rounded-xl font-black text-xs uppercase shadow-xl hover:bg-accent-hover transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              {t('sellABookTitle')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
