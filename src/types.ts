export type DepartmentId = 
  | 'market' 
  | 'jobs' 
  | 'services' 
  | 'transport' 
  | 'utilities' 
  | 'properties' 
  | 'community' 
  | 'business' 
  | 'opportunities' 
  | 'discover';

export interface DepartmentInfo {
  id: DepartmentId;
  name: string;
  tagline: string;
  accentColor: string; // hex
  icon: string;
  description: string;
  comingSoon?: boolean;
}

export type NigerianState = 
  | 'Abuja (FCT)'
  | 'Lagos'
  | 'Rivers'
  | 'Oyo'
  | 'Kano'
  | 'Enugu'
  | 'Delta'
  | 'Kaduna'
  | 'Anambra'
  | 'Edo'
  | 'Ogun'
  | 'Akwa Ibom'
  | 'Plateau';

export interface ProductItem {
  id: string;
  title: string;
  category: 'foodstuff' | 'electronics' | 'household' | 'building';
  price: number;
  originalPrice?: number;
  unit?: string;
  sellerName: string;
  sellerRating: number;
  sellerVerified: boolean;
  location: string;
  state: NigerianState;
  condition: 'Brand New' | 'Fairly Used' | 'Refurbished';
  image: string;
  isSponsored?: boolean;
  priceHistory?: { date: string; price: number }[];
  otherSellers?: { seller: string; price: number; rating: number; condition: string }[];
}

export interface FoodstuffPrice {
  id: string;
  item: string;
  quantity: string;
  currentPrice: number;
  lastWeekPrice: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  marketLocation: string;
}

export interface JobItem {
  id: string;
  title: string;
  employer: string;
  employerVerified: boolean;
  location: string;
  state: NigerianState;
  type: 'Full-time' | 'Remote' | 'Part-time' | 'Government' | 'Graduate Trainee' | 'Internship';
  salaryRange: string;
  postedDate: string;
  deadline?: string;
  description: string;
  requirements: string[];
  howToApply: string;
  category: string;
  isFeatured?: boolean;
}

export interface ServiceProvider {
  id: string;
  name: string;
  trade: string;
  area: string;
  state: NigerianState;
  rating: number;
  reviewCount: number;
  verified: boolean;
  phone: string;
  estimatedPrice: string;
  avatar: string;
  about: string;
  skills: string[];
  pastWorkImages: string[];
  availability: 'Available Today' | 'Next Day' | 'Busy';
  isSponsored?: boolean;
}

export interface TransportRoute {
  id: string;
  company: string;
  companyLogo?: string;
  from: string;
  to: string;
  departurePark: string;
  fare: number;
  fareStatus: 'Reported' | 'Official';
  duration: string;
  departureTimes: string[];
  busType: string;
  verified: boolean;
  phone: string;
}

export interface TrafficUpdate {
  id: string;
  route: string;
  state: NigerianState;
  condition: 'Clear' | 'Moderate' | 'Heavy Gridlock' | 'Road Repair';
  reportedBy: string;
  timestamp: string;
  notes: string;
  confirmations: number;
}

export interface UtilityReport {
  id: string;
  type: 'electricity' | 'water' | 'fuel' | 'waste';
  title: string;
  location: string;
  state: NigerianState;
  status: 'Outage' | 'Restored' | 'Shortage' | 'Available' | 'Pending Collection';
  details: string;
  reportedAgo: string;
  confirmations: number;
  fuelPrice?: number;
  fillingStation?: string;
  waterSupplierPhone?: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  type: 'Rent' | 'Sale' | 'Shortlet' | 'Land';
  bedrooms?: number;
  bathrooms?: number;
  price: number;
  period?: 'per year' | 'total' | 'per night';
  averageAreaRent?: number;
  location: string;
  state: NigerianState;
  agentName: string;
  agentVerified: boolean;
  agentPhone: string;
  image: string;
  description: string;
  features: string[];
}

export interface CommunityReport {
  id: string;
  category: 'Bad Road' | 'Flooding' | 'Electricity Problem' | 'Water Shortage' | 'Public Infrastructure' | 'Waste Dumping';
  title: string;
  location: string;
  state: NigerianState;
  timestamp: string;
  confirmations: number;
  hasConfirmed?: boolean;
  resolved?: boolean;
  description: string;
  iconType: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  provider: string;
  type: 'Scholarship' | 'Grant' | 'Fellowship' | 'Training' | 'SME Funding';
  deadline: string;
  daysLeft: number;
  verifiedSource: boolean;
  country: string;
  fundingAmount?: string;
  eligibility: string[];
  howToApply: string;
  url?: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  state: NigerianState;
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  openingHours: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  logo: string;
  products: { id: string; name: string; price: number; image: string; description: string }[];
  offers: { id: string; title: string; discount: string; validUntil: string }[];
  reviews: { id: string; user: string; rating: number; comment: string; date: string; reply?: string }[];
  stats: { views: number; clicks: number; enquiries: number };
}

export interface UserAccount {
  isLoggedIn: boolean;
  fullName: string;
  phone: string;
  email: string;
  state: NigerianState;
  area: string;
  interests: string[];
  cvFileName?: string;
  savedItemIds: string[];
  notificationsCount: number;
}

export interface SupportTicket {
  ticketId: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  lastMessage: string;
}
