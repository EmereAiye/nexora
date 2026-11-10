import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Logo } from './Logo.tsx';
import { DEPARTMENTS, NIGERIAN_STATES } from '../data/mockData.ts';
import { 
  MapPin, 
  ChevronDown, 
  Sun, 
  Moon, 
  Wifi, 
  WifiOff, 
  User, 
  Menu, 
  X, 
  Layers, 
  Briefcase, 
  HelpCircle, 
  Users 
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    selectedState,
    setSelectedState,
    currentView,
    setCurrentView,
    openDepartment,
    isDarkMode,
    setIsDarkMode,
    isDataSaver,
    setIsDataSaver,
    user,
    openAuthModal,
    openUserDashboard,
    addToast
  } = useApp();

  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stateRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (stateRef.current && !stateRef.current.contains(e.target as Node)) {
        setStateDropdownOpen(false);
      }
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setDeptDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0E1A3A]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <div 
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer shrink-0 transition-opacity hover:opacity-90 py-1"
        >
          <Logo size="md" showTagline />
        </div>

        {/* Centre (desktop): Departments, Community, For Business, Help */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-slate-700 dark:text-slate-200">
          {/* Departments Dropdown */}
          <div className="relative" ref={deptRef}>
            <button
              onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
              className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors hover:text-[#0FB57F] dark:hover:text-[#FFB627] ${
                currentView === 'department' ? 'text-[#0FB57F] dark:text-[#FFB627] font-semibold' : ''
              }`}
            >
              <Layers className="w-4 h-4 opacity-75" />
              <span>Departments</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${deptDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {deptDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#131E45] rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  The 10 Departments
                </div>
                <div className="grid grid-cols-1 gap-0.5">
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => {
                        openDepartment(dept.id);
                        setDeptDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                        {dept.icon}
                      </span>
                      <div className="overflow-hidden">
                        <div className="font-semibold text-sm text-slate-800 dark:text-white truncate">
                          {dept.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-300 truncate">
                          {dept.tagline}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Community */}
          <button
            onClick={() => openDepartment('community')}
            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors hover:text-[#0FB57F] ${
              currentView === 'department' ? '' : ''
            }`}
          >
            <Users className="w-4 h-4 opacity-75" />
            <span>Community</span>
          </button>

          {/* For Business */}
          <button
            onClick={() => setCurrentView('business-dashboard')}
            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors hover:text-[#FFB627] ${
              currentView === 'business-dashboard' ? 'text-[#FFB627] font-semibold' : ''
            }`}
          >
            <Briefcase className="w-4 h-4 opacity-75" />
            <span>For Business</span>
          </button>

          {/* Help Centre */}
          <button
            onClick={() => setCurrentView('help')}
            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors hover:text-[#FF5C6C] ${
              currentView === 'help' ? 'text-[#FF5C6C] font-semibold' : ''
            }`}
          >
            <HelpCircle className="w-4 h-4 opacity-75" />
            <span>Help</span>
          </button>
        </nav>

        {/* Right: location selector, dark mode, data saver, log in, Join Free */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Location Selector */}
          <div className="relative" ref={stateRef}>
            <button
              onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
              className="flex items-center gap-1.5 py-2 px-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 transition-colors text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100"
              aria-label="Select location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0FB57F] shrink-0" />
              <span className="max-w-[105px] truncate">{selectedState}</span>
              <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
            </button>

            {stateDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 max-h-72 overflow-y-auto bg-white dark:bg-[#131E45] rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Nigerian State
                </div>
                {NIGERIAN_STATES.map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setSelectedState(st);
                      setStateDropdownOpen(false);
                      addToast(`Location updated to ${st}`, 'info');
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/5 transition-colors ${
                      selectedState === st ? 'font-bold text-[#0FB57F] bg-emerald-50/50 dark:bg-white/5' : 'text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <span>{st}</span>
                    {selectedState === st && <span className="w-2 h-2 rounded-full bg-[#0FB57F]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Data Saver Mode Toggle */}
          <button
            onClick={() => {
              setIsDataSaver((prev) => !prev);
              addToast(isDataSaver ? 'Data Saver turned OFF' : 'Data Saver ON (reducing image weights)', 'info');
            }}
            title={isDataSaver ? 'Data Saver: ON' : 'Data Saver: OFF'}
            className={`hidden md:flex items-center gap-1 p-2 rounded-full transition-colors text-xs ${
              isDataSaver 
                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold' 
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            {isDataSaver ? <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-300" /> : <Wifi className="w-4 h-4" />}
            <span className="text-[11px] hidden xl:inline">Data Saver</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="p-2 rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#FFB627]" /> : <Moon className="w-4 h-4 text-[#0E1A3A]" />}
          </button>

          {/* User Account / Login */}
          {user.isLoggedIn ? (
            <button
              onClick={openUserDashboard}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#0E1A3A] dark:bg-white/10 text-white hover:opacity-90 transition-opacity text-xs sm:text-sm font-semibold shadow-xs"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{user.fullName.split(' ')[0] || 'My Account'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="hidden sm:inline-block px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0FB57F] transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 text-xs sm:text-sm font-bold text-[#0E1A3A] bg-[#FFB627] hover:bg-[#e5a220] rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-95"
              >
                Join free
              </button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0E1A3A] border-b border-slate-200 dark:border-white/10 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
            All Departments
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => {
                  openDepartment(dept.id);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-100 dark:border-white/5"
              >
                <span className="text-xl">{dept.icon}</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                  {dept.name.replace('NEXORA ', '')}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentView('business-dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <Briefcase className="w-4 h-4 text-[#FFB627]" />
              <span>For Business & Storefronts</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('help');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <HelpCircle className="w-4 h-4 text-[#FF5C6C]" />
              <span>Help Centre & FAQs</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
