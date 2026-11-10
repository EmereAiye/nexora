import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { JOBS, NIGERIAN_STATES } from '../data/mockData.ts';
import { JobItem, NigerianState } from '../types.ts';
import { 
  Search, 
  Briefcase, 
  ShieldCheck, 
  Bookmark, 
  MapPin, 
  Clock, 
  FileText, 
  Bell, 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  ArrowLeft, 
  Download, 
  Plus, 
  ExternalLink 
} from 'lucide-react';

export const JobsView: React.FC = () => {
  const { 
    selectedState, 
    toggleSaveItem, 
    savedItems, 
    addToast, 
    user, 
    setCurrentView 
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [activeJobDetail, setActiveJobDetail] = useState<JobItem | null>(null);
  const [cvBuilderOpen, setCvBuilderOpen] = useState(false);
  const [jobAlertOpen, setJobAlertOpen] = useState(false);
  const [reportJob, setReportJob] = useState<JobItem | null>(null);

  // CV Builder Form State
  const [cvData, setCvData] = useState({
    name: user.fullName || 'Chidubem Eze',
    phone: user.phone || '+234 803 456 7890',
    email: user.email || 'c.eze@example.com',
    location: `${user.state}, Nigeria`,
    headline: 'Results-driven Operations Specialist & Analyst',
    education: 'B.Sc. Economics (2:1), University of Ibadan (2022)',
    experience: 'Operations Associate at SwiftLogistics (2022 - Present)\n- Managed fleet scheduling for 40+ vans across Southwest Nigeria.\n- Reduced fuel logistics variance by 14% using GPS tracking.',
    skills: 'Logistics Routing, Excel & Power BI, Client Relations, Inventory Audits, Team Supervision'
  });

  // Filtered jobs
  const filteredJobs = JOBS.filter((j) => {
    if (selectedType !== 'all' && j.type !== selectedType) return false;
    if (stateFilter !== 'all' && j.state !== stateFilter && j.type !== 'Remote') return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.employer.toLowerCase().includes(search.toLowerCase()) && !j.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDownloadCv = () => {
    const cvText = `
========================================
CURRICULUM VITAE: ${cvData.name.toUpperCase()}
========================================
Email: ${cvData.email} | Phone: ${cvData.phone} | Location: ${cvData.location}
Target: ${cvData.headline}

[EDUCATION]
${cvData.education}

[PROFESSIONAL EXPERIENCE]
${cvData.experience}

[CORE SKILLS & CERTIFICATIONS]
${cvData.skills}

Generated on NEXORA Jobs Platform (Verified Nigerian Careers)
========================================
    `.trim();

    const blob = new Blob([cvText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cvData.name.replace(/\s+/g, '_')}_CV.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addToast('CV downloaded successfully!', 'success');
  };

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
                <span className="text-3xl">💼</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0E1A3A]">
                  NEXORA Jobs
                </h1>
              </div>
              <p className="text-sm sm:text-base text-[#0E1A3A]/90 mt-1 font-semibold">
                Your next opportunity starts here. Vetted employers, verified salaries, zero application fees.
              </p>
            </div>

            {/* Quick Actions: CV Builder & Alerts */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCvBuilderOpen(true)}
                className="py-2.5 px-4 bg-[#0E1A3A] hover:bg-[#1A285A] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#FFB627]" />
                <span>Free CV Builder</span>
              </button>
              <button
                onClick={() => setJobAlertOpen(true)}
                className="py-2.5 px-4 bg-white/90 hover:bg-white text-[#0E1A3A] font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Bell className="w-4 h-4 text-[#0FB57F]" />
                <span>Create Job Alert</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Anti-Fraud Notice (Section 5.2 & 8) */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-[#FFB627] p-4 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <strong>NEXORA Anti-Fraud Protection:</strong> Real Nigerian employers will <u>never</u> ask you for payment, interview processing charges, or recruitment fees. If anyone asks you for money, tap "Report" immediately to trigger permanent removal.
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-[#131E45] rounded-3xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, keywords, or employer name…"
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFB627]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Locations in Nigeria</option>
              {NIGERIAN_STATES.map((st) => (
                <option key={st} value={st} className="text-slate-900">{st}</option>
              ))}
            </select>
          </div>

          {/* Job Type Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {['all', 'Full-time', 'Remote', 'Government', 'Graduate Trainee', 'Internship', 'Part-time'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-[#0E1A3A] text-white dark:bg-[#FFB627] dark:text-[#0E1A3A]'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'All Roles' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List (Section 5.2: Title, employer, location, type, salary range, posted date, Verified Employer badge) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{filteredJobs.length} verified jobs found</span>
            <span className="text-[#0FB57F] font-bold">100% Free Applications</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white dark:bg-[#131E45] rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                No roles match your search filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing specific filters or select "All Locations in Nigeria" to view opportunities.
              </p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setStateFilter('all');
                  setSearch('');
                }}
                className="px-4 py-2 bg-[#FFB627] text-[#0E1A3A] font-bold text-xs rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-[#131E45] rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {job.employer}
                      </span>
                      {job.employerVerified && (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-[#0FB57F] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified Employer
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
                        {job.type}
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveJobDetail(job)}
                      className="font-display font-bold text-lg text-slate-900 dark:text-white hover:text-[#0FB57F] dark:hover:text-[#FFB627] cursor-pointer transition-colors"
                    >
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-300">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0FB57F]" /> {job.location}
                      </span>
                      <span className="font-extrabold text-[#0FB57F] dark:text-[#FFB627]">
                        💰 {job.salaryRange}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" /> {job.postedDate}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleSaveItem(job.id, job.title)}
                      className={`p-2.5 rounded-xl transition-colors ${
                        savedItems.includes(job.id)
                          ? 'bg-[#FFB627] text-[#0E1A3A]'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                      }`}
                      title="Save Job"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setActiveJobDetail(job)}
                      className="px-4 py-2.5 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      View & Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* JOB DETAIL MODAL (Section 5.2: Description, requirements, how to apply, save button, report button) */}
      {activeJobDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 max-h-[88vh] overflow-y-auto space-y-6">
            
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
              <div>
                <span className="text-xs font-bold text-[#FFB627] uppercase tracking-wider">
                  {activeJobDetail.category} · {activeJobDetail.type}
                </span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                  {activeJobDetail.title}
                </h3>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                  {activeJobDetail.employer} · 📍 {activeJobDetail.location}
                </p>
              </div>
              <button
                onClick={() => setActiveJobDetail(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Salary Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                  Offered Compensation
                </div>
                <div className="font-display font-extrabold text-xl text-[#0E1A3A] dark:text-[#FFB627]">
                  {activeJobDetail.salaryRange}
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {activeJobDetail.deadline || 'Ongoing Review'}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Role Description
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeJobDetail.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Candidate Requirements
              </h4>
              <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                {activeJobDetail.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0FB57F] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Anti Fraud Reminder */}
            <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0FB57F] shrink-0" />
              <span>Verified Employer: Never pay anyone claiming to guarantee this position.</span>
            </div>

            {/* How to Apply & Footer Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveItem(activeJobDetail.id, activeJobDetail.title)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    savedItems.includes(activeJobDetail.id)
                      ? 'bg-[#FFB627] text-[#0E1A3A]'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{savedItems.includes(activeJobDetail.id) ? 'Saved' : 'Save Job'}</span>
                </button>

                <button
                  onClick={() => {
                    setReportJob(activeJobDetail);
                    setActiveJobDetail(null);
                  }}
                  className="text-xs text-slate-400 hover:text-red-500 font-semibold px-2"
                >
                  Report Listing
                </button>
              </div>

              <button
                onClick={() => {
                  addToast(`Application link opened for ${activeJobDetail.employer}!`, 'success');
                  setActiveJobDetail(null);
                }}
                className="py-3 px-6 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply via Employer Portal</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CV BUILDER MODAL (Section 5.2: Guided steps: personal details, education, experience, skills with preview and download) */}
      {cvBuilderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 max-h-[88vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-[#FFB627] uppercase tracking-wider">
                  NEXORA Career Tool
                </span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                  Guided CV & Resume Builder
                </h3>
              </div>
              <button onClick={() => setCvBuilderOpen(false)} className="p-1 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Form Side */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={cvData.name}
                    onChange={(e) => setCvData({ ...cvData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={cvData.phone}
                      onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                      Location / State
                    </label>
                    <input
                      type="text"
                      value={cvData.location}
                      onChange={(e) => setCvData({ ...cvData, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    Target Role / Professional Headline
                  </label>
                  <input
                    type="text"
                    value={cvData.headline}
                    onChange={(e) => setCvData({ ...cvData, headline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    Education & Credentials
                  </label>
                  <input
                    type="text"
                    value={cvData.education}
                    onChange={(e) => setCvData({ ...cvData, education: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    Experience Highlights
                  </label>
                  <textarea
                    rows={3}
                    value={cvData.experience}
                    onChange={(e) => setCvData({ ...cvData, experience: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    Skills (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={cvData.skills}
                    onChange={(e) => setCvData({ ...cvData, skills: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm"
                  />
                </div>
              </div>

              {/* Live Preview Side */}
              <div className="bg-slate-50 dark:bg-[#0E1A3A] p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                    Live Document Preview
                  </span>
                  <div className="bg-white dark:bg-[#1E2C60] p-5 rounded-xl shadow-xs space-y-3 font-sans text-xs text-slate-800 dark:text-slate-200">
                    <div className="border-b pb-2">
                      <div className="font-bold text-base text-slate-900 dark:text-white">{cvData.name || 'Your Name'}</div>
                      <div className="text-[11px] text-slate-500">{cvData.phone} · {cvData.email}</div>
                      <div className="text-xs font-semibold text-[#0FB57F] mt-1">{cvData.headline}</div>
                    </div>
                    <div>
                      <div className="font-bold text-[10px] text-slate-400 uppercase">Education</div>
                      <div className="text-xs mt-0.5">{cvData.education}</div>
                    </div>
                    <div>
                      <div className="font-bold text-[10px] text-slate-400 uppercase">Experience</div>
                      <div className="text-xs mt-0.5 whitespace-pre-line">{cvData.experience}</div>
                    </div>
                    <div>
                      <div className="font-bold text-[10px] text-slate-400 uppercase">Key Competencies</div>
                      <div className="text-xs mt-0.5">{cvData.skills}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    onClick={handleDownloadCv}
                    className="w-full py-3 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download CV (.txt / formatted)</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* JOB ALERT SETUP MODAL */}
      {jobAlertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                <Bell className="w-5 h-5 text-[#FFB627]" /> Setup Job Alerts
              </h3>
              <button onClick={() => setJobAlertOpen(false)} className="p-1 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Get notified immediately when verified employers post jobs in your field.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Target Category</label>
                <input
                  type="text"
                  placeholder="e.g. Technology, Supply Chain, Banking"
                  defaultValue="Technology & Operations"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">State Preference</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white">
                  <option>Abuja (FCT)</option>
                  <option>Lagos</option>
                  <option>Remote (Anywhere)</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Frequency</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white">
                  <option>Instant SMS & Notification</option>
                  <option>Daily Digest</option>
                </select>
              </div>
              <button
                onClick={() => {
                  addToast('Job alert activated! You will receive verified notifications.', 'success');
                  setJobAlertOpen(false);
                }}
                className="w-full py-3 bg-[#FFB627] text-[#0E1A3A] font-bold rounded-xl mt-2 cursor-pointer shadow-md"
              >
                Save Alert Preference
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT JOB MODAL */}
      {reportJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-red-500 flex items-center gap-1.5">
                <AlertTriangle className="w-5 h-5" /> Report Job Listing
              </h3>
              <button onClick={() => setReportJob(null)} className="p-1 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Help us protect Nigerian jobseekers from scams:
            </p>
            <div className="space-y-2 text-xs">
              {[
                'Employer asked for payment or interview money',
                'Misleading job title or fake address',
                'Unresponsive or suspicious contact',
                'Expired vacancy'
              ].map((reason, i) => (
                <button
                  key={i}
                  onClick={() => {
                    addToast('Report logged. Fraud prevention team notified.', 'warning');
                    setReportJob(null);
                  }}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 font-medium"
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
