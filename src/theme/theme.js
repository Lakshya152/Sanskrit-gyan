/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Grammar - Theme System
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * Design Rules Enforced:
 * - Large rounded corners (24px - 32px)
 * - Spiritual color palette (Deep Saffron, Dark Brown, Warm Amber)
 * - Cream/Parchment typography for scriptural reading experience
 */

export const theme = {
  colors: {
    // Backgrounds
    background: '#1a0a00',              // Deep dark brown root
    surface: 'rgba(42, 18, 0, 0.65)',   // Glassmorphism card base
    surfaceHighlight: 'rgba(60, 25, 0, 0.8)', // Active/Hover states
    
    // Brand Colors
    primary: '#f4a825',                 // Gold/Amber (Divinity)
    primaryDeep: '#d35400',             // Deep Saffron (Renunciation)
    accent: '#ff781f',                  // Orange (Interactive elements)
    
    // Typography
    textMain: '#fdf5e6',                // Cream / Parchment
    textMuted: '#c4956a',               // Soft amber/brown
    textDark: '#2a1200',                // Inverse text (for light buttons)
    
    // UI Elements
    borderGlow: 'rgba(244, 168, 37, 0.15)', // Subtle glowing border
    error: '#e74c3c',
    success: '#2ecc71',
  },
  
  typography: {
    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      xxl: '32px',
      hero: '48px',
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    }
  },
  
  // STRICT RULE: No sharp edges anywhere
  borderRadius: {
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },
  
  shadows: {
    glow: '0 4px 20px rgba(244, 168, 37, 0.08)',
    button: '0 4px 15px rgba(211, 84, 0, 0.3)',
    glass: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
  },
  
  animations: {
    fast: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    spring: '0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  }
};
