'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/axios';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<User>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    access: null,
    refresh: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const checkUserSession = async () => {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');
    
    if (!access) {
      setState({
        user: null,
        access: null,
        refresh: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return;
    }

    try {
      // Try to fetch me profile
      const response = await api.get('/api/auth/me/');
      if (response.data.status === 'success') {
        const user = response.data.user;
        setState({
          user,
          access,
          refresh,
          isAuthenticated: true,
          isLoading: false,
        });
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error('Profile fetch failed');
      }
    } catch (error) {
      // If error occurs, we let axios interceptor try to refresh.
      // If that failed as well, it cleared localStorage and fired auth_expired
      // If we are here, we can fallback to reading user from storage if offline, or clear.
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        setState({
          user: JSON.parse(cachedUser),
          access,
          refresh,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        logout();
      }
    }
  };

  useEffect(() => {
    checkUserSession();

    // Listen to expiration event from axios
    const handleAuthExpired = () => {
      logout();
    };

    window.addEventListener('auth_expired', handleAuthExpired);
    return () => window.removeEventListener('auth_expired', handleAuthExpired);
  }, []);

  const login = async (username: string, password: string): Promise<User> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await api.post('/api/auth/login/', { username, password });
      const { access, refresh, user } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));

      setState({
        user,
        access,
        refresh,
        isAuthenticated: true,
        isLoading: false,
      });

      return user;
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (data: any): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await api.post('/api/auth/register/', data);
      setState((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setState({
      user: null,
      access: null,
      refresh: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    try {
      const response = await api.put('/api/auth/me/', userData);
      if (response.data.status === 'success') {
        const updatedUser = response.data.user;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setState((prev) => ({
          ...prev,
          user: updatedUser,
        }));
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
