
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { UserProfile, BookListing } from '../types';
import { CONDITIONS, CLASSES } from '../constants';
import LocationSelector from '../components/LocationSelector';
import { ArrowLeft, Save, AlertCircle, Tag, BookOpen, Camera, X, Image as ImageIcon, Loader2, CheckCircle2, MapPin, LayoutGrid } from 'lucide-react';
import { useTranslation } from '../App';

interface SellPageProps {
  user: UserProfile;
}

const SellPage: React.FC<SellPageProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, lang } = useTranslation();
  
  const [loading, setLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentDeleteToken, setCurrentDeleteToken] = useState<string | null>(null);
  const [userListingCount, setUserListingCount] = useState<number>(0);
  
  const [formData, setFormData] = useState<Partial<BookListing>>({
    title: '',
    author: '',
    subject: '',
    condition: 'Good',
    price: 0,
    contactPhone: user.phone || '',
    description: '',
    location: {
      divisionId: '',
      divisionName: '',
      districtId: '',
      districtName: '',
      upazilaId: '',
      upazilaName: '',
      unionId: '',
      unionName: ''
    }
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const listings = await api.db.getUserListings(user.uid);
        setUserListingCount(listings.length);
      } catch (e) {}
    };
    fetchUserStats();

    if (id) {
      const fetchListing = async () => {
        try {
          const listing = await api.db.getListingById(id);
          if (listing && listing.sellerId === user.uid) {
            setFormData(listing);
            if (listing.imageUrl) {
              setImagePreview(listing.imageUrl);
            }
            if (listing.imageDeleteToken) {
              setCurrentDeleteToken(listing.imageDeleteToken);
            }
          } else {
            navigate('/dashboard');
          }
        } catch (e) {
          console.error("fetchListing error", e);
          navigate('/dashboard');
        }
      };
      fetchListing();
    }
  }, [id, user.uid, navigate]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Clear previous image if replaced during the same session
      if (currentDeleteToken) {
        await api.db.deleteImageByToken(currentDeleteToken);
      }

      setImageFile(file);
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
      setError('');
      setIsCompressing(true);

      try {
        // Automatically compress before upload
        const compressed = await api.db.compressImage(file);
        const res = await api.db.uploadBookImage(compressed);
        setCurrentDeleteToken(res.delete_token || null);
        setFormData(prev => ({ 
          ...prev, 
          imageUrl: res.secure_url,
          imageDeleteToken: res.delete_token || "" 
        }));
      } catch (err: any) {
        setError(lang === 'bn' ? "ছবি আপলোড ব্যর্থ হয়েছে।" : "Image upload failed. " + err.message);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const removeImage = async () => {
    if (currentDeleteToken) {
      await api.db.deleteImageByToken(currentDeleteToken);
    }

    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setCurrentDeleteToken(null);
    setFormData(prev => ({ ...prev, imageUrl: "", imageDeleteToken: "" }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = () => {
    if (!formData.imageUrl) {
      return lang === 'bn' ? "অনুগ্রহ করে বইয়ের একটি ছবি দিন (আপলোড সফল হতে হবে)।" : "Please upload at least one photo of the book (upload must succeed).";
    }

    if (!id && userListingCount >= 10) {
      return lang === 'bn' 
        ? "আপনি সর্বোচ্চ ১০টি বিজ্ঞাপন দিতে পারেন। অনুগ্রহ করে পুরোনো বিজ্ঞাপন ডিলিট করুন।"
        : "Listing Limit Reached: Maximum 10 active ads allowed.";
    }
    if (!formData.title?.trim()) return "Please enter a book title.";
    if (!formData.subject) return "Please select a class.";
    if (formData.condition !== 'Donation' && (!formData.price || formData.price <= 0)) return "Please enter a valid price.";
    if (!formData.location?.upazilaId) return "Please select a full location.";
    
    const phone = formData.contactPhone?.trim() || "";
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!phone) return "Please enter a contact phone number.";
    if (!bdPhoneRegex.test(phone)) return "Invalid Phone. Must be 11-digit Bangladeshi number.";
    
    return null;
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCondition = e.target.value as any;
    setFormData({
      ...formData,
      condition: newCondition,
      price: newCondition === 'Donation' ? 0 : formData.price
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || isCompressing) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (id) {
        await api.db.updateListing(id, formData);
      } else {
        await api.db.addListing({
          ...formData as BookListing,
          sellerId: user.uid,
          sellerName: user.displayName,
        });
      }
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err: any) {
      console.error("Submit error:", err);
      let msg = err.message || 'Failed to publish. Check your connection.';
      setError(msg);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-sans font-black text-black">Published Successfully!</h2>
          <p className="text-zinc-500 font-black mt-2 uppercase text-[10px]">Redirecting...</p>
        </div>
      </div>
    );
  }

  const isAtLimit = !id && userListingCount >= 10;

  return (
    <div className="max-w-4xl mx-auto pb-12 pt-4">
      <div className="flex items-center gap-2 mb-4 px-1">
         <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-zinc-400 hover:text-black transition font-bold text-[10px] uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-3 h-3 mr-2" /> BACK
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] p-4 sm:p-8 md:p-12 shadow-2xl shadow-emerald-900/5 border border-emerald-50">
        <div className="flex flex-col mb-8 md:mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[9px] md:text-[10px] font-bold text-[#059669] uppercase bg-[#ECFDF5] px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                <Tag className="w-3 h-3 md:w-3.5 md:h-3.5" />
                {id ? t('editListing') : 'Post an Ad'}
              </span>
              {!id && (
                <span className={`text-[9px] md:text-[10px] font-bold uppercase px-4 py-1.5 md:px-5 md:py-2 rounded-full border flex items-center gap-1.5 ${isAtLimit ? 'bg-red-50 text-red-600 border-red-100' : 'bg-zinc-50 text-zinc-500 border-zinc-100'}`}>
                  <LayoutGrid className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  {lang === 'bn' ? `স্লট: ${userListingCount}/১০ ব্যবহৃত` : `Slots: ${userListingCount}/10 used`}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-black tracking-tight leading-tight">
              {id ? 'Update your Ad' : 'Sell your Book'}
            </h1>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-[1.5rem] flex items-start gap-4 text-red-600 animate-in fade-in duration-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="font-bold text-sm leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`space-y-10 md:space-y-16 ${isAtLimit ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
          {/* Photo Section */}
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-3xl font-sans font-bold text-black flex items-center gap-2 md:gap-3">
              <Camera className="w-5 h-5 md:w-7 md:h-7 text-accent" /> 1. Photos
            </h3>
            <div 
              className={`w-full aspect-[4/3] sm:aspect-[2/1] rounded-[1.5rem] md:rounded-[3.5rem] border-4 border-dashed transition-all relative overflow-hidden group ${
                imagePreview ? 'border-emerald-100 bg-zinc-50' : 'border-[#d1fae5] bg-[#f0fdf4]/30'
              }`}
            >
              {imagePreview ? (
                <div className="w-full h-full relative flex items-center justify-center bg-zinc-50 p-2 md:p-4">
                  <img src={imagePreview} className={`max-w-full max-h-full object-contain transition-opacity ${isCompressing ? 'opacity-40' : 'opacity-100'}`} alt="Book Preview" />
                  {isCompressing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/50 backdrop-blur-xs">
                      <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-accent animate-spin" />
                      <p className="text-[9px] md:text-[10px] font-bold uppercase text-accent bg-white/90 px-3 py-1 rounded-full shadow-sm">Optimizing...</p>
                    </div>
                  )}
                  {!loading && !isCompressing && (
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); removeImage(); }} 
                      className="absolute top-3 right-3 p-2.5 md:p-3 bg-white rounded-full text-red-500 shadow-lg hover:scale-110 transition active:scale-95 border border-red-100 hover:bg-white z-10"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  )}
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={() => !loading && !isCompressing && fileInputRef.current?.click()}
                  className="w-full h-full flex flex-col items-center justify-center space-y-4 md:space-y-6 hover:bg-emerald-50/50 transition-colors py-4 px-2"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-[2.5rem] shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-emerald-50 flex-shrink-0">
                    <ImageIcon className="w-8 h-8 md:w-12 md:h-12 text-[#10b981]" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="font-bold text-black text-sm md:text-lg uppercase tracking-wider">Upload Book Photo</p>
                    <p className="text-zinc-400 text-[9px] md:text-[11px] font-bold uppercase tracking-widest">Clear photo of the cover page</p>
                  </div>
                </button>
              )}
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-3xl font-sans font-bold text-black flex items-center gap-2 md:gap-3">
              <BookOpen className="w-5 h-5 md:w-7 md:h-7 text-accent" /> 2. Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#4b5563] uppercase mb-1 ml-1 tracking-[0.2em]">BOOK TITLE *</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3.5 md:px-7 md:py-5 bg-[#f0fdf4]/50 border border-emerald-100 rounded-xl md:rounded-[1.5rem] outline-none font-bold text-black text-sm md:text-base focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" placeholder="e.g. Physics 1st Paper" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#4b5563] uppercase mb-1 ml-1 tracking-[0.2em]">AUTHOR</label>
                <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-3.5 md:px-7 md:py-5 bg-[#f0fdf4]/50 border border-emerald-100 rounded-xl md:rounded-[1.5rem] outline-none font-bold text-black text-sm md:text-base focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" placeholder="e.g. Dr. Shahjahan Tapan" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#4b5563] uppercase mb-1 ml-1 tracking-[0.2em]">CLASS *</label>
                <select required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3.5 md:px-7 md:py-5 bg-[#f0fdf4]/50 border border-emerald-100 rounded-xl md:rounded-[1.5rem] outline-none font-bold text-black text-sm md:text-base appearance-none cursor-pointer focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm">
                  <option value="">Select Class</option>
                  {CLASSES.map(c => <option key={c} value={c}>{t(c as any)}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#4b5563] uppercase mb-1 ml-1 tracking-[0.2em]">CONDITION *</label>
                <select value={formData.condition} onChange={handleConditionChange} className="w-full px-4 py-3.5 md:px-7 md:py-5 bg-[#f0fdf4]/50 border border-emerald-100 rounded-xl md:rounded-[1.5rem] outline-none font-bold text-black text-sm md:text-base appearance-none cursor-pointer focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm">
                  {CONDITIONS.map(c => <option key={c} value={c}>{t(c as any)}</option>)}
                </select>
              </div>
              {formData.condition !== 'Donation' && (
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-[#4b5563] uppercase mb-1 ml-1 tracking-[0.2em]">PRICE (৳) *</label>
                  <input type="number" value={formData.price || ''} onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})} className="w-full px-4 py-3.5 md:px-7 md:py-5 bg-[#f0fdf4]/50 border border-emerald-100 rounded-xl md:rounded-[1.5rem] outline-none font-bold text-black text-sm md:text-base focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" placeholder="250" />
                </div>
              )}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#4b5563] uppercase mb-1 ml-1 tracking-[0.2em]">CONTACT PHONE *</label>
                <input required type="text" value={formData.contactPhone} onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} className="w-full px-4 py-3.5 md:px-7 md:py-5 bg-[#f0fdf4]/50 border border-emerald-100 rounded-xl md:rounded-[1.5rem] outline-none font-bold text-black text-sm md:text-base focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" placeholder="017XXXXXXXX" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-[#4b5563] uppercase mb-1 ml-1 tracking-[0.2em]">DESCRIPTION</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-4 md:px-7 md:py-5 bg-[#f0fdf4]/50 border border-emerald-100 rounded-xl md:rounded-[2rem] outline-none font-bold text-black text-sm md:text-base min-h-[140px] md:min-h-[180px] focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" placeholder="Tell us about the edition, condition of pages, etc." />
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-3xl font-sans font-bold text-black flex items-center gap-2 md:gap-3">
              <MapPin className="w-5 h-5 md:w-7 md:h-7 text-accent" /> 3. Meetup Location
            </h3>
            <LocationSelector value={formData.location || {}} onChange={(loc) => setFormData({...formData, location: loc})} />
          </div>

          <div className="pt-10 md:pt-16 border-t border-emerald-50 flex flex-col items-center md:items-start">
            <button 
              type="submit" 
              disabled={loading || isAtLimit || isCompressing}
              className="w-full md:w-auto bg-black text-white px-10 py-4 md:px-20 md:py-6 rounded-xl md:rounded-[1.5rem] font-bold text-xs uppercase tracking-widest shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:bg-zinc-800 transition-all flex items-center justify-center gap-4 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {id ? 'Update Ad' : 'Publish Ad'}
            </button>
            {(loading || isCompressing) && (
              <p className="text-[10px] font-bold text-zinc-400 mt-6 md:mt-8 uppercase tracking-[0.3em] animate-pulse">
                {isCompressing ? "Optimizing photo for faster upload..." : "Saving listing... please wait."}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
