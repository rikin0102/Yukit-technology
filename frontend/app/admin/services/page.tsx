'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Cpu, Check, X, Edit, Plus, Trash2, Loader2, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { serviceService } from '@/services/api';
import { Service, ServiceFeature } from '@/types';

export default function AdminServicesCRUD() {
  const queryClient = useQueryClient();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('Cpu');
  const [shortDesc, setShortDesc] = useState('');
  const [fullContent, setFullContent] = useState('');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [features, setFeatures] = useState<{ title: string; description: string }[]>([]);

  // Fetch Services
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['admin_services_crud'],
    queryFn: () => serviceService.list(),
  });

  // Toggle active status mutation
  const toggleMutation = useMutation({
    mutationFn: (slug: string) => serviceService.toggleStatus(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_services_crud'] });
      queryClient.invalidateQueries({ queryKey: ['services_list_page'] });
      queryClient.invalidateQueries({ queryKey: ['services_list_home'] });
    }
  });

  // Save (Create/Update) Service mutation
  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      if (editingService) {
        return serviceService.update(editingService.slug, data);
      }
      return serviceService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_services_crud'] });
      queryClient.invalidateQueries({ queryKey: ['services_list_page'] });
      queryClient.invalidateQueries({ queryKey: ['services_list_home'] });
      closeModal();
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.message || 'Error occurred saving capability.');
    }
  });

  // Delete Service mutation
  const deleteMutation = useMutation({
    mutationFn: (slug: string) => serviceService.delete(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_services_crud'] });
      queryClient.invalidateQueries({ queryKey: ['services_list_page'] });
      queryClient.invalidateQueries({ queryKey: ['services_list_home'] });
    }
  });

  const openCreateModal = () => {
    setEditingService(null);
    setTitle('');
    setSlug('');
    setIcon('Cpu');
    setShortDesc('');
    setFullContent('');
    setOrder(0);
    setIsActive(true);
    setFeatures([]);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setTitle(service.title);
    setSlug(service.slug);
    setIcon(service.icon_identifier);
    setShortDesc(service.short_description);
    setFullContent(service.full_content);
    setOrder(service.order);
    setIsActive(service.is_active);
    // map features
    setFeatures(service.features.map(f => ({ title: f.title, description: f.description || '' })));
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleToggle = (slug: string) => {
    toggleMutation.mutate(slug);
  };

  const handleDelete = (slug: string) => {
    if (confirm('Delete this service capability? (Warning: May delete associated projects!)')) {
      deleteMutation.mutate(slug);
    }
  };

  const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const addFeatureInput = () => {
    setFeatures([...features, { title: '', description: '' }]);
  };

  const removeFeatureInput = (index: number) => {
    setFeatures(features.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    
    const payload = {
      title,
      slug,
      icon_identifier: icon,
      short_description: shortDesc,
      full_content: fullContent,
      order,
      is_active: isActive,
      features,
    };
    saveMutation.mutate(payload);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(197,168,128,0.1)] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Capabilities Manager</h1>
          <p className="text-xs text-muted mt-1">Configure service domains, bullet features list, and toggle active flags.</p>
        </div>
        <div>
          <button
            onClick={openCreateModal}
            className="button-premium bg-gold-gradient text-background px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="h-4 w-4 text-background" />
            <span>Create Domain</span>
          </button>
        </div>
      </div>

      {/* Services Table */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="glass-panel rounded-xl overflow-hidden border border-[rgba(197,168,128,0.1)] overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-secondary/40 border-b border-white/5 uppercase tracking-widest font-bold text-muted text-[10px]">
                <th className="p-4">Icon & Domain Title</th>
                <th className="p-4">Short Abstract</th>
                <th className="p-4">Order</th>
                <th className="p-4">Active Toggle</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-muted leading-relaxed">
              {services?.map((service) => (
                <tr key={service.id} className="hover:bg-white/[0.01] transition-all">
                  <td className="p-4 flex items-center space-x-3">
                    <span className="p-2 rounded bg-white/5 text-primary border border-white/5 font-mono text-[10px]">
                      {service.icon_identifier}
                    </span>
                    <div>
                      <p className="font-bold text-foreground">{service.title}</p>
                      <p className="text-[10px] text-muted">/{service.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 max-w-xs truncate">{service.short_description}</td>
                  <td className="p-4 font-mono">{service.order}</td>
                  
                  {/* Status Toggle switch */}
                  <td className="p-4">
                    <button
                      onClick={() => handleToggle(service.slug)}
                      className="text-primary hover:text-primary-hover flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      {service.is_active ? (
                        <>
                          <ToggleRight className="h-6 w-6 text-primary" />
                          <span className="text-[9px] uppercase tracking-wider text-primary font-bold">Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="h-6 w-6 text-muted" />
                          <span className="text-[9px] uppercase tracking-wider text-muted font-bold">Inactive</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="text-muted hover:text-primary p-2 rounded hover:bg-white/5 transition-all cursor-pointer inline-block"
                      title="Edit Service"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.slug)}
                      className="text-muted hover:text-red-400 p-2 rounded hover:bg-red-500/10 transition-all cursor-pointer inline-block"
                      title="Delete Service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-panel w-full max-w-2xl rounded-xl border border-primary/30 p-8 space-y-6 max-h-[90vh] overflow-y-auto bg-[#070709] relative shadow-2xl animate-float-slow">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                {editingService ? `Edit Capability: ${editingService.title}` : 'Create Service Domain'}
              </h3>
              <button onClick={closeModal} className="text-muted hover:text-foreground cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">Title Name</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingService) {
                        setSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                      }
                    }}
                    className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">Slug URL</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase())}
                    className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Row 2: Icon & Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">Lucide Icon Identifier</label>
                  <input
                    type="text"
                    required
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="Cpu, BrainCircuit, Cloud, Database"
                    className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">Display Order</label>
                  <input
                    type="number"
                    required
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                    className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Row 3: Short Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-muted">Short Abstract</label>
                <textarea
                  rows={2}
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Row 4: Full Content */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-muted">Full Capability Explanation</label>
                <textarea
                  rows={4}
                  required
                  value={fullContent}
                  onChange={(e) => setFullContent(e.target.value)}
                  className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Features Array builder */}
              <div className="space-y-4 pt-2 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Service Sub-Features ({features.length})</span>
                  <button
                    type="button"
                    onClick={addFeatureInput}
                    className="text-[9px] uppercase tracking-wider font-bold bg-white/5 border border-white/10 text-foreground px-2.5 py-1 rounded hover:bg-white/10 cursor-pointer flex items-center space-x-1"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Feature</span>
                  </button>
                </div>
                
                <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-[#0d0d12] border border-white/5 p-3 rounded">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          required
                          value={feat.title}
                          onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                          placeholder="Feature Title (e.g. Model Tuning)"
                          className="w-full bg-[#050507] border border-white/5 rounded px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={feat.description}
                          onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                          placeholder="Feature detail explanation..."
                          className="w-full bg-[#050507] border border-white/5 rounded px-2.5 py-1.5 text-xs text-muted focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeatureInput(idx)}
                        className="text-muted hover:text-red-400 p-2 rounded hover:bg-red-500/10 cursor-pointer shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-white/10 text-muted px-5 py-2.5 rounded hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="bg-gold-gradient text-background px-6 py-2.5 rounded hover:shadow-[0_0_15px_rgba(197,168,128,0.25)] transition-all text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center space-x-1.5 disabled:opacity-50"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-background" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 text-background" />
                      <span>Save Capability</span>
                    </>
                  )}
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] rounded flex items-center space-x-2">
                  <X className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
