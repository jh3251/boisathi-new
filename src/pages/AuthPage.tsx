import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2, RefreshCw, ExternalLink, AlertCircle, Clock, HelpCircle, Copy } from 'lucide-react';
import { useTranslation } from '../App';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { t, lang } = useTranslation();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setError('');
    setLoading(true);
    
    try {
      if (isForgotPassword) {
        await api.auth.resetPassword(email.trim());
        setResetSent(true);
      } else if (isLogin) {
        await api.auth.signIn(email.trim(), password);
      } else {
        if (password !== confirmPassword) throw new Error("Passwords do not match");
        await api.auth.signUp(email.trim(), password, name.trim());
        setNeedsVerification(true);
      }
    } catch (err: any) {
      console.error("Auth Error Object:", err);
      const errorMessage = err.message || '';
      
      if (errorMessage.toLowerCase().includes('rate limit')) {
        setError(lang === 'bn' 
          ? 'ইমেইল রেট লিমিট শেষ হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।' 
          : 'Email rate limit exceeded. Please wait a little while before trying again.');
      } else {
        setError(lang === 'bn' ? `অথেনটিকেশন ব্যর্থ হয়েছে: ${errorMessage}` : `Authentication failed: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const checkVerificationStatus = async () => {
    setLoading(true);
    const user = await api.auth.reloadUser();
    if (user?.emailVerified) window.location.reload();
    else setError(lang === 'bn' ? 'ইমেইল এখনো ভেরিফাই করা হয়নি।' : 'Email not verified yet.');
    setLoading(false);
  };

  if (needsVerification) {
    return (
      <div className="max-w-md mx-auto py-12">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-emerald-50 text-center space-y-8 animate-in zoom-in duration-500">
          <Mail className="w-12 h-12 text-accent mx-auto" />
          <h1 className="text-3xl font-bold font-serif text-black">Check Your Email</h1>
          <p className="text-zinc-500 text-sm">We've sent a verification link to <span className="text-black font-black underline decoration-accent">{email}</span>.</p>
          <div className="space-y-4">
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="w-full bg-accent text-white py-6 rounded-2xl font-black text-sm flex items-center justify-center gap-3 uppercase">Open Gmail <ExternalLink className="w-4 h-4" /></a>
            <button onClick={checkVerificationStatus} disabled={loading} className="w-full bg-white text-black border-2 border-emerald-100 py-6 rounded-2xl font-black text-sm flex items-center justify-center gap-3 uppercase"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Status</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-emerald-50">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-serif text-black mb-4">
            {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back!' : 'Join BoiSathi')}
          </h1>
          <p className="text-zinc-500 text-sm">
            {isForgotPassword ? 'Enter your email to receive a recovery link.' : (isLogin ? 'Sign in to manage your listings.' : 'Create your account to start trading.')}
          </p>
        </div>

        {resetSent ? (
          <div className="space-y-8 text-center animate-in zoom-in">
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-sm font-bold text-black">Check your inbox for a reset link.</p>
            </div>
            <button onClick={() => {setIsForgotPassword(false); setResetSent(false);}} className="text-accent font-black text-xs uppercase hover:underline">Back to Login</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-5 bg-red-50 text-red-600 rounded-[1.5rem] text-[13px] font-semibold border border-red-100 flex flex-col gap-4 animate-in shake">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {!isLogin && !isForgotPassword && (
              <div>
                <label className="block text-[10px] font-black text-zinc-900 uppercase mb-2">Full Name</label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-6 py-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl outline-none font-bold" placeholder="Enter full name" />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-zinc-900 uppercase mb-2">Email Address</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl outline-none font-bold" placeholder="student@gmail.com" />
            </div>

            {!isForgotPassword && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-black text-zinc-900 uppercase">Password</label>
                    {isLogin && <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[10px] font-black text-accent uppercase">Forgot?</button>}
                  </div>
                  <div className="relative">
                    <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl outline-none font-bold" placeholder="............" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-200">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-[10px] font-black text-zinc-900 uppercase mb-2">Confirm Password</label>
                    <div className="relative">
                      <input required type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-6 py-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl outline-none font-bold" placeholder="............" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-200">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                    </div>
                  </div>
                )}
              </>
            )}

            <button disabled={loading} type="submit" className="w-full bg-accent text-white py-6 rounded-full font-black text-sm uppercase shadow-xl shadow-accent/30 flex items-center justify-center gap-3 disabled:opacity-50 transition-all active:scale-95">
              {loading ? 'Processing...' : (isForgotPassword ? 'Send Link' : (isLogin ? 'Sign In' : 'Join Now'))}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        )}

        {!isForgotPassword && (
          <div className="mt-10 pt-10 border-t border-emerald-50 text-center">
            <p className="text-zinc-500 text-[13px] font-bold">
              {isLogin ? "New to BoiSathi?" : "Member already?"}{' '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-accent font-black hover:underline">{isLogin ? 'Sign Up Free' : 'Log In'}</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;