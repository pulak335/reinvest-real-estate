import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  setLoading,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  clearError,
} from '@/store/slices/authSlice';

/**
 * Custom hook for managing authentication
 * @returns {object} Auth state and actions
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    loading,
    error,
    sessionId,
  } = useSelector((state) => state.auth);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      dispatch(loginStart());
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      dispatch(loginSuccess({
        user: data.user,
        sessionId: data.sessionId,
      }));

      return { success: true, user: data.user };
    } catch (err) {
      dispatch(loginFailure(err.message));
      return { success: false, error: err.message };
    }
  }, [dispatch]);

  // Logout function
  const logoutUser = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      dispatch(logout());
    }
  }, [dispatch]);

  // Check current user session
  const checkAuth = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      
      const response = await fetch('/api/auth/user');
      
      if (response.ok) {
        const data = await response.json();
        dispatch(setUser({
          user: data.user,
          sessionId: data.sessionId,
        }));
      } else {
        dispatch(logout());
      }
    } catch (err) {
      dispatch(logout());
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Clear error
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    sessionId,
    
    // Actions
    login,
    logout: logoutUser,
    checkAuth,
    clearError: clearAuthError,
  };
};

export default useAuth;