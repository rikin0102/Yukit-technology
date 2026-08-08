'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { AuthProvider } from '@/context/AuthContext';
import { Welcome3DIntro } from '@/components/common/Welcome3DIntro';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Welcome3DIntro />
      </AuthProvider>
    </QueryClientProvider>
  );
};
