import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { DEMO_BUSINESS } from '../data/mockData.ts';
import { BusinessProfile } from '../types.ts';
import { 
  Building2, 
  ShieldCheck, 
  Star, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Tag, 
  Eye, 
  MousePointerClick, 
  Inbox, 
  Plus, 
  Edit3, 
  ArrowLeft, 
  CheckCircle2, 
  Upload, 
  ExternalLink, 
  FileCheck, 
  X, 
  Clock 
} from 'lucide-react';

export const BusinessView: React.FC = () => {
  const { setCurrentView, addToast } = useApp();

  const [activeMode, setActiveMode] = useState<'storefront' | 'dashboard'>('storefront');
  const [business, setBusiness] = useState<BusinessProfile>(DEMO_BUSINESS);
  
  // Dashboard Tab state
  const [dashboardTab, setDashboardTab] = useState<'analytics' | 'profile' | 'products' | 'offers' | 'inbox' | 'reviews' | 'verification' | 'promote'>('analytics');

  // New Product Modal state
  const [newProductModal, setNewProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');

  // New Offer Modal
  const [newOfferModal, setNewOfferModal] = useState(false);
  const [newOfferTitle, setNewOfferTitle] = useState('');
  const [newOfferDiscount, setNewOfferDiscount] = useState('15% OFF');

  // Customer Enquiry form state (for public storefront)
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName.trim() || !enquiryPhone.trim() || !enquiryMessage.trim()) {
      addToast('Please complete all enquiry fields', 'warning');
      return;
    }

    addToast(`Enquiry sent directly to ${business.name}! They will contact you on ${enquiryPhone}.`, 'success');
    setEnquiryName('');
    setEnquiryPhone('');
    setEnquiryMessage('');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice.trim()) return;

    const newProd = {
      id: `bp-${Date.now()}`,
      name: newProdName,
      price: Number(newProdPrice),
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=400&auto=format&fit=crop&q=80',
      description: newProdDesc || 'High-grade crafted metal product.'
    };

    setBusiness({
      ...business,
      products: [...business.products, newProd]
    });
    setNewProductModal(false);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdDesc('');
    addToast('Product added to your digital storefront!', 'success');
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferTitle.trim()) return;

    const newOffer = {
      id: `bo-${Date.now()}`,
      title: newOfferTitle,
      discount: newOfferDiscount,
      validUntil: 'End of month'
    };

    setBusiness({
      ...business,
      offers: [...business.offers, newOffer]
    });
    setNewOfferModal(false);
    setNewOfferTitle('');
    addToast('Promotion published on your public profile!', 'success');
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Coloured Header Band: Department accent (#26397F Deep Indigo) */}
      <div className="bg-[#26397F] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
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
                <span className="text-3xl">🏢</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  NEXORA Business
                </h1>
              </div>
              <p className="text-sm sm:text-base text-slate-200 mt-1 font-medium">
                Give your business visibility. Free digital storefront for Nigerian retailers, artisans, and enterprises.
              </p>
            </div>

            {/* Mode Switcher: View Storefront vs Manage in Dashboard */}
            <div className="flex items-center bg-white/10 p-1 rounded-2xl border border-white/20 self-start md:self-auto">
              <button
                onClick={() => setActiveMode('storefront')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeMode === 'storefront'
                    ? 'bg-white text-[#26397F] shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Public Storefront View
              </button>
              <button
                onClick={() => setActiveMode('dashboard')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeMode === 'dashboard'
                    ? 'bg-[#FFB627] text-[#0E1A3A] shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Owner Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= MODE 1: PUBLIC STOREFRONT SHOWCASE ================= */}
        {activeMode === 'storefront' && (
          <div className="space-y-8">
            
            {/* Storefront Hero Banner */}
            <div className="bg-white dark:bg-[#131E45] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-sm">
              <div className="h-48 sm:h-64 w-full bg-slate-200 dark:bg-white/5 relative">
                <img
                  src={business.coverImage}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 sm:left-6 flex items-end gap-4 text-white">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1 shadow-xl shrink-0 overflow-hidden">
                    <img src={business.logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                        {business.name}
                      </h2>
                      {business.verified && (
                        <span className="text-[10px] font-bold text-white bg-[#0FB57F] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified Storefront
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-200 mt-0.5">{business.category} · 📍 {business.state}</p>
                  </div>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <strong>{business.rating}</strong> ({business.reviewsCount} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" /> {business.openingHours}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#0FB57F]" /> {business.address}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${business.phone}`}
                    className="px-3.5 py-2 bg-slate-100 dark:bg-white/10 hover:bg-[#0FB57F] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call
                  </a>
                  <a
                    href={`https://wa.me/${business.whatsapp}?text=Hello%20${encodeURIComponent(business.name)}%2C%20I%20found%20your%20storefront%20on%20NEXORA.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebc59] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Description */}
              <div className="p-6">
                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">About the Business</h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl">
                  {business.description}
                </p>
              </div>
            </div>

            {/* Special Offers Banner */}
            {business.offers.length > 0 && (
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-[#FFB627]/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#FFB627] text-[#0E1A3A] font-bold text-xs">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Special Promotion: {business.offers[0].title}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Discount: {business.offers[0].discount} · Valid until {business.offers[0].validUntil}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => addToast('Coupon applied to your direct enquiry!', 'success')}
                  className="px-3.5 py-1.5 bg-[#FFB627] text-[#0E1A3A] text-xs font-bold rounded-xl shrink-0"
                >
                  Claim Offer
                </button>
              </div>
            )}

            {/* Products & Services Catalog */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Featured Products & Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {business.products.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-3xl bg-white dark:bg-[#131E45] border border-slate-200/80 dark:border-white/10 shadow-xs flex gap-4 items-center"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-white/5 overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                      <div className="font-extrabold text-[#0FB57F] text-base tabular-nums">
                        ₦{item.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Enquiry Form & Customer Reviews Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Enquiry Form */}
              <div className="bg-white dark:bg-[#131E45] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Send Direct Enquiry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Get an instant quote or schedule consultation directly with the shop manager.
                  </p>
                </div>

                <form onSubmit={handleSendEnquiry} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kolawole Johnson"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Your Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 802 000 0000"
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">What are you inquiring about?</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Dimensions of security gate for a 4-bedroom duplex in Guzape..."
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#26397F] hover:bg-[#1a2b66] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Submit Customer Enquiry
                  </button>
                </form>
              </div>

              {/* Reviews */}
              <div className="bg-white dark:bg-[#131E45] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Verified Customer Reviews
                  </h3>
                  <span className="text-xs font-bold text-amber-500">★ 4.9 Average</span>
                </div>

                <div className="space-y-3">
                  {business.reviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-800 dark:text-white">{rev.user}</strong>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{rev.comment}</p>
                      {rev.reply && (
                        <div className="p-2 rounded-xl bg-white dark:bg-[#1E2C60] text-[11px] text-slate-500 border border-slate-200/50">
                          <strong>Store Owner Reply:</strong> {rev.reply}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= MODE 2: FULL BUSINESS DASHBOARD (Section 7) ================= */}
        {activeMode === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Dashboard Subnav */}
            <div className="bg-white dark:bg-[#131E45] p-2 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: 'analytics', label: 'Analytics & Overview', icon: Eye },
                { id: 'products', label: `Products (${business.products.length})`, icon: Tag },
                { id: 'offers', label: `Offers (${business.offers.length})`, icon: Tag },
                { id: 'inbox', label: 'Enquiries Inbox', icon: Inbox },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'verification', label: 'Verification Badge', icon: FileCheck },
                { id: 'profile', label: 'Storefront Editor', icon: Edit3 }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = dashboardTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDashboardTab(tab.id as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? 'bg-[#26397F] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB: ANALYTICS (Section 7: profile views, clicks, enquiries) */}
            {dashboardTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="p-5 rounded-3xl bg-white dark:bg-[#131E45] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Total Storefront Views</span>
                    <div className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tabular-nums">
                      {business.stats.views.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-bold">+18% this month</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-white dark:bg-[#131E45] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
                    <span className="text-xs text-slate-500 font-medium">WhatsApp & Call Clicks</span>
                    <div className="font-display font-extrabold text-3xl text-[#2E7BFF] tabular-nums">
                      {business.stats.clicks.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-bold">+24% conversions</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-white dark:bg-[#131E45] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Direct Inquiries Received</span>
                    <div className="font-display font-extrabold text-3xl text-[#0FB57F] tabular-nums">
                      {business.stats.enquiries.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-400">All answered within 2 hrs</span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#131E45] border border-slate-200/80 dark:border-white/10 space-y-3">
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    Storefront Status: Active & Verified
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                    Your business is visible to local buyers searching in <strong>Abuja (FCT)</strong>. Upgrading to a featured boost will pin your listing at the top of NEXORA Market searches.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: PRODUCTS & SERVICES MANAGER */}
            {dashboardTab === 'products' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Manage Products & Services
                  </h3>
                  <button
                    onClick={() => setNewProductModal(true)}
                    className="py-2 px-4 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Item</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {business.products.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-white dark:bg-[#131E45] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</div>
                        <div className="text-xs font-extrabold text-[#0FB57F] mt-0.5">₦{p.price.toLocaleString()}</div>
                      </div>
                      <button
                        onClick={() => addToast('Item updated', 'info')}
                        className="text-xs font-semibold text-slate-400 hover:text-slate-800 dark:hover:text-white"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: OFFERS */}
            {dashboardTab === 'offers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Promotional Offers & Discounts
                  </h3>
                  <button
                    onClick={() => setNewOfferModal(true)}
                    className="py-2 px-4 bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Promo Offer</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {business.offers.map((offer) => (
                    <div key={offer.id} className="p-4 rounded-2xl bg-white dark:bg-[#131E45] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">{offer.title}</div>
                        <div className="text-xs text-[#FFB627] font-bold">{offer.discount} · Valid until {offer.validUntil}</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Live on Storefront
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ENQUIRIES INBOX (Section 7: customer messages with quick replies) */}
            {dashboardTab === 'inbox' && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Incoming Customer Enquiries
                </h3>
                {[
                  { sender: 'Engr. Dapo Alabi', phone: '+234 803 999 1122', text: 'Good day, do you fabricate cantilever automated sliding gates? Need for a project in Maitama.', date: '1 hour ago' },
                  { sender: 'Mrs. Cynthia Obi', phone: '+234 812 555 3344', text: 'Can you come for site measurement tomorrow morning around 11am in Gwarinpa?', date: 'Yesterday' }
                ].map((msg, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#131E45] border border-slate-200 dark:border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-slate-900 dark:text-white">{msg.sender}</strong>
                      <span className="text-[10px] text-slate-400">{msg.date}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{msg.phone}</div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl">
                      "{msg.text}"
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => addToast(`Quick reply template sent to ${msg.sender}!`, 'success')}
                        className="px-3 py-1.5 bg-[#0FB57F] text-white text-xs font-bold rounded-lg"
                      >
                        Send Quick Reply: "Yes, we are available"
                      </button>
                      <a
                        href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-white/10 text-xs font-semibold rounded-lg hover:bg-slate-200"
                      >
                        Reply on WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: VERIFICATION (Section 7: upload documents to earn badge) */}
            {dashboardTab === 'verification' && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#131E45] border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#0FB57F]" />
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Verified Storefront Badge Status
                  </h3>
                </div>
                <p className="text-xs text-slate-500 max-w-xl">
                  Businesses with verified badges earn <strong>4x more customer enquiries</strong>. Upload your CAC Certificate of Registration or Valid Government ID to confirm legitimacy.
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 font-medium flex items-center justify-between">
                  <span>CAC Certificate: Verified & On File (RC-940212)</span>
                  <span className="font-bold">Active</span>
                </div>

                <div className="pt-2">
                  <label className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-200">
                    <Upload className="w-4 h-4" />
                    <span>Upload Updated Documentation (PDF/PNG)</span>
                    <input type="file" className="hidden" onChange={() => addToast('Document uploaded for verification team review.', 'success')} />
                  </label>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ADD PRODUCT MODAL */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Add Product to Storefront
              </h3>
              <button onClick={() => setNewProductModal(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Product / Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stainless Steel Handrails (Per Meter)"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Price (₦)</label>
                <input
                  type="number"
                  required
                  placeholder="45000"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details, specifications, warranties..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0FB57F] text-white font-bold rounded-xl shadow-md cursor-pointer"
              >
                Save to Storefront
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD OFFER MODAL */}
      {newOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Create Special Promotion
              </h3>
              <button onClick={() => setNewOfferModal(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddOffer} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Delivery within Abuja on orders above ₦200,000"
                  value={newOfferTitle}
                  onChange={(e) => setNewOfferTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Badge / Discount Percentage</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15% OFF / FREE BONUS"
                  value={newOfferDiscount}
                  onChange={(e) => setNewOfferDiscount(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#FFB627] text-[#0E1A3A] font-bold rounded-xl shadow-md cursor-pointer"
              >
                Publish Promo Banner
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
