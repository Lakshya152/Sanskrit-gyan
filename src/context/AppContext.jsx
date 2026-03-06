import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create the Context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. User Profile State
  // Used strictly to personalize the AI's spiritual tone.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('sanskrit_app_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to parse profile data:", error);
      return null;
    }
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. Onboarding Status
  // Determines if the user sees the Splash -> Onboarding -> Profile flow or goes to Home.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('sanskrit_app_onboarded') === 'true';
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. Global Snackbar State
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    type: 'info', // 'info' | 'success' | 'error'
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Persistence Effects
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('sanskrit_app_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('sanskrit_app_onboarded', hasCompletedOnboarding.toString());
  }, [hasCompletedOnboarding]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Actions
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const updateProfile = useCallback((profileData) => {
    setUserProfile((prev) => ({ ...prev, ...profileData }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setHasCompletedOnboarding(true);
  }, []);

  const showSnackbar = useCallback((message, type = 'info') => {
    setSnackbar({ isOpen: true, message, type });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, isOpen: false }));
    }, 3000);
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Context Payload
  const value = {
    userProfile,
    updateProfile,
    hasCompletedOnboarding,
    completeOnboarding,
    snackbar,
    showSnackbar,
    hideSnackbar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook for consuming context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
