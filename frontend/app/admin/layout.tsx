'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // If auth loading finished, and user is not logged in, redirect to login page
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
    
    // Redirect if they have the VIEWER role and are not allowed in the admin console
    // Only ADMIN and EDITOR are allowed
    if (!isLoading && isAuthenticated && user && user.role === 'VIEWER' && !isLoginPage) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, isLoginPage, router, user]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-background text-foreground flex flex-col">{children}</div>;
  }

  // Show a full-screen Obsidian loader if credentials are still resolving
  if (isLoading || !isAuthenticated || (user && user.role === 'VIEWER')) {
    return (
      <div className="min-h-screen bg-[#060608] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-muted block">Authorizing Credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] flex text-foreground">
      {/* Sidebar Navigation */}
      <AdminSidebar />
      
      {/* Main Console Content */}
      <main className="flex-1 min-h-screen overflow-y-auto bg-[#040406] p-8 md:p-12">
        {children}
      </main>
    </div>
  );
}
