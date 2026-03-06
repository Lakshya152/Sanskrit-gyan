import { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Double-Back to Exit Hook
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Handles the logic for exiting the PWA safely.
 * Only active when the user is on the 'home' route.
 */
const useBackHandler = (currentRoute) => {
  const { showSnackbar } = useAppContext();
  const { t } = useLanguage();
  const [backPressCount, setBackPressCount] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Reset counter when route changes
  useEffect(() => {
    setBackPressCount(0);
  }, [currentRoute]);

  const handleBackPress = useCallback((e) => {
    // We only care about trapping the back button on the Home screen
    if (currentRoute === 'home') {
      e.preventDefault();
      
      if (backPressCount === 0) {
        // First press: Show toast and increment counter
        showSnackbar(t('exit.toast') || 'Press back again to exit', 'info');
        setBackPressCount(1);
        
        // Push a dummy state to history so the browser doesn't actually exit yet
        window.history.pushState(null, '', window.location.href);

        // Reset counter after 2.5 seconds
        setTimeout(() => {
          setBackPressCount(0);
        }, 2500);
      } else if (backPressCount === 1) {
        // Second press within 2.5s: Show the exit confirmation dialog
        setShowExitDialog(true);
        setBackPressCount(0); // Reset
      }
    }
  }, [currentRoute, backPressCount, showSnackbar, t]);

  useEffect(() => {
    // Intercept the browser back button
    window.addEventListener('popstate', handleBackPress);
    return () => {
      window.removeEventListener('popstate', handleBackPress);
    };
  }, [handleBackPress]);

  // Expose dialog controls to the UI
  const cancelExit = () => setShowExitDialog(false);
  const confirmExit = () => {
    setShowExitDialog(false);
    // In a PWA, we can't truly "close" the app, but we can try to close the window
    // or fallback to navigating to a blank/thank you state.
    // The most reliable PWA exit trick is sending them back beyond the app history:
    window.history.go(-10); // Attempts to close/exit the webview
    
    // Fallback: Just close window if permitted by OS
    setTimeout(() => {
      window.close();
    }, 100);
  };

  return {
    showExitDialog,
    cancelExit,
    confirmExit
  };
};

export default useBackHandler;
