import React from 'react';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Om Logo Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Sacred Om symbol with glow animation.
 * Used on Splash Screen and throughout the app.
 */
const OmLogo = ({ size = 120, animate = false, color = "#f4a825" }) => {
  return (
    <div 
      className="om-logo-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: animate ? 'drop-shadow(0 0 20px rgba(244, 168, 37, 0.6))' : 'none',
          animation: animate ? 'omPulse 2s ease-in-out infinite' : 'none'
        }}
      >
        {/* Subtle circular glow background */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill={color}
          opacity="0.08"
        />

        {/* The sacred Om symbol in Devanagari */}
        <text
          x="50%"
          y="55%"
          fontSize="140"
          fontWeight="bold"
          fill={color}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Arial, sans-serif"
        >
          ॐ
        </text>
      </svg>

      <style>{`
        @keyframes omPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default OmLogo;
