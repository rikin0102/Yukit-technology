export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  phone?: string;
  company?: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}

export interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ServiceFeature {
  id?: number;
  title: string;
  description?: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_content: string;
  icon_identifier: string;
  order: number;
  is_active: boolean;
  features: ServiceFeature[];
  created_at: string;
}

export interface MediaFile {
  id: number;
  file: string;
  thumbnail: string | null;
  file_url: string;
  thumbnail_url: string;
  file_name: string;
  file_size: number;
  formatted_size: string;
  mime_type: string;
  created_at: string;
}

export interface ProjectImage {
  id: number;
  media_file_id?: number;
  media_file_details: MediaFile;
  order: number;
  is_featured: boolean;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  client: string | null;
  industry: string | null;
  services_details: Service[];
  services_ids?: number[];
  live_url: string | null;
  github_url: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  images: ProjectImage[];
  featured_image: MediaFile | null;
  created_at: string;
  updated_at: string;
}

export interface PricingTier {
  id: number;
  name: string;
  slug: string;
  cost: string;
  billing_cycle: string;
  short_description: string;
  features: string[];
  is_featured: boolean;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
  created_at: string;
  updated_at: string;
}

export interface PricingInquiry {
  id: number;
  pricing_tier_id?: number;
  pricing_tier_details?: PricingTier;
  name: string;
  email: string;
  company?: string;
  estimated_budget?: string;
  requirements: string;
  custom_configuration: Record<string, any>;
  created_at: string;
}

export interface Setting {
  id: number;
  key: string;
  value: string;
  description: string;
  group: 'GENERAL' | 'SEO' | 'CONTACT' | 'SOCIAL';
  updated_at: string;
}

export interface DashboardSummary {
  counts: {
    projects: number;
    services: number;
    media: number;
    contact_inquiries: {
      total: number;
      new: number;
    };
    pricing_inquiries: {
      total: number;
    };
  };
  traffic: {
    pageviews_30d: number;
    unique_visitors_30d: number;
  };
  status_breakout: Record<string, number>;
}

export interface DashboardData {
  summary: DashboardSummary;
  inquiry_trends: { month: string; contact: number; pricing: number }[];
  traffic_trends_30d: { date: string; views: number }[];
  activity_logs: {
    id: number;
    event_type: string;
    event_type_display: string;
    path: string | null;
    details: Record<string, any>;
    created_at: string;
    user_agent_short: string | null;
  }[];
}
