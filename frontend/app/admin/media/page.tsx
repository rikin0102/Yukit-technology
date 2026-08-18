'use client';

import React, { useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ImageIcon, UploadCloud, Trash2, FileText, Download } from 'lucide-react';
import Image from 'next/image';
import { mediaService } from '@/services/api';
import { MediaFile } from '@/types';

export default function AdminMediaPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch Media Bank
  const { data: mediaFiles, isLoading } = useQuery<MediaFile[]>({
    queryKey: ['admin_media_bank'],
    queryFn: () => mediaService.list(),
  });

  // Upload Mutation
  const uploadMutation = useMutation({
    mutationFn: (file: File) => mediaService.upload(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_media_bank'] });
      setUploading(false);
    },
    onError: (err) => {
      console.error(err);
      alert('Upload failed. Verify file is valid image or doc.');
      setUploading(false);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => mediaService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_media_bank'] });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploading(true);
      uploadMutation.mutate(files[0]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this media file?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Media Bank Manager</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Upload and manage image assets. Files are compressed on upload.</p>
        </div>

        {/* Upload Trigger */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            className="hidden"
          />
          <button
            onClick={triggerUpload}
            disabled={uploading}
            className="w-full py-2.5 px-5 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-[#FF7A00] hover:bg-[#E06C00] shadow-md shadow-amber-500/20 transition-all duration-300 flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <span className="animate-pulse">Optimizing Upload...</span>
            ) : (
              <>
                <UploadCloud className="h-4 w-4 text-white" />
                <span className="text-white font-black tracking-widest">Upload Assets</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid listing files */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border border-[#0D9488] border-t-transparent" />
        </div>
      ) : !mediaFiles || mediaFiles.length === 0 ? (
        <div className="bg-white border border-slate-200 p-16 text-center flex flex-col items-center justify-center space-y-4 rounded-2xl shadow-sm">
          <ImageIcon className="h-12 w-12 text-slate-300 stroke-[1.25]" />
          <h3 className="text-sm font-black text-slate-800">Media Bank Empty</h3>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-bold">
            No files uploaded yet. Drag or choose a file above to initiate automated Pillow compression.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mediaFiles.map((file) => {
            const isImage = file.mime_type.startsWith('image/');
            const fileLink = file.file_url || file.file;
            const thumbLink = file.thumbnail_url || file.thumbnail || fileLink;

            return (
              <div
                key={file.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group relative transition-all duration-300 hover:shadow-md"
              >
                {/* Visual Preview */}
                <div className="relative h-32 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                  {isImage && thumbLink ? (
                    <Image
                      src={thumbLink}
                      alt={file.file_name}
                      fill
                      sizes="150px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <FileText className="h-10 w-10 text-slate-300 stroke-[1.25]" />
                  )}
                  
                  {/* Delete Hover action */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2 backdrop-blur-xs">
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 rounded-full bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                      title="Delete Asset"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                    <a
                      href={fileLink}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-slate-100/20 text-white hover:bg-slate-100/40 transition-all"
                      title="View File"
                    >
                      <Download className="h-4.5 w-4.5 text-white" />
                    </a>
                  </div>
                </div>

                {/* File Details */}
                <div className="p-3.5 space-y-1">
                  <p className="text-[10px] font-extrabold text-slate-800 truncate select-all" title={file.file_name}>
                    {file.file_name}
                  </p>
                  <div className="flex justify-between text-[8px] text-slate-400 font-bold">
                    <span className="font-mono">{file.formatted_size}</span>
                    <span className="uppercase">{file.mime_type.split('/')[1]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
