import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { PRODUCTS, JOBS, PROVIDERS } from '../data/mockData.ts';
import { 
  X, 
  Bookmark, 
  Bell, 
  MessageSquare, 
  User, 
  History, 
  Calendar, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  Headphones 
} from 'lucide-react';

export const UserDashboardModal: React.FC = () => {
  const { 
    userDashboardOpen, 
    closeUserDashboard, 
    user, 
    setUser, 
    savedItems, 
    toggleSaveItem, 
    bookings, 
    supportTickets, 
    addToast,
    openDepartment 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'saved' | 'notifications' | 'bookings' | 'messages' | 'profile' | 'tickets'>('saved');

  if (!userDashboardOpen) return null;

  // Find saved items from collections
  const savedJobs = JOBS.filter((j) => savedItems.includes(j.id));
  const savedProducts = PRODUCTS.filter((p) => savedItems.includes(p.id));
  const savedProviders = PROVIDERS.filter((s) => savedItems.includes(s.id));

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      fullName: '',
      phone: '',
      email: '',
      state: 'Abuja (FCT)',
      area: '',
      interests: [],
      savedItemIds: [],
      notificationsCount: 0
    });
    addToast('You have been logged out.', 'info');
    closeUserDashboard();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col max-h-[88vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0E1A3A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-display font-extrabold text-lg text-[#FFB627]">
              {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {user.fullName || 'NEXORA Member'}
              </h3>
              <p className="text-xs text-slate-300">
                {user.state} · {user.area || 'Active profile'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors text-xs flex items-center gap-1"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
            <button
              onClick={closeUserDashboard}
              className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'saved', label: `Saved (${savedItems.length})`, icon: Bookmark },
            { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
            { id: 'notifications', label: 'Alerts', icon: Bell },
            { id: 'tickets', label: `Tickets (${supportTickets.length})`, icon: Headphones },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'profile', label: 'Profile', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#0FB57F] text-[#0FB57F] dark:text-[#0FB57F]'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* TAB 1: SAVED ITEMS */}
          {activeTab === 'saved' && (
            <div className="space-y-4">
              {savedItems.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="font-semibold text-slate-700 dark:text-slate-200">No saved items yet</p>
                  <p className="text-xs mt-1">Tap the save icon on any job, product, or provider to bookmark it.</p>
                </div>
              ) : (
                <>
                  {savedJobs.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Saved Jobs
                      </h4>
                      <div className="space-y-2">
                        {savedJobs.map((j) => (
                          <div key={j.id} className="p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5">
                            <div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white">{j.title}</div>
                              <div className="text-xs text-slate-500">{j.employer} · {j.location}</div>
                              <div className="text-xs font-semibold text-[#0FB57F] mt-0.5">{j.salaryRange}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  closeUserDashboard();
                                  openDepartment('jobs');
                                }}
                                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-semibold hover:bg-[#FFB627] hover:text-[#0E1A3A] transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => toggleSaveItem(j.id, j.title)}
                                className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                                title="Remove"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {savedProducts.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Saved Products & Deals
                      </h4>
                      <div className="space-y-2">
                        {savedProducts.map((p) => (
                          <div key={p.id} className="p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5">
                            <div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</div>
                              <div className="text-xs text-slate-500">{p.sellerName} · {p.location}</div>
                              <div className="text-xs font-extrabold text-[#0E1A3A] dark:text-[#FFB627] mt-0.5">
                                ₦{p.price.toLocaleString()}
                              </div>
                            </div>
                            <button
                              onClick={() => toggleSaveItem(p.id, p.title)}
                              className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {savedProviders.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Saved Artisans & Providers
                      </h4>
                      <div className="space-y-2">
                        {savedProviders.map((s) => (
                          <div key={s.id} className="p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5">
                            <div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white">{s.name}</div>
                              <div className="text-xs text-slate-500">{s.trade} · {s.area}</div>
                              <div className="text-xs font-semibold text-[#FF5C6C] mt-0.5">{s.estimatedPrice}</div>
                            </div>
                            <button
                              onClick={() => toggleSaveItem(s.id, s.name)}
                              className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* TAB 2: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-3">
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Calendar className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="font-semibold text-slate-700 dark:text-slate-200">No service bookings yet</p>
                  <p className="text-xs mt-1">Book an electrician, plumber, or mechanic on NEXORA Services.</p>
                </div>
              ) : (
                bookings.map((bk) => (
                  <div key={bk.id} className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold bg-[#0FB57F]/15 text-[#0FB57F] px-2.5 py-0.5 rounded-full">
                        Booking #{bk.id}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        ● {bk.status}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{bk.providerName}</div>
                      <div className="text-xs text-slate-500">{bk.trade}</div>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-[#1E2C60] p-2.5 rounded-xl border border-slate-200/50">
                      <div><strong>Scheduled:</strong> {bk.date}</div>
                      <div><strong>Location:</strong> {bk.address}</div>
                      <div><strong>Notes:</strong> {bk.jobDescription}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS & ALERTS */}
          {activeTab === 'notifications' && (
            <div className="space-y-2.5">
              {[
                { title: 'Price Drop Alert', desc: 'Dangote Cement 42.5R dropped from ₦47,000 to ₦44,000 in your area.', time: '2 hours ago', icon: '💰' },
                { title: 'Community Outage Update', desc: 'AEDC reports 33kV line restoration underway in Gwarinpa.', time: '4 hours ago', icon: '⚡' },
                { title: 'New Verified Job in Abuja', desc: 'Solar System Installation Engineer posted by GreenGrid Power.', time: 'Yesterday', icon: '💼' }
              ].map((notif, i) => (
                <div key={i} className="p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-white/5">
                  <span className="text-2xl">{notif.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{notif.title}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">{notif.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SUPPORT TICKETS */}
          {activeTab === 'tickets' && (
            <div className="space-y-3">
              {supportTickets.map((t) => (
                <div key={t.ticketId} className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#FF5C6C]">
                      #{t.ticketId}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                      {t.status}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {t.subject}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {t.lastMessage}
                  </p>
                  <span className="text-[10px] text-slate-400 block">{t.createdAt}</span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Engr. Emeka Nwankwo</div>
                  <span className="text-[10px] text-slate-400">10:14 AM</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 truncate">
                  "Good morning! I received your inspection booking for tomorrow at 10 AM. I will come with my multimeter and test kit."
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user.fullName || 'Not specified'}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Phone & Email
                </label>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {user.phone || '+234 803 123 4567'} · {user.email || 'user@nexora.ng'}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Registered Location
                </label>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {user.state} {user.area && `(${user.area})`}
                </div>
              </div>

              {user.cvFileName && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Managed CV
                  </label>
                  <div className="text-xs font-semibold text-[#0FB57F] bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200 inline-block">
                    📄 {user.cvFileName} (Ready for 1-click apply)
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
