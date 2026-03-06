import React, { useEffect } from 'react';
import { theme } from '../../theme/theme';
import { useAppContext } from '../../context/AppContext';
import useNavigation from '../../hooks/useNavigation';
import OmLogo from '../../assets/OmLogo';
import { delay } from '../../utils/helpers';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Splash Screen Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * First screen shown on app launch.
 * Displays Om logo with animation and auto-transitions.
 */
const SplashScreen = () => {
  const { hasCompletedOnboarding, userProfile } = useAppContext();
  const { navigate, replace } = useNavigation();

  useEffect(() => {
    const initializeApp = async () => {
      // Show splash for minimum 2 seconds for brand experience
      await delay(2000);

      // Determine where to navigate based on app state
      if (!hasCompletedOnboarding || !userProfile) {
        // First-time user: Go to language selection
        replace('language');
      } else {
        // Returning user: Go directly to home
        replace('home');
      }
    };

    initializeApp();
  }, [hasCompletedOnboarding, userProfile, replace]);

  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: `radial-gradient(ellipse at center, ${theme.colors.surfaceHighlight} 0%, ${theme.colors.background} 70%, #0d0500 100%)`,
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeIn 1s ease-out',
  };

  const logoContainerStyles = {
    animation: 'zoomIn 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
  };

  const appNameStyles = {
    marginTop: theme.spacing.xl,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    textAlign: 'center',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    animation: 'fadeInUp 1.5s ease-out 0.5s both',
  };

  const taglineStyles = {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textMuted,
    textAlign: 'center',
    animation: 'fadeInUp 1.5s ease-out 0.8s both',
  };

  return (
    <div style={containerStyles}>
      <div style={logoContainerStyles}>
        <OmLogo size={140} animate={true} />
      </div>

      <h1 style={appNameStyles}>
        Sanskrit Grammar
      </h1>

      <p style={taglineStyles}>
        Words & Grammar Guidance
      </p>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
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
    </div>
  );
};

export default SplashScreen;
