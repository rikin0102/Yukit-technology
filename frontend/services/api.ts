import api from '@/lib/axios';
import { 
  Project, Service, PricingTier, Inquiry, 
  PricingInquiry, Setting, DashboardData, MediaFile 
} from '@/types';

// Projects Service
export const projectService = {
  list: async (params?: { service?: string }): Promise<Project[]> => {
    const response = await api.get('/api/projects/', { params });
    // DRF returns paginated results under 'results' if page parameter is parsed, 
    // or simple array if paginator is bypassed or not invoked. Let's accommodate both!
    return response.data.results !== undefined ? response.data.results : response.data;
  },
  
  get: async (slug: string): Promise<Project> => {
    const response = await api.get(`/api/projects/${slug}/`);
    return response.data;
  },

  create: async (data: any): Promise<Project> => {
    const response = await api.post('/api/projects/', data);
    return response.data;
  },

  update: async (slug: string, data: any): Promise<Project> => {
    const response = await api.put(`/api/projects/${slug}/`, data);
    return response.data;
  },

  delete: async (slug: string): Promise<void> => {
    await api.delete(`/api/projects/${slug}/`);
  }
};

// Services Service
export const serviceService = {
  list: (): Promise<Service[]> => 
    api.get('/api/services/').then(res => res.data.results !== undefined ? res.data.results : res.data),

  get: (slug: string): Promise<Service> => 
    api.get(`/api/services/${slug}/`).then(res => res.data),

  create: (data: any): Promise<Service> => 
    api.post('/api/services/', data).then(res => res.data),

  update: (slug: string, data: any): Promise<Service> => 
    api.put(`/api/services/${slug}/`, data).then(res => res.data),

  delete: (slug: string): Promise<void> => 
    api.delete(`/api/services/${slug}/`),

  toggleStatus: (slug: string): Promise<{ is_active: boolean }> => 
    api.post(`/api/services/${slug}/toggle_status/`).then(res => res.data),
};

// Pricing Tiers Service
export const pricingService = {
  listTiers: (): Promise<PricingTier[]> => 
    api.get('/api/pricing/tiers/').then(res => res.data.results !== undefined ? res.data.results : res.data),

  createTier: (data: any): Promise<PricingTier> => 
    api.post('/api/pricing/tiers/', data).then(res => res.data),

  updateTier: (slug: string, data: any): Promise<PricingTier> => 
    api.put(`/api/pricing/tiers/${slug}/`, data).then(res => res.data),

  deleteTier: (slug: string): Promise<void> => 
    api.delete(`/api/pricing/tiers/${slug}/`),

  createInquiry: (data: any): Promise<PricingInquiry> => 
    api.post('/api/pricing/inquiries/', data).then(res => res.data),

  listInquiries: (): Promise<PricingInquiry[]> => 
    api.get('/api/pricing/inquiries/').then(res => res.data.results !== undefined ? res.data.results : res.data),
};

// Contact Inquiry Service
export const inquiryService = {
  create: (data: any): Promise<Inquiry> => 
    api.post('/api/contact/', data).then(res => res.data),

  list: (): Promise<Inquiry[]> => 
    api.get('/api/contact/').then(res => res.data.results !== undefined ? res.data.results : res.data),

  updateStatus: (id: number, status: string): Promise<Inquiry> => 
    api.patch(`/api/contact/${id}/`, { status }).then(res => res.data),

  delete: (id: number): Promise<void> => 
    api.delete(`/api/contact/${id}/`),
};

// Settings Service
export const settingsService = {
  list: (): Promise<Setting[]> => 
    api.get('/api/settings/').then(res => res.data.results !== undefined ? res.data.results : res.data),

  getDict: (): Promise<Record<string, string>> => 
    api.get('/api/settings/public_dict/').then(res => res.data.settings),

  bulkUpdate: (settings: Record<string, string>): Promise<Setting[]> => 
    api.post('/api/settings/bulk_update/', { settings }).then(res => res.data.data),
};

// Media Service
export const mediaService = {
  list: (): Promise<MediaFile[]> => 
    api.get('/api/upload/').then(res => res.data.results !== undefined ? res.data.results : res.data),

  upload: (file: File): Promise<MediaFile> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data.data);
  },

  delete: (id: number): Promise<void> => 
    api.delete(`/api/upload/${id}/`),
};

// Analytics Service
export const analyticsService = {
  logPageView: (path: string): Promise<void> => 
    api.post('/api/analytics/pageview/', { path }).then(() => {}),
};

// Admin Dashboard Service
export const dashboardService = {
  getMetrics: (): Promise<DashboardData> => 
    api.get('/api/dashboard/metrics/').then(res => res.data.data),
};
