import React from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import useNavigation from '../../hooks/useNavigation';
import useBackHandler from '../../hooks/useBackHandler';
import Header from '../common/Header';
import BottomNav from '../common/BottomNav';
import ExitDialog from '../common/ExitDialog';
import GlassCard from '../common/GlassCard';
import FeatureGrid from './FeatureGrid';
import { ChatIcon } from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Home Screen Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Main dashboard after onboarding.
 * Displays: Greeting, AI Chat card, Feature grid, Bottom nav
 */
const HomeScreen = () => {
  const { t } = useLanguage();
  const { userProfile } = useAppContext();
  const { navigate, currentRoute } = useNavigation();
  const { showExitDialog, cancelExit, confirmExit } = useBackHandler('home');

  const userName = userProfile?.name || 'Seeker';

  const handleChatClick = () => {
    navigate('chat');
  };

  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: `radial-gradient(ellipse at top, ${theme.colors.surfaceHighlight} 0%, ${theme.colors.background} 50%)`,
  };

  const contentStyles = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: `${theme.spacing.xl} ${theme.spacing.md} 90px ${theme.spacing.md}`,
    WebkitOverflowScrolling: 'touch',
  };

  const greetingContainerStyles = {
    marginBottom: theme.spacing.xl,
    animation: 'fadeInUp 0.6s ease-out',
  };

  const greetingStyles = {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  };

  const subtitleStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textMuted,
  };

  const chatCardStyles = {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.lg,
    background: `linear-gradient(135deg, rgba(211, 84, 0, 0.2) 0%, rgba(160, 64, 0, 0.1) 100%)`,
    border: `1px solid ${theme.colors.primary}`,
    cursor: 'pointer',
    animation: 'fadeInUp 0.8s ease-out',
  };

  const chatCardContentStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
  };

  const chatIconContainerStyles = {
    width: '56px',
    height: '56px',
    borderRadius: theme.borderRadius.lg,
    background: 'rgba(244, 168, 37, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const chatTextStyles = {
    flex: 1,
  };

  const chatTitleStyles = {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    marginBottom: '4px',
  };

  const chatDescStyles = {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textMuted,
  };

  const sectionTitleStyles = {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textMain,
    marginBottom: theme.spacing.md,
    animation: 'fadeInUp 1s ease-out',
  };

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        {/* Greeting */}
        <div style={greetingContainerStyles}>
          <h1 style={greetingStyles}>
            {t('home.greeting')}, {userName}
          </h1>
          <p style={subtitleStyles}>
            {t('home.subtitle')}
          </p>
        </div>

        {/* AI Chat Card */}
        <GlassCard
          style={chatCardStyles}
          onClick={handleChatClick}
          glowOnHover
        >
          <div style={chatCardContentStyles}>
            <div style={chatIconContainerStyles}>
              <ChatIcon size={28} color={theme.colors.primary} />
            </div>
            <div style={chatTextStyles}>
              <h2 style={chatTitleStyles}>
                {t('home.chatCardTitle')}
              </h2>
              <p style={chatDescStyles}>
                {t('home.chatCardDesc')}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Grammar Features Section */}
        <h2 style={sectionTitleStyles}>
          {t('home.featuresTitle')}
        </h2>
        <FeatureGrid />
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentRoute={currentRoute || 'home'} />

      {/* Exit Dialog */}
      <ExitDialog
        isOpen={showExitDialog}
        onCancel={cancelExit}
        onConfirm={confirmExit}
      />

      <style>{`
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

export default HomeScreen;
