'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Cpu, Check, X, Edit, Plus, Trash2, Loader2, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { serviceService } from '@/services/api';
import { Service } from '@/types';

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
    if (confirm('Are you sure you want to delete this service capability domain?')) {
      deleteMutation.mutate(slug);
    }
  };

  const addFeatureInput = () => {
    setFeatures([...features, { title: '', description: '' }]);
  };

  const removeFeatureInput = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleFeatureChange = (idx: number, field: 'title' | 'description', value: string) => {
    const next = [...features];
    next[idx][field] = value;
    setFeatures(next);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Capabilities Manager</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Configure service domains, bullet features list, and toggle active flags.</p>
        </div>
        <div>
          <button
            onClick={openCreateModal}
            className="w-full py-2.5 px-5 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-[#FF7A00] hover:bg-[#E06C00] shadow-md shadow-amber-500/20 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="h-4 w-4 text-white" />
            <span className="text-white font-black tracking-widest">Create Domain</span>
          </button>
        </div>
      </div>

      {/* Services Table */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border border-[#0D9488] border-t-transparent" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase tracking-widest font-black text-slate-500 text-[10px]">
                <th className="p-4">Icon & Domain Title</th>
                <th className="p-4">Short Abstract</th>
                <th className="p-4">Order</th>
                <th className="p-4">Active Toggle</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 leading-relaxed font-medium">
              {services?.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50 transition-all">
                  <td className="p-4 flex items-center space-x-3">
                    <span className="p-2 rounded-lg bg-slate-50 text-[#0D9488] border border-slate-200 font-mono text-[10px] font-bold">
                      {service.icon_identifier}
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-800">{service.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold">/{service.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 max-w-xs truncate text-slate-600 font-medium">{service.short_description}</td>
                  <td className="p-4 font-mono font-bold text-slate-800">{service.order}</td>
                  
                  {/* Status Toggle switch */}
                  <td className="p-4">
                    <button
                      onClick={() => handleToggle(service.slug)}
                      className="flex items-center space-x-1.5 transition-colors cursor-pointer select-none"
                    >
                      {service.is_active ? (
                        <>
                          <ToggleRight className="h-6 w-6 text-[#0D9488]" />
                          <span className="text-[9px] uppercase tracking-wider text-[#0D9488] font-black">Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="h-6 w-6 text-slate-300" />
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Inactive</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="text-slate-400 hover:text-[#0D9488] p-2 rounded-lg hover:bg-slate-100 transition-all cursor-pointer inline-block"
                      title="Edit Service"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.slug)}
                      className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all cursor-pointer inline-block"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
                {editingService ? `Edit Capability: ${editingService.title}` : 'Create Service Domain'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-800 cursor-pointer transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">Title Name</label>
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">Slug URL</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase())}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
              </div>

              {/* Row 2: Icon & Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">Lucide Icon Identifier</label>
                  <input
                    type="text"
                    required
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="Cpu, BrainCircuit, Cloud, Database"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">Display Order</label>
                  <input
                    type="number"
                    required
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
              </div>

              {/* Row 3: Short Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black text-slate-500">Short Abstract</label>
                <textarea
                  rows={2}
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] resize-none"
                />
              </div>

              {/* Row 4: Full Content */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black text-slate-500">Full Capability Explanation</label>
                <textarea
                  rows={4}
                  required
                  value={fullContent}
                  onChange={(e) => setFullContent(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] resize-none"
                />
              </div>

              {/* Features Array builder */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#0D9488]">Service Sub-Features ({features.length})</span>
                  <button
                    type="button"
                    onClick={addFeatureInput}
                    className="text-[9px] uppercase tracking-wider font-black bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer flex items-center space-x-1"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Feature</span>
                  </button>
                </div>
                
                <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-slate-50 border border-slate-100 p-3 rounded-xl">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          required
                          value={feat.title}
                          onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                          placeholder="Feature Title (e.g. Model Tuning)"
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={feat.description}
                          onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                          placeholder="Feature detail explanation..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeatureInput(idx)}
                        className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 cursor-pointer shrink-0 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-slate-200 text-slate-500 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-all text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="bg-[#FF7A00] text-white hover:bg-[#E06C00] shadow-md shadow-amber-500/20 px-6 py-2.5 rounded-xl transition-all text-xs font-black uppercase tracking-wider cursor-pointer flex items-center space-x-1.5 disabled:opacity-50"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 text-white" />
                      <span>Save Capability</span>
                    </>
                  )}
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 border border-red-200 bg-red-50 text-red-600 text-[10px] rounded-xl flex items-center space-x-2">
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
