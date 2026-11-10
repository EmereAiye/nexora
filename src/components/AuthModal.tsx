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
  MessageSquare, 
  CheckCircle2, 
  Radio, 
  Clock 
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
    let cleaned = val.replace(/\D/g, '');
    if (cleaned.startsWith('234')) {
      cleaned = cleaned.slice(3);
    } else if (cleaned.startsWith('0')) {
      cleaned = cleaned.slice(1);
    }
    return cleaned;
  };

  const cleanPhone = formatPhone(phone);

  // Stepper calculations
  const getStepNumber = () => {
    switch (step) {
      case 'auth': return 1;
      case 'otp': return 2;
      case 'onboard-1': return 3;
      case 'onboard-2': return 3;
      case 'onboard-3': return 4;
      default: return 1;
    }
  };

  const stepsList = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Verification' },
    { num: 3, label: 'Preferences' },
    { num: 4, label: 'Complete' }
  ];

  const currentStepNum = getStepNumber();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();

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

    addToast(`SMS dispatched to +234 ${cleanPhone}. Expected within 5-15s.`, 'success');

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
    addToast(`New verification code dispatched: ${code}`, 'info');
    inputRefs[0].current?.focus();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otpCode.join('');

    if (enteredCode.length < 4) {
      setOtpError('Please enter all 4 digits of your verification code.');
      return;
    }

    if (enteredCode !== generatedOtp) {
      setOtpError(`Code mismatch. Please check your SMS and enter ${generatedOtp}.`);
      return;
    }

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
      addToast(`Welcome back, ${fullName || 'Adeola'}! Phone verified.`, 'success');
      closeAuthModal();
      setStep('auth');
    } else {
      setStep('onboard-1');
      addToast('Phone number verified! Let’s personalize your local feed.', 'success');
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleFinishOnboarding = () => {
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

    addToast(`Setup complete! Welcome to NEXORA, ${fullName.split(' ')[0]}!`, 'success');
    closeAuthModal();
    setStep('auth');
  };

  const filledCount = otpCode.filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-slate-100 dark:border-white/5 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0FB57F]" />
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0E1A3A] dark:text-white">
                {step === 'auth' && (mode === 'signup' ? 'Create Your NEXORA Account' : 'Welcome Back to NEXORA')}
                {step === 'otp' && 'Verify Phone Number'}
                {step === 'onboard-1' && 'Location & Neighbourhood'}
                {step === 'onboard-2' && 'Choose Your Top Interests'}
                {step === 'onboard-3' && 'Alerts & Career Settings'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
              {step === 'auth' && 'One verified account across all 10 departments.'}
              {step === 'otp' && 'Enter the 4-digit code dispatched to your phone.'}
              {step === 'onboard-1' && 'Tailors jobs, market prices & artisans near you.'}
              {step === 'onboard-2' && 'Prioritizes your preferred services on your homepage.'}
              {step === 'onboard-3' && 'Almost done! Enable local updates and manage your CV.'}
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

        {/* PROGRESS STEPPER (Visual progress indicator for sign-up flow) */}
        {mode === 'signup' && (
          <div className="px-6 py-3.5 bg-slate-50/80 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 shrink-0">
            {/* Desktop / Tablet Stepper */}
            <div className="hidden sm:flex items-center justify-between relative">
              {/* Connecting background bar */}
              <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-slate-200 dark:bg-white/15 z-0" />
              {/* Active filled connecting bar */}
              <div 
                className="absolute top-1/2 left-4 -translate-y-1/2 h-0.5 bg-[#0FB57F] transition-all duration-300 z-0"
                style={{ width: `${((currentStepNum - 1) / (stepsList.length - 1)) * 88}%` }}
              />

              {stepsList.map((s) => {
                const isCompleted = currentStepNum > s.num;
                const isCurrent = currentStepNum === s.num;
                return (
                  <div key={s.num} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-xs transition-all ${
                        isCompleted
                          ? 'bg-[#0FB57F] text-white shadow-xs'
                          : isCurrent
                          ? 'bg-[#0E1A3A] dark:bg-[#FFB627] text-white dark:text-[#0E1A3A] ring-4 ring-[#0FB57F]/20'
                          : 'bg-white dark:bg-[#1E2C60] border-2 border-slate-300 dark:border-white/20 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                    </div>
                    <span className={`text-[10px] mt-1 font-semibold ${
                      isCurrent ? 'text-[#0FB57F] dark:text-[#FFB627] font-bold' : isCompleted ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Compact Progress Bar */}
            <div className="sm:hidden space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#0FB57F]">
                  Step {currentStepNum} of 4: {stepsList[currentStepNum - 1]?.label}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  {Math.round((currentStepNum / 4) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0FB57F] transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStepNum / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
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
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                  <Clock className="w-3.5 h-3.5 text-[#0FB57F]" />
                  <span>A 4-digit SMS code will be dispatched immediately.</span>
                </div>
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
                  <ShieldCheck className="w-4 h-4" /> Verified Nigerian Telecommunications Gateway
                </span>
              </div>
            </form>
          )}

          {/* ================= STEP 2: CLEAR STATUS OTP VERIFICATION ================= */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              
              {/* DISPATCH STATUS BANNER */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0FB57F] animate-pulse" />
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wide">
                      SMS Dispatched Live
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                    Network: Active
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 pt-1 border-t border-emerald-100 dark:border-emerald-900/40">
                  <span>Recipient: <strong className="font-mono text-slate-900 dark:text-white">+234 {cleanPhone}</strong></span>
                  <button
                    type="button"
                    onClick={() => setStep('auth')}
                    className="text-[#0FB57F] hover:underline font-bold text-[11px]"
                  >
                    Edit Number
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Expected delivery: <strong>5 to 15 seconds</strong> on MTN, Airtel, Glo, or 9mobile.
                </p>
              </div>

              {/* SIMULATED SMS NOTIFICATION (Shows incoming code with 1-click Auto-Fill) */}
              <div className="p-3.5 rounded-2xl bg-[#0E1A3A] text-white shadow-lg border border-slate-700 space-y-2 animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#FFB627]" />
                    <span className="text-xs font-bold text-slate-200">Incoming Message · Just now</span>
                  </div>
                  <span className="text-[10px] font-bold bg-white/10 text-emerald-400 px-2 py-0.5 rounded-full">
                    Delivered
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  NEXORA: Your single-use code is <strong className="font-mono text-base text-[#FFB627] tracking-widest bg-white/15 px-2 py-0.5 rounded-md border border-white/20 mx-1">{generatedOtp}</strong>. Valid for 10 minutes.
                </div>

                <div className="pt-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpCode(generatedOtp.split(''));
                      setOtpError('');
                    }}
                    className="px-3 py-1 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Auto-fill Code ({generatedOtp})</span>
                  </button>
                </div>
              </div>

              {/* 4 DIGIT INPUT BOXES */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>Enter 4-Digit Security Code:</span>
                  <span className="font-mono text-[11px] text-[#0FB57F]">
                    {filledCount === 0 ? '0/4 digits' : filledCount < 4 ? `${filledCount}/4 entered` : 'Code complete!'}
                  </span>
                </div>

                <div className="flex justify-center gap-3">
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
                      className={`w-13 h-14 sm:w-14 sm:h-16 text-center font-display font-extrabold text-2xl rounded-2xl border-2 transition-all shadow-xs focus:outline-none ${
                        digit
                          ? 'border-[#0FB57F] bg-emerald-50/40 dark:bg-emerald-950/20 text-[#0E1A3A] dark:text-white'
                          : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-[#1E2C60] text-slate-900 dark:text-white focus:border-[#FFB627]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {otpError && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-xs font-semibold text-rose-700 dark:text-rose-300 text-center animate-shake">
                  {otpError}
                </div>
              )}

              {/* Verify & Proceed Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-extrabold text-sm rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Verify Code & {mode === 'signup' ? 'Continue' : 'Sign In'}</span>
              </button>

              {/* Resend & Timing Section */}
              <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Didn't receive SMS?</span>
                </span>

                {resendCountdown > 0 ? (
                  <span className="font-mono text-slate-400 font-medium">
                    Resend in <strong className="text-slate-700 dark:text-slate-200">{resendCountdown}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-[#0FB57F] font-bold hover:underline flex items-center gap-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Resend Code Now</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* ================= ONBOARDING STEP 1: SPECIFIC NEIGHBOURHOOD ================= */}
          {step === 'onboard-1' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                <strong className="flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#0FB57F]" /> Phone Verified Successfully!
                </strong>
                <p>
                  Now tell us your neighbourhood or LGA so your homepage automatically shows local jobs, nearby foodstuffs, and verified artisans.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0FB57F]" />
                  <span>Selected State: {selectedUserLocation}</span>
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
                Select what you want prioritized on your home feed:
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
