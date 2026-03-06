import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';
import useNavigation from '../../hooks/useNavigation';
import OmLogo from '../../assets/OmLogo';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';
import { CheckIcon } from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Language Selection Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * First-time user flow: Select language from 6 supported options.
 * Language applies to UI and AI responses.
 */
const LanguageSelection = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const { navigate } = useNavigation();
  const [selectedLang, setSelectedLang] = useState(currentLanguage);

  const handleLanguageSelect = (langCode) => {
    setSelectedLang(langCode);
  };

  const handleContinue = () => {
    setCurrentLanguage(selectedLang);
    navigate('onboarding');
  };

  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: `radial-gradient(ellipse at center, ${theme.colors.surfaceHighlight} 0%, ${theme.colors.background} 70%)`,
    padding: theme.spacing.xl,
    overflow: 'auto',
  };

  const contentStyles = {
    maxWidth: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xl,
    animation: 'fadeInUp 0.8s ease-out',
  };

  const headerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.md,
  };

  const titleStyles = {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    textAlign: 'center',
  };

  const subtitleStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: '1.5',
  };

  const languageGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing.md,
  };

  const languageCardStyles = (isSelected) => ({
    position: 'relative',
    padding: theme.spacing.lg,
    textAlign: 'center',
    cursor: 'pointer',
    transition: `all ${theme.animations.fast}`,
    border: isSelected 
      ? `2px solid ${theme.colors.primary}` 
      : `1px solid ${theme.colors.borderGlow}`,
    background: isSelected 
      ? 'rgba(244, 168, 37, 0.1)' 
      : theme.colors.surface,
  });

  const checkIconContainerStyles = {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: '24px',
    height: '24px',
    borderRadius: theme.borderRadius.full,
    background: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const nativeNameStyles = {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textMain,
    marginBottom: theme.spacing.xs,
  };

  const englishNameStyles = {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textMuted,
  };

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        {/* Header */}
        <div style={headerStyles}>
          <OmLogo size={80} animate={false} />
          <h1 style={titleStyles}>
            Choose Your Language
          </h1>
          <p style={subtitleStyles}>
            Select the language for your spiritual journey
          </p>
        </div>

        {/* Language Grid */}
        <div style={languageGridStyles}>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <GlassCard
                key={lang.code}
                style={languageCardStyles(isSelected)}
                onClick={() => handleLanguageSelect(lang.code)}
                glowOnHover={!isSelected}
              >
                {isSelected && (
                  <div style={checkIconContainerStyles}>
                    <CheckIcon size={16} color="#fff" />
                  </div>
                )}
                <div style={nativeNameStyles}>
                  {lang.nativeName}
                </div>
                <div style={englishNameStyles}>
                  {lang.name}
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Continue Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
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

export default LanguageSelection;
