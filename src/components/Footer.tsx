import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Logo } from './Logo.tsx';
import { DEPARTMENTS } from '../data/mockData.ts';
import { Globe, Smartphone, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openDepartment, setCurrentView, addToast } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    addToast(`Language changed to ${lang}.`, 'info');
  };

  return (
    <footer className="bg-[#0E1A3A] text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Departments */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-base tracking-wide">
              Departments
            </h4>
            <ul className="space-y-2 text-sm">
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <button
                    onClick={() => openDepartment(dept.id)}
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>{dept.icon}</span>
                    <span>{dept.name.replace('NEXORA ', '')}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openDepartment('discover')}
                  className="text-[#FFB627] hover:underline font-medium text-xs mt-1 block"
                >
                  View all 10 departments →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-base tracking-wide">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors text-left"
                >
                  About NEXORA
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    const roadmapEl = document.getElementById('roadmap-section');
                    roadmapEl?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors text-left"
                >
                  Growth Roadmap
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openDepartment('opportunities')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Careers & Fellowships
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openDepartment('community')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Community Voice
                </button>
              </li>
              <li>
                <button 
                  onClick={() => addToast('Press contact: press@nexora.ng', 'info')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Press & Media
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Business */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-base tracking-wide">
              For Business
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentView('business-dashboard')} 
                  className="hover:text-[#FFB627] transition-colors text-left font-medium"
                >
                  List Business Free
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('business-dashboard')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Storefront Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => addToast('Verification requires CAC registration certificate or valid ID.', 'info')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Get Verified Badge
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openDepartment('jobs')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Post a Job Opening
                </button>
              </li>
              <li>
                <button 
                  onClick={() => addToast('Promoted listings appear on top of local searches.', 'info')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Advertise with us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Help & Support */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-base tracking-wide">
              Help & Safety
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentView('help')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Help Centre & Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => addToast('Anti-fraud rule: Never pay rent before viewing, and employers never charge interview fees.', 'warning')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 text-amber-300"
                >
                  <ShieldCheck className="w-4 h-4" /> Anti-Fraud Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('help')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Report a Scam / Fake Listing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('help')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Check Support Ticket
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/2348000000000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-block text-emerald-400 font-medium"
                >
                  WhatsApp Care Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: App Coming Soon & Language */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="font-display font-bold text-white text-base tracking-wide">
              Mobile App
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium text-xs">
                <Smartphone className="w-4 h-4 text-[#FFB627]" />
                <span>NEXORA Mobile App</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Native Android & iOS apps coming in Stage 5 of roadmap. Install PWA shortcut today!
              </p>
              <button 
                onClick={() => addToast('You can add NEXORA to your Home Screen from your browser menu!', 'success')}
                className="w-full py-1.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Add to Home Screen
              </button>
            </div>

            {/* Language Switcher */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-400 block mb-1.5 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#2E7BFF]" />
                <span>Language / Asụsụ / Harshe / Èdè</span>
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#0FB57F]"
              >
                <option value="English" className="text-slate-900">English (Nigeria)</option>
                <option value="Nigerian Pidgin" className="text-slate-900">Nigerian Pidgin</option>
                <option value="Hausa" className="text-slate-900">Hausa</option>
                <option value="Yoruba" className="text-slate-900">Yorùbá</option>
                <option value="Igbo" className="text-slate-900">Asụsụ Igbo</option>
              </select>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="font-medium text-slate-300">"Everything. Connected."</span>
          </div>

          <p className="text-center md:text-right">
            Built for Nigeria's 36 States & FCT. Expanding across Africa. &copy; 2026 NEXORA Technologies Ltd.
          </p>

          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('help')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => setCurrentView('help')} className="hover:text-white transition-colors">Terms of Use</button>
            <button onClick={() => setCurrentView('help')} className="hover:text-white transition-colors">Trust & Safety</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
