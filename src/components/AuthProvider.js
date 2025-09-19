'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthProvider({ children }) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Check authentication once when the app loads
    checkAuth();
  }, [checkAuth]);

  return children;
}