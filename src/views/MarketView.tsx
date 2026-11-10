import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { PRODUCTS, FOODSTUFF_PRICES, NIGERIAN_STATES } from '../data/mockData.ts';
import { ProductItem, NigerianState } from '../types.ts';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Bookmark, 
  ShieldCheck, 
  LineChart, 
  Scale, 
  Bell, 
  X, 
  Filter, 
  AlertCircle, 
  MessageCircle, 
  PhoneCall, 
  ArrowLeft 
} from 'lucide-react';

export const MarketView: React.FC = () => {
  const { 
    selectedState, 
    setSelectedState, 
    toggleSaveItem, 
    savedItems, 
    trackedPrices, 
    toggleTrackPrice, 
    addToast,
    setCurrentView 
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'foodstuff' | 'electronics' | 'household' | 'building'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [stateFilter, setStateFilter] = useState<string>('all');
  
  // Modals
  const [comparingProduct, setComparingProduct] = useState<ProductItem | null>(null);
  const [historyProduct, setHistoryProduct] = useState<ProductItem | null>(null);
  const [reportModalItem, setReportModalItem] = useState<ProductItem | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (verifiedOnly && !p.sellerVerified) return false;
    if (p.price > maxPrice) return false;
    if (stateFilter !== 'all' && p.state !== stateFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.sellerName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Coloured Header Band: Department accent (#0FB57F) with title, promise and search */}
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
                <span className="text-3xl">🛍️</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  NEXORA Market
                </h1>
              </div>
              <p className="text-sm sm:text-base text-emerald-50 mt-1 font-medium">
                Shop smarter. Spend better. Transparent prices across Nigerian markets.
              </p>
            </div>

            {/* Department Search */}
            <div className="w-full md:w-96 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, phones, cement, foodstuffs…"
                className="w-full bg-white text-slate-900 rounded-2xl py-2.5 pl-10 pr-4 text-sm font-medium placeholder:text-slate-400 focus:outline-none shadow-md"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* FOOD PRICES TRACKER: Section 5.1 (Simple list view with changes since last week) */}
        <section className="bg-white dark:bg-[#131E45] rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <span>🌾</span> Essential Foodstuff Price Index (Weekly Tracker)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Live commodity surveillance across major open markets in Lagos, Abuja, Ibadan and Onitsha.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Updated this morning
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-2.5 pr-4">Commodity</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3">Current Price</th>
                  <th className="py-2.5 px-3">Last Week</th>
                  <th className="py-2.5 px-3">Weekly Shift</th>
                  <th className="py-2.5 pl-3">Sampled Market</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {FOODSTUFF_PRICES.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 pr-4 font-bold text-slate-800 dark:text-white">
                      {item.item}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-medium">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-[#0E1A3A] dark:text-[#FFB627] tabular-nums">
                      ₦{item.currentPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-slate-400 line-through tabular-nums">
                      ₦{item.lastWeekPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      {item.trend === 'down' && (
                        <span className="inline-flex items-center gap-1 font-bold text-[#0FB57F]">
                          <TrendingDown className="w-3.5 h-3.5" /> {Math.abs(item.changePercent)}% cheaper
                        </span>
                      )}
                      {item.trend === 'up' && (
                        <span className="inline-flex items-center gap-1 font-bold text-[#FF5C6C]">
                          <TrendingUp className="w-3.5 h-3.5" /> +{item.changePercent}% higher
                        </span>
                      )}
                      {item.trend === 'stable' && (
                        <span className="inline-flex items-center gap-1 font-bold text-slate-400">
                          <Minus className="w-3.5 h-3.5" /> Stable
                        </span>
                      )}
                    </td>
                    <td className="py-3 pl-3 text-xs text-slate-500">
                      {item.marketLocation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Filter Row (Location, Price, Rating, Verified only) */}
        <section className="bg-white dark:bg-[#131E45] rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Filters:
            </span>

            {/* Categories */}
            {(['all', 'foodstuff', 'electronics', 'household', 'building'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0FB57F] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* State filter */}
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="all">All States</option>
              {NIGERIAN_STATES.map((st) => (
                <option key={st} value={st} className="text-slate-900">{st}</option>
              ))}
            </select>

            {/* Verified only checkbox */}
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 accent-[#0FB57F] rounded cursor-pointer"
              />
              <span>Verified Only</span>
            </label>
          </div>
        </section>

        {/* Product Grid with Lowest Price Highlighted */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing {filteredProducts.length} verified market items</span>
            <span className="text-[#0FB57F] font-bold">Lowest prices highlighted</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-[#131E45] rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                No products match these filters yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No sellers in this price bracket or state yet. Invite a seller or reset filters to see all offerings.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setVerifiedOnly(false);
                  setStateFilter('all');
                  setSearch('');
                }}
                className="px-4 py-2 bg-[#0FB57F] text-white text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-[#131E45] rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold text-[#0FB57F] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> {p.sellerName}
                      </span>
                      <span className="text-[10px] text-slate-400">{p.condition}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {p.title}
                    </h3>

                    <div className="text-xs text-slate-500 dark:text-slate-300">
                      📍 {p.location}
                    </div>

                    {/* Price and Lowest Highlight */}
                    <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-[#0FB57F] uppercase tracking-wide">
                          Lowest Verified Price
                        </div>
                        <div className="font-display font-extrabold text-xl text-[#0E1A3A] dark:text-[#FFB627] tabular-nums">
                          ₦{p.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-amber-500">★ {p.sellerRating}</span>
                        <div className="text-[10px] text-slate-400">Seller score</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row: Compare, History, Save, Contact */}
                  <div className="p-4 bg-slate-50/80 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {p.otherSellers && p.otherSellers.length > 0 && (
                        <button
                          onClick={() => setComparingProduct(p)}
                          className="p-2 rounded-xl bg-white dark:bg-[#1E2C60] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-[#0FB57F] text-xs font-semibold flex items-center gap-1"
                          title="Compare with other sellers"
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Compare</span>
                        </button>
                      )}

                      {p.priceHistory && (
                        <button
                          onClick={() => setHistoryProduct(p)}
                          className="p-2 rounded-xl bg-white dark:bg-[#1E2C60] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-[#2E7BFF] text-xs font-semibold flex items-center gap-1"
                          title="View price history chart"
                        >
                          <LineChart className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Trends</span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleSaveItem(p.id, p.title)}
                        className={`p-2 rounded-xl transition-colors ${
                          savedItems.includes(p.id)
                            ? 'bg-[#FFB627] text-[#0E1A3A]'
                            : 'bg-white dark:bg-[#1E2C60] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                        }`}
                        title="Save to dashboard"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setReportModalItem(p)}
                        className="text-[11px] text-slate-400 hover:text-red-500 font-medium px-1"
                      >
                        Report
                      </button>
                      <a
                        href={`https://wa.me/2348000000000?text=Hello%2C+I+found+your+listing+for+${encodeURIComponent(p.title)}+on+NEXORA`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-[#0FB57F] hover:bg-[#0c9c6d] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Contact</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* COMPARE VIEW MODAL (Section 5.1: Sellers side by side showing price, condition, location, rating & Contact button) */}
      {comparingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-[#0FB57F] uppercase tracking-wider">
                  Side-by-Side Comparison
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {comparingProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setComparingProduct(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Multiple verified vendors stocking this item across Nigeria. Compare condition, pricing, and contact directly.
            </p>

            <div className="space-y-3">
              {/* Primary seller */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {comparingProduct.sellerName}
                    </span>
                    <span className="text-[10px] font-bold text-[#0FB57F] bg-white px-2 py-0.5 rounded-full">
                      Lowest Price
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {comparingProduct.location} · {comparingProduct.condition} · Rating ★ {comparingProduct.sellerRating}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display font-extrabold text-lg text-[#0FB57F]">
                    ₦{comparingProduct.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      addToast(`Connecting you to ${comparingProduct.sellerName}...`, 'info');
                      setComparingProduct(null);
                    }}
                    className="px-4 py-2 bg-[#0FB57F] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Contact Seller
                  </button>
                </div>
              </div>

              {/* Other sellers */}
              {comparingProduct.otherSellers?.map((os, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {os.seller}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {os.condition} · Vendor Rating ★ {os.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-base text-slate-800 dark:text-slate-200">
                      ₦{os.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => {
                        addToast(`Connecting to ${os.seller}...`, 'info');
                        setComparingProduct(null);
                      }}
                      className="px-4 py-2 bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-[#0FB57F] hover:text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Contact Seller
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRICE HISTORY MODAL (Section 5.1: Line chart with "Track this price" button) */}
      {historyProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-[#2E7BFF] uppercase tracking-wider">
                  Historical Price Trend
                </span>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  {historyProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setHistoryProduct(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price Chart simulation */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1A3A] border border-slate-200 dark:border-white/10 space-y-3">
              <div className="text-xs font-semibold text-slate-500">
                Price movement over past 60 days (in ₦):
              </div>
              <div className="h-40 flex items-end gap-4 pt-4 px-2">
                {historyProduct.priceHistory?.map((pt, i) => {
                  const maxH = Math.max(...(historyProduct.priceHistory?.map(p => p.price) || [1]));
                  const heightPercent = Math.round((pt.price / maxH) * 85);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[10px] font-bold text-[#0FB57F] tabular-nums">
                        ₦{(pt.price / 1000).toFixed(0)}k
                      </span>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-[#0FB57F] to-[#2E7BFF] rounded-t-lg transition-all duration-500"
                      />
                      <span className="text-[10px] text-slate-400 font-medium">
                        {pt.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Track This Price Button */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  toggleTrackPrice(historyProduct.id, historyProduct.title);
                  setHistoryProduct(null);
                }}
                className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  trackedPrices.includes(historyProduct.id)
                    ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
                    : 'bg-[#FFB627] hover:bg-[#e5a220] text-[#0E1A3A]'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>
                  {trackedPrices.includes(historyProduct.id)
                    ? 'Tracking Active (Tap to Disable)'
                    : 'Track this price (Receive alert when it drops)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT LISTING MODAL */}
      {reportModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5 text-red-500">
                <AlertCircle className="w-5 h-5" /> Report Listing
              </h3>
              <button onClick={() => setReportModalItem(null)} className="p-1 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Why are you reporting "{reportModalItem.title}"?
            </p>
            <div className="space-y-2 text-xs">
              {['Suspected counterfeit product', 'Misleading or inflated price', 'Inactive seller / unreachable', 'Spam / offensive content'].map((reason, i) => (
                <button
                  key={i}
                  onClick={() => {
                    addToast('Report logged. Item flagged for review.', 'info');
                    setReportModalItem(null);
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
