import React from 'react';
import { theme } from '../../theme/theme';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Loading Spinner Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Spiritual loading animation with rotating Om symbol.
 * Used during AI calls and screen transitions.
 */
const LoadingSpinner = ({ 
  size = 48, 
  message = '', 
  fullScreen = false,
  color = theme.colors.primary 
}) => {
  const containerStyles = fullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(26, 10, 0, 0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.md,
      };

  const spinnerWrapperStyles = {
    position: 'relative',
    width: size,
    height: size,
  };

  const ringStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: `3px solid transparent`,
    borderTopColor: color,
    borderRightColor: color,
    borderRadius: '50%',
    animation: 'spinRing 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
  };

  const omStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: size * 0.5,
    color: color,
    fontWeight: 'bold',
    animation: 'omPulse 2s ease-in-out infinite',
    textShadow: `0 0 ${size * 0.3}px ${color}80`,
  };

  const messageStyles = {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    animation: 'textFade 2s ease-in-out infinite',
  };

  return (
    <div style={containerStyles}>
      <div style={spinnerWrapperStyles}>
        <div style={ringStyles} />
        <div style={omStyles}>ॐ</div>
      </div>
      {message && <div style={messageStyles}>{message}</div>}

      <style>{`
        @keyframes spinRing {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes omPulse {
          0%, 100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes textFade {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
