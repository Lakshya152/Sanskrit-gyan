import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Snackbar Utility Hook
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Provides a clean interface for triggering global notifications.
 */
const useSnackbar = () => {
  const { showSnackbar } = useAppContext();

  const info = useCallback((message) => {
    showSnackbar(message, 'info');
  }, [showSnackbar]);

  const success = useCallback((message) => {
    showSnackbar(message, 'success');
  }, [showSnackbar]);

  const error = useCallback((message) => {
    showSnackbar(message, 'error');
  }, [showSnackbar]);

  return { info, success, error };
};

export default useSnackbar;
