'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsService } from '@/services/api';

export const usePageView = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      // Post pageview event to database via backend analytics
      analyticsService.logPageView(pathname).catch((err) => {
        console.error('Failed to log pageview analytics:', err);
      });
    }
  }, [pathname]);
};
