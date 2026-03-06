import React from 'react';
import { theme } from '../../theme/theme';
import { BackIcon } from '../../assets/icons';
import useNavigation from '../../hooks/useNavigation';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Header Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Top navigation bar with back button, title, and optional actions.
 * Fixed at the top of each screen.
 */
const Header = ({ 
  title = '', 
  showBack = true, 
  onBackClick = null,
  rightAction = null,
  transparent = false,
}) => {
  const { goBack } = useNavigation();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      goBack();
    }
  };

  const headerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing.md}`,
    background: transparent 
      ? 'transparent' 
      : theme.colors.surface,
    backdropFilter: transparent ? 'none' : 'blur(12px)',
    WebkitBackdropFilter: transparent ? 'none' : 'blur(12px)',
    borderBottom: transparent 
      ? 'none' 
      : `1px solid ${theme.colors.borderGlow}`,
    zIndex: 1000,
    transition: `all ${theme.animations.smooth}`,
  };

  const backButtonStyles = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: theme.spacing.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.full,
    transition: `background ${theme.animations.fast}`,
    width: '40px',
    height: '40px',
  };

  const titleStyles = {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    margin: `0 ${theme.spacing.md}`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const rightActionContainerStyles = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <header style={headerStyles}>
      {/* Left: Back Button */}
      {showBack ? (
        <button
          style={backButtonStyles}
          onClick={handleBackClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(244, 168, 37, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          aria-label="Go back"
        >
          <BackIcon size={24} color={theme.colors.primary} />
        </button>
      ) : (
        <div style={{ width: '40px', height: '40px' }} />
      )}

      {/* Center: Title */}
      <h1 style={titleStyles}>{title}</h1>

      {/* Right: Action Button (optional) */}
      <div style={rightActionContainerStyles}>
        {rightAction}
      </div>
    </header>
  );
};

export default Header;
