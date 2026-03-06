import React, { useEffect, useState } from 'react';
import { theme } from '../../theme/theme';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Screen Transition Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Handles smooth fade/slide animations between screens.
 * Strictly required by UI/UX rules.
 */
const ScreenTransition = ({ children, route }) => {
  const [displayedRoute, setDisplayedRoute] = useState(route);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (route !== displayedRoute) {
      // Start exit animation
      setIsTransitioning(true);

      // Wait for exit animation to complete, then update route
      const exitTimer = setTimeout(() => {
        setDisplayedRoute(route);
        setIsTransitioning(false);
      }, 300); // Match CSS transition duration

      return () => clearTimeout(exitTimer);
    }
  }, [route, displayedRoute]);

  const containerStyles = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  };

  const screenStyles = {
    width: '100%',
    height: '100%',
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'translateX(20px)' : 'translateX(0)',
    transition: `opacity ${theme.animations.smooth}, transform ${theme.animations.smooth}`,
    willChange: 'opacity, transform',
  };

  return (
    <div style={containerStyles}>
      <div style={screenStyles}>
        {children}
      </div>
    </div>
  );
};

export default ScreenTransition;
