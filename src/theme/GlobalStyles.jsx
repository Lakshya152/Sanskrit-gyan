import React, { useEffect } from 'react';
import { theme } from './theme';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Global Styles Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * This component dynamically injects layout styles to enforce
 * the STRICT mobile-first constraint and prevents overscrolling.
 */
const GlobalStyles = () => {
  useEffect(() => {
    // 1. Prevent default zooming on mobile inputs
    const preventZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    // 2. Prevent overscroll/bounce effect on iOS
    const preventOverscroll = (e) => {
      if (window.scrollY === 0 && e.deltaY < 0) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('wheel', preventOverscroll, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('wheel', preventOverscroll);
    };
  }, []);

  // We inject inline styles into a <style> block to handle dynamic theme values
  // if we ever want to extend them programmatically in the future.
  const globalCSS = `
    /* Enforce strict mobile view on desktop browsers */
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #050200; /* Darker border for desktop users */
    }

    #root {
      width: 100%;
      height: 100%;
      max-width: 480px; /* iPhone Pro Max width constraint */
      background-color: ${theme.colors.background};
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.9);
      
      /* Only apply desktop borders if screen is larger than mobile */
      @media (min-width: 481px) {
        height: 95vh;
        max-height: 900px;
        border-radius: ${theme.borderRadius.xl};
        border: 1px solid rgba(244, 168, 37, 0.1);
        margin: auto;
      }
    }

    /* Native-feel scrolling container */
    .screen-container {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      position: absolute;
      top: 0;
      left: 0;
      padding-bottom: 90px; /* Space for BottomNav */
      background-color: ${theme.colors.background};
    }
    
    /* Utility for glowing text */
    .glow-text {
      text-shadow: 0 0 10px rgba(244, 168, 37, 0.4);
    }
  `;

  return <style>{globalCSS}</style>;
};

export default GlobalStyles;
