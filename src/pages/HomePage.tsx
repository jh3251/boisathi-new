import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../api';
import { BookListing, LocationInfo } from '../types';
import { CLASSES, CONDITIONS, DIVISIONS, DISTRICTS, UPAZILAS } from '../constants';
import BookCard from '../components/BookCard';
import { Search, MapPin, X, PlusCircle, ArrowRight, ChevronRight, ChevronLeft, HelpCircle, BookOpenCheck, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../App';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  const [listings, setListings] = useState<BookListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [location, setLocation] = useState<Partial<LocationInfo>>({
    divisionId: '',
    districtId: '',
    upazilaId: ''
  });
  
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [howToTab, setHowToTab] = useState<'buy' | 'sell'>('buy');
  
  const { t, lang } = useTranslation();

  useEffect(() => {
    const unsubscribe = api.db.subscribeToListings((data) => {
      setListings(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredListings = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return listings.filter(book => {
      const searchStrings = [book.title, book.author, book.subject, book.condition, book.location.upazilaName, book.location.districtName];
      const matchesSearch = !term || searchStrings.some(str => str?.toLowerCase().includes(term));
      const matchesClass = !selectedClass || book.subject === selectedClass;
      const matchesCondition = !selectedCondition || book.condition === selectedCondition;
      const matchesDivision = !location.divisionId || book.location.divisionId === location.divisionId;
      const matchesDistrict = !location.districtId || book.location.districtId === location.districtId;
      const matchesUpazila = !location.upazilaId || book.location.upazilaId === location.upazilaId;
      return matchesSearch && matchesClass && matchesCondition && matchesDivision && matchesDistrict && matchesUpazila;
    });
  }, [listings, searchTerm, location, selectedClass, selectedCondition]);

  const visibleListings = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredListings.slice(start, start + pageSize);
  }, [filteredListings, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredListings.length / pageSize);
  const hasMore = currentPage < totalPages - 1;
  const hasPrevious = currentPage > 0;

  const handleNext = () => { if (hasMore) { setCurrentPage(prev => prev + 1); document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' }); } };
  const handlePrevious = () => { if (hasPrevious) { setCurrentPage(prev => prev - 1); document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' }); } };

  const clearFilters = () => {
    setLocation({ divisionId: '', districtId: '', upazilaId: '' });
    setSearchTerm('');
    setSelectedClass('');
    setSelectedCondition('');
    setCurrentPage(0);
  };

  return (
    <div className="space-y-4 pb-4">
      <SEO 
        title={lang === 'bn' ? 'পুরোনো বই আর কেজি দরে নয়' : 'Old Books, Not Scrap Paper'} 
        description={lang === 'bn' ? 'BoiSathi.com - বাংলাদেশের শিক্ষার্থীদের জন্য পুরোনো বই কেনাবেচার নির্ভরযোগ্য প্ল্যাটফর্ম। পুরোনো বই আর কেজি দরে নয়।' : 'BoiSathi is the safest student marketplace in Bangladesh for buying and selling used academic books. Stop selling knowledge by the kilogram.'}
      />
      
      {/* Centered Vertical Hero Section */}
      <section className="relative px-4 pt-12 md:pt-16 pb-6 overflow-hidden mt-6 md:mt-0">
        <div className="absolute inset-0 alpona-bg opacity-10 -z-10 scale-150 animate-float"></div>
        <div className="max-w-6xl mx-auto text-center space-y-4 md:space-y-10">
          
          <div className="space-y-3 md:space-y-8">
            {/* Main Branding Title */}
            <div className="animate-reveal-up">
              <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-7xl font-serif font-black tracking-tighter leading-[1.1] mb-2 sm:mb-4">
                <span className="text-accent drop-shadow-sm inline-block break-words animate-slide-up-down">BoiSathi.com-</span>
                <br />
                <span className="text-red-600 font-bn animate-slide-up-down inline-block drop-shadow-md md:mt-2 text-3xl sm:text-5xl lg:text-7xl">
                  বইসাথী
                </span>
              </h1>
            </div>

            {/* NEW ANIMATED TEXT */}
            <div className="animate-reveal-up delay-200">
               <div className="inline-block relative">
                 <p className="text-sm sm:text-base md:text-2xl lg:text-3xl font-bn font-black text-slate-800 tracking-tight leading-tight px-2 sm:px-6 py-2">
                   পুরোনো বই আর <span className="relative inline-block text-red-600 px-1 sm:px-2">
                     কেজি দরে নয়
                     <span className="absolute bottom-0 left-0 w-full h-1 bg-red-200/50 -rotate-1 translate-y-1 sm:translate-y-2"></span>
                   </span>
                 </p>
               </div>
            </div>
          </div>
          
          {/* Centered High-Impact Search Bar */}
          <div className="max-w-2xl mx-auto relative pt-4 animate-reveal-up delay-500">
            <div className="bg-white p-2 sm:p-2 rounded-[2rem] sm:rounded-full shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] border border-emerald-50/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transform hover:scale-[1.02] transition-all duration-700 ease-out">
              <div className="flex-grow flex items-center px-4 sm:px-6 md:px-8 w-full group min-w-0 bg-zinc-50/50 sm:bg-transparent rounded-full py-1 sm:py-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-focus-within:text-accent flex-shrink-0 transition-colors" />
                <input 
                  type="text"
                  placeholder={lang === 'bn' ? 'বই বা লেখকের নাম লিখুন...' : 'Search titles, authors...'}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent outline-none font-bold text-slate-900 placeholder:text-zinc-400 text-sm sm:text-lg md:text-xl min-w-0 truncate"
                />
              </div>
              <button 
                onClick={() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })} 
                className="w-full sm:w-auto flex-shrink-0 px-4 sm:px-10 py-3 sm:py-4 md:py-5 bg-[#0f172a] text-white rounded-full font-black text-[10px] sm:text-xs md:text-sm uppercase flex items-center justify-center gap-1.5 sm:gap-3 hover:bg-black transition-all shadow-2xl active:scale-95 tracking-widest sm:tracking-[0.2em]"
              >
                <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white/50" />
                <span>{lang === 'bn' ? 'খুঁজুন' : 'SEARCH'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento-Style Filter Grid */}
      <section className="container mx-auto max-w-7xl px-4 animate-reveal-up delay-700">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 border border-emerald-50 relative shadow-sm">
           <div className="flex justify-between items-center mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-emerald-50 rounded-xl">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                </div>
                <h3 className="text-[9px] md:text-xs font-black text-slate-500 uppercase tracking-widest">
                  {lang === 'bn' ? 'স্থান ও শ্রেণী' : 'LOCATION & FILTERS'}
                </h3>
              </div>
              <button onClick={clearFilters} className="text-[8px] md:text-[10px] font-black text-zinc-400 hover:text-red-500 transition-colors uppercase bg-zinc-50 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-zinc-100 active:scale-95">
                {t('reset')}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-5">
               <div className="space-y-1 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">{t('division')}</label>
                  <select 
                    value={location.divisionId}
                    onChange={(e) => {
                      setLocation({...location, divisionId: e.target.value, districtId: '', upazilaId: ''});
                      setCurrentPage(0);
                    }}
                    className="w-full px-3 md:px-5 py-2.5 md:py-4 bg-zinc-50/50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none text-[10px] md:text-sm font-black text-slate-900 appearance-none cursor-pointer hover:border-accent transition-colors"
                  >
                    <option value="">{t('selectDivision')}</option>
                    {DIVISIONS.map(d => <option key={d.id} value={d.id}>{lang === 'bn' ? d.nameBn : d.name}</option>)}
                  </select>
               </div>

               <div className="space-y-1 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">{t('district')}</label>
                  <select 
                    disabled={!location.divisionId}
                    value={location.districtId}
                    onChange={(e) => {
                      setLocation({...location, districtId: e.target.value, upazilaId: ''});
                      setCurrentPage(0);
                    }}
                    className="w-full px-3 md:px-5 py-2.5 md:py-4 bg-zinc-50/50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none text-[10px] md:text-sm font-black text-slate-900 appearance-none cursor-pointer disabled:opacity-30 hover:border-accent transition-colors"
                  >
                    <option value="">{t('selectDistrict')}</option>
                    {DISTRICTS.filter(d => d.divisionId === location.divisionId).map(d => <option key={d.id} value={d.id}>{lang === 'bn' ? d.nameBn : d.name}</option>)}
                  </select>
               </div>

               <div className="space-y-1 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">{t('upazilaThana')}</label>
                  <select 
                    disabled={!location.districtId}
                    value={location.upazilaId}
                    onChange={(e) => {
                      setLocation({...location, upazilaId: e.target.value});
                      setCurrentPage(0);
                    }}
                    className="w-full px-3 md:px-5 py-2.5 md:py-4 bg-zinc-50/50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none text-[10px] md:text-sm font-black text-slate-900 appearance-none cursor-pointer disabled:opacity-30 hover:border-accent transition-colors"
                  >
                    <option value="">{t('selectUpazila')}</option>
                    {UPAZILAS.filter(u => u.districtId === location.districtId).map(u => <option key={u.id} value={u.id}>{lang === 'bn' ? u.nameBn : u.name}</option>)}
                  </select>
               </div>

               <div className="space-y-1 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">{t('classLevel')}</label>
                  <select 
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                      setCurrentPage(0);
                    }}
                    className="w-full px-3 md:px-5 py-2.5 md:py-4 bg-zinc-50/50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none text-[10px] md:text-sm font-black text-slate-900 appearance-none cursor-pointer hover:border-accent transition-colors"
                  >
                    <option value="">{t('allClasses')}</option>
                    {CLASSES.map(c => <option key={c} value={c}>{t(c as any)}</option>)}
                  </select>
               </div>

               <div className="space-y-1 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-wider">{lang === 'bn' ? 'অবস্থা' : 'CONDITION'}</label>
                  <select 
                    value={selectedCondition}
                    onChange={(e) => {
                      setSelectedCondition(e.target.value);
                      setCurrentPage(0);
                    }}
                    className="w-full px-3 md:px-5 py-2.5 md:py-4 bg-zinc-50/50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none text-[10px] md:text-sm font-black text-slate-900 appearance-none cursor-pointer hover:border-accent transition-colors"
                  >
                    <option value="">{t('allConditions')}</option>
                    {CONDITIONS.map(c => <option key={c} value={c}>{t(c as any)}</option>)}
                  </select>
               </div>

               <div className="col-span-2 lg:col-span-1 flex items-end mt-1 lg:mt-0">
                  <button onClick={() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })} className="w-full px-6 py-3 md:px-10 md:py-4 bg-accent text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase hover:bg-accent-hover shadow-xl active:scale-95 transition-all tracking-widest">
                    {t('find')}
                  </button>
               </div>
            </div>
        </div>
      </section>

      {/* Results Section - Extremely Tight Gaps */}
      <section id="results-section" className="container mx-auto max-w-7xl px-4 space-y-4 pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 tracking-tight leading-none">
              {t('availableBooks')}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
              <p className="text-zinc-400 font-black uppercase text-[9px] md:text-xs tracking-widest">
                {filteredListings.length} {lang === 'bn' ? 'টি বই পাওয়া গেছে' : 'RESULTS FOUND'}
              </p>
            </div>
          </div>
          
          <Link to="/sell" className="group flex items-center justify-center gap-3 bg-emerald-50 text-accent px-6 py-3 rounded-xl font-black text-[10px] md:text-xs uppercase shadow-sm border border-emerald-100 hover:bg-accent hover:text-white transition-all duration-300">
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
            {lang === 'bn' ? 'বিজ্ঞাপন দিন' : 'POST FREE AD'}
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-50 h-32 md:h-40 rounded-[1.5rem] animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              {visibleListings.map((book, idx) => (
                <div key={book.id} className="animate-reveal-up" style={{animationDelay: `${idx * 0.05}s`}}>
                   <BookCard book={book} />
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 pt-8">
                {hasPrevious && (
                  <button onClick={handlePrevious} className="px-6 py-3 bg-white text-zinc-900 border border-zinc-100 rounded-xl font-black text-[10px] uppercase shadow-sm hover:bg-zinc-50 active:scale-95 transition-all">
                    <ChevronLeft className="w-4 h-4 mr-2 inline" /> {lang === 'bn' ? 'আগে' : 'Prev'}
                  </button>
                )}
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCurrentPage(i); document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className={`w-10 h-10 rounded-xl text-[11px] font-black transition-all flex items-center justify-center border ${currentPage === i ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' : 'bg-white text-zinc-400 border-zinc-100'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                {hasMore && (
                  <button onClick={handleNext} className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-black text-[10px] uppercase shadow-sm hover:bg-black active:scale-95 transition-all">
                    {lang === 'bn' ? 'পরে' : 'Next'} <ChevronRight className="w-4 h-4 ml-2 inline" />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-[3rem] border-2 border-dashed border-emerald-50 shadow-sm px-8 max-w-4xl mx-auto mt-4">
             <div className="w-20 h-20 bg-emerald-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
               <Search className="w-8 h-8 text-accent" />
             </div>
            <h3 className="text-2xl font-serif font-black text-black mb-4">{t('noBooksFound')}</h3>
            <button onClick={clearFilters} className="bg-accent text-white px-10 py-4 rounded-2xl font-black uppercase text-xs active:scale-95 shadow-2xl tracking-widest">{t('showEverything')}</button>
          </div>
        )}
      </section>

      {/* Compact How it Works Section */}
      <section className="container mx-auto max-w-7xl px-4 py-4">
        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-emerald-50 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-2xl">
                <HelpCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-black text-black leading-none">{t('howItWorks')}</h2>
              </div>
            </div>
            <div className="bg-zinc-100 p-1 rounded-full flex gap-2">
               <button onClick={() => setHowToTab('buy')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${howToTab === 'buy' ? 'bg-accent text-white shadow-xl' : 'text-zinc-400'}`}>{t('buyABook')}</button>
               <button onClick={() => setHowToTab('sell')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${howToTab === 'sell' ? 'bg-accent text-white shadow-xl' : 'text-zinc-400'}`}>{t('sellABookTitle')}</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" key={howToTab}>
            {howToTab === 'buy' ? (
              <>
                <div className="space-y-4 animate-reveal-up">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-xs font-black">1</div>
                    <h4 className="font-black text-black text-xs uppercase tracking-widest">{lang === 'bn' ? 'বই খুঁজুন' : 'FIND BOOKS'}</h4>
                  </div>
                  <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed">{t('buyStep1')}</p>
                </div>
                <div className="space-y-4 animate-reveal-up delay-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-xs font-black">2</div>
                    <h4 className="font-black text-black text-xs uppercase tracking-widest">{lang === 'bn' ? 'যোগাযোগ করুন' : 'CONTACT'}</h4>
                  </div>
                  <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed">{t('buyStep2')}</p>
                </div>
                <div className="space-y-4 animate-reveal-up delay-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-xs font-black">3</div>
                    <h4 className="font-black text-black text-xs uppercase tracking-widest">{lang === 'bn' ? 'সংগ্রহ করুন' : 'COLLECT'}</h4>
                  </div>
                  <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed">{t('buyStep3')}</p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 animate-reveal-up">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-xs font-black">1</div>
                    <h4 className="font-black text-black text-xs uppercase tracking-widest">{lang === 'bn' ? 'অ্যাকাউন্ট' : 'SIGN UP'}</h4>
                  </div>
                  <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed">{t('sellStep1')}</p>
                </div>
                <div className="space-y-4 animate-reveal-up delay-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-xs font-black">2</div>
                    <h4 className="font-black text-black text-xs uppercase tracking-widest">{lang === 'bn' ? 'বই দিন' : 'UPLOAD'}</h4>
                  </div>
                  <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed">{t('sellStep2')}</p>
                </div>
                <div className="space-y-4 animate-reveal-up delay-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-xs font-black">3</div>
                    <h4 className="font-black text-black text-xs uppercase tracking-widest">{lang === 'bn' ? 'বিক্রি করুন' : 'SELL'}</h4>
                  </div>
                  <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed">{t('sellStep3')}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Compact Toolsybro Dark Banner */}
      <section className="container mx-auto max-w-7xl px-4 py-4">
        <div className="bg-[#0f172a] rounded-[3rem] overflow-hidden relative p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10 text-center lg:text-left">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                 <span className="text-accent font-black text-[10px] uppercase tracking-[0.3em]">Student Utilities</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight">
                Supercharge your <span className="text-accent italic">Workflow.</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                Toolsybro offers 50+ professional online utilities for students. Convert PDFs, edit images, and organize your studies with one click.
              </p>
            </div>
            <a 
              href="https://toolsybro.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-slate-900 px-10 py-5 rounded-full font-black text-xs md:text-sm uppercase hover:bg-accent hover:text-white transition-all shadow-2xl active:scale-95 flex-shrink-0 flex items-center gap-3 tracking-[0.2em]"
            >
              Visit toolsybro.com <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
      {/* Bottom CTA Section */}
      <section className="container mx-auto max-w-7xl px-4 py-8">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-emerald-50 shadow-[0_10px_50px_-20px_rgba(0,0,0,0.05)] text-center space-y-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-slate-900 max-w-3xl mx-auto leading-tight">
             Find your study companion or help others by sharing your pre-loved books today.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => { document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="bg-accent text-white px-8 py-3 rounded-full font-black text-[10px] uppercase shadow-lg hover:bg-accent-hover transition-all tracking-widest">
              BROWSE
            </button>
            <Link to="/sell" className="bg-zinc-900 text-white px-8 py-3 rounded-full font-black text-[10px] uppercase shadow-lg hover:bg-black transition-all tracking-widest">
              SELL A BOOK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;