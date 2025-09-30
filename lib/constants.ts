import {
  ChartLine,
  CircleDollarSign,
  CircleUserRound,
  CreditCard,
  GalleryVerticalEnd,
  Home,
  Inbox,
  LucideIcon,
  Mails,
  Settings
} from 'lucide-react';

export const authenticatedPaths = [
  '/home',
  '/notifications',
  '/assets',
  '/channels',
  '/analytics',
  '/profiles',
  '/subscriptions',
  '/subscriptions/plan',
  '/cards',
  '/more',
  '/vaults'
];

export enum FetchMethods {
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
  GET = 'GET'
}

export interface JwtUser {
  sub: string; // holds userId
  jti: string; // JWT ID
  iat: number; // issued at
  exp: number; // expiration time
  version: string;
  type: TokenType;
  roles: UserRoles[];
  ip: string;
  userAgent: string;
  associated_access_token_jti: string;
}

export const authCookieKey = '_accessToken';
export const authRefreshCookieKey = '_refreshToken';

export interface HeaderProps {
  variant?: 'outline' | 'default';
  title?: string;
  icon?: LucideIcon;
  onClick?: () => unknown;
  path?: string;
}

export enum ProfileCharts {
  NEW_CUSTOMERS = 'NEW_CUSTOMERS',
  TOTAL_REVENUE = 'TOTAL_REVENUE',
  GROWTH_RATE = 'GROWTH_RATE',
  PERFORMANCES = 'PERFORMANCES'
}

export enum ShadCnBackgrounds {
  WAVY = 'WAVY',
  FLICKERING = 'FLICKERING',
  RETRO = 'RETRO',
  WARP = 'WARP',
  BOX = 'BOX',
  FIBER_WAVES = 'FIVER',
  VORTEX = 'VORTEX',
  SQUARES_BACKGROUND = 'SQUARES',
  GALAXY = 'GALAXY',
  METEOR = 'METEOR'
}

export enum BgColor {
  BLACK = '#000',
  WHITE = '#fff'
}

export const tailwindBgColors = [
  'bg-slate-500',
  'bg-gray-500',
  'bg-zinc-500',
  'bg-neutral-500',
  'bg-stone-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500'
];

export const appBottomNavButtonOptions = [
  { icon: Home, title: 'Vaults', path: '/vaults' },
  { icon: Mails, title: 'Channels', path: '/channels' },
  { icon: ChartLine, title: 'Analytics', path: '/analytics' },
  { icon: GalleryVerticalEnd, title: 'Assets', path: '/assets' },
  { icon: CircleDollarSign, title: 'Subscriptions', path: '/subscriptions' },
  { icon: CircleUserRound, title: 'Profiles', path: '/profiles' }
];

export const appSideBarButtonOptions = [
  { icon: Home, title: 'Vaults', path: '/vaults' },
  { icon: Inbox, title: 'Notifications', path: '/notifications' },
  { icon: Mails, title: 'Messages', path: '/channels' },
  { icon: GalleryVerticalEnd, title: 'Assets', path: '/assets' },
  { icon: CircleDollarSign, title: 'Subscriptions', path: '/subscriptions' },
  { icon: CreditCard, title: ' Add card', path: '/cards' },
  { icon: CircleUserRound, title: 'Profiles', path: `/profiles` },
  { icon: Settings, title: 'More', path: '/more' },
  { icon: ChartLine, title: 'Analytics', path: '/analytics' }
];

export const THEME = '_theme';

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset',
  EMAIL_LOGIN = 'email_login'
}

export enum UserRoles {
  FAN = 'fan',
  ADMIN = 'admin',
  SUPER_VIEWER = 'super_viewer',
  CREATOR = 'creator'
}

export enum AppSizes {
  ICON_1024 = '1024',
  ICON_512 = '512',
  ICON_384 = '384',
  ICON_256 = '256',
  ICON_196 = '196',
  ICON_144 = '144',
  ICON_96 = '96',
  ICON_72 = '72',
  ICON_48 = '48',
  ICON_36 = '36'
}

export enum AuthPaths {
  SIGNUP = '/auth/signup',
  LOGIN = '/auth/login',
  CREATOR_SIGNUP = '/auth/creator-signup',
  FORGOT_PASSWORD = '/auth/forgot-password',
  GOOGLE_LOGIN = '/auth/google',
  APPLE_LOGIN = '/auth/apple',
  META_LOGIN = '/auth/meta'
}

export enum ShadCnChartTypes {
  BAR_CHART = 'BAR_CHART',
  LINE_CHART = 'LINE_CHART',
  RADAR_CHART = 'RADAR_CHART',
  AREA_CHART = 'AREA_CHART'
}

export enum FileType {
  VIDEO = 'video',
  IMAGE = 'image',
  AUDIO = 'audio',
  DOCUMENT = 'document'
}

export enum HostNames {
  COOMER = 'coomer.st',
  WALLHAVEN = 'wallhaven.cc',
  OK = 'ok.xxx'
}
export const OK_URI = 'https://ok.xxx/albums';

export enum DocumentQualityType {
  HIGH_DEFINITION = 'highDefinition',
  LOW_DEFINITION = 'lowDefinition',
  DEFAULT_DEFINITION = 'defaultDefinition'
}

export enum MediaType {
  PROFILE_MEDIA = 'profileMedia',
  MESSAGE_MEDIA = 'messageMedia',
  POST_MEDIA = 'postMedia'
}

export enum ImageType {
  BLURRED = 'blurred',
  ORIGINAL = 'original',
  RESIZED = 'resized'
}

export interface UploadMediaInput {
  mediaType: MediaType;
}

export interface NewCustomerType {
  chartData: {
    month: string;
    desktop: number;
    mobile: number;
  }[];
  type: ProfileCharts.NEW_CUSTOMERS;
  title: string;
  description: string;
  XDataKey: string;
  YDataKey: string;
}

export interface TotalRevenueType {
  type: ProfileCharts.TOTAL_REVENUE;
  title: string;
  description: string;
  XDataKey: string;
  YDataKey: string;
  chartData: {
    month: string;
    revenue: number;
  }[];
}

export interface GrowthRateType {
  type: ProfileCharts.GROWTH_RATE;
  title: string;
  description: string;
  XDataKey: string;
  YDataKey: string;
  chartData: {
    month: string;
    rate: number;
  }[];
}

export interface PerformanceType {
  type: ProfileCharts.PERFORMANCES;
  title: string;
  description: string;
  XDataKey: string;
  YDataKey: string;
  chartData: {
    metric: string;
    value: number;
  }[];
}

export enum EventTypes {
  VaultDownload = 'vault_download',
  ImportObject = 'import_object',
  VaultDownloadCompleted = 'vault_download_completed',
  ImportCompleted = 'import_completed'
}

export const newCustomersData: NewCustomerType = {
  chartData: [
    { month: 'January', desktop: 120, mobile: 80 },
    { month: 'February', desktop: 160, mobile: 95 },
    { month: 'March', desktop: 190, mobile: 130 },
    { month: 'April', desktop: 220, mobile: 150 },
    { month: 'May', desktop: 260, mobile: 170 },
    { month: 'June', desktop: 300, mobile: 200 }
  ],
  description: 'Acquisition needs attention',
  title: 'New Customers',
  XDataKey: 'month',
  type: ProfileCharts.NEW_CUSTOMERS,
  YDataKey: 'desktop'
};

export const totalRevenueData: TotalRevenueType = {
  chartData: [
    { month: 'January', revenue: 12.5 },
    { month: 'February', revenue: 15.3 },
    { month: 'March', revenue: 18.7 },
    { month: 'April', revenue: 22.1 },
    { month: 'May', revenue: 25.9 },
    { month: 'June', revenue: 29.4 }
  ],
  title: 'Total revenue',
  description: 'Visitors for the last 6 months',
  type: ProfileCharts.TOTAL_REVENUE,
  XDataKey: 'month',
  YDataKey: 'revenue'
};

export const growthRateData: GrowthRateType = {
  chartData: [
    { month: 'January', rate: 5.2 },
    { month: 'February', rate: 6.8 },
    { month: 'March', rate: 7.5 },
    { month: 'April', rate: 8.9 },
    { month: 'May', rate: 9.4 },
    { month: 'June', rate: 10.1 }
  ],
  description: 'Meets growth projections',
  title: 'Growth rate',
  type: ProfileCharts.GROWTH_RATE,
  XDataKey: 'month',
  YDataKey: 'rate'
};
export const performancesData: PerformanceType = {
  chartData: [
    { metric: 'Response Time', value: 85 },
    { metric: 'Customer Satisfaction', value: 92 },
    { metric: 'Retention Rate', value: 78 },
    { metric: 'Conversion Rate', value: 65 }
  ],
  description: 'Meets growth projections',
  title: 'Growth rate',
  type: ProfileCharts.PERFORMANCES,
  XDataKey: 'metric',
  YDataKey: 'value'
};
