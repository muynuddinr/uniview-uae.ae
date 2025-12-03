'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Admin } from '@/types/admin';

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: 'admin' | 'superadmin') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Enhanced auth check with automatic logout
  const checkAuth = async () => {
    try {
      console.log('Checking authentication...');
      const response = await fetch('/api/verify-token', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Auth check response:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Admin data received:', data.admin);
        setAdmin(data.admin);
      } else {
        console.log('Auth check failed, auto-logout triggered');
        // 🔥 AUTO LOGOUT when token is invalid
        setAdmin(null);
        // Clear any stale localStorage
        localStorage.removeItem('auth-state');
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setAdmin(null);
      localStorage.removeItem('auth-state');
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // 🔥 NEW: Periodic auth check every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (admin) { // Only check if user is logged in
        console.log('Periodic auth check running...');
        checkAuth();
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [admin]);

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    
    console.log('Login response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error:', errorData);
      throw new Error(errorData.error || 'Login failed');
    }
    
    const data = await response.json();
    console.log('Login successful, admin:', data.admin);
    
    setAdmin(data.admin);
    router.push('/admin/dashboard');
  };

  const register = async (name: string, email: string, password: string, role: 'admin' | 'superadmin' = 'admin') => {
    console.log('Attempting registration for:', email);
    
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
      credentials: 'include',
    });
    
    console.log('Register response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Registration error:', errorData);
      throw new Error(errorData.error || 'Registration failed');
    }
    
    const data = await response.json();
    console.log('Registration successful, admin:', data.admin);
    
    setAdmin(data.admin);
    router.push('/admin/dashboard');
  };

  const logout = async () => {
    console.log('Logging out...');
    
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear state even if API call fails
      setAdmin(null);
      localStorage.removeItem('auth-state');
      router.push('/admin/login');
    }
  };

  const value = {
    admin,
    loading,
    isAuthenticated: !!admin,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};