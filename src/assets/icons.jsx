import React from 'react';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Grammar - Icon Components
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * All UI icons used throughout the app.
 * Designed with rounded, spiritual aesthetics.
 */

const defaultIconProps = {
  size: 24,
  color: '#f4a825',
  strokeWidth: 2
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Onboarding Icons
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const BookIcon = ({ size = 64, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M12 8C12 6.89543 12.8954 6 14 6H50C51.1046 6 52 6.89543 52 8V52C52 53.1046 51.1046 54 50 54H14C12.8954 54 12 53.1046 12 52V8Z" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <path d="M12 48H52" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <path d="M20 18H44M20 26H44M20 34H36" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const GuruIcon = ({ size = 64, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="20" r="10" stroke={color} strokeWidth="3"/>
    <path d="M16 54C16 43 22 38 32 38C42 38 48 43 48 54" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <circle cx="32" cy="32" r="24" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.4"/>
    <path d="M28 18L32 14L36 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Navigation & UI Icons
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ChatIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HomeIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SettingsIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const BackIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SendIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ImageIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill={color}/>
    <path d="M21 15L16 10L5 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SearchIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
    <path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const TranslateIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 8H14M9 2V8M9 8C9 13 5 17 5 17M9 8C9 13 13 17 13 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 18L17 12L20 18M15 16.5H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const InfoIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <path d="M12 16V12M12 8H12.01" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const ShareIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="18" cy="5" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="6" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="18" cy="19" r="3" stroke={color} strokeWidth="2"/>
    <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke={color} strokeWidth="2"/>
  </svg>
);

export const StarIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CloseIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CheckIcon = ({ size = 24, color = '#2ecc71' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17L4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WarningIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 20H22L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 9V13M12 17H12.01" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const LanguageIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <path d="M2 12H22M12 2C14.5 4.5 16 8.5 16 12C16 15.5 14.5 19.5 12 22M12 2C9.5 4.5 8 8.5 8 12C8 15.5 9.5 19.5 12 22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const TrashIcon = ({ size = 24, color = '#e74c3c' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 6H5H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LockIcon = ({ size = 24, color = '#f4a825' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="11" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" stroke={color} strokeWidth="2"/>
  </svg>
);
