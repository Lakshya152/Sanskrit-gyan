import React from 'react';
import { theme } from '../../theme/theme';
import GlassCard from '../common/GlassCard';
import OmLogo from '../../assets/OmLogo';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Chat Message Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Renders individual messages in the AI Chat interface.
 * Styles differ based on role: 'user' or 'assistant'.
 * Supports image previews and formatted long-form text.
 */
const ChatMessage = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: isAssistant ? 'flex-start' : 'flex-end',
    width: '100%',
    marginBottom: theme.spacing.md,
    animation: isAssistant ? 'fadeInLeft 0.5s ease-out' : 'fadeInRight 0.5s ease-out',
  };

  const messageWrapperStyles = {
    maxWidth: '85%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  };

  const bubbleStyles = {
    background: isAssistant 
      ? theme.colors.surface 
      : 'linear-gradient(135deg, #d35400 0%, #a04000 100%)',
    borderRadius: isAssistant 
      ? `${theme.borderRadius.xl} ${theme.borderRadius.xl} ${theme.borderRadius.xl} ${theme.borderRadius.sm}`
      : `${theme.borderRadius.xl} ${theme.borderRadius.xl} ${theme.borderRadius.sm} ${theme.borderRadius.xl}`,
    border: isAssistant ? `1px solid ${theme.colors.borderGlow}` : 'none',
    color: isAssistant ? theme.colors.textMain : '#ffffff',
    padding: theme.spacing.lg,
    boxShadow: isAssistant ? theme.shadows.glow : theme.shadows.button,
    fontSize: theme.typography.sizes.md,
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap', // Preserves the structured long-form AI output
    wordBreak: 'break-word',
  };

  const imagePreviewStyles = {
    width: '100%',
    maxHeight: '240px',
    borderRadius: theme.borderRadius.lg,
    objectFit: 'cover',
    marginBottom: theme.spacing.sm,
    border: `2px solid ${theme.colors.primary}40`,
  };

  const avatarStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: '4px',
    padding: `0 ${theme.spacing.sm}`,
  };

  const senderNameStyles = {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semiBold,
    color: isAssistant ? theme.colors.primary : theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const timestampStyles = {
    fontSize: '10px',
    color: theme.colors.textMuted,
    marginTop: '4px',
    padding: `0 ${theme.spacing.sm}`,
    textAlign: isAssistant ? 'left' : 'right',
  };

  const formatTimestamp = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={containerStyles}>
      {/* Sender Header */}
      <div style={avatarStyles}>
        {isAssistant && <OmLogo size={20} />}
        <span style={senderNameStyles}>
          {isAssistant ? 'Sanskrit Guru' : 'You'}
        </span>
      </div>

      <div style={messageWrapperStyles}>
        {/* Render Image if available (for User messages with Vision AI) */}
        {message.image && (
          <img 
            src={message.image} 
            alt="Uploaded Sanskrit content" 
            style={imagePreviewStyles} 
          />
        )}

        {/* Message Bubble */}
        <div style={bubbleStyles}>
          {message.content}
        </div>
      </div>

      {/* Timestamp */}
      <div style={timestampStyles}>
        {formatTimestamp(message.timestamp)}
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ChatMessage;
