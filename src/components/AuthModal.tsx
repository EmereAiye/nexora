import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { NIGERIAN_STATES } from '../data/mockData.ts';
import { NigerianState } from '../types.ts';
import { 
  X, 
  Phone, 
  Mail, 
  ArrowRight, 
  Check, 
  MapPin, 
  Briefcase, 
  ShoppingBag, 
  Wrench, 
  Home, 
  GraduationCap, 
  FileText, 
  Bell, 
  ShieldCheck, 
  RotateCw, 
  MessageSquare 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    authModalMode: initialMode, 
    closeAuthModal, 
    setUser, 
    addToast, 
    setSelectedState 
  } = useApp();

  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [step, setStep] = useState<'auth' | 'otp' | 'onboard-1' | 'onboard-2' | 'onboard-3'>('auth');
  
  // User details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUserLocation, setSelectedUserLocation] = useState<NigerianState>('Lagos');

  // Generated dynamic OTP code and user entered digits
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string[]>(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(30);

  // Onboarding preferences
  const [onboardArea, setOnboardArea] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'jobs',
    'shopping',
    'services'
  ]);
  const [cvName, setCvName] = useState<string | null>(null);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // References for OTP digit boxes
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Sync mode when modal opens
  useEffect(() => {
    if (authModalOpen) {
      setMode(initialMode === 'login' ? 'login' : 'signup');
      setStep('auth');
      setOtpCode(['', '', '', '']);
      setOtpError('');
    }
  }, [authModalOpen, initialMode]);

  // Resend timer countdown
  useEffect(() => {
    if (step === 'otp' && resendCountdown > 0) {
      const timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, resendCountdown]);

  if (!authModalOpen) return null;

  // Clean phone input
  const formatPhone = (val: string) => {
    // Remove non-numeric characters
    let cleaned = val.replace(/\D/g, '');
    if (cleaned.startsWith('234')) {
      cleaned = cleaned.slice(3);
    } else if (cleaned.startsWith('0')) {
      cleaned = cleaned.slice(1);
    }
    return cleaned;
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = formatPhone(phone);

    if (mode === 'signup' && !fullName.trim()) {
      addToast('Please enter your full name', 'warning');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 9) {
      addToast('Please enter a valid 10-digit Nigerian phone number', 'warning');
      return;
    }

    // Generate real random 4-digit OTP
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpCode(['', '', '', '']);
    setOtpError('');
    setResendCountdown(30);
    setStep('otp');

    addToast(`SMS sent to +234 ${cleanPhone}. Your code is: ${code}`, 'success');

    // Auto-focus first input box
    setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newCode = [...otpCode];
    newCode[index] = digit;
    setOtpCode(newCode);
    setOtpError('');

    // Advance to next box if filled
    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResendCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpCode(['', '', '', '']);
    setOtpError('');
    setResendCountdown(30);
    addToast(`New SMS code sent! Your verification code is: ${code}`, 'info');
    inputRefs[0].current?.focus();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otpCode.join('');

    if (enteredCode.length < 4) {
      setOtpError('Please enter the complete 4-digit code');
      return;
    }

    if (enteredCode !== generatedOtp) {
      setOtpError(`Incorrect code. Please enter ${generatedOtp} sent to your phone.`);
      return;
    }

    const cleanPhone = formatPhone(phone);
    const formattedPhone = `+234 ${cleanPhone}`;

    if (mode === 'login') {
      setUser({
        isLoggedIn: true,
        fullName: fullName || 'Adeola Balogun',
        phone: formattedPhone,
        email: email || 'user@nexora.ng',
        state: selectedUserLocation,
        area: onboardArea || 'Central District',
        interests: selectedInterests,
        savedItemIds: ['j-1', 'p-1', 's-1'],
        notificationsCount: 3
      });
      setSelectedState(selectedUserLocation);
      addToast(`Welcome back, ${fullName || 'Adeola'}! Logged in successfully.`, 'success');
      closeAuthModal();
      setStep('auth');
    } else {
      // Advance to personal onboarding
      setStep('onboard-1');
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleFinishOnboarding = () => {
    const cleanPhone = formatPhone(phone);
    setSelectedState(selectedUserLocation);
    
    setUser({
      isLoggedIn: true,
      fullName: fullName.trim() || 'NEXORA Member',
      phone: `+234 ${cleanPhone}`,
      email: email.trim() || `${cleanPhone}@nexora.ng`,
      state: selectedUserLocation,
      area: onboardArea.trim() || 'Local Area',
      interests: selectedInterests,
      cvFileName: cvName || undefined,
      savedItemIds: ['j-1', 'p-1', 's-1'],
      notificationsCount: alertsEnabled ? 3 : 0
    });

    addToast(`Account created! Welcome to NEXORA, ${fullName.split(' ')[0]}!`, 'success');
    closeAuthModal();
    setStep('auth');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0FB57F]" />
              <h3 className="font-display font-extrabold text-xl text-[#0E1A3A] dark:text-white">
                {step === 'auth' && (mode === 'signup' ? 'Create Your NEXORA Account' : 'Welcome Back to NEXORA')}
                {step === 'otp' && 'Verify Your Phone Number'}
                {step === 'onboard-1' && 'Step 1 of 3: Location'}
                {step === 'onboard-2' && 'Step 2 of 3: What do you need?'}
                {step === 'onboard-3' && 'Step 3 of 3: Alerts & CV'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">
              {step === 'auth' && 'One verified account across all 10 departments.'}
              {step === 'otp' && 'Enter the 4-digit SMS security code sent to your mobile phone.'}
              {step === 'onboard-1' && 'We use this to show jobs, prices, and artisans near you.'}
              {step === 'onboard-2' && 'Select your top interests to customize your daily feed.'}
              {step === 'onboard-3' && 'Activate neighbourhood alerts and optional job CV.'}
            </p>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* ================= STEP 1: REGISTRATION & LOGIN FORM ================= */}
          {step === 'auth' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              
              {/* Mode Switcher: Sign Up vs Log In */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    mode === 'signup'
                      ? 'bg-white dark:bg-[#26397F] text-[#0E1A3A] dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                  }`}
                >
                  Create Account (New)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    mode === 'login'
                      ? 'bg-white dark:bg-[#26397F] text-[#0E1A3A] dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                  }`}
                >
                  Log In (Existing)
                </button>
              </div>

              {/* Full Name Field (Required on Sign Up) */}
              {mode === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    Full Name <span className="text-[#FF5C6C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chukwuma Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                  />
                </div>
              )}

              {/* Phone Number Field */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  Nigerian Phone Number <span className="text-[#FF5C6C]">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-2xl border border-r-0 border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-bold text-sm">
                    🇳🇬 +234
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="803 123 4567 or 08031234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-r-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Enter your active mobile number. A 4-digit code will be sent instantly.
                </p>
              </div>

              {/* Email Address */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  Email Address {mode === 'signup' ? '(Optional)' : ''}
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                />
              </div>

              {/* Location Select */}
              {mode === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    Your State in Nigeria
                  </label>
                  <select
                    value={selectedUserLocation}
                    onChange={(e) => setSelectedUserLocation(e.target.value as NigerianState)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st} className="text-slate-900">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A] font-extrabold text-sm rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Send Verification Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 text-[#0FB57F] font-semibold">
                  <ShieldCheck className="w-4 h-4" /> 100% Free · No Password Required · Zero Spam
                </span>
              </div>
            </form>
          )}

          {/* ================= STEP 2: REAL OTP VERIFICATION ================= */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              
              {/* Simulated Mobile SMS Banner (Shows the actual code that was generated) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#131E45] text-white border border-slate-700 shadow-md flex items-start justify-between gap-3 animate-in slide-in-from-top-2">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-xl bg-emerald-500/20 text-[#0FB57F] mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>SMS from NEXORA Alert</span>
                      <span className="text-[10px] text-slate-400 font-normal">Just now</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Your 4-digit verification code is <strong className="font-mono text-base text-[#FFB627] tracking-widest bg-black/40 px-2 py-0.5 rounded-lg border border-white/10 ml-1">{generatedOtp}</strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOtpCode(generatedOtp.split(''));
                    setOtpError('');
                  }}
                  className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-[#0FB57F] text-xs font-bold rounded-lg shrink-0 transition-colors"
                >
                  Auto-fill
                </button>
              </div>

              <div className="text-center space-y-1">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Enter the 4-digit code sent to <strong className="text-slate-900 dark:text-white font-mono">+234 {formatPhone(phone)}</strong>:
                </p>
              </div>

              {/* 4 Digit Empty Input Boxes with Auto-focus */}
              <div className="flex justify-center gap-3 py-1">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-13 h-14 sm:w-14 sm:h-16 text-center font-display font-extrabold text-2xl rounded-2xl border-2 border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-[#1E2C60] text-slate-900 dark:text-white shadow-xs focus:border-[#0FB57F] focus:bg-white dark:focus:bg-[#1A285A] focus:outline-none transition-all"
                  />
                ))}
              </div>

              {/* Error message if code is invalid */}
              {otpError && (
                <p className="text-xs text-red-500 font-semibold text-center animate-shake">
                  {otpError}
                </p>
              )}

              {/* Verify & Continue Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-extrabold text-sm rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Verify & {mode === 'signup' ? 'Personalize Account' : 'Log In'}</span>
              </button>

              <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('auth')}
                  className="hover:underline text-slate-600 dark:text-slate-300"
                >
                  Edit phone number
                </button>

                {resendCountdown > 0 ? (
                  <span className="text-slate-400">
                    Resend code in {resendCountdown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-[#0FB57F] font-bold hover:underline flex items-center gap-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Resend SMS Code</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* ================= ONBOARDING STEP 1: SPECIFIC NEIGHBOURHOOD ================= */}
          {step === 'onboard-1' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300">
                Phone verified! Now tell us where you stay so we show nearby jobs, foodstuff markets, and artisans.
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0FB57F]" />
                  <span>State: {selectedUserLocation}</span>
                </label>
                <select
                  value={selectedUserLocation}
                  onChange={(e) => setSelectedUserLocation(e.target.value as NigerianState)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium text-sm"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st} className="text-slate-900">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  Neighbourhood / LGA / Street Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ikeja, Lekki Phase 1, Garki 2, Wuse, Trans Amadi, Bodija"
                  value={onboardArea}
                  onChange={(e) => setOnboardArea(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep('onboard-2')}
                className="w-full py-3.5 px-4 bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A] font-extrabold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Continue: Choose Interests</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================= ONBOARDING STEP 2: INTERESTS ================= */}
          {step === 'onboard-2' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Select the departments that matter most to you (we will highlight them on your homepage):
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { id: 'jobs', label: 'Verified Nigerian Jobs & Remote Roles', icon: Briefcase, color: 'text-amber-500' },
                  { id: 'shopping', label: 'Market Prices & Foodstuff Tracking', icon: ShoppingBag, color: 'text-emerald-500' },
                  { id: 'services', label: 'Artisans (Electricians, Mechanics, Plumbers)', icon: Wrench, color: 'text-rose-500' },
                  { id: 'property', label: 'Homes for Rent, Flats & Real Estate', icon: Home, color: 'text-purple-500' },
                  { id: 'opportunities', label: 'Scholarships, MSME Grants & Tech Programs', icon: GraduationCap, color: 'text-blue-500' }
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = selectedInterests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                        isChecked
                          ? 'border-[#0FB57F] bg-emerald-50/50 dark:bg-[#0FB57F]/10'
                          : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                          {item.label}
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isChecked ? 'bg-[#0FB57F] border-[#0FB57F] text-white' : 'border-slate-300 dark:border-white/20'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setStep('onboard-3')}
                className="w-full py-3.5 px-4 bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A] font-extrabold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Continue: Final Preferences</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================= ONBOARDING STEP 3: PREFERENCES & CV ================= */}
          {step === 'onboard-3' && (
            <div className="space-y-4">
              
              {/* Optional CV Upload */}
              <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 text-center">
                <FileText className="w-7 h-7 mx-auto text-[#FFB627] mb-1.5" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  {cvName ? `Attached: ${cvName}` : 'Upload your CV / Resume (Optional)'}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 mb-2.5">
                  Save time when applying for verified jobs on NEXORA Jobs.
                </p>
                <label className="inline-block py-1.5 px-4 bg-white dark:bg-[#1E2C60] border border-slate-200 dark:border-white/10 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer shadow-xs">
                  <span>Browse PDF / DOC</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setCvName(e.target.files[0].name);
                        addToast(`Loaded CV: ${e.target.files[0].name}`, 'info');
                      }
                    }}
                  />
                </label>
              </div>

              {/* Alerts Toggle */}
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#FFB627]">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">
                      Instant Local Alerts
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Emergency traffic, road flooding, and price drops
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={alertsEnabled}
                  onChange={(e) => setAlertsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#0FB57F] rounded cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="w-full py-3.5 px-4 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-extrabold text-sm rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Finish & Enter NEXORA</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
