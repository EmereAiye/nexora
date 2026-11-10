import { 
  DepartmentInfo, 
  NigerianState, 
  ProductItem, 
  FoodstuffPrice, 
  JobItem, 
  ServiceProvider, 
  TransportRoute, 
  TrafficUpdate, 
  UtilityReport, 
  PropertyItem, 
  CommunityReport, 
  OpportunityItem, 
  BusinessProfile 
} from '../types.ts';

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'market',
    name: 'NEXORA Market',
    tagline: 'Shop smarter. Spend better.',
    accentColor: '#0FB57F', // Emerald
    icon: '🛍️',
    description: 'Compare foodstuff and commodity prices, electronics, household goods, and connect directly with sellers.'
  },
  {
    id: 'jobs',
    name: 'NEXORA Jobs',
    tagline: 'Your next opportunity starts here.',
    accentColor: '#FFB627', // Marigold
    icon: '💼',
    description: 'Find verified employment, government openings, graduate traineeships, and remote work without middlemen.'
  },
  {
    id: 'services',
    name: 'NEXORA Services',
    tagline: 'Find trusted people to get things done.',
    accentColor: '#FF5C6C', // Coral
    icon: '🔧',
    description: 'Connect with vetted artisans, mechanics, plumbers, electricians, AC techs, and verified service providers.'
  },
  {
    id: 'transport',
    name: 'NEXORA Transport',
    tagline: 'Know your options before travelling.',
    accentColor: '#2E7BFF', // Sky Blue
    icon: '🚘',
    description: 'Compare interstate routes, reported bus fares, departure terminals, and view live highway traffic alerts.'
  },
  {
    id: 'utilities',
    name: 'NEXORA Utilities',
    tagline: "Know what's happening around you.",
    accentColor: '#FFB627', // Marigold/Coral
    icon: '⚡',
    description: 'Live community reports on electricity outages, water shortages, fuel availability, and waste pickups.'
  },
  {
    id: 'properties',
    name: 'NEXORA Properties',
    tagline: 'Find your next home.',
    accentColor: '#8A5CFF', // Violet
    icon: '🏠',
    description: 'Homes for rent and sale, commercial spaces, land, and verified agents with transparent local price comparisons.'
  },
  {
    id: 'community',
    name: 'NEXORA Community',
    tagline: 'Your community, your voice.',
    accentColor: '#0FB57F', // Emerald
    icon: '🌍',
    description: 'Crowdsourced neighbourhood alerts on bad roads, flood conditions, civil infrastructure, and safety updates.'
  },
  {
    id: 'business',
    name: 'NEXORA Business',
    tagline: 'Give your business visibility.',
    accentColor: '#26397F', // Deep Indigo
    icon: '🏢',
    description: 'A free digital storefront for Nigerian small businesses, artisans, retailers, and corporate service providers.'
  },
  {
    id: 'opportunities',
    name: 'NEXORA Opportunities',
    tagline: 'Discover ways to grow.',
    accentColor: '#FFB627', // Marigold
    icon: '🎓',
    description: 'Verified scholarships, MSME grants, tech training programs, fellowships, and zero-fee business funding.'
  },
  {
    id: 'discover',
    name: 'NEXORA Discover',
    tagline: "Discover what's available.",
    accentColor: '#2E7BFF', // Sky Blue
    icon: '✨',
    description: 'Explore trending Nigerian businesses, newly added providers, local innovations, and personalized recommendations.'
  }
];

export const NIGERIAN_STATES: NigerianState[] = [
  'Abuja (FCT)',
  'Lagos',
  'Rivers',
  'Oyo',
  'Kano',
  'Enugu',
  'Delta',
  'Kaduna',
  'Anambra',
  'Edo',
  'Ogun',
  'Akwa Ibom',
  'Plateau'
];

export const FOODSTUFF_PRICES: FoodstuffPrice[] = [
  {
    id: 'f-1',
    item: 'Foreign Parboiled Rice (50kg)',
    quantity: '50kg Bag',
    currentPrice: 88500,
    lastWeekPrice: 94000,
    trend: 'down',
    changePercent: -5.8,
    marketLocation: 'Bodija Market / Wuse Market'
  },
  {
    id: 'f-2',
    item: 'Local Rice (Abakaliki / 50kg)',
    quantity: '50kg Bag',
    currentPrice: 74000,
    lastWeekPrice: 72000,
    trend: 'up',
    changePercent: +2.7,
    marketLocation: 'Ogbete Market / Mile 12'
  },
  {
    id: 'f-3',
    item: 'White Garri (1 Paint Bucket)',
    quantity: '4L Paint Rubber',
    currentPrice: 3800,
    lastWeekPrice: 4200,
    trend: 'down',
    changePercent: -9.5,
    marketLocation: 'Mile 12 / Utako Market'
  },
  {
    id: 'f-4',
    item: 'Yellow Garri (1 Paint Bucket)',
    quantity: '4L Paint Rubber',
    currentPrice: 4400,
    lastWeekPrice: 4400,
    trend: 'stable',
    changePercent: 0,
    marketLocation: 'Oil Mill Market / Garki'
  },
  {
    id: 'f-5',
    item: 'Oloyin Honey Beans (50kg)',
    quantity: '50kg Bag',
    currentPrice: 110000,
    lastWeekPrice: 104000,
    trend: 'up',
    changePercent: +5.7,
    marketLocation: 'Dawanau Market / Oyingbo'
  },
  {
    id: 'f-6',
    item: 'Pure Palm Oil (25 Litres)',
    quantity: '25L Keg',
    currentPrice: 37500,
    lastWeekPrice: 39000,
    trend: 'down',
    changePercent: -3.8,
    marketLocation: 'Main Market Onitsha / Alaba'
  },
  {
    id: 'f-7',
    item: 'Medium Yam Tubers (Set of 5)',
    quantity: '5 Large Tubers',
    currentPrice: 16500,
    lastWeekPrice: 15000,
    trend: 'up',
    changePercent: +10.0,
    marketLocation: 'Zaki Biam / Mararaba Yam Market'
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'p-1',
    title: 'Apple iPhone 15 Pro Max (256GB, Natural Titanium)',
    category: 'electronics',
    price: 1840000,
    originalPrice: 1950000,
    sellerName: 'SwiftGadgets Computer Village',
    sellerRating: 4.9,
    sellerVerified: true,
    location: 'Ikeja, Lagos',
    state: 'Lagos',
    condition: 'Brand New',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    isSponsored: true,
    priceHistory: [
      { date: 'Oct 1', price: 1980000 },
      { date: 'Oct 15', price: 1920000 },
      { date: 'Nov 1', price: 1870000 },
      { date: 'Nov 10', price: 1840000 }
    ],
    otherSellers: [
      { seller: 'Abuja iStore Wuse 2', price: 1860000, rating: 4.8, condition: 'Brand New' },
      { seller: 'Port Harcourt TechHub', price: 1890000, rating: 4.7, condition: 'Brand New' },
      { seller: 'Alaba Direct Electronics', price: 1720000, rating: 4.5, condition: 'Fairly Used (Mint)' }
    ]
  },
  {
    id: 'p-2',
    title: '5kVA / 48V Felicity Solar Hybrid Inverter + MPPT',
    category: 'electronics',
    price: 685000,
    originalPrice: 720000,
    sellerName: 'SolarPower Green Africa',
    sellerRating: 4.8,
    sellerVerified: true,
    location: 'Garki 2, Abuja',
    state: 'Abuja (FCT)',
    condition: 'Brand New',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
    priceHistory: [
      { date: 'Oct 1', price: 740000 },
      { date: 'Oct 20', price: 710000 },
      { date: 'Nov 10', price: 685000 }
    ],
    otherSellers: [
      { seller: 'Lagos Solar Mart', price: 670000, rating: 4.9, condition: 'Brand New' },
      { seller: 'Kano Renewable Systems', price: 695000, rating: 4.6, condition: 'Brand New' }
    ]
  },
  {
    id: 'p-3',
    title: 'Dangote Cement 42.5R (Pack of 50 Bags Wholesale)',
    category: 'building',
    price: 440000,
    unit: '50 Bags',
    sellerName: 'Adewale Building Materials Ltd',
    sellerRating: 4.7,
    sellerVerified: true,
    location: 'Iwo Road, Ibadan',
    state: 'Oyo',
    condition: 'Brand New',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    priceHistory: [
      { date: 'Sep 15', price: 470000 },
      { date: 'Oct 15', price: 455000 },
      { date: 'Nov 10', price: 440000 }
    ]
  },
  {
    id: 'p-4',
    title: 'Thermocool 200L Chest Freezer (Turbo Inverter Low Voltage)',
    category: 'household',
    price: 365000,
    originalPrice: 395000,
    sellerName: 'Chukwu Electronics Onitsha & Lagos',
    sellerRating: 4.8,
    sellerVerified: true,
    location: 'Festac Town, Lagos',
    state: 'Lagos',
    condition: 'Brand New',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80',
    isSponsored: false
  },
  {
    id: 'p-5',
    title: 'Highland Pure Honey (Direct from Mambilla Plateau, 5L)',
    category: 'foodstuff',
    price: 28000,
    sellerName: 'Mambilla Natural Produce',
    sellerRating: 4.9,
    sellerVerified: true,
    location: 'Maitama, Abuja',
    state: 'Abuja (FCT)',
    condition: 'Brand New',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'p-6',
    title: 'Royal Ergonomic Office Chair with Lumbar Support',
    category: 'household',
    price: 95000,
    originalPrice: 115000,
    sellerName: 'DecoSpace Furniture Hub',
    sellerRating: 4.6,
    sellerVerified: true,
    location: 'Trans Amadi, Port Harcourt',
    state: 'Rivers',
    condition: 'Brand New',
    image: 'https://images.unsplash.com/photo-1580481077195-c3a82145d875?w=600&auto=format&fit=crop&q=80'
  }
];

export const JOBS: JobItem[] = [
  {
    id: 'j-1',
    title: 'Operations & Logistics Manager',
    employer: 'Flutterwave Merchant Logistics',
    employerVerified: true,
    location: 'Victoria Island, Lagos',
    state: 'Lagos',
    type: 'Full-time',
    salaryRange: '₦650,000 - ₦850,000 / month',
    postedDate: 'Today',
    deadline: 'Closes Nov 28',
    category: 'Supply Chain',
    isFeatured: true,
    description: 'Lead interstate distribution logistics, courier vendor management, and end-to-end customer delivery satisfaction across southwest Nigeria.',
    requirements: [
      'B.Sc in Supply Chain, Engineering, or Business Administration',
      'Minimum 4 years operations management experience in Nigeria',
      'Strong command of fleet routing software and SLA monitoring',
      'Excellent leadership and team coordination capabilities'
    ],
    howToApply: 'Apply directly through verified employer dashboard or upload CV on NEXORA.'
  },
  {
    id: 'j-2',
    title: 'Solar System Installation Engineer',
    employer: 'GreenGrid Power Nigeria',
    employerVerified: true,
    location: 'Wuse 2, Abuja',
    state: 'Abuja (FCT)',
    type: 'Full-time',
    salaryRange: '₦350,000 - ₦450,000 / month',
    postedDate: 'Yesterday',
    deadline: 'Closes Dec 5',
    category: 'Engineering',
    description: 'Designing, sizing, and deploying residential and commercial solar systems (5kVA - 50kVA) including battery management and inverter commissioning.',
    requirements: [
      'COREN or NABTEB Solar PV certification preferred',
      'Proven hands-on experience installing hybrid inverters & lithium batteries',
      'Valid driving license and willingness to conduct site inspections'
    ],
    howToApply: 'Submit resume with photos of past installations through the NEXORA portal.'
  },
  {
    id: 'j-3',
    title: 'Frontend React Developer (Remote Nigeria)',
    employer: 'Paystack Technology Partner',
    employerVerified: true,
    location: 'Remote (Anywhere in Nigeria)',
    state: 'Lagos',
    type: 'Remote',
    salaryRange: '₦800,000 - ₦1,200,000 / month',
    postedDate: '2 days ago',
    deadline: 'Closes Nov 24',
    category: 'Technology',
    isFeatured: true,
    description: 'Build fast, mobile-friendly payment checkouts and merchant interfaces using React 19, TypeScript, and modern CSS.',
    requirements: [
      'Proficiency in React, TypeScript, and modern CSS/Tailwind',
      'Experience with web performance optimization for low-bandwidth Nigerian connections',
      'Portfolio of live production applications'
    ],
    howToApply: 'Direct application link to tech screening.'
  },
  {
    id: 'j-4',
    title: 'Federal Civil Service - Graduate Administrative Officer',
    employer: 'Federal Ministry of Innovation, Science & Tech',
    employerVerified: true,
    location: 'Central Business District, Abuja',
    state: 'Abuja (FCT)',
    type: 'Government',
    salaryRange: 'CONPSS Grade 08 (Federal Standard)',
    postedDate: '3 days ago',
    deadline: 'Closes Dec 1',
    category: 'Public Sector',
    description: 'Official recruitment into the civil service cadre. Free public opening—no intermediary or recruitment fee is ever requested.',
    requirements: [
      'First degree (minimum Second Class Lower) in Arts, Social Sciences, or Sciences',
      'NYSC Discharge or Exemption Certificate',
      'Maximum 30 years of age at application time'
    ],
    howToApply: 'Direct link to official federal portal. Free application.'
  },
  {
    id: 'j-5',
    title: 'Graduate Trainee - Commercial Banking',
    employer: 'Access Corporation PLC',
    employerVerified: true,
    location: 'Port Harcourt / Ibadan / Kano',
    state: 'Rivers',
    type: 'Graduate Trainee',
    salaryRange: '₦220,000 / month + HMO & Allowances',
    postedDate: '4 days ago',
    deadline: 'Closes Dec 10',
    category: 'Banking',
    description: 'Comprehensive 6-month classroom and branch rotation training program leading to permanent relationship manager roles.',
    requirements: [
      'Graduate from an accredited university (minimum 2:1)',
      'Completed NYSC',
      'Strong numerical and communication acumen'
    ],
    howToApply: 'Apply via verified career page.'
  }
];

export const PROVIDERS: ServiceProvider[] = [
  {
    id: 's-1',
    name: 'Engr. Emeka Nwankwo',
    trade: 'Licensed Electrician & Solar Installer',
    area: 'Lekki Phase 1, Victoria Island & Ikoyi',
    state: 'Lagos',
    rating: 4.9,
    reviewCount: 84,
    verified: true,
    phone: '+234 803 234 9811',
    estimatedPrice: '₦10,000 - ₦45,000 per job',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    about: 'Over 11 years experience in conduit house wiring, solar inverter installation, 3-phase balancing, and troubleshooting tripped circuit breakers.',
    skills: ['Conduit Wiring', 'Inverter Setup', 'Breaker Diagnostics', 'Surge Protectors'],
    pastWorkImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558441719-8b489c652790?w=400&auto=format&fit=crop&q=80'
    ],
    availability: 'Available Today',
    isSponsored: true
  },
  {
    id: 's-2',
    name: 'Malam Ibrahim Danjuma',
    trade: 'Master Plumber & Borehole Specialist',
    area: 'Wuse, Garki & Maitama',
    state: 'Abuja (FCT)',
    rating: 4.8,
    reviewCount: 62,
    verified: true,
    phone: '+234 802 765 1190',
    estimatedPrice: '₦8,000 - ₦30,000 per callout',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    about: 'Expert plumber specializing in underground PVC pipes, water treatment plants, overhead tank installations, and bathroom sanitary fixtures.',
    skills: ['Borehole Pumps', 'Overhead Tanks', 'Leak Detection', 'PPR Pipe Fusion'],
    pastWorkImages: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&auto=format&fit=crop&q=80'
    ],
    availability: 'Available Today'
  },
  {
    id: 's-3',
    name: 'Sunday "AutoClinic" Adebayo',
    trade: 'Automobile Mechanic & Scanner Diagnostic',
    area: 'Bodija / Ring Road',
    state: 'Oyo',
    rating: 4.9,
    reviewCount: 51,
    verified: true,
    phone: '+234 814 555 7820',
    estimatedPrice: '₦12,000 - ₦60,000',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    about: 'Certified Toyota, Honda, and Mercedes mechanic with computerized OBD2 diagnostics, engine overhaul, suspension maintenance, and brake overhaul.',
    skills: ['OBD2 Diagnostics', 'Brake Systems', 'Engine Tuning', 'Suspension'],
    pastWorkImages: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80'
    ],
    availability: 'Next Day'
  },
  {
    id: 's-4',
    name: 'Austin Kalu Cleaners',
    trade: 'Deep Home & Office Cleaning Services',
    area: 'GRA Phase 2, Trans Amadi',
    state: 'Rivers',
    rating: 4.7,
    reviewCount: 40,
    verified: true,
    phone: '+234 818 902 4431',
    estimatedPrice: '₦25,000 - ₦80,000',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    about: 'Professional post-construction fumigation, carpet steam wash, tile scrubbing, and move-in deep sanitization teams.',
    skills: ['Post Construction', 'Upholstery Washing', 'Fumigation', 'Floor Buffing'],
    pastWorkImages: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop&q=80'
    ],
    availability: 'Available Today'
  }
];

export const TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: 'tr-1',
    company: 'GIGM (God is Good Motors)',
    from: 'Abuja (Utako Terminal)',
    to: 'Lagos (Jibowu / Ajah)',
    departurePark: 'Utako Ultra Modern Terminal, Abuja',
    fare: 28500,
    fareStatus: 'Reported',
    duration: '10 - 12 hours',
    departureTimes: ['06:30 AM', '07:30 AM', '09:00 AM'],
    busType: 'Executive Jet Bus (AC & USB Charging)',
    verified: true,
    phone: '+234 813 985 1110'
  },
  {
    id: 'tr-2',
    company: 'ABC Transport PLC',
    from: 'Abuja (Gwagwalada / Utako)',
    to: 'Lagos (Jibowu)',
    departurePark: 'Plot 39 Utako District, Abuja',
    fare: 29000,
    fareStatus: 'Official',
    duration: '11 hours',
    departureTimes: ['07:00 AM', '07:00 PM (Sleeper)'],
    busType: 'Coach Cruiser (Wifi, Reclining Seats)',
    verified: true,
    phone: '+234 803 404 0404'
  },
  {
    id: 'tr-3',
    company: 'Peace Mass Transit (PMT)',
    from: 'Lagos (Ojuelegba / Mazamaza)',
    to: 'Enugu (Okpara Avenue)',
    departurePark: 'Ojuelegba Terminal, Lagos',
    fare: 18500,
    fareStatus: 'Reported',
    duration: '8 - 9 hours',
    departureTimes: ['06:00 AM', '07:00 AM', '08:30 AM'],
    busType: 'Hiace High Roof Minibus',
    verified: true,
    phone: '+234 805 555 2200'
  },
  {
    id: 'tr-4',
    company: 'GUO Transport',
    from: 'Lagos (Cele / Iponri)',
    to: 'Port Harcourt (Waterlines)',
    departurePark: 'Iponri Terminal, Surulere',
    fare: 24000,
    fareStatus: 'Reported',
    duration: '9 hours',
    departureTimes: ['06:30 AM', '08:00 AM'],
    busType: 'Luxury Sprinter',
    verified: true,
    phone: '+234 807 500 0111'
  }
];

export const TRAFFIC_UPDATES: TrafficUpdate[] = [
  {
    id: 'tf-1',
    route: 'Lagos-Ibadan Expressway (Long Bridge to Berger)',
    state: 'Lagos',
    condition: 'Heavy Gridlock',
    reportedBy: 'Kazeem O.',
    timestamp: '14 minutes ago',
    notes: 'Broken down heavy trailer blocking middle lane inward Lagos at Kara bridge. FRSC on scene.',
    confirmations: 24
  },
  {
    id: 'tf-2',
    route: 'Abuja - Keffi Road (Nyanya / Mararaba Bridge)',
    state: 'Abuja (FCT)',
    condition: 'Moderate',
    reportedBy: 'Chinyere U.',
    timestamp: '32 minutes ago',
    notes: 'Slow movement outward Abuja due to peak evening commuter rush, but moving steadily.',
    confirmations: 17
  },
  {
    id: 'tf-3',
    route: 'Port Harcourt - Aba Expressway (Eleme Junction)',
    state: 'Rivers',
    condition: 'Road Repair',
    reportedBy: 'Tamuno B.',
    timestamp: '1 hour ago',
    notes: 'Ongoing asphalt resurfacing work. Diversion through internal estate roads advised.',
    confirmations: 31
  }
];

export const UTILITY_REPORTS: UtilityReport[] = [
  {
    id: 'u-1',
    type: 'electricity',
    title: '33kV Feeder Tripped - Outage in Gwarinpa 1st to 3rd Avenue',
    location: 'Gwarinpa Estate, Abuja',
    state: 'Abuja (FCT)',
    status: 'Outage',
    details: 'AEDC reports a technical fault along the Kubwa expressway feeder. Estimated restoration 3:00 PM.',
    reportedAgo: '18 minutes ago',
    confirmations: 43
  },
  {
    id: 'u-2',
    type: 'fuel',
    title: 'Fuel Pump Price Update: NNPC Retail Station',
    location: 'Airport Road / Lugbe, Abuja',
    state: 'Abuja (FCT)',
    status: 'Available',
    details: 'Petrol dispensing actively across 8 pumps at regulated price. Moving queue, wait time approx 15 mins.',
    reportedAgo: '25 minutes ago',
    confirmations: 62,
    fuelPrice: 980,
    fillingStation: 'NNPC Mega Station'
  },
  {
    id: 'u-3',
    type: 'water',
    title: 'Public Water Board Main Pipeline Maintenance',
    location: 'Surulere & Yaba, Lagos',
    state: 'Lagos',
    status: 'Shortage',
    details: 'Lagos State Water Corporation pipeline valve replacement. Community verified tanker suppliers on standby.',
    reportedAgo: '42 minutes ago',
    confirmations: 29,
    waterSupplierPhone: '+234 802 333 8910'
  },
  {
    id: 'u-4',
    type: 'electricity',
    title: 'Power Restored to Magodo Phase 2 & Shangisha',
    location: 'Magodo Phase 2, Lagos',
    state: 'Lagos',
    status: 'Restored',
    details: 'IKEDC transformer repair complete. Voltage steady at 220V.',
    reportedAgo: '1 hour ago',
    confirmations: 88
  },
  {
    id: 'u-5',
    type: 'waste',
    title: 'LAWMA Compactor Truck Morning Collection Route',
    location: 'Bodija Market Area, Ibadan',
    state: 'Oyo',
    status: 'Pending Collection',
    details: 'Commercial waste collection scheduled between 9:00 AM and 1:00 PM today.',
    reportedAgo: '2 hours ago',
    confirmations: 12
  }
];

export const PROPERTIES: PropertyItem[] = [
  {
    id: 'pr-1',
    title: 'Modern 3-Bedroom Apartment with Inverter Pre-wiring & Borehole',
    type: 'Rent',
    bedrooms: 3,
    bathrooms: 3,
    price: 3200000,
    period: 'per year',
    averageAreaRent: 3500000,
    location: 'Mabushi / Jabi Border, Abuja',
    state: 'Abuja (FCT)',
    agentName: 'Aura Real Estate Advisory',
    agentVerified: true,
    agentPhone: '+234 809 111 4455',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
    description: 'Spacious serviced apartment in a secure gated compound. Constant water supply, dedicated parking for 2 cars, and prepaid meter.',
    features: ['24/7 Security', 'Borehole Water', 'Prepaid Meter', 'POP Ceiling', 'Fitted Kitchen']
  },
  {
    id: 'pr-2',
    title: 'Executive 2-Bedroom Flat in Gated Estate',
    type: 'Rent',
    bedrooms: 2,
    bathrooms: 2,
    price: 4500000,
    period: 'per year',
    averageAreaRent: 4800000,
    location: 'Lekki Phase 1 (Right Hand Side), Lagos',
    state: 'Lagos',
    agentName: 'Lekki Prime Properties',
    agentVerified: true,
    agentPhone: '+234 812 345 6789',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
    description: 'Newly finished flat with clean running water, swimming pool access, flood-free elevated road, and dedicated security guards.',
    features: ['Swimming Pool', 'Flood-Free Zone', 'En-suite Rooms', 'Intercom']
  },
  {
    id: 'pr-3',
    title: 'Dry Commercial Land Facing Express (Plot Size 900sqm, C of O)',
    type: 'Sale',
    price: 45000000,
    period: 'total',
    location: 'Peter Odili Road, Trans Amadi',
    state: 'Rivers',
    agentName: 'Delta Heritage Realty',
    agentVerified: true,
    agentPhone: '+234 803 777 9922',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
    description: '100% dry land with Certificate of Occupancy (C of O) registered in Rivers State ministry. Perfect for warehouse, clinic, or plaza.',
    features: ['C of O Title', 'Direct Road Access', 'Perimeter Fenced']
  }
];

export const COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'c-1',
    category: 'Flooding',
    title: 'Heavy waterlogging after rainfall at Lekki-Epe Toll Gate bypass',
    location: 'Lekki Phase 1 / Expressway, Lagos',
    state: 'Lagos',
    timestamp: '22 minutes ago',
    confirmations: 47,
    description: 'Deep rainwater accumulation on the outer service lane. Low-clearance salon cars advised to take inner expressway lane.',
    iconType: 'droplet'
  },
  {
    id: 'c-2',
    category: 'Electricity Problem',
    title: 'Blown transformer fuse on 4th Avenue near Market Square',
    location: 'Gwarinpa Estate, Abuja',
    state: 'Abuja (FCT)',
    timestamp: '45 minutes ago',
    confirmations: 38,
    description: 'Loud bang heard around 9:15 AM. AEDC response crew has been notified and ticket #AEDC-9012 is active.',
    iconType: 'zap'
  },
  {
    id: 'c-3',
    category: 'Bad Road',
    title: 'Deep pothole crater opened on Ring Road opposite Shoprite',
    location: 'Ring Road, Ibadan',
    state: 'Oyo',
    timestamp: '2 hours ago',
    confirmations: 63,
    description: 'Pothole damage causing severe traffic slowing and tire puncture risk in the dark. Community has marked with caution drums.',
    iconType: 'alert-triangle'
  }
];

export const OPPORTUNITIES: OpportunityItem[] = [
  {
    id: 'op-1',
    title: 'Tony Elumelu Foundation $5,000 Entrepreneurship Grant 2026',
    provider: 'Tony Elumelu Foundation (TEF)',
    type: 'Grant',
    deadline: 'Closes in 12 days',
    daysLeft: 12,
    verifiedSource: true,
    country: 'Nigeria & Africa',
    fundingAmount: '$5,000 Non-Refundable Seed Capital',
    eligibility: [
      'Nigerian citizens aged 18 and above',
      'Early-stage startup (0-3 years in operation) or viable business idea',
      'Commitment to 12-week online business management training'
    ],
    howToApply: 'Register directly on the verified TEFConnect portal through NEXORA.'
  },
  {
    id: 'op-2',
    title: 'Federal 3MTT (Three Million Technical Talent) Fellowship Cohort 4',
    provider: 'Federal Ministry of Communications, Innovation & Digital Economy',
    type: 'Fellowship',
    deadline: 'Closes in 18 days',
    daysLeft: 18,
    verifiedSource: true,
    country: 'All 36 States & FCT',
    fundingAmount: '100% Free Tuition + Laptop Grant',
    eligibility: [
      'Nigerian youth looking to specialize in AI/ML, Cloud Computing, UI/UX, or Software Eng.',
      'Availability for in-person community lab sessions in your local government',
      'No prior programming background strictly required'
    ],
    howToApply: 'Free official registration via verified NITDA/3MTT portal link.'
  },
  {
    id: 'op-3',
    title: 'Shell SPDC JV University Undergraduate Scholarship Scheme',
    provider: 'Shell Petroleum Development Company',
    type: 'Scholarship',
    deadline: 'Closes in 24 days',
    daysLeft: 24,
    verifiedSource: true,
    country: 'Nigeria',
    fundingAmount: '₦300,000 / year until graduation',
    eligibility: [
      'Registered full-time Nigerian 100-level university student in an accredited institution',
      'Minimum of 5 distinctions in SSCE / WASSCE including Maths and English',
      'JAMB score of 200 and above'
    ],
    howToApply: 'Submit university admission letter and verified ID.'
  }
];

export const DEMO_BUSINESS: BusinessProfile = {
  id: 'biz-1',
  name: 'PrimeWeld Metal & Aluminum Fabrication Works',
  tagline: 'Precision security gates, modern burglary proof, and industrial canopies.',
  description: 'With 14 years serving Abuja homeowners and construction engineers, PrimeWeld designs and installs architectural laser-cut gates, stainless steel handrails, and durable carports with lifetime structural warranty.',
  category: 'Welding & Metal Construction',
  state: 'Abuja (FCT)',
  address: 'Plot 14 Industrial Layout, Idu / Garki, Abuja',
  phone: '+234 802 888 3311',
  email: 'sales@primeweld.ng',
  whatsapp: '+2348028883311',
  openingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
  verified: true,
  rating: 4.9,
  reviewsCount: 38,
  coverImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1000&auto=format&fit=crop&q=80',
  logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80',
  products: [
    {
      id: 'bp-1',
      name: 'Custom CNC Laser-Cut Heavy Security Gate',
      price: 680000,
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=400&auto=format&fit=crop&q=80',
      description: 'Galvanized 3mm anti-rust steel plate with automated motor pre-fittings.'
    },
    {
      id: 'bp-2',
      name: 'Double Carport Canopy with Polycarbonate Sheet',
      price: 320000,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
      description: 'UV-resistant roof sheet covering 2 standard SUV parking bays.'
    }
  ],
  offers: [
    {
      id: 'bo-1',
      title: 'Free On-Site Measurement & 10% Discount on Residential Gates',
      discount: '10% OFF',
      validUntil: 'Nov 30, 2026'
    }
  ],
  reviews: [
    {
      id: 'br-1',
      user: 'Architect Babatunde Adeleke',
      rating: 5,
      comment: 'Top quality welding. Delivered on time for our duplex project in Guzape without any price changes.',
      date: '3 weeks ago',
      reply: 'Thank you Arch. Adeleke! We look forward to your next commercial site.'
    },
    {
      id: 'br-2',
      user: 'Hajiya Fatima Bello',
      rating: 5,
      comment: 'Very professional. The gate finish is so neat and clean.',
      date: '1 month ago'
    }
  ],
  stats: {
    views: 3420,
    clicks: 890,
    enquiries: 142
  }
};
