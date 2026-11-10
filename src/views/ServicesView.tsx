import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { PROVIDERS, NIGERIAN_STATES } from '../data/mockData.ts';
import { ServiceProvider, NigerianState } from '../types.ts';
import { 
  Search, 
  Wrench, 
  ShieldCheck, 
  Star, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Calendar, 
  Scale, 
  Bookmark, 
  X, 
  Check, 
  ArrowLeft, 
  Clock, 
  Briefcase 
} from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { 
    selectedState, 
    toggleSaveItem, 
    savedItems, 
    addToast, 
    addBooking, 
    setCurrentView 
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [bookingProvider, setBookingProvider] = useState<ServiceProvider | null>(null);
  const [comparingProviders, setComparingProviders] = useState<ServiceProvider[]>([]);
  const [isComparingOpen, setIsComparingOpen] = useState(false);

  // Booking Form State
  const [bookingDate, setBookingDate] = useState('Tomorrow');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingAddress, setBookingAddress] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  // Trades list
  const trades = ['all', 'Electrician', 'Plumber', 'Auto Mechanic', 'Cleaners', 'Carpenter', 'AC Technician'];

  const filteredProviders = PROVIDERS.filter((s) => {
    if (selectedTrade !== 'all' && !s.trade.toLowerCase().includes(selectedTrade.toLowerCase())) return false;
    if (stateFilter !== 'all' && s.state !== stateFilter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.trade.toLowerCase().includes(search.toLowerCase()) && !s.area.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleCompareProvider = (provider: ServiceProvider) => {
    if (comparingProviders.some((p) => p.id === provider.id)) {
      setComparingProviders(comparingProviders.filter((p) => p.id !== provider.id));
    } else {
      if (comparingProviders.length >= 3) {
        addToast('You can compare at most 3 providers at a time.', 'warning');
        return;
      }
      setComparingProviders([...comparingProviders, provider]);
      addToast(`Added ${provider.name} to comparison`, 'info');
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingProvider) return;
    if (!bookingAddress.trim() || !jobDescription.trim()) {
      addToast('Please provide your address and describe the job needed.', 'warning');
      return;
    }

    addBooking({
      providerId: bookingProvider.id,
      providerName: bookingProvider.name,
      trade: bookingProvider.trade,
      date: `${bookingDate}, ${bookingTime}`,
      time: bookingTime,
      address: bookingAddress,
      jobDescription: jobDescription
    });

    setBookingProvider(null);
    setBookingAddress('');
    setJobDescription('');
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Coloured Header Band: Department accent (#FF5C6C Coral) */}
      <div className="bg-[#FF5C6C] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
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
                <span className="text-3xl">🔧</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  NEXORA Services
                </h1>
              </div>
              <p className="text-sm sm:text-base text-rose-50 mt-1 font-medium">
                Find trusted people to get things done. Vetted electricians, plumbers, mechanics and technicians.
              </p>
            </div>

            {/* Compare Bar Button */}
            {comparingProviders.length > 0 && (
              <button
                onClick={() => setIsComparingOpen(true)}
                className="py-2.5 px-4 bg-white text-[#FF5C6C] hover:bg-rose-50 font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Compare Selected ({comparingProviders.length}/3)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-[#131E45] rounded-3xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by trade (electrician, plumber, AC...) or area"
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C6C]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All States</option>
              {NIGERIAN_STATES.map((st) => (
                <option key={st} value={st} className="text-slate-900">{st}</option>
              ))}
            </select>
          </div>

          {/* Trade chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {trades.map((trade) => (
              <button
                key={trade}
                onClick={() => setSelectedTrade(trade)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize whitespace-nowrap transition-colors ${
                  selectedTrade === trade
                    ? 'bg-[#FF5C6C] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {trade === 'all' ? 'All Trades' : trade}
              </button>
            ))}
          </div>
        </div>

        {/* Provider List: photo, name, trade, area, rating, estimated price range */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing {filteredProviders.length} verified artisans</span>
            <span className="text-[#0FB57F] font-bold">100% Background & Skill Verified</span>
          </div>

          {filteredProviders.length === 0 ? (
            <div className="bg-white dark:bg-[#131E45] rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 space-y-3">
              <Wrench className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                No artisans found in this trade or state
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No electricians or plumbers registered in this specific area yet. Invite one to join NEXORA Services!
              </p>
              <button
                onClick={() => {
                  setSelectedTrade('all');
                  setStateFilter('all');
                  setSearch('');
                }}
                className="px-4 py-2 bg-[#FF5C6C] text-white font-bold text-xs rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProviders.map((provider) => {
                const isCompared = comparingProviders.some((p) => p.id === provider.id);
                return (
                  <div
                    key={provider.id}
                    className="bg-white dark:bg-[#131E45] rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 
                              onClick={() => setSelectedProvider(provider)}
                              className="font-display font-bold text-lg text-slate-900 dark:text-white hover:text-[#FF5C6C] cursor-pointer"
                            >
                              {provider.name}
                            </h3>
                            {provider.verified && (
                              <span className="text-[10px] font-bold text-[#0FB57F] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" /> Vetted
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-[#FF5C6C] mt-0.5">{provider.trade}</p>
                          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {provider.area} ({provider.state})
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5 justify-end">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {provider.rating}
                          </span>
                          <span className="text-[10px] text-slate-400">({provider.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {provider.about}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {provider.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block">Estimated Callout / Job</span>
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            {provider.estimatedPrice}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          ● {provider.availability}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Actions: Compare toggle, Save, Call, Book */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleCompareProvider(provider)}
                          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                            isCompared
                              ? 'bg-rose-100 dark:bg-rose-900/40 text-[#FF5C6C]'
                              : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                          }`}
                          title="Compare side by side"
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span className="text-[11px]">{isCompared ? 'Added' : 'Compare'}</span>
                        </button>

                        <button
                          onClick={() => toggleSaveItem(provider.id, provider.name)}
                          className={`p-2 rounded-xl transition-colors ${
                            savedItems.includes(provider.id)
                              ? 'bg-[#FFB627] text-[#0E1A3A]'
                              : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                          }`}
                          title="Save to dashboard"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${provider.phone}`}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-[#0FB57F] hover:text-white transition-colors"
                          title="Call Provider"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setBookingProvider(provider)}
                          className="px-4 py-2 bg-[#FF5C6C] hover:bg-[#fa4b5d] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Artisan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* BOOKING MODAL (Section 5.3: choose date & time, describe job, confirm) */}
      {bookingProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-[#FF5C6C] uppercase tracking-wider">
                  Schedule Service Appointment
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Book {bookingProvider.name}
                </h3>
                <p className="text-xs text-slate-500">{bookingProvider.trade}</p>
              </div>
              <button onClick={() => setBookingProvider(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    Preferred Date
                  </label>
                  <select
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                  >
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>Within 3 days</option>
                    <option>This Weekend</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                  >
                    <option>09:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 01:00 PM</option>
                    <option>02:00 PM - 04:00 PM</option>
                    <option>04:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  Your Address & Landmark
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House 4, 3rd Avenue, Gwarinpa (near Total station)"
                  value={bookingAddress}
                  onChange={(e) => setBookingAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  Describe Job / Problem
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Need inverter batteries rewired and 3 dead ceiling fans inspected"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-[11px] text-slate-500">
                Payment note: No advance payment required online. You inspect the work first and settle directly with the verified artisan after completion.
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#FF5C6C] hover:bg-[#fa4b5d] text-white font-bold rounded-2xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Service Booking</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* COMPARE PROVIDERS MODAL (Section 5.3: choose 2 or 3 providers side by side) */}
      {isComparingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 max-h-[88vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-[#FF5C6C] uppercase tracking-wider">
                  Side-by-Side Comparison
                </span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                  Compare Service Providers
                </h3>
              </div>
              <button onClick={() => setIsComparingOpen(false)} className="p-1 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparingProviders.map((cp) => (
                <div key={cp.id} className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">{cp.name}</h4>
                    <span className="text-xs text-[#FF5C6C] font-semibold">{cp.trade}</span>
                    <div className="text-xs text-slate-400 mt-0.5">{cp.area}</div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div><strong>Rating:</strong> ★ {cp.rating} ({cp.reviewCount} reviews)</div>
                    <div><strong>Est. Price:</strong> {cp.estimatedPrice}</div>
                    <div><strong>Availability:</strong> {cp.availability}</div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setBookingProvider(cp);
                        setIsComparingOpen(false);
                      }}
                      className="w-full py-2 bg-[#FF5C6C] text-white text-xs font-bold rounded-xl shadow-xs"
                    >
                      Book this Provider
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
