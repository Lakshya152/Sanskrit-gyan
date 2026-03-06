import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 History API Navigation Hook
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Manages route state using native pushState.
 * Enables Android hardware back button support in PWA mode.
 */
const useNavigation = () => {
  const { hasCompletedOnboarding, userProfile } = useAppContext();

  // Determine initial route
  const getInitialRoute = () => {
    // We start at splash, which will auto-transition.
    // The actual "home" logic is handled after splash finishes.
    return 'splash';
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);

  // Handle native back button (popstate event)
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.route) {
        setCurrentRoute(event.state.route);
      } else {
        // Fallback if no state
        if (hasCompletedOnboarding && userProfile) {
          setCurrentRoute('home');
        } else {
          setCurrentRoute('language');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasCompletedOnboarding, userProfile]);

  /**
   * Navigate to a new route and push it to browser history
   * @param {string} route - The target route name
   */
  const navigate = useCallback((route) => {
    // Prevent pushing the exact same route multiple times
    if (currentRoute === route) return;

    window.history.pushState({ route }, '', `/${route}`);
    setCurrentRoute(route);
    
    // Scroll to top on navigation to simulate native app feel
    window.scrollTo(0, 0);
  }, [currentRoute]);

  /**
   * Go back in history
   */
  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  /**
   * Replace current route without adding to history (good for redirects)
   * @param {string} route - The target route name
   */
  const replace = useCallback((route) => {
    window.history.replaceState({ route }, '', `/${route}`);
    setCurrentRoute(route);
    window.scrollTo(0, 0);
  }, []);

  return {
    currentRoute,
    navigate,
    goBack,
    replace
  };
};

export default useNavigation;
