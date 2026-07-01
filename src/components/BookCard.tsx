import React from 'react';
import { Link } from 'react-router-dom';
import { BookListing } from '../types';
import { MapPin, BookOpen, Clock, Phone, ChevronRight } from 'lucide-react';
import { useTranslation } from '../App';

interface BookCardProps {
  book: BookListing;
  showActions?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  key?: string | number;
}

export default function BookCard({ book, showActions, onDelete, onEdit }: BookCardProps) {
  const { lang, t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-emerald-50 p-2 sm:p-4 flex flex-row gap-2 sm:gap-5 hover:shadow-lg transition-all duration-300">
      <div className="relative w-20 h-20 sm:w-28 sm:h-36 md:w-36 md:h-44 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
        {book.imageUrl ? (
          <img 
            src={book.imageUrl} 
            alt={book.title} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "https://res.cloudinary.com/dxbqn8ms0/image/upload/v1740856000/logo.png";
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider">No Image</span>
          </div>
        )}
        {Number(book.price) === 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-[8px] sm:text-[9px] font-black uppercase px-2 py-1 rounded-md shadow-md tracking-wider">
            FREE
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col justify-between py-1">
        <div>
          <h3 className="font-serif font-black text-slate-900 text-base sm:text-lg md:text-xl leading-tight line-clamp-1">{book.title}</h3>
          <p className="text-slate-400 text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-0.5 sm:mt-1 line-clamp-1">
             — {book.author || 'AUTHOR'}
          </p>
          
          <div className="space-y-0.5 sm:space-y-1.5 mt-0.5 sm:mt-3">
             <div className="flex items-center gap-1.5">
               <div className="bg-emerald-50 p-1 rounded">
                 <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-accent" />
               </div>
               <span className="text-[7px] sm:text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-wider truncate max-w-[200px] md:max-w-[250px]">
                 {book.location?.upazilaName}, {book.location?.districtName}
               </span>
             </div>
             <div className="flex items-center gap-1.5">
               <div className="bg-slate-100 p-1 rounded">
                 <BookOpen className="w-2 h-2 sm:w-3 sm:h-3 text-slate-500" />
               </div>
               <span className="text-[7px] sm:text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-wider truncate max-w-[200px] md:max-w-[250px]">
                 {t(book.subject as any) || book.subject}
               </span>
             </div>
          </div>
        </div>

        <div className="flex items-end justify-between mt-1 sm:mt-4">
           <div>
             <div className="flex items-baseline gap-1">
               <span className="font-bn text-accent font-black text-sm sm:text-lg md:text-xl leading-none">৳</span>
               <span className="font-black text-accent text-base sm:text-xl md:text-2xl leading-none">{book.price === 0 ? (lang === 'bn' ? 'ফ্রি' : 'FREE') : book.price}</span>
             </div>
             <div className="flex items-center gap-1 text-slate-400 mt-0.5">
                <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
                <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest">
                   {new Date(book.createdAt).toLocaleDateString()}
                </span>
             </div>
           </div>

          {!showActions ? (
             <div className="flex items-center gap-1.5 sm:gap-2">
               <Link to={`/books/${book.id}`} className="bg-zinc-900 text-white px-2 sm:px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[7px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-1">
                 DETAILS <ChevronRight className="w-2 h-2 sm:w-3 sm:h-3" />
               </Link>
               <a href={`tel:${book.contactPhone || ''}`} className="bg-accent text-white p-1.5 sm:p-1.5 md:p-2 rounded-lg md:rounded-xl hover:bg-accent-hover transition-colors">
                 <Phone className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
               </a>
             </div>
          ) : (
            <div className="flex gap-1.5 sm:gap-2">
              <button onClick={() => onEdit?.(book.id)} className="bg-zinc-100 text-slate-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[8px] sm:text-[9px] font-black uppercase hover:bg-zinc-200">Edit</button>
              <button onClick={() => onDelete?.(book.id)} className="bg-red-50 text-red-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[8px] sm:text-[9px] font-black uppercase hover:bg-red-100">Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
