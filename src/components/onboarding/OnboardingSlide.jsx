import React from 'react';
import { theme } from '../../theme/theme';
import { BookIcon, GuruIcon } from '../../assets/icons';
import OmLogo from '../../assets/OmLogo';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Onboarding Slide Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Individual slide within the onboarding carousel.
 * Displays icon, title, and description.
 */
const OnboardingSlide = ({ icon, title, description }) => {
  // Map icon string to actual icon component
  const iconComponents = {
    om: <OmLogo size={100} animate={false} />,
    book: <BookIcon size={80} color={theme.colors.primary} />,
    guru: <GuruIcon size={80} color={theme.colors.primary} />,
  };

  const slideStyles = {
    width: '100%',
    height: '100%',
    minWidth: '100%', // Ensures each slide takes exactly full width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    textAlign: 'center',
    gap: theme.spacing.xl,
  };

  const iconContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    animation: 'float 3s ease-in-out infinite',
  };

  const titleStyles = {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    maxWidth: '320px',
  };

  const descriptionStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textMuted,
    lineHeight: '1.6',
    maxWidth: '360px',
  };

  return (
    <div style={slideStyles}>
      <div style={iconContainerStyles}>
        {iconComponents[icon] || iconComponents.om}
      </div>

      <h2 style={titleStyles}>
        {title}
      </h2>

      <p style={descriptionStyles}>
        {description}
      </p>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default OnboardingSlide;
