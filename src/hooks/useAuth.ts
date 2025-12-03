'use client';

import { useAuth } from '@/context/AuthContext';

export const useAdminAuth = () => {
  const { admin, loading, login, register, logout, isAuthenticated } = useAuth();
  
  return {
    admin,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };
};