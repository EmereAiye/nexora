import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  DEPARTMENTS, 
  PRODUCTS, 
  JOBS, 
  PROVIDERS, 
  COMMUNITY_REPORTS, 
  OPPORTUNITIES, 
  DEMO_BUSINESS 
} from '../data/mockData.ts';
import { DepartmentId } from '../types.ts';
import { 
  Search, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ThumbsUp, 
  ChevronRight, 
  Star, 
  Briefcase, 
  TrendingUp, 
  PhoneCall, 
  Bookmark, 
  AlertTriangle 
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    selectedState,
    setSelectedState,
    openDepartment,
    setCurrentView,
    toggleSaveItem,
    savedItems,
    reports,
    confirmReport,
    openAuthModal,
    addToast
  } = useApp();

  const [heroSearch, setHeroSearch] = useState('');
  const [activeChip, setActiveChip] = useState<'All' | 'Market' | 'Jobs' | 'Services' | 'Transport' | 'Utilities' | 'Properties'>('All');

  // Live search result filtering (up to 4 items)
  const liveResults = useMemo(() => {
    if (!heroSearch.trim()) return [];
    const query = heroSearch.toLowerCase();

    const results: Array<{
      id: string;
      name: string;
      detail: string;
      priceOrAction: string;
      type: string;
      deptId: DepartmentId;
      icon: string;
    }> = [];

    // Search jobs
    if (activeChip === 'All' || activeChip === 'Jobs') {
      JOBS.filter(j => j.title.toLowerCase().includes(query) || j.employer.toLowerCase().includes(query))
        .slice(0, 2)
        .forEach(j => {
          results.push({
            id: j.id,
            name: j.title,
            detail: `${j.employer} · ${j.location}`,
            priceOrAction: j.salaryRange,
            type: 'Job Opening',
            deptId: 'jobs',
            icon: '💼'
          });
        });
    }

    // Search products
    if (activeChip === 'All' || activeChip === 'Market') {
      PRODUCTS.filter(p => p.title.toLowerCase().includes(query) || p.sellerName.toLowerCase().includes(query))
        .slice(0, 2)
        .forEach(p => {
          results.push({
            id: p.id,
            name: p.title,
            detail: `${p.sellerName} · ${p.location}`,
            priceOrAction: `₦${p.price.toLocaleString()}`,
            type: 'Product',
            deptId: 'market',
            icon: '🛍️'
          });
        });
    }

    // Search services
    if (activeChip === 'All' || activeChip === 'Services') {
      PROVIDERS.filter(s => s.name.toLowerCase().includes(query) || s.trade.toLowerCase().includes(query))
        .slice(0, 2)
        .forEach(s => {
          results.push({
            id: s.id,
            name: s.name,
            detail: `${s.trade} · ${s.area}`,
            priceOrAction: s.estimatedPrice,
            type: 'Artisan',
            deptId: 'services',
            icon: '🔧'
          });
        });
    }

    return results.slice(0, 4);
  }, [heroSearch, activeChip]);

  // Filter content near user's selected state
  const stateJobs = JOBS.filter(j => j.state === selectedState || j.type === 'Remote');
  const stateProducts = PRODUCTS.filter(p => p.state === selectedState);
  const stateCommunityReports = reports.filter(r => r.state === selectedState).slice(0, 3);
  const displayReports = stateCommunityReports.length > 0 ? stateCommunityReports : reports.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24">
      
      {/* 4.1 HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E1A3A] via-[#1A285A] to-[#26397F] text-white pt-12 pb-20 md:pt-18 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        
        {/* Soft emerald and coral glows in corners */}
        <div 
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#0FB57F]/15 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#FF5C6C]/15 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-[#FFB627]/10 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          
          {/* Headline (fluid 40-74px) */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white">
            Everything. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0FB57F] via-[#FFB627] to-[#FF5C6C]">Connected.</span>
          </h1>

          {/* Supporting line */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Jobs, prices, artisans, homes, transport and your neighbourhood news. One search, one account.
          </p>

          {/* Floating Search Bar */}
          <div className="pt-3 max-w-2xl mx-auto relative z-30">
            <div className="bg-white dark:bg-[#131E45] rounded-3xl p-2 sm:p-2.5 shadow-2xl border border-white/20 flex items-center gap-2">
              <div className="pl-3 text-slate-400">
                <Search className="w-5 h-5 text-slate-400 dark:text-slate-300" />
              </div>
              <input
                id="hero-search-input"
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search jobs, products, services, businesses and more…"
                className="flex-1 bg-transparent py-2 px-1 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-none"
              />
              {heroSearch && (
                <button
                  onClick={() => setHeroSearch('')}
                  className="px-2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => {
                  if (heroSearch.trim()) {
                    openDepartment('discover');
                  }
                }}
                className="py-2.5 px-5 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 shrink-0"
              >
                Search
              </button>
            </div>

            {/* Category Chips Under the Bar */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 flex-wrap">
              {(['All', 'Market', 'Jobs', 'Services', 'Transport', 'Utilities', 'Properties'] as const).map((chip) => (
                <button
                  key={chip}
                  onClick={() => setActiveChip(chip)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    activeChip === chip
                      ? 'bg-white text-[#0E1A3A] shadow-xs'
                      : 'bg-white/10 text-white/90 hover:bg-white/20'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* LIVE RESULTS DROPDOWN (As user types, up to 4 result cards appear) */}
            {liveResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-2 text-left z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Instant Results</span>
                  <span className="text-[#0FB57F] font-semibold">Live</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-white/5">
                  {liveResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openDepartment(item.deptId)}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-slate-400 uppercase">{item.type}</div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{item.detail}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#0FB57F] dark:text-[#FFB627]">
                          {item.priceOrAction}
                        </span>
                        <div className="text-[10px] text-slate-400 flex items-center gap-0.5 justify-end mt-0.5">
                          <span>View</span> <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Small Stat Row */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 font-medium border-t border-white/10 max-w-3xl mx-auto">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0FB57F]" />
              <strong>10</strong> departments
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFB627]" />
              <strong>1</strong> account
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2E7BFF]" />
              Local in <strong>36 states & FCT</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5C6C]" />
              <strong>Free</strong> job search
            </span>
          </div>

        </div>
      </section>

      {/* 4.2 TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#131E45] rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-white/5">
          <div className="flex flex-col items-center justify-center p-2">
            <ShieldCheck className="w-5 h-5 text-[#0FB57F] mb-1" />
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">Verified Businesses</span>
            <span className="text-[11px] text-slate-400">CAC and physical ID vetted</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <CheckCircle className="w-5 h-5 text-[#FFB627] mb-1" />
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">Moderated Reviews</span>
            <span className="text-[11px] text-slate-400">Real customer feedback</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <Clock className="w-5 h-5 text-[#FF5C6C] mb-1" />
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">Timestamped Reports</span>
            <span className="text-[11px] text-slate-400">Current road, outage & fuel status</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <Sparkles className="w-5 h-5 text-[#2E7BFF] mb-1" />
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">Free Essential Access</span>
            <span className="text-[11px] text-slate-400">No paywall for basic needs</span>
          </div>
        </div>
      </section>

      {/* 4.3 DEPARTMENTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
              Ten departments. One home screen.
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
              Tap any department to explore listings, comparisons, and tools.
            </p>
          </div>
        </div>

        {/* 2 tiles per row on phones, 5 per row on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => openDepartment(dept.id)}
              className="group relative p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#131E45] border border-slate-200/80 dark:border-white/10 text-left hover:-translate-y-1.5 transition-all duration-200 hover:shadow-xl overflow-hidden cursor-pointer flex flex-col justify-between min-h-[170px]"
            >
              {/* Soft coloured circle in the corner */}
              <div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-15 transition-transform group-hover:scale-125 duration-300"
                style={{ backgroundColor: dept.accentColor }}
                aria-hidden="true"
              />

              <div className="space-y-2 relative z-10">
                <span className="text-3xl block transition-transform group-hover:scale-110 duration-200">
                  {dept.icon}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-[#0FB57F] dark:group-hover:text-[#FFB627] transition-colors leading-tight">
                  {dept.name.replace('NEXORA ', '')}
                </h3>
              </div>

              <div className="relative z-10 pt-2 border-t border-slate-100 dark:border-white/5">
                <p className="text-xs text-slate-500 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {dept.tagline}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4.4 NEAR YOU (Shows content for user's selected state) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 dark:bg-[#0E1A3A]/80 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0FB57F]" />
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  Near You in {selectedState}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-0.5">
                Hand-picked jobs, artisans, and products available around your neighbourhood.
              </p>
            </div>

            <button
              onClick={() => {
                const headerSelect = document.querySelector('header');
                headerSelect?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#0FB57F] hover:underline flex items-center gap-1"
            >
              <span>Change State ({selectedState})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Col 1: Jobs in your state */}
            <div className="bg-white dark:bg-[#131E45] rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 dark:text-[#FFB627] flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> Jobs in {selectedState}
                </span>
                <button
                  onClick={() => openDepartment('jobs')}
                  className="text-[11px] font-semibold text-slate-400 hover:text-slate-800 dark:hover:text-white"
                >
                  See all →
                </button>
              </div>

              {stateJobs.length > 0 ? (
                <div className="space-y-2.5">
                  {stateJobs.slice(0, 2).map((job) => (
                    <div
                      key={job.id}
                      onClick={() => openDepartment('jobs')}
                      className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer border border-slate-100 dark:border-white/5 transition-colors"
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {job.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {job.employer} · {job.location}
                      </div>
                      <div className="text-[11px] font-bold text-[#0FB57F] mt-1">
                        {job.salaryRange}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-400">
                  No local vacancies currently listed. Showing remote opportunities.
                </div>
              )}
            </div>

            {/* Col 2: Products from nearby sellers */}
            <div className="bg-white dark:bg-[#131E45] rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-[#0FB57F] flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Nearby Products
                </span>
                <button
                  onClick={() => openDepartment('market')}
                  className="text-[11px] font-semibold text-slate-400 hover:text-slate-800 dark:hover:text-white"
                >
                  See all →
                </button>
              </div>

              <div className="space-y-2.5">
                {(stateProducts.length > 0 ? stateProducts : PRODUCTS).slice(0, 2).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => openDepartment('market')}
                    className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer border border-slate-100 dark:border-white/5 transition-colors"
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {prod.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {prod.sellerName} · {prod.location}
                    </div>
                    <div className="text-xs font-extrabold text-[#0E1A3A] dark:text-[#FFB627] mt-1">
                      ₦{prod.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3: Businesses & Artisans near you */}
            <div className="bg-white dark:bg-[#131E45] rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FF5C6C] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> Top Artisans
                </span>
                <button
                  onClick={() => openDepartment('services')}
                  className="text-[11px] font-semibold text-slate-400 hover:text-slate-800 dark:hover:text-white"
                >
                  See all →
                </button>
              </div>

              <div className="space-y-2.5">
                {PROVIDERS.slice(0, 2).map((s) => (
                  <div
                    key={s.id}
                    onClick={() => openDepartment('services')}
                    className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer border border-slate-100 dark:border-white/5 transition-colors"
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate flex items-center justify-between">
                      <span>{s.name}</span>
                      <span className="text-[10px] text-amber-500 flex items-center gap-0.5">
                        ★ {s.rating}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {s.trade} · {s.area}
                    </div>
                    <div className="text-[11px] font-bold text-[#FF5C6C] mt-1">
                      {s.estimatedPrice}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4.5 LATEST COMMUNITY REPORTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C6C] animate-pulse" />
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                Latest Community Reports
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-0.5">
              Verified crowdsourced updates on road conditions, water shortages, and electricity feeders.
            </p>
          </div>
          <button
            onClick={() => openDepartment('community')}
            className="text-xs sm:text-sm font-bold text-[#0FB57F] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>See all reports & submit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 cards with Confirm button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayReports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-[#131E45] rounded-3xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    report.category === 'Flooding'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : report.category === 'Electricity Problem'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                  }`}>
                    {report.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {report.timestamp}
                  </span>
                </div>

                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {report.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-300 line-clamp-2">
                  {report.description}
                </p>

                <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#0FB57F]" />
                  <span>{report.location}</span>
                </div>
              </div>

              {/* Confirm button */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  <strong>{report.confirmations}</strong> confirmed this
                </span>
                <button
                  onClick={() => confirmReport(report.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    report.hasConfirmed
                      ? 'bg-[#0FB57F] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-[#0FB57F] hover:text-white'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{report.hasConfirmed ? 'Confirmed' : 'Confirm'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4.6 FEATURED SERVICES AND TRENDING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Trending Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Trending Market Products
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Live price transparency from verified sellers across Nigeria.
              </p>
            </div>
            <button
              onClick={() => openDepartment('market')}
              className="text-xs font-bold text-[#0FB57F] hover:underline"
            >
              Go to Market →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-[#131E45] rounded-3xl p-4 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="text-slate-400 capitalize">{p.category}</span>
                    {p.isSponsored && (
                      <span className="text-[10px] font-bold text-[#FFB627] bg-[#FFB627]/10 px-1.5 py-0.2 rounded-full">
                        Sponsored
                      </span>
                    )}
                  </div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 truncate">
                    {p.sellerName} · {p.location}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-display font-extrabold text-base text-[#0E1A3A] dark:text-[#FFB627]">
                      ₦{p.price.toLocaleString()}
                    </span>
                    {p.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through block">
                        ₦{p.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleSaveItem(p.id, p.title)}
                    className={`p-2 rounded-xl transition-colors ${
                      savedItems.includes(p.id)
                        ? 'bg-[#FFB627] text-[#0E1A3A]'
                        : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                    aria-label="Save product"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Vetted Artisans */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Vetted Artisans & Technicians
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Electricians, mechanics, plumbers, and technicians with real reviews.
              </p>
            </div>
            <button
              onClick={() => openDepartment('services')}
              className="text-xs font-bold text-[#FF5C6C] hover:underline"
            >
              Browse all Services →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROVIDERS.map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-[#131E45] rounded-3xl p-4 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Vetted
                    </span>
                    {s.isSponsored && (
                      <span className="text-[10px] font-bold text-[#FFB627] bg-[#FFB627]/10 px-1.5 py-0.2 rounded-full">
                        Sponsored
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    {s.name}
                  </h4>
                  <p className="text-xs text-[#FF5C6C] font-semibold mt-0.5">{s.trade}</p>
                  <p className="text-[11px] text-slate-400 mt-1 truncate">{s.area}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {s.estimatedPrice}
                  </span>
                  <button
                    onClick={() => openDepartment('services')}
                    className="px-3 py-1.5 bg-[#FF5C6C] hover:bg-[#fa4b5d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 4.7 OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0E1A3A] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFB627]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  Verified Opportunities & Grants
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Zero-scam scholarships, seed capital grants, and government digital training fellowships.
              </p>
            </div>
            <button
              onClick={() => openDepartment('opportunities')}
              className="text-xs font-bold text-[#FFB627] hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              <span>View all opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OPPORTUNITIES.map((opp) => (
              <div
                key={opp.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#FFB627] bg-[#FFB627]/20 px-2 py-0.5 rounded-full">
                      {opp.deadline}
                    </span>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified source
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-white leading-snug">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {opp.fundingAmount || opp.provider}
                  </p>
                </div>

                <button
                  onClick={() => openDepartment('opportunities')}
                  className="w-full py-2 bg-white text-[#0E1A3A] hover:bg-[#FFB627] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  View Eligibility & Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.8 BUSINESS CALL-TO-ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#26397F] to-[#0E1A3A] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-white/10 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFB627]">
              Zero Website Needed
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              Give your business a storefront.
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              No website needed. Add products, photos, special offers and receive direct customer enquiries on phone and WhatsApp. Free setup for Nigerian businesses.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentView('business-dashboard')}
                className="py-3.5 px-6 bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A] font-extrabold text-sm rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                List your business free
              </button>
              <button
                onClick={() => openDepartment('business')}
                className="py-3.5 px-6 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-full border border-white/20 transition-colors"
              >
                Preview Storefront Example
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4.9 HOW NEXORA GROWS (Six-Step Roadmap Graphic) */}
      <section id="roadmap-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
            How NEXORA Grows
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300">
            A real, phased journey from Nigeria's daily essentials to an all-African digital ecosystem.
          </p>
        </div>

        {/* 6 numbered steps in order */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {[
            { step: 1, title: 'Launch', desc: 'Core essentials: Jobs, Market, Artisans & Community.' },
            { step: 2, title: 'Nigerian Base', desc: 'Expanding active coverage across all 36 States & FCT.' },
            { step: 3, title: 'Payments & Bookings', desc: 'In-app escrow protection and confirmed scheduling.' },
            { step: 4, title: 'African Expansion', desc: 'Ghana, Kenya, Rwanda and cross-border trade.' },
            { step: 5, title: 'Mobile App', desc: 'Native Android & iOS offline-first experience.' },
            { step: 6, title: 'International', desc: 'Global diaspora remittances and export connections.' }
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white dark:bg-[#131E45] rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="w-8 h-8 rounded-full bg-[#0E1A3A] dark:bg-white/10 text-white dark:text-[#FFB627] font-display font-bold text-xs flex items-center justify-center mb-3">
                  0{item.step}
                </span>
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
