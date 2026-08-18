'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Inbox, Trash2, Layers } from 'lucide-react';
import { inquiryService, pricingService } from '@/services/api';
import { Inquiry, PricingInquiry } from '@/types';

export default function AdminInquiriesPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<'contact' | 'pricing'>('contact');

  // Fetch Contact Inquiries
  const { data: contacts, isLoading: contactsLoading } = useQuery<Inquiry[]>({
    queryKey: ['admin_contacts'],
    queryFn: () => inquiryService.list(),
  });

  // Fetch Pricing Inquiries
  const { data: pricings, isLoading: pricingsLoading } = useQuery<PricingInquiry[]>({
    queryKey: ['admin_pricings'],
    queryFn: () => pricingService.listInquiries(),
  });

  // Status Change Mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => inquiryService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_contacts'] });
    },
  });

  // Contact Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => inquiryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_contacts'] });
    },
  });

  const handleStatusChange = (id: number, status: string) => {
    statusMutation.mutate({ id, status });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Inquiries Manager</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Review contact tickets and customized estimator quotes.</p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-1 text-[10px] font-bold uppercase tracking-wider">
          <button
            onClick={() => setTab('contact')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-black ${
              tab === 'contact' ? 'bg-white text-[#0D9488] shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            General Contacts ({contacts?.length || 0})
          </button>
          <button
            onClick={() => setTab('pricing')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-black ${
              tab === 'pricing' ? 'bg-white text-[#0D9488] shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Pricing Quotes ({pricings?.length || 0})
          </button>
        </div>
      </div>

      {tab === 'contact' ? (
        // Contacts Table
        contactsLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border border-[#0D9488] border-t-transparent" />
          </div>
        ) : !contacts || contacts.length === 0 ? (
          <div className="bg-white border border-slate-200 p-12 text-center flex flex-col items-center justify-center space-y-3 rounded-2xl shadow-sm">
            <Inbox className="h-10 w-10 text-slate-300" />
            <h3 className="text-sm font-black text-slate-800">No General Inquiries</h3>
            <p className="text-xs text-slate-400 font-bold">All clear! No contact inquiries recorded yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 uppercase tracking-widest font-black text-slate-400 text-[10px]">
                  <th className="p-4">Sender Details</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status Flag</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 leading-relaxed font-medium">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50 transition-all">
                    {/* User Info */}
                    <td className="p-4 space-y-1 select-text">
                      <p className="font-extrabold text-slate-800">{contact.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{contact.email}</p>
                      {contact.company && <p className="text-[9px] text-[#0D9488] font-bold">{contact.company}</p>}
                      {contact.phone && <p className="text-[9px] text-slate-400 font-bold font-mono">{contact.phone}</p>}
                    </td>
                    
                    {/* Message Body */}
                    <td className="p-4 max-w-sm whitespace-pre-wrap select-text text-slate-600">{contact.message}</td>
                    
                    {/* Status Dropdown */}
                    <td className="p-4">
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] cursor-pointer font-bold"
                      >
                        <option value="NEW">New</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        // Pricing Quotes Table
        pricingsLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border border-[#0D9488] border-t-transparent" />
          </div>
        ) : !pricings || pricings.length === 0 ? (
          <div className="bg-white border border-slate-200 p-12 text-center flex flex-col items-center justify-center space-y-3 rounded-2xl shadow-sm">
            <Layers className="h-10 w-10 text-slate-300" />
            <h3 className="text-sm font-black text-slate-800">No Calculator Quotes</h3>
            <p className="text-xs text-slate-400 font-bold">No custom calculator quotes recorded yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 uppercase tracking-widest font-black text-slate-400 text-[10px]">
                  <th className="p-4">Company Details</th>
                  <th className="p-4">System Requirements</th>
                  <th className="p-4">Est. Budget</th>
                  <th className="p-4">Configuration JSON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 leading-relaxed font-medium">
                {pricings.map((pricing) => (
                  <tr key={pricing.id} className="hover:bg-slate-50 transition-all">
                    {/* Company details */}
                    <td className="p-4 space-y-1 select-text">
                      <p className="font-extrabold text-slate-800">{pricing.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{pricing.email}</p>
                      <p className="text-[9px] text-[#0D9488] font-bold">{pricing.company || 'Private client'}</p>
                    </td>

                    {/* Requirements */}
                    <td className="p-4 max-w-xs whitespace-pre-wrap select-text text-slate-600">{pricing.requirements}</td>

                    {/* Estimate budget */}
                    <td className="p-4 font-mono font-bold text-slate-800">{pricing.estimated_budget}</td>

                    {/* JSON Config details */}
                    <td className="p-4">
                      <pre className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[9px] font-mono text-slate-500 max-w-xs overflow-x-auto shadow-inner">
                        {JSON.stringify(pricing.custom_configuration, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
