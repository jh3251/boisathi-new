import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_LOGO_URL, GOOGLE_PLAY_ICON_URL } from '../constants';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8 text-white mt-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 mb-16">
           {/* Column 1: Brand & Info */}
           <div className="md:col-span-5 space-y-6">
              <Link to="/" className="flex items-center">
                <div className="bg-white px-2 py-1 rounded-lg">
                  <img src={SITE_LOGO_URL} alt="BoiSathi" className="h-8 md:h-10 w-auto object-contain" />
                </div>
              </Link>
              <p className="text-zinc-400 text-[10px] md:text-xs font-medium leading-relaxed max-w-sm">
                A student-centric online platform where BoiSathi becomes your study companion. Buying, selling, and donating pre-loved books is now easier than ever.
              </p>
              
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:bg-accent-hover transition-colors">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:bg-accent-hover transition-colors">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              </div>

              <div className="pt-4">
                 <a href="#" className="inline-flex items-center gap-4 bg-[#0f172a] border border-zinc-800 px-5 py-3 rounded-2xl hover:bg-zinc-900 transition-colors">
                    <img src={GOOGLE_PLAY_ICON_URL} alt="Google Play" className="w-8 h-8 object-contain" />
                    <div>
                      <div className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">GET THE APP</div>
                      <div className="text-white font-black text-sm flex items-center gap-2">
                        Android App <span className="bg-accent text-white text-[7px] px-1.5 py-0.5 rounded-full">SOON</span>
                      </div>
                    </div>
                 </a>
              </div>
           </div>

           {/* Column 2: Quick Navigation */}
           <div className="md:col-span-3 space-y-6">
             <h4 className="font-black text-white text-[10px] uppercase tracking-widest">QUICK NAVIGATION</h4>
             <div className="flex flex-col gap-3">
               <Link to="/about" className="bg-[#1a1a1a] text-center text-zinc-300 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">ABOUT US</Link>
               <Link to="/contact" className="bg-[#1a1a1a] text-center text-zinc-300 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">CONTACT US</Link>
               <Link to="/privacy" className="bg-[#1a1a1a] text-center text-zinc-300 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">PRIVACY POLICY</Link>
               <Link to="/terms" className="bg-[#1a1a1a] text-center text-zinc-300 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">TERMS OF USE</Link>
             </div>
           </div>

           {/* Column 3: Student Support */}
           <div className="md:col-span-4 space-y-6 md:pl-10">
             <h4 className="font-black text-white text-[10px] uppercase tracking-widest">STUDENT SUPPORT</h4>
             <div className="flex flex-col gap-3">
               <Link to="/" className="bg-accent text-center text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-accent-hover transition-colors">BROWSE</Link>
               <Link to="/sell" className="bg-[#1a1a1a] text-center text-zinc-300 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">SELL A BOOK</Link>
             </div>
           </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-[8px] font-black uppercase tracking-widest">
            &copy; {new Date().getFullYear()} BOISATHI.COM. ALL RIGHTS RESERVED.
          </p>
          <p className="text-zinc-500 text-[8px] font-black uppercase tracking-widest">
            CRAFTED FOR <span className="text-accent">KNOWLEDGE EXCHANGE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
