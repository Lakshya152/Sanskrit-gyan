import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { theme } from '../../theme/theme';
import { CheckIcon, WarningIcon, InfoIcon, CloseIcon } from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Snackbar Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Global notification component that slides from bottom.
 * Types: info, success, error
 */
const Snackbar = () => {
  const { snackbar, hideSnackbar } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (snackbar.isOpen) {
      // Slight delay for smooth entrance animation
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [snackbar.isOpen]);

  if (!snackbar.isOpen) return null;

  const typeConfig = {
    info: {
      icon: <InfoIcon size={20} color={theme.colors.primary} />,
      color: theme.colors.primary,
      background: 'rgba(244, 168, 37, 0.15)',
    },
    success: {
      icon: <CheckIcon size={20} color={theme.colors.success} />,
      color: theme.colors.success,
      background: 'rgba(46, 204, 113, 0.15)',
    },
    error: {
      icon: <WarningIcon size={20} color={theme.colors.error} />,
      color: theme.colors.error,
      background: 'rgba(231, 76, 60, 0.15)',
    },
  };

  const config = typeConfig[snackbar.type] || typeConfig.info;

  const snackbarStyles = {
    position: 'fixed',
    bottom: isVisible ? '24px' : '-100px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 99999,
    maxWidth: '90%',
    width: 'auto',
    minWidth: '280px',
    background: theme.colors.surface,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: `1px solid ${config.color}`,
    borderRadius: theme.borderRadius.lg,
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${config.color}40`,
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    transition: `bottom ${theme.animations.smooth}, opacity ${theme.animations.smooth}`,
    opacity: isVisible ? 1 : 0,
  };

  const iconContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: theme.borderRadius.full,
    background: config.background,
    flexShrink: 0,
  };

  const messageStyles = {
    flex: 1,
    color: theme.colors.textMain,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    lineHeight: '1.4',
  };

  const closeButtonStyles = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.full,
    transition: `background ${theme.animations.fast}`,
    flexShrink: 0,
  };

  return (
    <div style={snackbarStyles}>
      <div style={iconContainerStyles}>
        {config.icon}
      </div>
      <div style={messageStyles}>
        {snackbar.message}
      </div>
      <button
        style={closeButtonStyles}
        onClick={hideSnackbar}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <CloseIcon size={18} color={theme.colors.textMuted} />
      </button>
    </div>
  );
};

export default Snackbar;
