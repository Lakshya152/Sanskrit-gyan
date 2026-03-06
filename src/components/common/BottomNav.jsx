import React from 'react';
import { theme } from '../../theme/theme';
import { HomeIcon, ChatIcon, SettingsIcon } from '../../assets/icons';
import useNavigation from '../../hooks/useNavigation';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Bottom Navigation Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Bottom tab bar for quick navigation between core screens.
 * Active on: Home, Chat, Settings
 */
const BottomNav = ({ currentRoute }) => {
  const { navigate } = useNavigation();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: HomeIcon,
      route: 'home',
    },
    {
      id: 'chat',
      label: 'AI Guide',
      icon: ChatIcon,
      route: 'chat',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SettingsIcon,
      route: 'settings',
    },
  ];

  const navStyles = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: theme.colors.surface,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: `1px solid ${theme.colors.borderGlow}`,
    zIndex: 1000,
    paddingBottom: 'env(safe-area-inset-bottom, 0px)', // iOS safe area
  };

  const navItemStyles = (isActive) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    flex: 1,
    height: '100%',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    transition: `all ${theme.animations.fast}`,
    position: 'relative',
    padding: `${theme.spacing.sm} 0`,
  });

  const iconContainerStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '32px',
    borderRadius: theme.borderRadius.lg,
    background: isActive ? 'rgba(244, 168, 37, 0.15)' : 'transparent',
    transition: `all ${theme.animations.fast}`,
  });

  const labelStyles = (isActive) => ({
    fontSize: theme.typography.sizes.xs,
    fontWeight: isActive 
      ? theme.typography.weights.semiBold 
      : theme.typography.weights.regular,
    color: isActive ? theme.colors.primary : theme.colors.textMuted,
    transition: `all ${theme.animations.fast}`,
  });

  const activeIndicatorStyles = {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '32px',
    height: '3px',
    borderRadius: '0 0 3px 3px',
    background: `linear-gradient(90deg, ${theme.colors.primaryDeep}, ${theme.colors.primary})`,
    boxShadow: `0 2px 8px ${theme.colors.primary}80`,
  };

  const handleNavClick = (route) => {
    navigate(route);
  };

  return (
    <nav style={navStyles}>
      {navItems.map((item) => {
        const isActive = currentRoute === item.route;
        const IconComponent = item.icon;

        return (
          <button
            key={item.id}
            style={navItemStyles(isActive)}
            onClick={() => handleNavClick(item.route)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && <div style={activeIndicatorStyles} />}
            
            <div style={iconContainerStyles(isActive)}>
              <IconComponent 
                size={22} 
                color={isActive ? theme.colors.primary : theme.colors.textMuted} 
              />
            </div>
            
            <span style={labelStyles(isActive)}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
