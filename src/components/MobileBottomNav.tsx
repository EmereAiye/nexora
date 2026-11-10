import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Home, Search, Users, Bookmark, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    activeDepartmentId, 
    openDepartment, 
    user, 
    openAuthModal, 
    openUserDashboard,
    savedItems 
  } = useApp();

  return (
    <nav 
      aria-label="Mobile Navigation" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0E1A3A]/95 backdrop-blur-md border-t border-slate-200/90 dark:border-white/10 px-2 py-1.5 shadow-lg flex items-center justify-around h-16"
    >
      {/* 1. Home */}
      <button
        onClick={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentView === 'home' 
            ? 'text-[#0FB57F] dark:text-[#0FB57F]' 
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[11px] font-medium leading-none">Home</span>
      </button>

      {/* 2. Search (Opens Discover or scrolls to search) */}
      <button
        onClick={() => {
          if (currentView === 'home') {
            const searchInput = document.getElementById('hero-search-input');
            if (searchInput) {
              searchInput.focus();
              searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } else {
            openDepartment('discover');
          }
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentView === 'department' && activeDepartmentId === 'discover'
            ? 'text-[#2E7BFF]' 
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <Search className="w-5 h-5 mb-0.5" />
        <span className="text-[11px] font-medium leading-none">Search</span>
      </button>

      {/* 3. Community */}
      <button
        onClick={() => openDepartment('community')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentView === 'department' && activeDepartmentId === 'community'
            ? 'text-[#0FB57F]' 
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <Users className="w-5 h-5 mb-0.5" />
        <span className="text-[11px] font-medium leading-none">Community</span>
      </button>

      {/* 4. Saved */}
      <button
        onClick={openUserDashboard}
        className="flex flex-col items-center justify-center flex-1 py-1 transition-colors relative text-slate-500 dark:text-slate-400 hover:text-[#FFB627]"
      >
        <div className="relative">
          <Bookmark className="w-5 h-5 mb-0.5" />
          {savedItems.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#FFB627] text-[#0E1A3A] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {savedItems.length}
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium leading-none">Saved</span>
      </button>

      {/* 5. Account */}
      <button
        onClick={() => {
          if (user.isLoggedIn) {
            openUserDashboard();
          } else {
            openAuthModal('login');
          }
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          user.isLoggedIn ? 'text-[#0FB57F]' : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        <span className="text-[11px] font-medium leading-none">
          {user.isLoggedIn ? 'Account' : 'Sign in'}
        </span>
      </button>
    </nav>
  );
};
