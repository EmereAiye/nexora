import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { NexoraCareChat } from './components/NexoraCareChat.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { UserDashboardModal } from './components/UserDashboardModal.tsx';
import { ToastContainer } from './components/Toast.tsx';

// Views
import { HomeView } from './views/HomeView.tsx';
import { MarketView } from './views/MarketView.tsx';
import { JobsView } from './views/JobsView.tsx';
import { ServicesView } from './views/ServicesView.tsx';
import { TransportView } from './views/TransportView.tsx';
import { UtilitiesView } from './views/UtilitiesView.tsx';
import { PropertiesView } from './views/PropertiesView.tsx';
import { CommunityView } from './views/CommunityView.tsx';
import { BusinessView } from './views/BusinessView.tsx';
import { OpportunitiesView } from './views/OpportunitiesView.tsx';
import { DiscoverView } from './views/DiscoverView.tsx';
import { HelpCenterView } from './views/HelpCenterView.tsx';

const AppContent: React.FC = () => {
  const { currentView, activeDepartmentId } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'help':
        return <HelpCenterView />;
      case 'business-dashboard':
        return <BusinessView />;
      case 'department':
        switch (activeDepartmentId) {
          case 'market':
            return <MarketView />;
          case 'jobs':
            return <JobsView />;
          case 'services':
            return <ServicesView />;
          case 'transport':
            return <TransportView />;
          case 'utilities':
            return <UtilitiesView />;
          case 'properties':
            return <PropertiesView />;
          case 'community':
            return <CommunityView />;
          case 'business':
            return <BusinessView />;
          case 'opportunities':
            return <OpportunitiesView />;
          case 'discover':
            return <DiscoverView />;
          default:
            return <MarketView />;
        }
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F6FB] dark:bg-[#0A1230] text-[#0E1A3A] dark:text-[#EEF2FF] transition-colors selection:bg-[#0FB57F]/20 selection:text-[#0FB57F]">
      {/* Top sticky navigation */}
      <Header />

      {/* Main view container */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Customer Care Chat */}
      <NexoraCareChat />

      {/* Mobile Bottom Navigation (Always thumb-sized on phones) */}
      <MobileBottomNav />

      {/* Authentication & Onboarding Modal */}
      <AuthModal />

      {/* User Account & Dashboard Modal */}
      <UserDashboardModal />

      {/* Interactive Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
