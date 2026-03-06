import React, { useState, useRef } from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import { SendIcon, ImageIcon } from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Chat Input Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Handles text input and image selection for AI Chat.
 * Uses glassmorphism and rounded spiritual design.
 */
const ChatInput = ({ onSend, onImage, disabled = false }) => {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageIconClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onImage) {
      onImage(file);
    }
    // Reset input value so the same file can be selected again if needed
    e.target.value = '';
  };

  const inputAreaStyles = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: `${theme.spacing.md} ${theme.spacing.md} calc(${theme.spacing.md} + env(safe-area-inset-bottom, 0px))`,
    background: 'rgba(26, 10, 0, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: `1px solid ${theme.colors.borderGlow}`,
    display: 'flex',
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
    zIndex: 1001,
  };

  const glassInputWrapperStyles = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.borderGlow}`,
    borderRadius: theme.borderRadius.xl,
    padding: `8px ${theme.spacing.md}`,
    transition: `all ${theme.animations.fast}`,
    minHeight: '48px',
  };

  const inputStyles = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: theme.colors.textMain,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fontFamily,
    maxHeight: '120px',
    overflowY: 'auto',
    padding: '8px 0',
    resize: 'none',
    outline: 'none',
  };

  const iconButtonStyles = (isActive = false) => ({
    background: 'transparent',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    padding: theme.spacing.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.full,
    transition: `all ${theme.animations.fast}`,
    opacity: disabled ? 0.5 : 1,
    color: isActive ? theme.colors.primary : theme.colors.textMuted,
  });

  const sendButtonStyles = {
    width: '48px',
    height: '48px',
    borderRadius: theme.borderRadius.full,
    background: 'linear-gradient(135deg, #d35400 0%, #a04000 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: (disabled || !text.trim()) ? 'not-allowed' : 'pointer',
    opacity: (disabled || !text.trim()) ? 0.5 : 1,
    border: 'none',
    boxShadow: theme.shadows.button,
    transition: `all ${theme.animations.fast}`,
    flexShrink: 0,
  };

  return (
    <div style={inputAreaStyles}>
      {/* Hidden File Input for Vision AI */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Image Upload Trigger */}
      <button
        type="button"
        style={iconButtonStyles()}
        onClick={handleImageIconClick}
        aria-label={t('chat.uploadImage')}
        disabled={disabled}
      >
        <ImageIcon size={24} color={theme.colors.primary} />
      </button>

      {/* Glassmorphism Text Input */}
      <div style={glassInputWrapperStyles}>
        <textarea
          style={inputStyles}
          rows={1}
          placeholder={t('chat.inputPlaceholder')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
      </div>

      {/* Send Button */}
      <button
        type="button"
        style={sendButtonStyles}
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        aria-label="Send message"
      >
        <SendIcon size={20} color="#fff" />
      </button>

      <style>{`
        textarea::placeholder {
          color: ${theme.colors.textMuted};
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default ChatInput;
