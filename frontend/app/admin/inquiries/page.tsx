'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Inbox, Trash2, CheckCircle2, RefreshCw, Layers } from 'lucide-react';
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(197,168,128,0.1)] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inquiries Manager</h1>
          <p className="text-xs text-muted mt-1">Review contact tickets and customized estimator quotes.</p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-[#0d0d12] border border-white/5 rounded-lg p-1 text-[10px] font-bold uppercase tracking-wider">
          <button
            onClick={() => setTab('contact')}
            className={`px-4 py-2 rounded-md transition-all cursor-pointer ${
              tab === 'contact' ? 'bg-[rgba(197,168,128,0.1)] text-primary' : 'text-muted hover:text-foreground'
            }`}
          >
            General Contacts ({contacts?.length || 0})
          </button>
          <button
            onClick={() => setTab('pricing')}
            className={`px-4 py-2 rounded-md transition-all cursor-pointer ${
              tab === 'pricing' ? 'bg-[rgba(197,168,128,0.1)] text-primary' : 'text-muted hover:text-foreground'
            }`}
          >
            Pricing Calculator Quotes ({pricings?.length || 0})
          </button>
        </div>
      </div>

      {tab === 'contact' ? (
        // Contacts Table
        contactsLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border border-primary border-t-transparent" />
          </div>
        ) : !contacts || contacts.length === 0 ? (
          <div className="glass-panel p-12 text-center flex flex-col items-center justify-center space-y-3 rounded-xl">
            <Inbox className="h-10 w-10 text-muted" />
            <h3 className="text-sm font-bold text-foreground">No General Inquiries</h3>
            <p className="text-xs text-muted">All clear! No contact inquiries recorded yet.</p>
          </div>
        ) : (
          <div className="glass-panel rounded-xl overflow-hidden border border-[rgba(197,168,128,0.1)] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-secondary/40 border-b border-white/5 uppercase tracking-widest font-bold text-muted text-[10px]">
                  <th className="p-4">Sender Details</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status Flag</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-muted leading-relaxed">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-white/[0.01] transition-all">
                    {/* User Info */}
                    <td className="p-4 space-y-1 select-text">
                      <p className="font-bold text-foreground">{contact.name}</p>
                      <p className="text-[10px] text-muted">{contact.email}</p>
                      {contact.company && <p className="text-[9px] text-primary">{contact.company}</p>}
                      {contact.phone && <p className="text-[9px] text-muted font-mono">{contact.phone}</p>}
                    </td>
                    
                    {/* Message Body */}
                    <td className="p-4 max-w-sm whitespace-pre-wrap select-text">{contact.message}</td>
                    
                    {/* Status Dropdown */}
                    <td className="p-4">
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                        className="bg-[#0b0b0f] border border-white/10 rounded px-2.5 py-1.5 text-xs text-foreground focus:outline-none cursor-pointer"
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
                        className="text-muted hover:text-red-400 p-2 rounded hover:bg-red-500/10 transition-all cursor-pointer"
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
            <div className="h-8 w-8 animate-spin rounded-full border border-primary border-t-transparent" />
          </div>
        ) : !pricings || pricings.length === 0 ? (
          <div className="glass-panel p-12 text-center flex flex-col items-center justify-center space-y-3 rounded-xl">
            <Layers className="h-10 w-10 text-muted" />
            <h3 className="text-sm font-bold text-foreground">No Calculator Quotes</h3>
            <p className="text-xs text-muted">No custom calculator quotes recorded yet.</p>
          </div>
        ) : (
          <div className="glass-panel rounded-xl overflow-hidden border border-[rgba(197,168,128,0.1)] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-secondary/40 border-b border-white/5 uppercase tracking-widest font-bold text-muted text-[10px]">
                  <th className="p-4">Company Details</th>
                  <th className="p-4">System Requirements</th>
                  <th className="p-4">Est. Budget</th>
                  <th className="p-4">Configuration JSON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-muted leading-relaxed">
                {pricings.map((pricing) => (
                  <tr key={pricing.id} className="hover:bg-white/[0.01] transition-all">
                    {/* Company details */}
                    <td className="p-4 space-y-1 select-text">
                      <p className="font-bold text-foreground">{pricing.name}</p>
                      <p className="text-[10px] text-muted">{pricing.email}</p>
                      <p className="text-[9px] text-primary">{pricing.company || 'Private client'}</p>
                    </td>

                    {/* Requirements */}
                    <td className="p-4 max-w-xs whitespace-pre-wrap select-text">{pricing.requirements}</td>

                    {/* Estimate budget */}
                    <td className="p-4 font-mono font-bold text-foreground">{pricing.estimated_budget}</td>

                    {/* JSON Config details */}
                    <td className="p-4">
                      <pre className="bg-[#050507] border border-white/5 rounded p-2 text-[9px] font-mono text-muted max-w-xs overflow-x-auto">
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
