import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  Send, 
  Clock, 
  PhoneCall, 
  ExternalLink, 
  Headphones, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface ArticleItem {
  id: string;
  category: string;
  title: string;
  snippet: string;
  steps: string[];
}

const ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    category: 'Safety',
    title: 'How to verify employers and avoid job application fraud',
    snippet: 'Real Nigerian companies and government agencies never charge recruitment, form, or aptitude test fees.',
    steps: [
      'Look for the green "Verified Employer" badge on job cards.',
      'Check that the salary is clearly stated in standard Naira figures.',
      'Never send money for medical screening or interview forms to any personal bank account.',
      'Tap "Report Listing" if anyone solicits money—NEXORA bans fraudulent accounts permanently.'
    ]
  },
  {
    id: 'art-2',
    category: 'Market',
    title: 'How foodstuff price tracking and price drop alerts work',
    snippet: 'We gather weekly commodity prices from major open markets like Bodija, Mile 12, Wuse, and Onitsha.',
    steps: [
      'Visit NEXORA Market and check the Essential Foodstuff Price Index table.',
      'Tap "Track this price" on any commodity or electronic gadget.',
      'You will receive an in-app alert or SMS whenever the price drops by 5% or more.'
    ]
  },
  {
    id: 'art-3',
    category: 'Business',
    title: 'How to list your business storefront and earn the Verified Badge',
    snippet: 'Create a storefront without needing a website. Upload photos, products, and receive customer enquiries.',
    steps: [
      'Navigate to "For Business" and click "List your business free".',
      'Fill in your shop name, contact phone, physical location and operating hours.',
      'Upload your CAC Registration Certificate or valid government ID in the dashboard.',
      'Our team validates physical existence within 24 to 48 hours to grant your badge.'
    ]
  },
  {
    id: 'art-4',
    category: 'Services',
    title: 'How to book an artisan safely without upfront risk',
    snippet: 'Connect with tested electricians, mechanics, and plumbers in your neighbourhood.',
    steps: [
      'Filter by your area and preferred trade.',
      'Review previous customer ratings and photos of past installations.',
      'Click "Book Artisan" and choose your preferred date and time.',
      'Inspect the completed work before making direct payment to the technician.'
    ]
  },
  {
    id: 'art-5',
    category: 'Account',
    title: 'Switching locations and managing phone number login',
    snippet: 'NEXORA uses 4-digit SMS OTP so you never have to remember or reset complex passwords.',
    steps: [
      'Tap the location badge in the top navigation bar to select your state.',
      'Your feed updates instantly to prioritize jobs, prices, and alerts in that state.',
      'Your single account works across all 10 departments seamlessly.'
    ]
  }
];

export const HelpCenterView: React.FC = () => {
  const { setCurrentView, createSupportTicket, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Contact form
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Account');
  const [ticketMessage, setTicketMessage] = useState('');

  const categories = ['all', 'Safety', 'Jobs', 'Market', 'Services', 'Business', 'Account', 'Payments'];

  const filteredArticles = ARTICLES.filter((a) => {
    if (selectedCategory !== 'all' && a.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.snippet.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      addToast('Please provide subject and message', 'warning');
      return;
    }

    const tId = createSupportTicket(ticketSubject, ticketMessage);
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Band */}
      <div className="bg-[#0E1A3A] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
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
                <span className="text-3xl">❓</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  NEXORA Help Centre
                </h1>
              </div>
              <p className="text-sm sm:text-base text-slate-300 mt-1 font-medium">
                Step-by-step guidance, anti-fraud policies, and 24/7 dedicated Nigerian customer care.
              </p>
            </div>

            {/* Support SLA notice */}
            <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-xs text-slate-300 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#FFB627]" />
              <div>
                <strong className="text-white block">Support Desk Hours</strong>
                <span>Mon - Sun: 7:00 AM – 9:00 PM (Avg. reply: 12 mins)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Search & Category Filter */}
        <div className="bg-white dark:bg-[#131E45] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help topics: fraud, OTP, listing business, price alerts, bookings…"
              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0E1A3A] text-white dark:bg-[#0FB57F]'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Guides' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Guides List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-white dark:bg-[#131E45] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md cursor-pointer transition-all space-y-2.5 group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0FB57F] bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full uppercase text-[10px]">
                  {art.category}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-[#0FB57F] transition-colors">
                {art.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                {art.snippet}
              </p>
            </div>
          ))}
        </div>

        {/* CONTACT FORM & DIRECT CHANNELS (Section 9: Agents reply in chat, phone or WhatsApp) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Direct channels cards */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Instant Contact Channels
            </h3>

            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center gap-3.5 hover:bg-[#25D366]/20 transition-colors block"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center font-bold">
                WA
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  WhatsApp Support Desk <ExternalLink className="w-3 h-3 text-[#25D366]" />
                </div>
                <div className="text-[11px] text-slate-500">Live agents on WhatsApp 24/7</div>
              </div>
            </a>

            <a
              href="tel:+2348000000000"
              className="p-5 rounded-3xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex items-center gap-3.5 hover:bg-blue-100 transition-colors block"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#2E7BFF] text-white flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Toll-Free Phone Line
                </div>
                <div className="text-[11px] text-slate-500">+234 (0) 800-NEXORA-CARE</div>
              </div>
            </a>

            <div className="p-4 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <strong className="flex items-center gap-1 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Trust & Safety Escrow
              </strong>
              <p className="text-[11px] leading-snug">
                Report suspicious users or unauthorized payment solicitations immediately. Every report generates an internal tracking ticket.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white dark:bg-[#131E45] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Submit Support Enquiry or Safety Issue
              </h3>
              <p className="text-xs text-slate-500">
                A support ticket number will be generated instantly and tracked in your user dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Enquiry Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Question about CAC Storefront Verification"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium"
                  >
                    <option>Safety & Fake Listings</option>
                    <option>Business Storefront</option>
                    <option>Jobs Verification</option>
                    <option>Market Price Anomaly</option>
                    <option>Artisan Booking</option>
                    <option>Account & OTP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide specific listing links, phone numbers, or account details to assist resolution..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket & Get Reference Number</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0FB57F] uppercase tracking-wider">
                  {selectedArticle.category} Guide
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mt-0.5">
                  {selectedArticle.title}
                </h3>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="p-1 text-slate-400">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {selectedArticle.snippet}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Step-by-step instructions:
              </h4>
              <div className="space-y-2">
                {selectedArticle.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-3 rounded-2xl">
                    <span className="w-5 h-5 rounded-full bg-[#0E1A3A] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full py-2.5 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-xs font-bold rounded-xl"
            >
              Done Reading
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
