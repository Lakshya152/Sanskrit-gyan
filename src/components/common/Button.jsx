import React from 'react';
import { theme } from '../../theme/theme';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Button Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Primary button with deep saffron gradient and large rounded corners.
 * Supports: primary, secondary, outline, ghost variants.
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  size = 'md',
  icon = null,
  style = {},
  className = '',
  type = 'button',
  ...props
}) => {
  const sizeMap = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.sizes.sm,
    },
    md: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.sizes.md,
    },
    lg: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
      fontSize: theme.typography.sizes.lg,
    }
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #d35400 0%, #a04000 100%)',
      color: theme.colors.textMain,
      border: 'none',
      boxShadow: theme.shadows.button,
    },
    secondary: {
      background: theme.colors.surface,
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.borderGlow}`,
      boxShadow: theme.shadows.glow,
    },
    outline: {
      background: 'transparent',
      color: theme.colors.primary,
      border: `2px solid ${theme.colors.primary}`,
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: theme.colors.textMuted,
      border: 'none',
      boxShadow: 'none',
    }
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.weights.semiBold,
    borderRadius: theme.borderRadius.full,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${theme.animations.fast}`,
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    outline: 'none',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    ...sizeMap[size],
    ...variantStyles[variant],
    ...style,
  };

  const handleClick = (e) => {
    if (disabled) return;

    // Haptic feedback-like scale animation
    e.currentTarget.style.transform = 'scale(0.96)';
    setTimeout(() => {
      e.currentTarget.style.transform = 'scale(1)';
    }, 150);

    if (onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(211, 84, 0, 0.4)';
    } else if (variant === 'outline') {
      e.currentTarget.style.background = 'rgba(244, 168, 37, 0.1)';
    }
  };

  const handleMouseLeave = (e) => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.boxShadow = theme.shadows.button;
    } else if (variant === 'outline') {
      e.currentTarget.style.background = 'transparent';
    }
  };

  return (
    <button
      type={type}
      className={`app-button ${className}`}
      style={baseStyles}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
