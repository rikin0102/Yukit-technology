'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, FolderGit, Cpu, Inbox, 
  Activity, Eye, AlertCircle 
} from 'lucide-react';
import { dashboardService } from '@/services/api';
import { DashboardData } from '@/types';

export default function AdminDashboardPage() {
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ['admin_dashboard_metrics'],
    queryFn: () => dashboardService.getMetrics(),
    refetchInterval: 30000, // Refresh every 30 seconds automatically
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-black text-slate-800">Console Metrics</h1>
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border border-[#0D9488] border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-black text-slate-800">Console Metrics</h1>
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 text-xs flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>Failed to load internal metrics: {error?.message || 'Check database connection.'}</span>
        </div>
      </div>
    );
  }

  const { summary, inquiry_trends, traffic_trends_30d, activity_logs } = data;

  const cardItems = [
    { name: 'Total Projects', value: summary.counts.projects, icon: FolderGit, detail: 'Published case studies', iconColor: 'text-[#FF7A00] bg-[#FF7A00]/10 border-[#FF7A00]/20' },
    { name: 'Service Capabilities', value: summary.counts.services, icon: Cpu, detail: 'Active capability listings', iconColor: 'text-[#0D9488] bg-[#0D9488]/10 border-[#0D9488]/20' },
    { name: 'Contact Inquiries', value: summary.counts.contact_inquiries.total, icon: Inbox, detail: `${summary.counts.contact_inquiries.new} new messages`, iconColor: 'text-blue-600 bg-blue-50 border-blue-100' },
    { name: 'Unique Visitors (30d)', value: summary.traffic.unique_visitors_30d, icon: Users, detail: `${summary.traffic.pageviews_30d} total pageviews`, iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  ];

  // SVG Chart Dimensions
  const chartWidth = 500;
  const chartHeight = 180;
  
  // 1. Process Pageview SVG coordinates
  const trafficPoints = traffic_trends_30d || [];
  const maxTrafficViews = Math.max(...trafficPoints.map(p => p.views), 10);
  
  // Start line graph coordinates with offset padding for y-axis text (left-offset: 60px)
  const trafficSvgPath = trafficPoints.length > 1
    ? trafficPoints.map((p, idx) => {
        const x = (idx / (trafficPoints.length - 1)) * (chartWidth - 80) + 60;
        const y = chartHeight - ((p.views / maxTrafficViews) * (chartHeight - 50) + 25);
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ')
    : '';

  return (
    <div className="space-y-8 text-xs font-medium text-slate-650">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Console Metrics</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Real-time platform traffic, case metrics, and transaction logs.</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-emerald-600 text-[10px] font-black tracking-wider uppercase">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span>Monitor Active</span>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cardItems.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 space-y-4 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">{card.name}</span>
                <div className={`h-8 w-8 rounded-lg border flex items-center justify-center ${card.iconColor}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black text-slate-800 font-mono">{card.value}</p>
                <p className="text-[10px] text-slate-400 font-bold">{card.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pageview Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Pageviews Traffic (Past 30 Days)</h3>
              <p className="text-[10px] text-slate-400 font-bold">How many users see your website daily</p>
            </div>
            <Eye className="h-4.5 w-4.5 text-[#0D9488]" />
          </div>
          
          <div className="w-full overflow-hidden border border-slate-100 rounded-xl bg-slate-50 p-4 flex justify-center">
            {trafficPoints.length > 1 ? (
              <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible select-none">
                {/* Y-Axis Guide Lines & Labels */}
                {[0, 0.5, 1].map((r, idx) => {
                  const yVal = 25 + r * (chartHeight - 50);
                  const labelValue = Math.round(maxTrafficViews * (1 - r));
                  return (
                    <g key={idx}>
                      <line
                        x1="55"
                        y1={yVal}
                        x2={chartWidth - 15}
                        y2={yVal}
                        stroke="rgba(15, 23, 42, 0.05)"
                        strokeWidth="1"
                      />
                      <text
                        x="45"
                        y={yVal + 3}
                        textAnchor="end"
                        fill="rgba(15, 23, 42, 0.4)"
                        fontSize="8"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {labelValue}
                      </text>
                    </g>
                  );
                })}
                
                {/* Gradient Fill under line */}
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0D9488" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Svg Path */}
                <path
                  d={trafficSvgPath}
                  fill="none"
                  stroke="#0D9488"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Area under path */}
                {trafficPoints.length > 1 && (
                  <path
                     d={`${trafficSvgPath} L ${(chartWidth - 80) + 60} ${chartHeight - 25} L 60 ${chartHeight - 25} Z`}
                    fill="url(#chartGlow)"
                  />
                )}

                {/* Dot markers on start/end */}
                <circle
                  cx={60}
                  cy={chartHeight - ((trafficPoints[0].views / maxTrafficViews) * (chartHeight - 50) + 25)}
                  r="4"
                  fill="#0D9488"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <circle
                  cx={chartWidth - 20}
                  cy={chartHeight - ((trafficPoints[trafficPoints.length - 1].views / maxTrafficViews) * (chartHeight - 50) + 25)}
                  r="4"
                  fill="#0D9488"
                  stroke="white"
                  strokeWidth="1.5"
                />

                {/* X-Axis labels */}
                <text
                  x="60"
                  y={chartHeight - 5}
                  textAnchor="start"
                  fill="rgba(15, 23, 42, 0.4)"
                  fontSize="8"
                  fontWeight="bold"
                >
                  30 Days Ago
                </text>
                <text
                  x={chartWidth - 20}
                  y={chartHeight - 5}
                  textAnchor="end"
                  fill="rgba(15, 23, 42, 0.4)"
                  fontSize="8"
                  fontWeight="bold"
                >
                  Today
                </text>
              </svg>
            ) : (
              <div className="h-40 flex items-center justify-center text-[10px] text-slate-400 font-bold">Awaiting traffic telemetry...</div>
            )}
          </div>
        </div>

        {/* Inquiries Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Inquiries Feed (6 Months)</h3>
              <p className="text-[10px] text-slate-400 font-bold">Monthly General Contacts vs Calculator Quotes</p>
            </div>
            <Inbox className="h-4.5 w-4.5 text-[#FF7A00]" />
          </div>

          <div className="w-full overflow-hidden border border-slate-100 rounded-xl bg-slate-50 p-4 flex justify-center">
            {inquiry_trends.length > 0 ? (
              <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible select-none">
                {/* Y-Axis lines & labels */}
                {[0, 0.5, 1].map((r, idx) => {
                  const yVal = 25 + r * (chartHeight - 55);
                  const maxInquiries = Math.max(...inquiry_trends.map(t => t.contact + t.pricing), 5);
                  const labelValue = Math.round(maxInquiries * (1 - r));
                  return (
                    <g key={idx}>
                      <line
                        x1="55"
                        y1={yVal}
                        x2={chartWidth - 15}
                        y2={yVal}
                        stroke="rgba(15, 23, 42, 0.05)"
                        strokeWidth="1"
                      />
                      <text
                        x="45"
                        y={yVal + 3}
                        textAnchor="end"
                        fill="rgba(15, 23, 42, 0.4)"
                        fontSize="8"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {labelValue}
                      </text>
                    </g>
                  );
                })}

                {/* Draw Bar Columns */}
                {inquiry_trends.map((item, idx) => {
                  const colWidth = 14;
                  const x = (idx / inquiry_trends.length) * (chartWidth - 85) + 65;
                  const maxInquiries = Math.max(...inquiry_trends.map(t => t.contact + t.pricing), 5);
                  
                  const cHeight = ((item.contact) / maxInquiries) * (chartHeight - 65);
                  const pHeight = ((item.pricing) / maxInquiries) * (chartHeight - 65);

                  return (
                    <g key={idx}>
                      {/* Contact Bar (Teal - general website contact) */}
                      <rect
                        x={x}
                        y={chartHeight - 30 - cHeight}
                        width={colWidth}
                        height={cHeight}
                        fill="rgba(13, 148, 136, 0.85)"
                        rx="2"
                      />
                      {/* Pricing Bar (Orange - calculator estimator) */}
                      <rect
                        x={x + colWidth + 4}
                        y={chartHeight - 30 - pHeight}
                        width={colWidth}
                        height={pHeight}
                        fill="#FF7A00"
                        rx="2"
                      />
                      {/* Month Text */}
                      <text
                        x={x + colWidth + 2}
                        y={chartHeight - 12}
                        textAnchor="middle"
                        fill="rgba(15, 23, 42, 0.4)"
                        fontSize="8"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {item.month.split('-')[1]}
                      </text>
                    </g>
                  );
                })}

                {/* Legend Overlay at bottom center */}
                <g transform={`translate(${chartWidth / 2 - 100}, ${chartHeight - 2})`}>
                  <rect x="0" y="-8" width="8" height="8" fill="rgba(13, 148, 136, 0.85)" rx="1" />
                  <text x="12" y="-1" fill="rgba(15, 23, 42, 0.5)" fontSize="7" fontWeight="bold">General Contacts</text>

                  <rect x="100" y="-8" width="8" height="8" fill="#FF7A00" rx="1" />
                  <text x="112" y="-1" fill="rgba(15, 23, 42, 0.5)" fontSize="7" fontWeight="bold">Pricing Quotes</text>
                </g>
              </svg>
            ) : (
              <div className="h-40 flex items-center justify-center text-[10px] text-slate-400 font-bold">Awaiting inquiries...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
