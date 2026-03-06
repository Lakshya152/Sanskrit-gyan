import React from 'react';
import { theme } from '../../theme/theme';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 GlassCard Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Core glassmorphism card used throughout the app.
 * Enforces: large rounded corners, glowing borders, backdrop blur.
 */
const GlassCard = ({
  children,
  onClick,
  style = {},
  padding = 'md',
  className = '',
  glowOnHover = false,
  ...props
}) => {
  const paddingMap = {
    none: '0',
    sm: theme.spacing.sm,
    md: theme.spacing.md,
    lg: theme.spacing.lg,
    xl: theme.spacing.xl,
  };

  const cardStyles = {
    background: theme.colors.surface,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${theme.colors.borderGlow}`,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.glow,
    padding: paddingMap[padding],
    transition: `all ${theme.animations.smooth}`,
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const handleClick = (e) => {
    if (onClick) {
      // Add ripple effect feel with slight scale
      e.currentTarget.style.transform = 'scale(0.98)';
      setTimeout(() => {
        e.currentTarget.style.transform = 'scale(1)';
      }, 150);
      onClick(e);
    }
  };

  const handleMouseEnter = (e) => {
    if (glowOnHover) {
      e.currentTarget.style.borderColor = theme.colors.primary;
      e.currentTarget.style.boxShadow = `0 4px 24px rgba(244, 168, 37, 0.2)`;
    }
  };

  const handleMouseLeave = (e) => {
    if (glowOnHover) {
      e.currentTarget.style.borderColor = theme.colors.borderGlow;
      e.currentTarget.style.boxShadow = theme.shadows.glow;
    }
  };

  return (
    <div
      className={`glass-card ${className}`}
      style={cardStyles}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
