import React from 'react';
import { theme } from '../../theme/theme';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Grammar Table Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Reusable table for displaying Sanskrit grammatical data.
 * Supports: Shabd Roop (8 rows), Dhatu Roop (3 rows).
 * Features: Mobile horizontal scroll, glassmorphism, themed headers.
 */
const GrammarTable = ({ headers = [], rows = [] }) => {
  const containerStyles = {
    width: '100%',
    overflowX: 'auto',
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.borderGlow}`,
    background: 'rgba(42, 18, 0, 0.4)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    animation: 'fadeInUp 0.8s ease-out',
    boxShadow: theme.shadows.glow,
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMain,
    textAlign: 'center',
    minWidth: '380px', // Ensures content doesn't squash on small screens
  };

  const headerCellStyles = {
    background: 'rgba(211, 84, 0, 0.2)',
    color: theme.colors.primary,
    padding: theme.spacing.md,
    fontWeight: theme.typography.weights.semiBold,
    borderBottom: `2px solid ${theme.colors.primary}40`,
    fontSize: theme.typography.sizes.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const bodyCellStyles = (isFirstCol) => ({
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.borderGlow}`,
    fontWeight: isFirstCol ? theme.typography.weights.medium : theme.typography.weights.regular,
    color: isFirstCol ? theme.colors.primary : theme.colors.textMain,
    fontFamily: isFirstCol ? theme.typography.fontFamily : "'Noto Sans Devanagari', sans-serif",
    fontSize: isFirstCol ? '12px' : '16px',
    background: isFirstCol ? 'rgba(244, 168, 37, 0.03)' : 'transparent',
  });

  return (
    <div style={containerStyles} className="hide-scrollbar">
      <table style={tableStyles}>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} style={headerCellStyles}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              style={{ 
                background: rowIdx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)' 
              }}
            >
              {row.map((cell, cellIdx) => (
                <td 
                  key={cellIdx} 
                  style={bodyCellStyles(cellIdx === 0)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        @keyframes fadeInUp {
          from {
            transform: translateY(15px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        /* Custom scrollbar for desktop users who can't swipe */
        .hide-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme.colors.primary}40;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default GrammarTable;
