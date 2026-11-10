import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DepartmentId, 
  NigerianState, 
  CommunityReport, 
  UserAccount, 
  SupportTicket 
} from '../types.ts';
import { COMMUNITY_REPORTS } from '../data/mockData.ts';

interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export interface BookingRecord {
  id: string;
  providerId: string;
  providerName: string;
  trade: string;
  date: string;
  time: string;
  address: string;
  jobDescription: string;
  status: 'Confirmed' | 'Pending Provider Response' | 'Completed';
  createdAt: string;
}

interface AppContextType {
  selectedState: NigerianState;
  setSelectedState: (state: NigerianState) => void;
  currentView: 'home' | 'department' | 'help' | 'dashboard' | 'business-dashboard';
  setCurrentView: (view: 'home' | 'department' | 'help' | 'dashboard' | 'business-dashboard') => void;
  activeDepartmentId: DepartmentId;
  setActiveDepartmentId: (id: DepartmentId) => void;
  openDepartment: (id: DepartmentId) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean | ((prev: boolean) => boolean)) => void;
  isDataSaver: boolean;
  setIsDataSaver: (saver: boolean | ((prev: boolean) => boolean)) => void;
  user: UserAccount;
  setUser: React.Dispatch<React.SetStateAction<UserAccount>>;
  savedItems: string[];
  toggleSaveItem: (id: string, itemTitle?: string) => void;
  reports: CommunityReport[];
  confirmReport: (id: string) => void;
  addCommunityReport: (report: { category: CommunityReport['category']; title: string; location: string; state: NigerianState; description: string }) => void;
  authModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'onboarding';
  openAuthModal: (mode?: 'login' | 'signup' | 'onboarding') => void;
  closeAuthModal: () => void;
  userDashboardOpen: boolean;
  openUserDashboard: () => void;
  closeUserDashboard: () => void;
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  supportTickets: SupportTicket[];
  createSupportTicket: (subject: string, message: string) => string;
  activeListingDetail: any;
  setActiveListingDetail: (item: any) => void;
  bookings: BookingRecord[];
  addBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => void;
  trackedPrices: string[];
  toggleTrackPrice: (id: string, productName?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedState, setSelectedState] = useState<NigerianState>('Abuja (FCT)');
  const [currentView, setCurrentView] = useState<'home' | 'department' | 'help' | 'dashboard' | 'business-dashboard'>('home');
  const [activeDepartmentId, setActiveDepartmentId] = useState<DepartmentId>('market');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexora_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Data saver mode
  const [isDataSaver, setIsDataSaver] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexora_datasaver') === 'true';
    }
    return false;
  });

  // User state
  const [user, setUser] = useState<UserAccount>({
    isLoggedIn: false,
    fullName: '',
    phone: '',
    email: '',
    state: 'Abuja (FCT)',
    area: 'Garki 2',
    interests: ['jobs', 'shopping', 'services'],
    savedItemIds: ['j-1', 'p-1', 's-1'],
    notificationsCount: 3
  });

  const [savedItems, setSavedItems] = useState<string[]>(['j-1', 'p-1', 's-1']);
  const [trackedPrices, setTrackedPrices] = useState<string[]>(['p-1']);
  const [reports, setReports] = useState<CommunityReport[]>(COMMUNITY_REPORTS);
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'bk-101',
      providerId: 's-1',
      providerName: 'Engr. Emeka Nwankwo',
      trade: 'Licensed Electrician & Solar Installer',
      date: 'Tomorrow, 10:00 AM',
      time: '10:00 AM',
      address: 'Plot 12, Admiralty Way, Lekki',
      jobDescription: 'Inverter tripped breaker inspection',
      status: 'Confirmed',
      createdAt: '2 hours ago'
    }
  ]);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      ticketId: 'NXR-8492',
      subject: 'Verification for Business Storefront',
      status: 'In Progress',
      createdAt: 'Yesterday, 4:15 PM',
      lastMessage: 'Agent Fatima is reviewing your CAC certificate upload.'
    }
  ]);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'onboarding'>('login');
  const [userDashboardOpen, setUserDashboardOpen] = useState(false);
  const [activeListingDetail, setActiveListingDetail] = useState<any>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Apply dark mode class to root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nexora_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nexora_theme', 'light');
    }
  }, [isDarkMode]);

  // Save data saver
  useEffect(() => {
    localStorage.setItem('nexora_datasaver', isDataSaver ? 'true' : 'false');
  }, [isDataSaver]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openDepartment = (id: DepartmentId) => {
    setActiveDepartmentId(id);
    setCurrentView('department');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (mode: 'login' | 'signup' | 'onboarding' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  const openUserDashboard = () => setUserDashboardOpen(true);
  const closeUserDashboard = () => setUserDashboardOpen(false);

  const toggleSaveItem = (id: string, itemTitle?: string) => {
    setSavedItems((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast(itemTitle ? `Removed "${itemTitle}" from saved` : 'Item removed from saved', 'info');
        return prev.filter((x) => x !== id);
      } else {
        addToast(itemTitle ? `Saved "${itemTitle}" to your account` : 'Saved item to your account', 'success');
        return [...prev, id];
      }
    });
  };

  const toggleTrackPrice = (id: string, productName?: string) => {
    setTrackedPrices((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast(productName ? `Price alerts turned OFF for ${productName}` : 'Price alerts stopped', 'info');
        return prev.filter((x) => x !== id);
      } else {
        addToast(productName ? `Price alert active for ${productName}! We will notify you of drops.` : 'Price alert activated!', 'success');
        return [...prev, id];
      }
    });
  };

  const confirmReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          if (r.hasConfirmed) {
            addToast('You already confirmed this report.', 'info');
            return r;
          }
          addToast('Thank you! Report confirmed for your community.', 'success');
          return {
            ...r,
            confirmations: r.confirmations + 1,
            hasConfirmed: true
          };
        }
        return r;
      })
    );
  };

  const addCommunityReport = (report: { category: CommunityReport['category']; title: string; location: string; state: NigerianState; description: string }) => {
    const newReport: CommunityReport = {
      id: `c-${Date.now()}`,
      category: report.category,
      title: report.title,
      location: report.location,
      state: report.state,
      timestamp: 'Just now',
      confirmations: 1,
      hasConfirmed: true,
      description: report.description,
      iconType: report.category === 'Flooding' ? 'droplet' : report.category === 'Electricity Problem' ? 'zap' : 'alert-triangle'
    };
    setReports((prev) => [newReport, ...prev]);
    addToast('Your community alert was published with timestamp!', 'success');
  };

  const addBooking = (bookingData: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: BookingRecord = {
      ...bookingData,
      id: `bk-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      status: 'Confirmed'
    };
    setBookings((prev) => [newBooking, ...prev]);
    addToast(`Booking confirmed with ${bookingData.providerName}! Ref: ${newBooking.id}`, 'success');
  };

  const createSupportTicket = (subject: string, message: string): string => {
    const ticketId = `NXR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      ticketId,
      subject,
      status: 'Open',
      createdAt: 'Just now',
      lastMessage: message
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    addToast(`Ticket created: #${ticketId}. Support will reach you shortly.`, 'success');
    return ticketId;
  };

  return (
    <AppContext.Provider
      value={{
        selectedState,
        setSelectedState,
        currentView,
        setCurrentView,
        activeDepartmentId,
        setActiveDepartmentId,
        openDepartment,
        searchQuery,
        setSearchQuery,
        isDarkMode,
        setIsDarkMode,
        isDataSaver,
        setIsDataSaver,
        user,
        setUser,
        savedItems,
        toggleSaveItem,
        reports,
        confirmReport,
        addCommunityReport,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        userDashboardOpen,
        openUserDashboard,
        closeUserDashboard,
        toasts,
        addToast,
        removeToast,
        supportTickets,
        createSupportTicket,
        activeListingDetail,
        setActiveListingDetail,
        bookings,
        addBooking,
        trackedPrices,
        toggleTrackPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
