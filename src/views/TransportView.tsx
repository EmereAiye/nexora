import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { TRANSPORT_ROUTES, TRAFFIC_UPDATES, NIGERIAN_STATES } from '../data/mockData.ts';
import { TransportRoute, TrafficUpdate } from '../types.ts';
import { 
  Bus, 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  PhoneCall, 
  AlertTriangle, 
  ThumbsUp, 
  Calendar, 
  CheckCircle2, 
  X, 
  Plus 
} from 'lucide-react';

export const TransportView: React.FC = () => {
  const { setCurrentView, addToast } = useApp();

  const [fromCity, setFromCity] = useState('Abuja');
  const [toCity, setToCity] = useState('Lagos');
  const [travelDate, setTravelDate] = useState('2026-11-12');
  const [selectedRoute, setSelectedRoute] = useState<TransportRoute | null>(null);
  const [bookingTicket, setBookingTicket] = useState<TransportRoute | null>(null);
  const [newTrafficReportOpen, setNewTrafficReportOpen] = useState(false);
  const [trafficFeed, setTrafficFeed] = useState<TrafficUpdate[]>(TRAFFIC_UPDATES);

  // New traffic report form
  const [trafficRouteName, setTrafficRouteName] = useState('');
  const [trafficCondition, setTrafficCondition] = useState<'Clear' | 'Moderate' | 'Heavy Gridlock' | 'Road Repair'>('Heavy Gridlock');
  const [trafficNotes, setTrafficNotes] = useState('');

  // Filter routes
  const matchingRoutes = TRANSPORT_ROUTES.filter((r) => {
    const matchFrom = r.from.toLowerCase().includes(fromCity.toLowerCase());
    const matchTo = r.to.toLowerCase().includes(toCity.toLowerCase());
    return matchFrom && matchTo;
  });

  const displayRoutes = matchingRoutes.length > 0 ? matchingRoutes : TRANSPORT_ROUTES;

  const handleTrafficConfirm = (id: string) => {
    setTrafficFeed((prev) =>
      prev.map((t) => (t.id === id ? { ...t, confirmations: t.confirmations + 1 } : t))
    );
    addToast('Traffic report confirmed for fellow commuters.', 'success');
  };

  const handleAddTrafficReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trafficRouteName.trim() || !trafficNotes.trim()) {
      addToast('Please specify route and situation details.', 'warning');
      return;
    }

    const newReport: TrafficUpdate = {
      id: `tf-${Date.now()}`,
      route: trafficRouteName,
      state: 'Lagos',
      condition: trafficCondition,
      reportedBy: 'You',
      timestamp: 'Just now',
      notes: trafficNotes,
      confirmations: 1
    };

    setTrafficFeed([newReport, ...trafficFeed]);
    setNewTrafficReportOpen(false);
    setTrafficRouteName('');
    setTrafficNotes('');
    addToast('Traffic advisory broadcasted live!', 'success');
  };

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
                <span className="text-3xl">🚘</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  NEXORA Transport
                </h1>
              </div>
              <p className="text-sm sm:text-base text-blue-50 mt-1 font-medium">
                Know your options before travelling. Interstate fare comparisons, verified parks, and live highway traffic alerts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ROUTE SEARCH BAR (Section 5.4: From, To, Date. Example: Abuja to Lagos) */}
        <div className="bg-white dark:bg-[#131E45] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg -mt-10 relative z-20 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                Departure City / Terminal
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  placeholder="e.g. Abuja (Utako / Jabi)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7BFF]"
                />
                <MapPin className="w-4 h-4 text-[#2E7BFF] absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                Destination City
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  placeholder="e.g. Lagos, Port Harcourt, Enugu"
                  className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7BFF]"
                />
                <MapPin className="w-4 h-4 text-[#0FB57F] absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                Travel Date
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7BFF]"
              />
            </div>
          </div>
        </div>

        {/* RESULTS: Company cards with reported fare, departure park, estimated duration, Book or Contact */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Interstate Operators for <strong>{fromCity} → {toCity}</strong></span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">
              *Fares labelled "reported" reflect real commuter data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white dark:bg-[#131E45] rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Bus className="w-5 h-5 text-[#2E7BFF]" />
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                          {route.company}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {route.busType}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full inline-block">
                        {route.fareStatus} Fare
                      </div>
                      <div className="font-display font-extrabold text-2xl text-[#0E1A3A] dark:text-[#FFB627] mt-1 tabular-nums">
                        ₦{route.fare.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl text-xs space-y-1.5 border border-slate-100 dark:border-white/5">
                    <div className="text-slate-700 dark:text-slate-200">
                      <strong>Departure Terminal:</strong> {route.departurePark}
                    </div>
                    <div className="text-slate-700 dark:text-slate-200 flex items-center justify-between">
                      <span><strong>Est. Duration:</strong> {route.duration}</span>
                      <span><strong>Times:</strong> {route.departureTimes.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <a
                    href={`tel:${route.phone}`}
                    className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-[#2E7BFF] flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Park Desk</span>
                  </a>

                  <button
                    onClick={() => {
                      setBookingTicket(route);
                    }}
                    className="py-2 px-5 bg-[#2E7BFF] hover:bg-[#1a66e5] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Reserve Seat / Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRAFFIC UPDATES FEED (Section 5.4: Live user-shared updates with timestamps) */}
        <section className="bg-white dark:bg-[#131E45] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <span>🚦</span> Live Highway & Commuter Traffic Feed
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                User-reported highway conditions along interstate corridors and major city bypasses.
              </p>
            </div>
            <button
              onClick={() => setNewTrafficReportOpen(true)}
              className="py-2 px-4 bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Share Traffic Alert</span>
            </button>
          </div>

          <div className="space-y-3">
            {trafficFeed.map((tf) => (
              <div
                key={tf.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tf.condition === 'Heavy Gridlock'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                        : tf.condition === 'Road Repair'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    }`}>
                      {tf.condition}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-white">
                      {tf.route}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {tf.notes}
                  </p>
                  <div className="text-[10px] text-slate-400">
                    Reported by {tf.reportedBy} · {tf.timestamp}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-500">
                    <strong>{tf.confirmations}</strong> verified
                  </span>
                  <button
                    onClick={() => handleTrafficConfirm(tf.id)}
                    className="p-2 rounded-xl bg-white dark:bg-[#1E2C60] border border-slate-200 dark:border-white/10 text-xs font-semibold hover:text-[#0FB57F] flex items-center gap-1"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* BOOK SEAT MODAL */}
      {bookingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Reserve Seat: {bookingTicket.company}
              </h3>
              <button onClick={() => setBookingTicket(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-xs space-y-1">
              <div><strong>Route:</strong> {bookingTicket.from} → {bookingTicket.to}</div>
              <div><strong>Reported Fare:</strong> ₦{bookingTicket.fare.toLocaleString()}</div>
              <div><strong>Terminal:</strong> {bookingTicket.departurePark}</div>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Your Full Name</label>
                <input type="text" placeholder="e.g. Emeka Okafor" className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Passenger Phone</label>
                <input type="tel" placeholder="+234 803 000 0000" className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5" />
              </div>
              <button
                onClick={() => {
                  addToast(`Reservation request sent to ${bookingTicket.company} park desk!`, 'success');
                  setBookingTicket(null);
                }}
                className="w-full py-3 bg-[#2E7BFF] text-white font-bold rounded-xl mt-2 cursor-pointer shadow-md"
              >
                Submit Seat Reservation Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW TRAFFIC REPORT MODAL */}
      {newTrafficReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>🚦</span> Post Highway Traffic Update
              </h3>
              <button onClick={() => setNewTrafficReportOpen(false)} className="p-1 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddTrafficReport} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Expressway / Junction</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Benin - Ore Expressway near Ofosu"
                  value={trafficRouteName}
                  onChange={(e) => setTrafficRouteName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Condition</label>
                <select
                  value={trafficCondition}
                  onChange={(e) => setTrafficCondition(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                >
                  <option>Heavy Gridlock</option>
                  <option>Moderate</option>
                  <option>Clear</option>
                  <option>Road Repair</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Situation Notes</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Tanker breakdown on slow lane, traffic diverted."
                  value={trafficNotes}
                  onChange={(e) => setTrafficNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#FFB627] text-[#0E1A3A] font-bold rounded-xl mt-2 cursor-pointer shadow-md"
              >
                Publish Advisory
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
