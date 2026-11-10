import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { OPPORTUNITIES } from '../data/mockData.ts';
import { OpportunityItem } from '../types.ts';
import { 
  GraduationCap, 
  Clock, 
  ShieldCheck, 
  Bookmark, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  DollarSign, 
  Search 
} from 'lucide-react';

export const OpportunitiesView: React.FC = () => {
  const { toggleSaveItem, savedItems, setCurrentView, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeOpportunity, setActiveOpportunity] = useState<OpportunityItem | null>(null);

  const filteredOpportunities = OPPORTUNITIES.filter((op) => {
    if (selectedType !== 'all' && op.type !== selectedType) return false;
    if (search && !op.title.toLowerCase().includes(search.toLowerCase()) && !op.provider.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Coloured Header Band: Department accent (#FFB627 Marigold) */}
      <div className="bg-[#FFB627] text-[#0E1A3A] pt-8 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E1A3A]/80 hover:text-[#0E1A3A] transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🎓</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0E1A3A]">
                  NEXORA Opportunities
                </h1>
              </div>
              <p className="text-sm sm:text-base text-[#0E1A3A]/90 mt-1 font-semibold">
                Discover ways to grow. Scholarships, non-refundable MSME grants, tech fellowships & apprenticeships.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filter & Search */}
        <div className="bg-white dark:bg-[#131E45] rounded-3xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keyword, grant name, or organization (TEF, 3MTT, Shell)..."
              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFB627]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {['all', 'Grant', 'Scholarship', 'Fellowship', 'Training', 'SME Funding'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-[#0E1A3A] text-white dark:bg-[#FFB627] dark:text-[#0E1A3A]'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'All Opportunities' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities List: Each showing verified source, deadline countdown, eligibility requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredOpportunities.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#131E45] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-[#FFB627] bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.deadline}
                  </span>
                  {item.verifiedSource && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-[#0FB57F] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Source
                    </span>
                  )}
                </div>

                <h3
                  onClick={() => setActiveOpportunity(item)}
                  className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug hover:text-[#0FB57F] dark:hover:text-[#FFB627] cursor-pointer"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {item.provider} · 🌍 {item.country}
                </p>

                {item.fundingAmount && (
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    💰 {item.fundingAmount}
                  </div>
                )}

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Key Eligibility
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    {item.eligibility.slice(0, 2).map((el, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0FB57F] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleSaveItem(item.id, item.title)}
                  className={`p-2 rounded-xl transition-colors ${
                    savedItems.includes(item.id)
                      ? 'bg-[#FFB627] text-[#0E1A3A]'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveOpportunity(item)}
                  className="px-4 py-2 bg-[#0E1A3A] hover:bg-[#1A285A] text-white dark:bg-[#FFB627] dark:text-[#0E1A3A] font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  View Details & Apply
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* OPPORTUNITY DETAIL MODAL */}
      {activeOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 max-h-[88vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-[#FFB627] uppercase tracking-wider">
                  {activeOpportunity.type}
                </span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                  {activeOpportunity.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeOpportunity.provider}</p>
              </div>
              <button onClick={() => setActiveOpportunity(null)} className="p-1 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Countdown Banner */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-[#FFB627]/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-800 dark:text-[#FFB627] uppercase">Application Deadline</span>
                <div className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                  {activeOpportunity.deadline}
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 100% Free Application
              </span>
            </div>

            {/* Eligibility Requirements */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
                Full Eligibility Criteria
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {activeOpportunity.eligibility.map((el, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0FB57F] shrink-0 mt-0.5" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Apply */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
                How to Apply
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeOpportunity.howToApply}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-3">
              <button
                onClick={() => toggleSaveItem(activeOpportunity.id, activeOpportunity.title)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
              >
                <Bookmark className="w-4 h-4" />
                <span>{savedItems.includes(activeOpportunity.id) ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => {
                  addToast(`Opening verified official registration portal for ${activeOpportunity.provider}!`, 'success');
                  setActiveOpportunity(null);
                }}
                className="py-3 px-6 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Proceed to Official Portal</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
