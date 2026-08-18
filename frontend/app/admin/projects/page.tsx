'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FolderGit, Edit, Plus, Trash2, X, Save, Loader2, Star, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { projectService, mediaService } from '@/services/api';
import { Project, MediaFile } from '@/types';

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
  const [techStack, setTechStack] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  
  // Image Upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); // Main cover image ID

  // Queries
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['admin_projects_crud'],
    queryFn: () => projectService.list(),
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadingImage(true);
      setErrorMsg(null);
      try {
        const uploadedFile = await mediaService.upload(files[0]);
        // The service returns the saved MediaFile record
        setSelectedMediaId(uploadedFile.id);
        queryClient.invalidateQueries({ queryKey: ['admin_media_lookup'] });
      } catch (err: any) {
        console.error('Failed to upload image:', err);
        setErrorMsg(err.response?.data?.message || 'Failed to upload cover image. Verify file is valid.');
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setLongDesc('');
    setClient('');
    setIndustry('');
    setTechStack('');
    setLiveUrl('');
    setGithubUrl('');
    setStatus('DRAFT');
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
    setTechStack(project.tech_stack || '');
    setLiveUrl(project.live_url || '');
    setGithubUrl(project.github_url || '');
    setStatus(project.status);
    
    // Map cover image
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
      tech_stack: techStack || null,
      live_url: liveUrl || null,
      github_url: githubUrl || null,
      status,
      services_ids: [], // Bypassed
      images: imagesPayload
    };

    saveMutation.mutate(payload);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Projects Manager</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Add, update, or remove portfolio case studies with images and tech stack specifications.</p>
        </div>
        <div>
          <button
            onClick={openCreateModal}
            className="w-full py-2.5 px-5 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-[#FF7A00] hover:bg-[#E06C00] shadow-md shadow-amber-500/20 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="h-4 w-4 text-white" />
            <span className="text-white font-black tracking-widest">Add Project</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      {projectsLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border border-[#0D9488] border-t-transparent" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 uppercase tracking-widest font-black text-slate-500 text-[10px]">
                <th className="p-4">Cover & Title</th>
                <th className="p-4">Client / Industry</th>
                <th className="p-4">Technologies Used</th>
                <th className="p-4">Status Flag</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 leading-relaxed font-medium">
              {projects?.map((project) => {
                const img = project.featured_image?.thumbnail_url || project.featured_image?.file_url;
                return (
                  <tr key={project.id} className="hover:bg-slate-50 transition-all">
                    {/* Cover & Title */}
                    <td className="p-4 flex items-center space-x-3">
                      <div className="relative h-12 w-16 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shrink-0">
                        {img ? (
                          <Image src={img} alt="" fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[8px] text-slate-400 font-bold">No Cover</div>
                        )}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-800">{project.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold">/{project.slug}</p>
                      </div>
                    </td>

                    {/* Client & Industry */}
                    <td className="p-4">
                      <p className="font-extrabold text-slate-800">{project.client || 'Internal Project'}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{project.industry || 'General'}</p>
                    </td>

                    {/* Technologies Tags */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.tech_stack ? (
                          project.tech_stack.split(',').map((tech, i) => (
                            <span key={i} className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-slate-500 font-bold">
                              {tech.trim()}
                            </span>
                          ))
                        ) : (
                          <span className="text-[9px] text-slate-400">None Specified</span>
                        )}
                      </div>
                    </td>

                    {/* Status Flag */}
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase font-mono ${
                        project.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        {project.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="text-slate-400 hover:text-[#0D9488] p-2 rounded-lg hover:bg-slate-100 transition-all cursor-pointer inline-block"
                        title="Edit Project"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.slug)}
                        className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all cursor-pointer inline-block"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
                {editingProject ? `Edit Case Study: ${editingProject.title}` : 'Create Case Study'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-800 cursor-pointer transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">Project Title</label>
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

              {/* Row 2: Client & Industry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">Client / Company Name</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. TransRoute Global Logistics"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">Industry / Domain</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Logistics & Supply Chain"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
              </div>

              {/* Row 3: URLs & Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">Deployment URL (Optional)</label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">GitHub Source URL (Optional)</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">Publishing Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488]"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Technologies Used */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black text-slate-500">Technologies Used (Comma-separated)</label>
                <input
                  type="text"
                  required
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="e.g. Cloud Engineering, Automation & DevOps, Terraform, Kubernetes"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                />
              </div>

              {/* Row 5: Short Summary */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black text-slate-500">Short Summary Description (For Grid Cards)</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief, high-level abstract of the project to show in the showcase grids..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] resize-none"
                />
              </div>

              {/* Row 6: Project Overview (Case Study Breakdown) */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black text-slate-500">Project Overview (Case Study Details)</label>
                <textarea
                  rows={4}
                  required
                  value={longDesc}
                  onChange={(e) => setLongDesc(e.target.value)}
                  placeholder="Full description detailing challenges, key innovations, and detailed outcomes..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] resize-none"
                />
              </div>

              {/* Cover Image selector / Direct Image Uploader */}
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#FF7A00] block mb-2">Project Cover Image</span>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <div className="relative h-28 w-36 bg-white border border-slate-200 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                    {selectedMediaId ? (
                      <>
                        {mediaFiles?.find(f => f.id === selectedMediaId) ? (
                          <Image 
                            src={mediaFiles.find(f => f.id === selectedMediaId)?.file_url || '/images/custom-software.png'} 
                            alt="Cover Preview" 
                            fill 
                            className="object-cover" 
                          />
                        ) : (
                          <div className="text-[9px] text-slate-400 font-bold">Loading...</div>
                        )}
                      </>
                    ) : (
                      <div className="text-center p-3 text-[9px] text-slate-400 font-black space-y-1">
                        <ImageIcon className="h-5 w-5 text-slate-300 mx-auto" />
                        <span>No Cover</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-[#0D9488]/10 file:text-[#0D9488] hover:file:bg-[#0D9488]/20 cursor-pointer"
                      disabled={uploadingImage}
                    />
                    {uploadingImage && (
                      <div className="flex items-center space-x-2 text-[9px] text-[#0D9488] font-black">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Uploading directly to Media Bank...</span>
                      </div>
                    )}
                    <p className="text-[9px] text-slate-400 font-bold leading-normal">
                      Upload a new image file directly, or select one from the Media Bank repository list below.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cover Image selector from media library */}
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 block mb-2">Or Choose from Media Bank Repository</span>
                
                <div className="grid grid-cols-5 gap-3 max-h-40 overflow-y-auto pr-1">
                  {mediaFiles?.filter(f => f.mime_type.startsWith('image/')).map((file) => {
                    const selected = selectedMediaId === file.id;
                    const url = file.thumbnail_url || file.file_url;
                    return (
                      <div
                        key={file.id}
                        onClick={() => setSelectedMediaId(selected ? null : file.id)}
                        className={`relative h-20 bg-slate-100 rounded-xl border cursor-pointer overflow-hidden flex items-center justify-center transition-all ${
                          selected
                            ? 'border-2 border-[#FF7A00] shadow-[0_0_10px_rgba(255,122,0,0.15)]'
                            : 'border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {url && <Image src={url} alt="" fill className="object-cover" />}
                        {selected && (
                          <div className="absolute inset-0 bg-[#FF7A00]/20 flex items-center justify-center">
                            <Star className="h-5 w-5 text-[#FF7A00] fill-[#FF7A00]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions Footer */}
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
                  disabled={saveMutation.isPending || uploadingImage}
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
                      <span>Save Project</span>
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
