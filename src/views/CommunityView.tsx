import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { NIGERIAN_STATES } from '../data/mockData.ts';
import { CommunityReport, NigerianState } from '../types.ts';
import { 
  Users, 
  MapPin, 
  Clock, 
  ThumbsUp, 
  Plus, 
  ArrowLeft, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Droplet, 
  Zap, 
  MessageSquare, 
  Bell 
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { 
    selectedState, 
    reports, 
    confirmReport, 
    addCommunityReport, 
    setCurrentView, 
    addToast 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [activeUpdateReport, setActiveUpdateReport] = useState<CommunityReport | null>(null);
  const [userComment, setUserComment] = useState('');

  // New report form state
  const [newCategory, setNewCategory] = useState<CommunityReport['category']>('Flooding');
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const categories: Array<CommunityReport['category']> = [
    'Bad Road',
    'Flooding',
    'Electricity Problem',
    'Water Shortage',
    'Public Infrastructure',
    'Waste Dumping'
  ];

  const filteredReports = reports.filter((r) => {
    if (activeCategory !== 'all' && r.category !== activeCategory) return false;
    return true;
  });

  const handlePostReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) {
      addToast('Please fill in title and location.', 'warning');
      return;
    }

    addCommunityReport({
      category: newCategory,
      title: newTitle,
      location: newLocation,
      state: selectedState,
      description: newDescription
    });

    setReportModalOpen(false);
    setNewTitle('');
    setNewLocation('');
    setNewDescription('');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    addToast(`Update added: "${userComment}"`, 'success');
    setUserComment('');
    setActiveUpdateReport(null);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Coloured Header Band: Department accent (#0FB57F Emerald) */}
      <div className="bg-[#0FB57F] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
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
                <span className="text-3xl">🌍</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  NEXORA Community
                </h1>
              </div>
              <p className="text-sm sm:text-base text-emerald-50 mt-1 font-medium">
                Your community, your voice. Report road hazards, power outages, and flooding to protect fellow citizens.
              </p>
            </div>

            <button
              onClick={() => setReportModalOpen(true)}
              className="py-3 px-5 bg-white text-[#0FB57F] hover:bg-emerald-50 font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Incident Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-bold rounded-2xl whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#0E1A3A] text-white dark:bg-[#0FB57F]'
                : 'bg-white dark:bg-[#131E45] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
            }`}
          >
            All Incidents ({reports.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 text-xs font-bold rounded-2xl whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#0FB57F] text-white'
                  : 'bg-white dark:bg-[#131E45] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reports Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing verified crowdsourced alerts</span>
            <span>Tap "Confirm" to validate in real time</span>
          </div>

          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-[#131E45] rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      report.category === 'Flooding'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                        : report.category === 'Electricity Problem'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                    }`}>
                      {report.category}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {report.timestamp}
                    </span>
                    {report.resolved && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Resolved
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                    {report.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {report.description}
                  </p>

                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0FB57F]" />
                    <span>{report.location} ({report.state})</span>
                  </div>
                </div>

                {/* Actions: Confirm, Update Note */}
                <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-white/5">
                  <button
                    onClick={() => setActiveUpdateReport(report)}
                    className="px-3 py-2 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Add Update</span>
                  </button>

                  <button
                    onClick={() => confirmReport(report.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      report.hasConfirmed
                        ? 'bg-[#0FB57F] text-white'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-[#0FB57F] hover:bg-[#0FB57F] hover:text-white'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{report.hasConfirmed ? 'Confirmed' : 'Confirm'} ({report.confirmations})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SUBMIT REPORT MODAL (Section 5.7: choose category, add location, add photo, add short note, submit) */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-[#0FB57F] uppercase tracking-wider">
                  Citizen Reporting
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Report a Community Problem
                </h3>
              </div>
              <button onClick={() => setReportModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostReport} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Issue Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Brief Title / Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flooded roadway near Tollgate / Blown transformer fuse"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Specific Location & Landmark</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Admiralty Way near Lekki Phase 1 gate"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Detailed Description & Impact</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide context so emergency responders and commuters know what to avoid..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Broadcast Incident Alert
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD UPDATE / COMMENT MODAL */}
      {activeUpdateReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Add Progress Update
              </h3>
              <button onClick={() => setActiveUpdateReport(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Regarding: "{activeUpdateReport.title}"
            </p>
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                rows={3}
                required
                placeholder="e.g. 'Water has dropped now' or 'AEDC engineers arrived with replacement cable'"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0FB57F] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Publish Community Update
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
