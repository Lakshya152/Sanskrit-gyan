import React from 'react';
import { theme } from '../../theme/theme';
import GlassCard from '../common/GlassCard';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Feature Card Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Individual feature card in the Home grid.
 * Supports Sanskrit text icons and SVG component icons.
 */
const FeatureCard = ({ 
  label, 
  icon, 
  iconType = 'text', 
  color = '#f4a825', 
  onClick, 
  index = 0 
}) => {
  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    cursor: 'pointer',
    minHeight: '130px',
    animation: `cardEntrance 0.5s ease-out ${index * 0.08}s both`,
    transition: `all ${theme.animations.fast}`,
  };

  const iconContainerStyles = {
    width: '56px',
    height: '56px',
    borderRadius: theme.borderRadius.lg,
    background: `${color}15`,
    border: `1px solid ${color}30`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `all ${theme.animations.fast}`,
  };

  const textIconStyles = {
    fontSize: '28px',
    fontWeight: theme.typography.weights.bold,
    color: color,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    lineHeight: 1,
  };

  const labelStyles = {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textMain,
    textAlign: 'center',
    lineHeight: '1.3',
    wordBreak: 'break-word',
  };

  const renderIcon = () => {
    if (iconType === 'component') {
      return icon;
    }
    return <span style={textIconStyles}>{icon}</span>;
  };

  return (
    <>
      <GlassCard
        style={cardStyles}
        onClick={onClick}
        glowOnHover
      >
        <div style={iconContainerStyles}>
          {renderIcon()}
        </div>
        <span style={labelStyles}>
          {label}
        </span>
      </GlassCard>

      <style>{`
        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default FeatureCard;
