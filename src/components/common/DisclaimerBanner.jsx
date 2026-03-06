import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import { WarningIcon, CloseIcon } from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Disclaimer Banner Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Small persistent/dismissible banner shown on AI-powered screens.
 * Reminds users the app is AI-supported and may contain errors.
 */
const DisclaimerBanner = ({ dismissible = true }) => {
  const { t } = useLanguage();
  const [isDismissed, setIsDismissed] = useState(() => {
    // Check if user dismissed it in this session
    return sessionStorage.getItem('disclaimer_dismissed') === 'true';
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('disclaimer_dismissed', 'true');
  };

  if (isDismissed) return null;

  const bannerStyles = {
    position: 'fixed',
    bottom: '80px', // Above the bottom nav
    left: theme.spacing.md,
    right: theme.spacing.md,
    background: 'rgba(211, 84, 0, 0.15)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${theme.colors.primaryDeep}`,
    borderRadius: theme.borderRadius.lg,
    boxShadow: `0 4px 20px rgba(211, 84, 0, 0.2)`,
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    zIndex: 999,
    animation: 'slideUpBanner 0.4s ease-out',
  };

  const iconContainerStyles = {
    flexShrink: 0,
    marginTop: '2px',
  };

  const textStyles = {
    flex: 1,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textMain,
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
    <>
      <div style={bannerStyles}>
        <div style={iconContainerStyles}>
          <WarningIcon size={16} color={theme.colors.primary} />
        </div>

        <div style={textStyles}>
          {t('disclaimer.text')}
        </div>

        {dismissible && (
          <button
            style={closeButtonStyles}
            onClick={handleDismiss}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label="Dismiss"
          >
            <CloseIcon size={14} color={theme.colors.textMuted} />
          </button>
        )}
      </div>

      <style>{`
        @keyframes slideUpBanner {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default DisclaimerBanner;
