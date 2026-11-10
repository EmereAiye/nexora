import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { PROPERTIES, NIGERIAN_STATES } from '../data/mockData.ts';
import { PropertyItem, NigerianState } from '../types.ts';
import { 
  Home, 
  Search, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Bookmark, 
  PhoneCall, 
  MessageCircle, 
  ArrowLeft, 
  X, 
  Check, 
  Bed, 
  Bath, 
  Scale 
} from 'lucide-react';

export const PropertiesView: React.FC = () => {
  const { toggleSaveItem, savedItems, setCurrentView, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState<'all' | 'Rent' | 'Sale' | 'Shortlet' | 'Land'>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);
  const [reportProperty, setReportProperty] = useState<PropertyItem | null>(null);

  const filteredProperties = PROPERTIES.filter((p) => {
    if (propertyType !== 'all' && p.type !== propertyType) return false;
    if (stateFilter !== 'all' && p.state !== stateFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Coloured Header Band: Department accent (#8A5CFF Violet) */}
      <div className="bg-[#8A5CFF] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
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
                <span className="text-3xl">🏠</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  NEXORA Properties
                </h1>
              </div>
              <p className="text-sm sm:text-base text-purple-100 mt-1 font-medium">
                Find your next home. Transparent rent comparisons, verified local agents, and zero ghost apartments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Anti-Fraud Banner (Section 5.6 & 8) */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <strong>Tenancy Safety Notice:</strong> <u>Never</u> pay inspection fees or transfer rent deposits before viewing a property physically with the verified agent. Genuine agents do not demand non-refundable viewing fees.
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-[#131E45] rounded-3xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by area (Lekki, Maitama, Ikeja, Trans Amadi...)"
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8A5CFF]"
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

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {(['all', 'Rent', 'Sale', 'Shortlet', 'Land'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setPropertyType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize whitespace-nowrap transition-colors ${
                  propertyType === type
                    ? 'bg-[#8A5CFF] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'All Listings' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing {filteredProperties.length} verified properties</span>
            <span className="text-[#8A5CFF] font-bold">Area Rent Benchmarks Enabled</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white dark:bg-[#131E45] rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Type Badge */}
                  <div className="relative h-48 w-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#0E1A3A]/80 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1 rounded-full">
                      {prop.type}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-display font-extrabold text-xl text-[#0E1A3A] dark:text-[#FFB627] tabular-nums">
                        ₦{prop.price.toLocaleString()}
                        {prop.period && <span className="text-xs font-normal text-slate-500 ml-1">/{prop.period}</span>}
                      </div>
                      <span className="text-[10px] font-bold text-[#0FB57F] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Vetted Agent
                      </span>
                    </div>

                    <h3
                      onClick={() => setSelectedProperty(prop)}
                      className="font-display font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug hover:text-[#8A5CFF] cursor-pointer"
                    >
                      {prop.title}
                    </h3>

                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0FB57F]" /> {prop.location}
                    </p>

                    {/* Rent Comparison Feature (Section 5.6: Average rent for similar properties in the area) */}
                    {prop.averageAreaRent && (
                      <div className="p-2.5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 text-[11px] flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Scale className="w-3 h-3 text-[#8A5CFF]" /> Area Average:
                        </span>
                        <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                          ₦{prop.averageAreaRent.toLocaleString()}/yr
                        </span>
                      </div>
                    )}

                    {prop.bedrooms && (
                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {prop.bedrooms} Beds</span>
                        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {prop.bathrooms} Baths</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50/80 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleSaveItem(prop.id, prop.title)}
                    className={`p-2 rounded-xl transition-colors ${
                      savedItems.includes(prop.id)
                        ? 'bg-[#FFB627] text-[#0E1A3A]'
                        : 'bg-white dark:bg-[#1E2C60] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                    }`}
                    title="Save property"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="px-3 py-1.5 bg-white dark:bg-[#1E2C60] border border-slate-200 dark:border-white/10 text-xs font-bold rounded-xl hover:border-[#8A5CFF]"
                    >
                      Details
                    </button>
                    <a
                      href={`tel:${prop.agentPhone}`}
                      className="px-3.5 py-1.5 bg-[#8A5CFF] hover:bg-[#7b4be0] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* PROPERTY DETAIL MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 max-h-[88vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-[#8A5CFF] uppercase tracking-wider">
                  {selectedProperty.type} Listing
                </span>
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-0.5">
                  {selectedProperty.title}
                </h3>
                <p className="text-xs text-slate-500">{selectedProperty.location}</p>
              </div>
              <button onClick={() => setSelectedProperty(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-64 bg-slate-100 dark:bg-white/5">
              <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800">
              <div>
                <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">
                  Asking Price
                </span>
                <div className="font-display font-extrabold text-2xl text-[#0E1A3A] dark:text-[#FFB627]">
                  ₦{selectedProperty.price.toLocaleString()}
                </div>
              </div>
              {selectedProperty.averageAreaRent && (
                <div className="text-right text-xs text-slate-600 dark:text-slate-300">
                  <div>Area benchmark: ₦{selectedProperty.averageAreaRent.toLocaleString()}</div>
                  <span className="text-emerald-600 font-bold">Good Value</span>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-1">Description</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedProperty.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Amenities & Infrastructure</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProperty.features.map((feat, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#0FB57F]" /> {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Agent Lockup & Fraud Warning */}
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedProperty.agentName}
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Agent
                  </div>
                </div>
                <a
                  href={`tel:${selectedProperty.agentPhone}`}
                  className="px-4 py-2 bg-[#8A5CFF] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call Agent
                </a>
              </div>
              <div className="text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Anti-fraud rule: Never pay viewing or holding fees before visiting the property.</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
