// Global route type definitions
export type AppRoute =
  | 'home'
  | 'pricing'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'channel-analyzer'
  | 'video-analyzer'
  | 'thumbnail-lab'
  | 'seo-studio'
  | 'transcript-lab'
  | 'trending'
  | 'revenue-tools'
  | 'robots-generator'
  | 'sitemap-generator'
  | 'settings'
  | 'billing'
  | 'admin'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'contact'
  | 'forgot-password';

export interface RouteInfo {
  path: AppRoute;
  label: string;
  icon?: string;
  group?: string;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requirePlan?: string[];
}

export const ROUTES: RouteInfo[] = [
  { path: 'home', label: 'Home', icon: 'Home' },
  { path: 'pricing', label: 'Pricing', icon: 'CreditCard' },
  { path: 'login', label: 'Login', icon: 'LogIn' },
  { path: 'signup', label: 'Sign Up', icon: 'UserPlus' },

  // Dashboard
  { path: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', requireAuth: true, group: 'Analytics' },

  // Analyzers
  { path: 'channel-analyzer', label: 'Channel Analyzer', icon: 'Tv', requireAuth: true, group: 'Analytics' },
  { path: 'video-analyzer', label: 'Video Analyzer', icon: 'PlaySquare', requireAuth: true, group: 'Analytics' },

  // Tools
  { path: 'thumbnail-lab', label: 'Thumbnail Lab', icon: 'Image', requireAuth: true, requirePlan: ['pro', 'premium'], group: 'Tools' },
  { path: 'seo-studio', label: 'SEO Studio', icon: 'Search', requireAuth: true, requirePlan: ['pro', 'premium'], group: 'Tools' },
  { path: 'transcript-lab', label: 'Transcript Lab', icon: 'FileText', requireAuth: true, requirePlan: ['pro', 'premium'], group: 'Tools' },

  // Intelligence
  { path: 'trending', label: 'Trending & Viral', icon: 'TrendingUp', requireAuth: true, group: 'Intelligence' },

  // Revenue
  { path: 'revenue-tools', label: 'Revenue Tools', icon: 'DollarSign', requireAuth: true, requirePlan: ['pro', 'premium'], group: 'Monetization' },

  // Technical SEO
  { path: 'robots-generator', label: 'Robots.txt Generator', icon: 'Bot', requireAuth: true, group: 'Technical SEO' },
  { path: 'sitemap-generator', label: 'Sitemap Generator', icon: 'Map', requireAuth: true, group: 'Technical SEO' },

  // Account
  { path: 'settings', label: 'Settings', icon: 'Settings', requireAuth: true, group: 'Account' },
  { path: 'billing', label: 'Billing', icon: 'Receipt', requireAuth: true, group: 'Account' },

  // Admin
  { path: 'admin', label: 'Admin Panel', icon: 'Shield', requireAuth: true, requireAdmin: true, group: 'Admin' },

  // Static
  { path: 'privacy-policy', label: 'Privacy Policy' },
  { path: 'terms-of-service', label: 'Terms of Service' },
  { path: 'contact', label: 'Contact' },
];

export const SIDEBAR_GROUPS = [
  {
    label: 'Main',
    routes: ['dashboard'] as AppRoute[],
  },
  {
    label: 'Analytics',
    routes: ['channel-analyzer', 'video-analyzer'] as AppRoute[],
  },
  {
    label: 'Tools',
    routes: ['thumbnail-lab', 'seo-studio', 'transcript-lab'] as AppRoute[],
  },
  {
    label: 'Intelligence',
    routes: ['trending'] as AppRoute[],
  },
  {
    label: 'Monetization',
    routes: ['revenue-tools'] as AppRoute[],
  },
  {
    label: 'Technical SEO',
    routes: ['robots-generator', 'sitemap-generator'] as AppRoute[],
  },
  {
    label: 'Account',
    routes: ['settings', 'billing'] as AppRoute[],
  },
];

// Plan features configuration
export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceGHS: 0,
    searchesPerDay: 5,
    features: [
      'Limited searches per day (5)',
      'Basic video and channel statistics',
      'Limited trend tracking',
      'Limited exports',
    ],
  },
  pro: {
    name: 'Pro',
    price: 10,
    priceGHS: 109.70,
    searchesPerDay: 100,
    paystackPlanId: '2459104',
    features: [
      'Full thumbnail tools (search, resize, download)',
      'SEO studio: keyword & title suggestions',
      'Transcript extraction tools',
      'Revenue estimator',
      'Medium historical tracking',
      'Saved projects',
      'More alerts and export options',
      '100 searches per day',
    ],
  },
  premium: {
    name: 'Premium',
    price: 30,
    priceGHS: 329.10,
    searchesPerDay: 999,
    paystackPlanId: '2459105',
    features: [
      'Everything in Pro',
      'Advanced competitor tracking',
      'Bulk analysis',
      'Priority data refresh',
      'Deeper historical analytics',
      'Advanced viral video model',
      'Multi-channel comparisons',
      'API access (approved users)',
      'Unlimited searches',
    ],
  },
} as const;

export type PlanType = keyof typeof PLANS;
