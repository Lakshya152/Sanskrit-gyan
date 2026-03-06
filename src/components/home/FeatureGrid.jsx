import React from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import useNavigation from '../../hooks/useNavigation';
import FeatureCard from './FeatureCard';
import {
  BookIcon,
  SearchIcon,
  TranslateIcon,
  InfoIcon,
} from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Feature Grid Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays all grammar features and tools in a responsive grid.
 */
const FeatureGrid = () => {
  const { t } = useLanguage();
  const { navigate } = useNavigation();

  const features = [
    {
      id: 'shabd-roop',
      label: t('home.features.shabdRoop'),
      icon: 'श',
      iconType: 'text',
      color: '#e67e22',
      route: 'shabd-roop',
    },
    {
      id: 'dhatu-roop',
      label: t('home.features.dhatuRoop'),
      icon: 'ध',
      iconType: 'text',
      color: '#d35400',
      route: 'dhatu-roop',
    },
    {
      id: 'sandhi',
      label: t('home.features.sandhi'),
      icon: 'सं',
      iconType: 'text',
      color: '#c0392b',
      route: 'sandhi',
    },
    {
      id: 'samas',
      label: t('home.features.samas'),
      icon: 'स',
      iconType: 'text',
      color: '#e74c3c',
      route: 'samas',
    },
    {
      id: 'upsarg',
      label: t('home.features.upsarg'),
      icon: 'उ',
      iconType: 'text',
      color: '#f39c12',
      route: 'upsarg',
    },
    {
      id: 'pratyay',
      label: t('home.features.pratyay'),
      icon: 'प्र',
      iconType: 'text',
      color: '#e67e22',
      route: 'pratyay',
    },
    {
      id: 'varna',
      label: t('home.features.varna'),
      icon: 'व',
      iconType: 'text',
      color: '#d35400',
      route: 'varna',
    },
    {
      id: 'word-lookup',
      label: t('home.features.wordLookup'),
      icon: <SearchIcon size={28} color="#f4a825" />,
      iconType: 'component',
      color: '#f4a825',
      route: 'word-lookup',
    },
    {
      id: 'translator',
      label: t('home.features.translator'),
      icon: <TranslateIcon size={28} color="#f4a825" />,
      iconType: 'component',
      color: '#f4a825',
      route: 'translator',
    },
    {
      id: 'about',
      label: t('home.features.about'),
      icon: <InfoIcon size={28} color="#f4a825" />,
      iconType: 'component',
      color: '#f4a825',
      route: 'about-grammar',
    },
  ];

  const handleFeatureClick = (route) => {
    navigate(route);
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    animation: 'fadeInGrid 1s ease-out',
  };

  return (
    <>
      <div style={gridStyles}>
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            label={feature.label}
            icon={feature.icon}
            iconType={feature.iconType}
            color={feature.color}
            onClick={() => handleFeatureClick(feature.route)}
            index={index}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeInGrid {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default FeatureGrid;
