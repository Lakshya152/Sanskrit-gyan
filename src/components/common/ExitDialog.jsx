import React from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';
import { WarningIcon } from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Exit Dialog Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Confirmation dialog shown when user attempts to exit the app.
 * Triggered by double back-press on Home screen.
 */
const ExitDialog = ({ isOpen, onCancel, onConfirm }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: theme.spacing.lg,
    animation: 'fadeIn 0.3s ease-out',
  };

  const dialogStyles = {
    background: theme.colors.surface,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: `1px solid ${theme.colors.borderGlow}`,
    borderRadius: theme.borderRadius.xl,
    boxShadow: `0 12px 40px rgba(0, 0, 0, 0.6)`,
    padding: theme.spacing.xl,
    maxWidth: '360px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    animation: 'slideUp 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  };

  const iconContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: theme.borderRadius.full,
    background: 'rgba(244, 168, 37, 0.15)',
    margin: '0 auto',
  };

  const titleStyles = {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  };

  const messageStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: '1.5',
  };

  const buttonContainerStyles = {
    display: 'flex',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  };

  return (
    <>
      <div style={overlayStyles} onClick={onCancel}>
        <div style={dialogStyles} onClick={(e) => e.stopPropagation()}>
          <div style={iconContainerStyles}>
            <WarningIcon size={32} color={theme.colors.primary} />
          </div>

          <h2 style={titleStyles}>
            {t('exit.title')}
          </h2>

          <p style={messageStyles}>
            {t('exit.message')}
          </p>

          <div style={buttonContainerStyles}>
            <Button
              variant="secondary"
              fullWidth
              onClick={onCancel}
            >
              {t('common.no')}
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={onConfirm}
            >
              {t('common.yes')}
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(40px);
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

export default ExitDialog;
