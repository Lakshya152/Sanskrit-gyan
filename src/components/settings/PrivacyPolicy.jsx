import React from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../common/Header';
import GlassCard from '../common/GlassCard';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Privacy Policy Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays data usage and privacy terms.
 * Required for Play Store safety and transparency.
 */
const PrivacyPolicy = () => {
  const { t } = useLanguage();

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
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    WebkitOverflowScrolling: 'touch',
  };

  const sectionStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    animation: 'fadeInUp 0.6s ease-out',
  };

  const sectionTitleStyles = {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  };

  const textStyles = {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMain,
    lineHeight: '1.6',
    opacity: 0.9,
  };

  const listStyles = {
    paddingLeft: theme.spacing.lg,
    color: theme.colors.textMain,
    lineHeight: '1.8',
  };

  return (
    <div style={containerStyles}>
      <Header title={t('settings.privacyPolicy')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        <GlassCard padding="lg">
          <div style={sectionStyles}>
            <h2 style={sectionTitleStyles}>Our Sacred Commitment</h2>
            <p style={textStyles}>
              Your journey into Sanskrit grammar and spiritual wisdom is private. This policy explains how we handle the information you provide within the app.
            </p>
          </div>

          <div style={{ ...sectionStyles, marginTop: theme.spacing.xl }}>
            <h2 style={sectionTitleStyles}>1. Information We Collect</h2>
            <p style={textStyles}>
              We collect minimal information to personalize your experience:
            </p>
            <ul style={listStyles}>
              <li><strong>Profile Data:</strong> Your name, date of birth, and gender are stored locally on your device.</li>
              <li><strong>Chat History:</strong> Your conversations with the AI Guru are stored locally in your browser's storage.</li>
              <li><strong>Images:</strong> Images uploaded for Vision analysis are processed and not permanently stored on our servers.</li>
            </ul>
          </div>

          <div style={{ ...sectionStyles, marginTop: theme.spacing.xl }}>
            <h2 style={sectionTitleStyles}>2. How We Use Data</h2>
            <p style={textStyles}>
              Data is used strictly for:
            </p>
            <ul style={listStyles}>
              <li>Personalizing the AI Guru's tone and response style.</li>
              <li>Translating and analyzing Sanskrit text.</li>
              <li>Maintaining your app preferences (like language).</li>
            </ul>
          </div>

          <div style={{ ...sectionStyles, marginTop: theme.spacing.xl }}>
            <h2 style={sectionTitleStyles}>3. AI Processing</h2>
            <p style={textStyles}>
              This app uses <strong>OpenRouter API</strong> to provide AI reasoning and vision analysis. When you chat or upload an image, the content is sent to OpenRouter's servers for processing. No personal identifiers (like your email or IP) are linked to these requests by the app.
            </p>
          </div>

          <div style={{ ...sectionStyles, marginTop: theme.spacing.xl }}>
            <h2 style={sectionTitleStyles}>4. Your Control</h2>
            <p style={textStyles}>
              You have full control over your data. You can clear all app data, including your profile and chat history, at any time through the **Settings > Danger Zone** section.
            </p>
          </div>

          <div style={{ ...sectionStyles, marginTop: theme.spacing.xl }}>
            <h2 style={sectionTitleStyles}>5. Contact</h2>
            <p style={textStyles}>
              If you have questions about this sacred digital space, please contact us through the app store support.
            </p>
          </div>
        </GlassCard>

        <div style={{ 
          textAlign: 'center', 
          padding: theme.spacing.lg,
          color: theme.colors.textMuted,
          fontSize: theme.typography.sizes.xs 
        }}>
          Last Updated: October 2023
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
