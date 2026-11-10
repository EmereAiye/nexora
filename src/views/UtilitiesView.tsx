import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { UTILITY_REPORTS, NIGERIAN_STATES } from '../data/mockData.ts';
import { UtilityReport, NigerianState } from '../types.ts';
import { 
  Zap, 
  Droplet, 
  Fuel, 
  Trash2, 
  MapPin, 
  Clock, 
  ThumbsUp, 
  Plus, 
  ArrowLeft, 
  X, 
  CheckCircle2, 
  PhoneCall, 
  AlertCircle 
} from 'lucide-react';

export const UtilitiesView: React.FC = () => {
  const { selectedState, setCurrentView, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'electricity' | 'water' | 'fuel' | 'waste'>('all');
  const [reports, setReports] = useState<UtilityReport[]>(UTILITY_REPORTS);
  const [quickReportOpen, setQuickReportOpen] = useState(false);
  const [filterState, setFilterState] = useState<string>('all');

  // Quick report form state
  const [reportType, setReportType] = useState<'electricity' | 'water' | 'fuel' | 'waste'>('electricity');
  const [reportTitle, setReportTitle] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [fuelPriceInput, setFuelPriceInput] = useState('980');

  const filteredReports = reports.filter((r) => {
    if (activeTab !== 'all' && r.type !== activeTab) return false;
    if (filterState !== 'all' && r.state !== filterState) return false;
    return true;
  });

  const handleConfirm = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, confirmations: r.confirmations + 1 } : r))
    );
    addToast('Status confirmed for your neighbourhood!', 'success');
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim() || !reportLocation.trim()) {
      addToast('Please provide a title and location', 'warning');
      return;
    }

    const newRep: UtilityReport = {
      id: `u-${Date.now()}`,
      type: reportType,
      title: reportTitle,
      location: reportLocation,
      state: selectedState,
      status: reportType === 'electricity' ? 'Outage' : reportType === 'water' ? 'Shortage' : 'Available',
      details: reportDetails || 'Reported live by community member.',
      reportedAgo: 'Just now',
      confirmations: 1,
      fuelPrice: reportType === 'fuel' ? Number(fuelPriceInput) : undefined
    };

    setReports([newRep, ...reports]);
    setQuickReportOpen(false);
    setReportTitle('');
    setReportLocation('');
    setReportDetails('');
    addToast('Utility alert published!', 'success');
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Band */}
      <div className="bg-gradient-to-r from-[#26397F] to-[#0E1A3A] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
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
                <span className="text-3xl">⚡</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  NEXORA Utilities
                </h1>
              </div>
              <p className="text-sm sm:text-base text-slate-200 mt-1 font-medium">
                Know what's happening around you. Real-time monitoring of electricity feeders, water supply, fuel pumps & waste trucks.
              </p>
            </div>

            <button
              onClick={() => setQuickReportOpen(true)}
              className="py-3 px-5 bg-[#FF5C6C] hover:bg-[#fa4b5d] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Quick Report an Outage / Price</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* INTERACTIVE UTILITY MAP SIMULATION WITH COLOURED PINS */}
        <section className="bg-white dark:bg-[#131E45] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF5C6C]" />
                Live Incident & Utility Map ({selectedState})
              </h3>
              <p className="text-xs text-slate-500">
                Visual pins: <span className="text-[#FF5C6C] font-bold">● Coral for Outage</span>, <span className="text-[#2E7BFF] font-bold">● Blue for Water</span>, <span className="text-[#FFB627] font-bold">● Gold for Fuel</span>.
              </p>
            </div>
          </div>

          {/* Map canvas simulation with pin triggers */}
          <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#0A1230] dark:to-[#172352] overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center p-4">
            
            {/* Grid graphic lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Pins on map */}
            <div className="absolute top-1/4 left-1/4 group cursor-pointer animate-bounce [animation-duration:2.5s]">
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-[#FF5C6C] text-white shadow-lg">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-[#0E1A3A] px-2 py-0.5 rounded shadow text-[10px] font-bold text-slate-800 dark:text-white mt-1 whitespace-nowrap">
                  33kV Outage (Gwarinpa)
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/3 left-1/2 group cursor-pointer animate-bounce [animation-duration:3s]">
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-[#FFB627] text-[#0E1A3A] shadow-lg">
                  <Fuel className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-[#0E1A3A] px-2 py-0.5 rounded shadow text-[10px] font-bold text-slate-800 dark:text-white mt-1 whitespace-nowrap">
                  NNPC Fuel ₦980 (Lugbe)
                </div>
              </div>
            </div>

            <div className="absolute top-1/3 right-1/4 group cursor-pointer animate-bounce [animation-duration:2.2s]">
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-[#2E7BFF] text-white shadow-lg">
                  <Droplet className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-[#0E1A3A] px-2 py-0.5 rounded shadow text-[10px] font-bold text-slate-800 dark:text-white mt-1 whitespace-nowrap">
                  Water Shortage (Surulere)
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 left-4 bg-white/90 dark:bg-[#131E45]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-300">
              Interactive GPS Grid Active · Click pins to filter feed below
            </div>
          </div>
        </section>

        {/* 4 Tabs: Electricity Watch, Water Watch, Fuel Watch, Waste Management */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-white/10 pb-2">
          {[
            { id: 'all', label: 'All Updates', icon: Zap },
            { id: 'electricity', label: 'Electricity Watch', icon: Zap, color: 'text-amber-500' },
            { id: 'water', label: 'Water Watch', icon: Droplet, color: 'text-blue-500' },
            { id: 'fuel', label: 'Fuel Watch', icon: Fuel, color: 'text-amber-500' },
            { id: 'waste', label: 'Waste Management', icon: Trash2, color: 'text-emerald-500' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0E1A3A] text-white dark:bg-[#FFB627] dark:text-[#0E1A3A] shadow-xs'
                    : 'bg-white dark:bg-[#131E45] text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Reports Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{filteredReports.length} reports logged</span>
            <span>All timestamps verified by local users</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReports.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#131E45] rounded-3xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      item.status === 'Outage'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                        : item.status === 'Restored'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.reportedAgo}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {item.details}
                  </p>

                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0FB57F]" />
                    <span>{item.location} ({item.state})</span>
                  </div>

                  {/* Fuel or Water extra data */}
                  {item.fuelPrice && (
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center justify-between">
                      <span>Reported Dispense Rate:</span>
                      <span className="text-sm">₦{item.fuelPrice}/Litre</span>
                    </div>
                  )}

                  {item.waterSupplierPhone && (
                    <a
                      href={`tel:${item.waterSupplierPhone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7BFF] hover:underline"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Call Community Tanker Supplier
                    </a>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    <strong>{item.confirmations}</strong> confirmed this
                  </span>
                  <button
                    onClick={() => handleConfirm(item.id)}
                    className="px-3.5 py-1.5 bg-slate-100 dark:bg-white/10 hover:bg-[#0FB57F] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* QUICK REPORT MODAL */}
      {quickReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span>⚡</span> Post Utility Status Update
              </h3>
              <button onClick={() => setQuickReportOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Utility Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['electricity', 'water', 'fuel', 'waste'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setReportType(cat)}
                      className={`p-2 rounded-xl font-bold capitalize border transition-all ${
                        reportType === cat
                          ? 'border-[#0FB57F] bg-emerald-50 dark:bg-emerald-950/40 text-[#0FB57F]'
                          : 'border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {cat} Watch
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Report Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Light restored in Phase 1 / Fuel available at Total"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Specific Location / Street</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adetokunbo Ademola, Victoria Island"
                  value={reportLocation}
                  onChange={(e) => setReportLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>

              {reportType === 'fuel' && (
                <div>
                  <label className="font-bold block mb-1">Dispensing Price per Litre (₦)</label>
                  <input
                    type="number"
                    value={fuelPriceInput}
                    onChange={(e) => setFuelPriceInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                  />
                </div>
              )}

              <div>
                <label className="font-bold block mb-1">Additional Observations</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Queue length, estimated restoration time..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0FB57F] text-white font-bold rounded-xl mt-2 cursor-pointer shadow-md"
              >
                Broadcast to Community
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
