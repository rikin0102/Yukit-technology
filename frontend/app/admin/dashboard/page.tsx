'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, FolderGit, Cpu, Inbox, 
  Activity, Eye, CheckCircle2, AlertCircle 
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
        <h1 className="text-2xl font-bold text-foreground">Console Metrics</h1>
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Console Metrics</h1>
        <div className="p-4 rounded border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>Failed to load internal metrics: {error?.message || 'Check database connection.'}</span>
        </div>
      </div>
    );
  }

  const { summary, inquiry_trends, traffic_trends_30d, activity_logs } = data;

  const cardItems = [
    { name: 'Total Projects', value: summary.counts.projects, icon: FolderGit, detail: 'Published case studies' },
    { name: 'Service Capabilities', value: summary.counts.services, icon: Cpu, detail: 'Active capability listings' },
    { name: 'Contact Inquiries', value: summary.counts.contact_inquiries.total, icon: Inbox, detail: `${summary.counts.contact_inquiries.new} new messages` },
    { name: 'Unique Visitors (30d)', value: summary.traffic.unique_visitors_30d, icon: Users, detail: `${summary.traffic.pageviews_30d} total pageviews` },
  ];

  // SVG Chart Dimensions
  const chartWidth = 500;
  const chartHeight = 180;
  
  // 1. Process Pageview SVG coordinates
  const trafficPoints = traffic_trends_30d || [];
  const maxTrafficViews = Math.max(...trafficPoints.map(p => p.views), 10);
  const trafficSvgPath = trafficPoints.length > 1
    ? trafficPoints.map((p, idx) => {
        const x = (idx / (trafficPoints.length - 1)) * (chartWidth - 40) + 20;
        const y = chartHeight - ((p.views / maxTrafficViews) * (chartHeight - 40) + 20);
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ')
    : '';

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(197,168,128,0.1)] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Console Metrics</h1>
          <p className="text-xs text-muted mt-1">Real-time platform traffic, case metrics, and transaction logs.</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-emerald-400 text-[10px] font-bold tracking-wider uppercase">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span>Monitor Active</span>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cardItems.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="glass-panel rounded-xl p-6 space-y-4 border border-[rgba(197,168,128,0.1)]">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted">{card.name}</span>
                <div className="h-8 w-8 rounded bg-[rgba(197,168,128,0.04)] border border-[rgba(197,168,128,0.15)] flex items-center justify-center text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-foreground font-mono">{card.value}</p>
                <p className="text-[10px] text-muted">{card.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pageview Chart */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Pageviews Traffic (Past 30 Days)</h3>
              <p className="text-[10px] text-muted">Daily hit counts across all routes</p>
            </div>
            <Eye className="h-4.5 w-4.5 text-primary" />
          </div>
          
          <div className="w-full overflow-hidden border border-white/5 rounded bg-black/30 p-2 flex justify-center">
            {trafficPoints.length > 1 ? (
              <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
                {/* Horizontal Guide lines */}
                {[0, 0.5, 1].map((r, idx) => (
                  <line
                    key={idx}
                    x1="20"
                    y1={20 + r * (chartHeight - 40)}
                    x2={chartWidth - 20}
                    y2={20 + r * (chartHeight - 40)}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Gradient Fill under line */}
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c5a880" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#c5a880" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Svg Path */}
                <path
                  d={trafficSvgPath}
                  fill="none"
                  stroke="#c5a880"
                  strokeWidth="2"
                />

                {/* Area under path */}
                {trafficPoints.length > 1 && (
                  <path
                    d={`${trafficSvgPath} L ${(chartWidth - 40) + 20} ${chartHeight - 20} L 20 ${chartHeight - 20} Z`}
                    fill="url(#chartGlow)"
                  />
                )}

                {/* Dot markers on start/end */}
                <circle
                  cx={20}
                  cy={chartHeight - ((trafficPoints[0].views / maxTrafficViews) * (chartHeight - 40) + 20)}
                  r="3.5"
                  fill="#c5a880"
                />
                <circle
                  cx={chartWidth - 20}
                  cy={chartHeight - ((trafficPoints[trafficPoints.length - 1].views / maxTrafficViews) * (chartHeight - 40) + 20)}
                  r="3.5"
                  fill="#c5a880"
                />
              </svg>
            ) : (
              <div className="h-40 flex items-center justify-center text-[10px] text-muted">Awaiting traffic telemetry...</div>
            )}
          </div>
        </div>

        {/* Inquiries Chart */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Inquiry Submissions (6 Months)</h3>
              <p className="text-[10px] text-muted">Volume breakout of contact vs calculator proposals</p>
            </div>
            <Inbox className="h-4.5 w-4.5 text-primary" />
          </div>

          <div className="w-full overflow-hidden border border-white/5 rounded bg-black/30 p-2 flex justify-center">
            {inquiry_trends.length > 0 ? (
              <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
                {/* Horizontal Guide lines */}
                {[0, 0.5, 1].map((r, idx) => (
                  <line
                    key={idx}
                    x1="20"
                    y1={20 + r * (chartHeight - 40)}
                    x2={chartWidth - 20}
                    y2={20 + r * (chartHeight - 40)}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="1"
                  />
                ))}

                {/* Draw Bar Columns */}
                {inquiry_trends.map((item, idx) => {
                  const colWidth = 25;
                  const x = (idx / inquiry_trends.length) * (chartWidth - 60) + 40;
                  const maxInquiries = Math.max(...inquiry_trends.map(t => t.contact + t.pricing), 5);
                  
                  const cHeight = ((item.contact) / maxInquiries) * (chartHeight - 60);
                  const pHeight = ((item.pricing) / maxInquiries) * (chartHeight - 60);

                  return (
                    <g key={idx}>
                      {/* Contact Bar (Obsidian light) */}
                      <rect
                        x={x}
                        y={chartHeight - 30 - cHeight}
                        width={colWidth}
                        height={cHeight}
                        fill="rgba(197, 168, 128, 0.4)"
                        rx="2"
                      />
                      {/* Pricing Bar (Gold) */}
                      <rect
                        x={x + 5}
                        y={chartHeight - 30 - pHeight - cHeight}
                        width={colWidth}
                        height={pHeight}
                        fill="#c5a880"
                        rx="2"
                      />
                      {/* Month Text */}
                      <text
                        x={x + colWidth / 2}
                        y={chartHeight - 10}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.3)"
                        fontSize="8"
                        fontFamily="monospace"
                      >
                        {item.month.split('-')[1]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="h-40 flex items-center justify-center text-[10px] text-muted">Awaiting inquiries...</div>
            )}
          </div>
        </div>
      </div>

      {/* Activity / Audit Logs Feed */}
      <div className="glass-panel rounded-xl p-6 space-y-4">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Internal Audit & System Logs</h3>
        <div className="border border-white/5 rounded overflow-hidden">
          <div className="max-h-80 overflow-y-auto divide-y divide-white/5 font-mono text-[10px] text-muted">
            {activity_logs.map((log) => {
              const isEventForm = log.event_type === 'INQUIRY_SUBMISSION';
              return (
                <div key={log.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-white/[0.01] transition-all">
                  <div className="flex items-start space-x-3">
                    <span className="text-primary font-bold">[{log.created_at}]</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono shrink-0 ${
                      isEventForm ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {log.event_type}
                    </span>
                    <span className="text-foreground truncate max-w-sm">
                      {isEventForm ? `Inquiry submission on ${log.path}` : `Pageview hit on path ${log.path}`}
                    </span>
                  </div>
                  <div className="text-right text-[8px] text-muted truncate max-w-xs">
                    {JSON.stringify(log.details)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
