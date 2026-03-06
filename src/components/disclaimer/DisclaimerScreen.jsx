import React from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../common/Header';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import OmLogo from '../../assets/OmLogo';
import { WarningIcon } from '../../assets/icons';
import useNavigation from '../../hooks/useNavigation';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Disclaimer Screen Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Full-screen disclaimer regarding AI usage.
 * Strictly required: "This app is AI supported, there may be some errors in it."
 */
const DisclaimerScreen = () => {
  const { t } = useLanguage();
  const { goBack } = useNavigation();

  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: theme.colors.background,
    paddingTop: '64px',
  };

  const contentStyles = {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
    WebkitOverflowScrolling: 'touch',
  };

  const iconContainerStyles = {
    marginTop: theme.spacing.lg,
    animation: 'omPulse 3s infinite',
  };

  const titleStyles = {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    textAlign: 'center',
    animation: 'fadeInUp 0.6s ease-out',
  };

  const textSectionStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    animation: 'fadeInUp 0.8s ease-out',
  };

  const paragraphStyles = {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMain,
    lineHeight: '1.8',
    textAlign: 'center',
    opacity: 0.9,
  };

  const highlightCardStyles = {
    background: 'rgba(211, 84, 0, 0.1)',
    border: `1px solid ${theme.colors.primaryDeep}40`,
    padding: theme.spacing.lg,
    textAlign: 'center',
  };

  const warningTextStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    lineHeight: '1.4',
  };

  return (
    <div style={containerStyles}>
      <Header title={t('disclaimer.title')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        <div style={iconContainerStyles}>
          <OmLogo size={80} />
        </div>

        <h1 style={titleStyles}>{t('disclaimer.title')}</h1>

        <div style={textSectionStyles}>
          <p style={paragraphStyles}>
            Welcome to this digital sanctuary of Sanskrit wisdom. As you embark on your journey through the systematic beauty of grammar, we ask you to hold this understanding in your heart.
          </p>

          <GlassCard style={highlightCardStyles}>
            <div style={warningTextStyles}>
              <WarningIcon size={24} color={theme.colors.primary} />
              {t('disclaimer.text')}
            </div>
          </GlassCard>

          <p style={paragraphStyles}>
            The intelligence guiding this experience is an artificial creation. While it strives for the precision of Pāṇini and the depth of the Upanishads, it is not infallible. 
          </p>
          
          <p style={paragraphStyles}>
            For absolute scriptural authority, we encourage you to consult traditional human Gurus and ancient primary manuscripts. This app is a tool for reflection and guidance, not a final legal or medical decree.
          </p>
        </div>

        <div style={{ marginTop: theme.spacing.xl, width: '100%', maxWidth: '280px', animation: 'fadeInUp 1s ease-out' }}>
          <Button 
            variant="primary" 
            fullWidth 
            onClick={() => goBack()}
            size="lg"
          >
            {t('disclaimer.accept')}
          </Button>
        </div>

        <div style={{ 
          marginTop: theme.spacing.xxl, 
          color: theme.colors.textMuted, 
          fontSize: '11px',
          textAlign: 'center',
          opacity: 0.5
        }}>
          Knowledge is a river; may your journey be peaceful.
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes omPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default DisclaimerScreen;
