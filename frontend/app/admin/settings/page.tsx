'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Settings, Save, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { settingsService } from '@/services/api';

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  // Local form state
  const [siteName, setSiteName] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');

  // Fetch Settings Dict
  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin_settings_dict'],
    queryFn: () => settingsService.getDict(),
  });

  // Populate form once settings load
  useEffect(() => {
    if (settings) {
      setSiteName(settings.site_name || '');
      setSiteTitle(settings.site_title || '');
      setMetaDesc(settings.meta_description || '');
      setEmail(settings.contact_email || '');
      setPhone(settings.contact_phone || '');
      setAddress(settings.office_address || '');
      setLinkedin(settings.linkedin_url || '');
      setGithub(settings.github_url || '');
    }
  }, [settings]);

  // Bulk update settings mutation
  const mutation = useMutation({
    mutationFn: (data: Record<string, string>) => settingsService.bulkUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_settings_dict'] });
      queryClient.invalidateQueries({ queryKey: ['public_settings'] });
      queryClient.invalidateQueries({ queryKey: ['contact_settings'] });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    
    // Assemble dict payload
    const payload = {
      site_name: siteName,
      site_title: siteTitle,
      meta_description: metaDesc,
      contact_email: email,
      contact_phone: phone,
      office_address: address,
      linkedin_url: linkedin,
      github_url: github,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Global Site Settings</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Configure branding descriptions, SEO schemas, and social hyperlinks.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border border-[#0D9488] border-t-transparent" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl text-xs">
          
          {/* Main settings inputs card */}
          <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-2xl p-8 space-y-6">
            
            {/* Category: General */}
            <div className="space-y-4">
              <span className="text-xs uppercase font-black tracking-widest text-[#FF7A00] border-b border-slate-100 pb-2 block">
                1. General Branding
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Brand Name</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="Yukti Technologies"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Browser Title</label>
                  <input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    placeholder="Yukti Technologies | Enterprise AI Solutions"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500">Meta SEO Description</label>
                <textarea
                  rows={3}
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  placeholder="Short explanation displayed on search engines..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] resize-none"
                />
              </div>
            </div>

            {/* Category: Contact details */}
            <div className="space-y-4 pt-4">
              <span className="text-xs uppercase font-black tracking-widest text-[#0D9488] border-b border-slate-100 pb-2 block">
                2. Corporate Contact Details
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Inquiry Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="solutions@yuktitechnologies.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Corporate Telephone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (800) 555-0190"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500">Office Location Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Corporate suite address..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                />
              </div>
            </div>

            {/* Category: Social networks */}
            <div className="space-y-4 pt-4">
              <span className="text-xs uppercase font-black tracking-widest text-[#FF7A00] border-b border-slate-100 pb-2 block">
                3. Social Hyperlinks
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500">GitHub Repository</label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Actions side menu */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Configuration Actions</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed font-bold">
                Saving settings triggers a global database update, clear system configurations caches instantly.
              </p>
              
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-[#FF7A00] text-white hover:bg-[#E06C00] shadow-md shadow-amber-500/20 font-black tracking-widest uppercase text-xs py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Writing Configs...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 text-white" />
                    <span>Commit Settings</span>
                  </>
                )}
              </button>

              {success && (
                <div className="p-3 border border-emerald-200 bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center space-x-2 rounded-xl">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Website config updated successfully.</span>
                </div>
              )}

              {mutation.isError && (
                <div className="p-3 border border-red-200 bg-red-50 text-red-600 text-[10px] font-bold flex items-center space-x-2 rounded-xl">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>Save error: {mutation.error.message}</span>
                </div>
              )}
            </div>
          </div>

        </form>
      )}
    </div>
  );
}
