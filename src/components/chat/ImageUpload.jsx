import React from 'react';
import { theme } from '../../theme/theme';
import { CloseIcon, ImageIcon } from '../../assets/icons';
import GlassCard from '../common/GlassCard';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Image Upload Preview Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Shows a preview of the selected image before it is sent to Vision AI.
 * Allows the user to verify the image or clear it.
 */
const ImageUpload = ({ previewUrl, onClear, disabled = false }) => {
  if (!previewUrl) return null;

  const overlayStyles = {
    position: 'absolute',
    bottom: '90px', // Sits above the ChatInput
    left: theme.spacing.md,
    right: theme.spacing.md,
    zIndex: 1002,
    animation: 'slideUpPreview 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  const previewCardStyles = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    border: `2px solid ${theme.colors.primary}`,
    background: 'rgba(26, 10, 0, 0.9)',
  };

  const imageStyles = {
    width: '100%',
    maxHeight: '180px',
    borderRadius: theme.borderRadius.md,
    objectFit: 'cover',
    display: 'block',
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing.xs}`,
  };

  const badgeStyles = {
    fontSize: '10px',
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const clearButtonStyles = {
    background: 'rgba(231, 76, 60, 0.2)',
    border: 'none',
    borderRadius: theme.borderRadius.full,
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${theme.animations.fast}`,
  };

  return (
    <div style={overlayStyles}>
      <GlassCard style={previewCardStyles}>
        <div style={headerStyles}>
          <div style={badgeStyles}>
            <ImageIcon size={14} color={theme.colors.primary} />
            Sanskrit Vision Preview
          </div>
          <button 
            style={clearButtonStyles} 
            onClick={onClear}
            disabled={disabled}
            aria-label="Clear image"
          >
            <CloseIcon size={14} color={theme.colors.error} />
          </button>
        </div>

        <img 
          src={previewUrl} 
          alt="Preview for analysis" 
          style={imageStyles} 
        />
        
        <div style={{
          fontSize: '11px',
          color: theme.colors.textMuted,
          textAlign: 'center',
          fontStyle: 'italic',
          paddingBottom: '4px'
        }}>
          The Guru will analyze this image upon sending...
        </div>
      </GlassCard>

      <style>{`
        @keyframes slideUpPreview {
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

export default ImageUpload;
