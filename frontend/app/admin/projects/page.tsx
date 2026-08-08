'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FolderGit, Edit, Plus, Trash2, X, Save, Loader2, Check, Star } from 'lucide-react';
import Image from 'next/image';
import { projectService, serviceService, mediaService } from '@/services/api';
import { Project, Service, MediaFile } from '@/types';

export default function AdminProjectsCRUD() {
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form inputs
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [client, setClient] = useState('');
  const [industry, setIndustry] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  
  // Associations
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); // Main cover image

  // Queries
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['admin_projects_crud'],
    queryFn: () => projectService.list(),
  });

  const { data: services } = useQuery<Service[]>({
    queryKey: ['admin_services_lookup'],
    queryFn: () => serviceService.list(),
  });

  const { data: mediaFiles } = useQuery<MediaFile[]>({
    queryKey: ['admin_media_lookup'],
    queryFn: () => mediaService.list(),
  });

  // Mutate Save
  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      if (editingProject) {
        return projectService.update(editingProject.slug, data);
      }
      return projectService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_projects_crud'] });
      queryClient.invalidateQueries({ queryKey: ['projects_list_page'] });
      queryClient.invalidateQueries({ queryKey: ['projects_list_home'] });
      closeModal();
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.message || 'Error occurred saving project.');
    }
  });

  // Mutate Delete
  const deleteMutation = useMutation({
    mutationFn: (slug: string) => projectService.delete(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_projects_crud'] });
      queryClient.invalidateQueries({ queryKey: ['projects_list_page'] });
      queryClient.invalidateQueries({ queryKey: ['projects_list_home'] });
    }
  });

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setLongDesc('');
    setClient('');
    setIndustry('');
    setLiveUrl('');
    setGithubUrl('');
    setStatus('DRAFT');
    setSelectedServices([]);
    setSelectedMediaId(null);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setSlug(project.slug);
    setDescription(project.description);
    setLongDesc(project.long_description);
    setClient(project.client || '');
    setIndustry(project.industry || '');
    setLiveUrl(project.live_url || '');
    setGithubUrl(project.github_url || '');
    setStatus(project.status);
    
    // Map existing associations
    setSelectedServices(project.services_details.map(s => s.id));
    setSelectedMediaId(project.featured_image?.id || null);
    
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDelete = (slug: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      deleteMutation.mutate(slug);
    }
  };

  const toggleService = (id: number) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(sId => sId !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Assemble payload
    const imagesPayload = selectedMediaId 
      ? [{ media_file_id: selectedMediaId, order: 0, is_featured: true }]
      : [];

    const payload = {
      title,
      slug,
      description,
      long_description: longDesc,
      client: client || null,
      industry: industry || null,
      live_url: liveUrl || null,
      github_url: githubUrl || null,
      status,
      services_ids: selectedServices,
      images: imagesPayload
    };

    saveMutation.mutate(payload);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(197,168,128,0.1)] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects Manager</h1>
          <p className="text-xs text-muted mt-1">Add Case Studies, map associated service domains, and links.</p>
        </div>
        <div>
          <button
            onClick={openCreateModal}
            className="button-premium bg-gold-gradient text-background px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="h-4 w-4 text-background" />
            <span>Add Case Study</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      {projectsLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="glass-panel rounded-xl overflow-hidden border border-[rgba(197,168,128,0.1)] overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-secondary/40 border-b border-white/5 uppercase tracking-widest font-bold text-muted text-[10px]">
                <th className="p-4">Cover & Title</th>
                <th className="p-4">Client & Industry</th>
                <th className="p-4">Capability Mappings</th>
                <th className="p-4">Status Flag</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-muted leading-relaxed">
              {projects?.map((project) => {
                const img = project.featured_image?.thumbnail_url || project.featured_image?.file_url;
                return (
                  <tr key={project.id} className="hover:bg-white/[0.01] transition-all">
                    {/* Cover & Title */}
                    <td className="p-4 flex items-center space-x-3">
                      <div className="relative h-12 w-16 bg-black/40 border border-white/5 rounded overflow-hidden shrink-0">
                        {img ? (
                          <Image src={img} alt="" fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[8px] text-muted">No Cover</div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{project.title}</p>
                        <p className="text-[10px] text-muted">/{project.slug}</p>
                      </div>
                    </td>

                    {/* Client & Industry */}
                    <td className="p-4">
                      <p className="font-bold text-foreground">{project.client || 'Internal'}</p>
                      <p className="text-[10px] text-muted">{project.industry || 'Tech'}</p>
                    </td>

                    {/* Services Tags */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.services_details.map(s => (
                          <span key={s.id} className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-muted">
                            {s.title}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status Flag */}
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase font-mono ${
                        project.status === 'PUBLISHED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {project.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="text-muted hover:text-primary p-2 rounded hover:bg-white/5 transition-all cursor-pointer inline-block"
                        title="Edit Project"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.slug)}
                        className="text-muted hover:text-red-400 p-2 rounded hover:bg-red-500/10 transition-all cursor-pointer inline-block"
                        title="Delete Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-panel w-full max-w-3xl rounded-xl border border-primary/30 p-8 space-y-6 max-h-[90vh] overflow-y-auto bg-[#070709] relative shadow-2xl animate-float-slow">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                {editingProject ? `Edit Case Study: ${editingProject.title}` : 'Create Case Study'}
              </h3>
              <button onClick={closeModal} className="text-muted hover:text-foreground cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">Project Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingProject) {
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

              {/* Row 2: Client & Industry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">Client Corporate Name</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">Target Industry Sector</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Row 3: URLs & Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">Deployment URL</label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">GitHub Source URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted">Access Status Flag</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[#070709] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Description (Abstract) */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-muted">Short Abstract Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Row 5: Long Description (Case Study) */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-muted">Full Case Study Breakdown</label>
                <textarea
                  rows={4}
                  required
                  value={longDesc}
                  onChange={(e) => setLongDesc(e.target.value)}
                  className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Service Capabilities multi selector */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-2">Map Associated Service Capabilities</span>
                <div className="flex flex-wrap gap-2">
                  {services?.map((service) => {
                    const selected = selectedServices.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`px-3 py-2 rounded text-[10px] font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                          selected
                            ? 'bg-[rgba(197,168,128,0.12)] border border-primary text-primary'
                            : 'bg-white/5 border border-white/10 text-muted hover:text-foreground'
                        }`}
                      >
                        {selected && <Check className="h-3 w-3" />}
                        <span>{service.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cover Image selector from media library */}
              <div className="space-y-3 border-t border-white/5 pt-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-2">Map Cover Image from Media Bank</span>
                
                <div className="grid grid-cols-5 gap-3 max-h-40 overflow-y-auto pr-1">
                  {mediaFiles?.filter(f => f.mime_type.startsWith('image/')).map((file) => {
                    const selected = selectedMediaId === file.id;
                    const url = file.thumbnail_url || file.file_url;
                    return (
                      <div
                        key={file.id}
                        onClick={() => setSelectedMediaId(selected ? null : file.id)}
                        className={`relative h-20 bg-black/40 rounded border cursor-pointer overflow-hidden flex items-center justify-center transition-all ${
                          selected
                            ? 'border-2 border-primary shadow-[0_0_10px_rgba(197,168,128,0.2)]'
                            : 'border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {url && <Image src={url} alt="" fill className="object-cover" />}
                        {selected && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Star className="h-5 w-5 text-primary fill-primary" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions Footer */}
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
                      <span>Save Project</span>
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
