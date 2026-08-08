'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, FolderGit, Cpu, Inbox, 
  Image as ImageIcon, Settings, LogOut, User as UserIcon 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects CRUD', path: '/admin/projects', icon: FolderGit },
    { name: 'Services CRUD', path: '/admin/services', icon: Cpu },
    { name: 'Inquiries Feed', path: '/admin/inquiries', icon: Inbox },
    { name: 'Media Manager', path: '/admin/media', icon: ImageIcon },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-[#1E1B4B] border-r border-[#D4A017]/20 flex flex-col justify-between min-h-screen text-xs select-none text-[#FFF8F0]">
      {/* Upper Logo & Menu */}
      <div className="flex-grow">
        {/* Brand Logo Header */}
        <div className="h-20 border-b border-[#D4A017]/20 flex items-center px-6 space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-[#C96A00]/40 bg-[#C96A00]/10 text-[#C96A00]">
            <Cpu className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wider text-[#D4A017]">YUKTI</span>
            <span className="text-[8px] uppercase tracking-[0.2em] -mt-1 text-[#FFF8F0]/70">Console Panel</span>
          </div>
        </div>

        {/* User Card */}
        {user && (
          <div className="p-5 border-b border-[#D4A017]/10 flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-[#C96A00]/20 border border-[#D4A017]/40 flex items-center justify-center text-[#D4A017]">
              <UserIcon className="h-4 w-4" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-[#FFF8F0] truncate">{user.first_name} {user.last_name}</span>
              <span className="text-[9px] uppercase text-[#D4A017] tracking-widest font-bold font-mono">{user.role}</span>
            </div>
          </div>
        )}

        {/* Menu Nav Links */}
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded transition-all duration-200 font-medium ${
                  active
                    ? 'admin-nav-active'
                    : 'text-muted hover:text-foreground hover:bg-[rgba(255,255,255,0.02)]'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? 'text-primary' : 'text-muted'}`} />
                <span className="tracking-wide text-xs">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-[rgba(197,168,128,0.06)]">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 text-muted hover:text-red-400 px-4 py-3 rounded hover:bg-red-500/5 transition-all duration-200 font-medium cursor-pointer text-left"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          <span className="tracking-wide text-xs">Logout Session</span>
        </button>
      </div>
    </aside>
  );
};
export default AdminSidebar;
