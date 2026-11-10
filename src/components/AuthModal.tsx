import React, { useState } from 'react';
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
  ShieldCheck 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    authModalMode, 
    closeAuthModal, 
    setUser, 
    addToast, 
    setSelectedState 
  } = useApp();

  const [step, setStep] = useState<'auth' | 'otp' | 'onboard-1' | 'onboard-2' | 'onboard-3'>('auth');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  
  // Onboarding state
  const [onboardState, setOnboardState] = useState<NigerianState>('Abuja (FCT)');
  const [onboardArea, setOnboardArea] = useState('Garki 2 / Wuse');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'jobs',
    'shopping',
    'services'
  ]);
  const [cvName, setCvName] = useState<string | null>(null);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  if (!authModalOpen) return null;

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === 'phone' && !phone.trim()) {
      addToast('Please enter your phone number', 'warning');
      return;
    }
    if (authMethod === 'email' && !email.trim()) {
      addToast('Please enter your email address', 'warning');
      return;
    }

    addToast(`OTP code sent to ${authMethod === 'phone' ? '+234 ' + phone : email}`, 'info');
    // Pre-fill mock OTP for smooth testing
    setOtpCode(['6', '2', '8', '4']);
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpCode.join('');
    if (code.length < 4) {
      addToast('Please enter complete 4-digit code', 'warning');
      return;
    }

    if (authModalMode === 'login') {
      setUser({
        isLoggedIn: true,
        fullName: fullName || (authMethod === 'phone' ? 'Adeola Balogun' : email.split('@')[0]),
        phone: phone ? `+234 ${phone}` : '+234 803 123 4567',
        email: email || 'user@nexora.ng',
        state: onboardState,
        area: onboardArea,
        interests: selectedInterests,
        savedItemIds: ['j-1', 'p-1'],
        notificationsCount: 2
      });
      addToast('Welcome back to NEXORA!', 'success');
      closeAuthModal();
      setStep('auth');
    } else {
      // Go to 3-step onboarding
      setStep('onboard-1');
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleFinishOnboarding = () => {
    setSelectedState(onboardState);
    setUser({
      isLoggedIn: true,
      fullName: fullName || 'New NEXORA Member',
      phone: phone ? `+234 ${phone}` : '+234 812 999 8888',
      email: email || 'user@nexora.ng',
      state: onboardState,
      area: onboardArea,
      interests: selectedInterests,
      cvFileName: cvName || undefined,
      savedItemIds: ['j-1', 'p-1', 's-1'],
      notificationsCount: alertsEnabled ? 3 : 0
    });
    addToast('Account created! Your feed has been personalized.', 'success');
    closeAuthModal();
    setStep('auth');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
          <div>
            <h3 className="font-display font-extrabold text-xl text-[#0E1A3A] dark:text-white">
              {step === 'auth' && (authModalMode === 'login' ? 'Welcome Back' : 'Create One Account')}
              {step === 'otp' && 'Verify Phone Number'}
              {step === 'onboard-1' && 'Step 1 of 3: Location'}
              {step === 'onboard-2' && 'Step 2 of 3: Interests'}
              {step === 'onboard-3' && 'Step 3 of 3: Preferences'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
              {step === 'auth' && 'One login for all 10 NEXORA departments.'}
              {step === 'otp' && 'Enter the 4-digit code sent via SMS.'}
              {step === 'onboard-1' && 'Where are you based in Nigeria?'}
              {step === 'onboard-2' && 'What matters most to you?'}
              {step === 'onboard-3' && 'Personalize alerts and optional CV.'}
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

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: AUTH INPUT */}
          {step === 'auth' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              
              {/* Method Switcher */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    authMethod === 'phone'
                      ? 'bg-white dark:bg-[#26397F] text-[#0E1A3A] dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone (Default)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    authMethod === 'email'
                      ? 'bg-white dark:bg-[#26397F] text-[#0E1A3A] dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
              </div>

              {authModalMode === 'signup' && (
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Babatunde Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                  />
                </div>
              )}

              {authMethod === 'phone' ? (
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                    Nigerian Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-2xl border border-r-0 border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-bold text-sm">
                      🇳🇬 +234
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="803 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-r-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    We'll send a 4-digit SMS verification code. No password needed.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A] font-bold rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 text-[#0FB57F] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Your data is secure and strictly private
                </span>
              </div>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Enter code sent to <strong className="text-slate-900 dark:text-white">{authMethod === 'phone' ? `+234 ${phone || '803 123 4567'}` : email}</strong>
                </p>
              </div>

              {/* 4 Digit Boxes */}
              <div className="flex justify-center gap-3">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newCode = [...otpCode];
                      newCode[idx] = e.target.value;
                      setOtpCode(newCode);
                    }}
                    className="w-13 h-14 text-center font-display font-extrabold text-2xl rounded-2xl border-2 border-[#0FB57F] bg-white dark:bg-[#1E2C60] text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Verify & Continue</span>
              </button>

              <div className="flex justify-between items-center text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setStep('auth')}
                  className="hover:underline"
                >
                  Change number
                </button>
                <button
                  type="button"
                  onClick={() => addToast('New code sent!', 'info')}
                  className="text-[#0FB57F] font-semibold hover:underline"
                >
                  Resend SMS
                </button>
              </div>
            </form>
          )}

          {/* ONBOARDING STEP 1: STATE & AREA */}
          {step === 'onboard-1' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0FB57F]" />
                  <span>Select Primary State</span>
                </label>
                <select
                  value={onboardState}
                  onChange={(e) => setOnboardState(e.target.value as NigerianState)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st} className="text-slate-900">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-1.5">
                  Local Area / Neighbourhood
                </label>
                <input
                  type="text"
                  placeholder="e.g. Garki, Wuse 2, Ikeja, Lekki, Trans Amadi"
                  value={onboardArea}
                  onChange={(e) => setOnboardArea(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  We use this to show jobs, artisans, and community reports closest to you.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep('onboard-2')}
                className="w-full py-3 px-4 bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A] font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Next: Choose Interests</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ONBOARDING STEP 2: INTERESTS */}
          {step === 'onboard-2' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Pick what you want to see first on your homepage:
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { id: 'jobs', label: 'Jobs & Employment', icon: Briefcase, color: 'text-amber-500' },
                  { id: 'shopping', label: 'Market Prices & Foodstuff', icon: ShoppingBag, color: 'text-emerald-500' },
                  { id: 'services', label: 'Artisans & Handymen Services', icon: Wrench, color: 'text-rose-500' },
                  { id: 'property', label: 'Rent, Flats & Real Estate', icon: Home, color: 'text-purple-500' },
                  { id: 'opportunities', label: 'Scholarships & Grants', icon: GraduationCap, color: 'text-blue-500' }
                ].map((item) => {
                  const Icon = item.icon;
                  const isChecked = selectedInterests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                        isChecked
                          ? 'border-[#0FB57F] bg-emerald-50/50 dark:bg-[#0FB57F]/10'
                          : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">
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
                className="w-full py-3 px-4 bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A] font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Next: Alerts & CV</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ONBOARDING STEP 3: PREFERENCES & CV */}
          {step === 'onboard-3' && (
            <div className="space-y-4">
              
              {/* Optional CV Upload */}
              <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 text-center">
                <FileText className="w-7 h-7 mx-auto text-[#FFB627] mb-1.5" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  {cvName ? cvName : 'Upload your CV / Resume (Optional)'}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 mb-2.5">
                  Save time when applying for verified jobs in NEXORA Jobs.
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
                        addToast(`Loaded: ${e.target.files[0].name}`, 'info');
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
                      Local Neighbourhood Alerts
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Emergency traffic, power outages, and price drops
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
                className="w-full py-3.5 px-4 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Check className="w-4 h-4" />
                <span>Complete & Start Exploring</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
