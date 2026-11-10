import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { PRODUCTS, JOBS, PROVIDERS, OPPORTUNITIES, DEPARTMENTS } from '../data/mockData.ts';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  Star, 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  Tag 
} from 'lucide-react';

export const DiscoverView: React.FC = () => {
  const { 
    user, 
    openDepartment, 
    toggleSaveItem, 
    savedItems, 
    setCurrentView, 
    openAuthModal, 
    selectedState 
  } = useApp();

  return (
    <div className="space-y-10 pb-16">
      
      {/* Coloured Header Band: Department accent (#2E7BFF Sky Blue) */}
      <div className="bg-[#2E7BFF] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">✨</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  NEXORA Discover
                </h1>
              </div>
              <p className="text-sm sm:text-base text-blue-50 mt-1 font-medium">
                Discover what's available. A serendipitous browsing stream of new businesses, verified deals, and local announcements.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* PERSONALIZED "FOR YOU" SECTION (When signed in or default recommendations) */}
        <section className="bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-blue-500/10 dark:from-white/5 dark:to-white/5 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-white/10 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFB627]" />
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                  Recommended For You ({selectedState})
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                {user.isLoggedIn
                  ? `Curated based on your interests in ${user.interests.join(', ')}.`
                  : 'Based on popular trending activities in your selected Nigerian state.'}
              </p>
            </div>

            {!user.isLoggedIn && (
              <button
                onClick={() => openAuthModal('signup')}
                className="text-xs font-bold text-[#0FB57F] hover:underline self-start sm:self-auto"
              >
                Sign up to personalize →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Recommendation 1: Top Job */}
            <div className="bg-white dark:bg-[#131E45] p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">
                  Top Recommended Career
                </span>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {JOBS[0].title}
                </h4>
                <p className="text-xs text-slate-500">{JOBS[0].employer} · {JOBS[0].location}</p>
                <div className="font-extrabold text-xs text-[#0FB57F] mt-1">{JOBS[0].salaryRange}</div>
              </div>
              <button
                onClick={() => openDepartment('jobs')}
                className="w-full py-2 bg-slate-100 dark:bg-white/10 hover:bg-[#0FB57F] hover:text-white text-xs font-bold rounded-xl transition-colors"
              >
                View Role
              </button>
            </div>

            {/* Recommendation 2: Hot Deal */}
            <div className="bg-white dark:bg-[#131E45] p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                  Verified Price Drop
                </span>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {PRODUCTS[1].title}
                </h4>
                <p className="text-xs text-slate-500">{PRODUCTS[1].sellerName} · {PRODUCTS[1].location}</p>
                <div className="font-extrabold text-xs text-[#0E1A3A] dark:text-[#FFB627] mt-1">
                  ₦{PRODUCTS[1].price.toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => openDepartment('market')}
                className="w-full py-2 bg-slate-100 dark:bg-white/10 hover:bg-[#0FB57F] hover:text-white text-xs font-bold rounded-xl transition-colors"
              >
                Check Seller
              </button>
            </div>

            {/* Recommendation 3: Top Artisan */}
            <div className="bg-white dark:bg-[#131E45] p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#FF5C6C] uppercase tracking-wide">
                  Top Rated Handyman
                </span>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {PROVIDERS[0].name}
                </h4>
                <p className="text-xs text-slate-500">{PROVIDERS[0].trade} · {PROVIDERS[0].area}</p>
                <div className="font-bold text-xs text-amber-500 mt-1">★ {PROVIDERS[0].rating} ({PROVIDERS[0].reviewCount} reviews)</div>
              </div>
              <button
                onClick={() => openDepartment('services')}
                className="w-full py-2 bg-slate-100 dark:bg-white/10 hover:bg-[#FF5C6C] hover:text-white text-xs font-bold rounded-xl transition-colors"
              >
                View Profile & Book
              </button>
            </div>
          </div>
        </section>

        {/* SWIPEABLE ROW 1: NEW BUSINESSES & STOREFRONTS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <span>🏢</span> Emerging Nigerian Business Storefronts
            </h3>
            <button
              onClick={() => openDepartment('business')}
              className="text-xs font-bold text-[#2E7BFF] hover:underline"
            >
              Explore Business Hub →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'PrimeWeld Metal Fabrication', trade: 'Architectural Gates & Canopies', area: 'Idu Industrial / Garki, Abuja', rating: 4.9, icon: '⚡' },
              { name: 'Solana Renewable Tech', trade: 'Lithium Battery Packs & Inverters', area: 'Computer Village, Ikeja', rating: 4.8, icon: '🔋' },
              { name: 'Grace & Agro Millers', trade: 'Wholesale Parboiled Rice & Grains', area: 'Bodija Market, Ibadan', rating: 4.7, icon: '🌾' }
            ].map((b, i) => (
              <div key={i} className="p-5 rounded-3xl bg-white dark:bg-[#131E45] border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-shadow space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> CAC Verified
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">{b.name}</h4>
                  <p className="text-xs text-[#2E7BFF] font-medium">{b.trade}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.area}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                  <span className="text-amber-500 font-bold">★ {b.rating} rating</span>
                  <button
                    onClick={() => openDepartment('business')}
                    className="font-bold text-[#0FB57F] hover:underline"
                  >
                    Open Storefront
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SWIPEABLE ROW 2: ACTIVE GRANTS & OPPORTUNITIES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <span>🎓</span> Closing Soon: Youth Grants & Fellowships
            </h3>
            <button
              onClick={() => openDepartment('opportunities')}
              className="text-xs font-bold text-[#FFB627] hover:underline"
            >
              See all Opportunities →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OPPORTUNITIES.map((op) => (
              <div key={op.id} className="p-5 rounded-3xl bg-white dark:bg-[#131E45] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#FFB627]">{op.deadline}</span>
                  <span className="text-slate-400">{op.type}</span>
                </div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug">{op.title}</h4>
                <p className="text-xs text-slate-500">{op.provider}</p>
                <button
                  onClick={() => openDepartment('opportunities')}
                  className="w-full py-2 bg-slate-100 dark:bg-white/10 hover:bg-[#FFB627] hover:text-[#0E1A3A] font-bold text-xs rounded-xl transition-colors mt-2"
                >
                  Apply Free
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
