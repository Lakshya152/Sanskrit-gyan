import React from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import useNavigation from '../../hooks/useNavigation';
import useSnackbar from '../../hooks/useSnackbar';
import { shareApp, rateApp } from '../../utils/appActions';
import { clearAppStorage } from '../../services/storageService';

// UI Components
import Header from '../common/Header';
import BottomNav from '../common/BottomNav';
import GlassCard from '../common/GlassCard';
import { 
  LanguageIcon, 
  GuruIcon, 
  ShareIcon, 
  StarIcon, 
  LockIcon, 
  InfoIcon, 
  TrashIcon 
} from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Settings Screen Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Allows users to manage:
 * - Language selection
 * - Profile updates
 * - App sharing and rating
 * - Privacy and legal info
 * - Data reset
 */
const SettingsScreen = () => {
  const { t, currentLanguage } = useLanguage();
  const { userProfile } = useAppContext();
  const { navigate, replace } = useNavigation();
  const { success, info, error } = useSnackbar();

  const handleShare = async () => {
    const result = await shareApp();
    if (result.success) {
      if (result.method === 'clipboard') {
        success('App link copied to clipboard!');
      }
    }
  };

  const handleRate = async () => {
    await rateApp();
  };

  const handleReset = () => {
    const confirmed = window.confirm(t('settings.clearData') + "? This will delete your profile and chat history.");
    if (confirmed) {
      clearAppStorage();
      replace('splash'); // Restart app flow
    }
  };

  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: theme.colors.background,
    paddingTop: '64px',
  };

  const contentStyles = {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    paddingBottom: '100px',
    WebkitOverflowScrolling: 'touch',
  };

  const sectionStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    animation: 'fadeInUp 0.6s ease-out',
  };

  const sectionTitleStyles = {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    paddingLeft: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  };

  const settingItemStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    cursor: 'pointer',
    transition: `all ${theme.animations.fast}`,
  };

  const itemLeftStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
  };

  const itemLabelStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textMain,
  };

  const itemValueStyles = {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
  };

  const renderSettingItem = (icon, label, value, onClick, isDanger = false) => (
    <GlassCard 
      style={settingItemStyles} 
      onClick={onClick}
      padding="none"
      glowOnHover
    >
      <div style={itemLeftStyles}>
        {icon}
        <span style={{ 
          ...itemLabelStyles, 
          color: isDanger ? theme.colors.error : theme.colors.textMain 
        }}>
          {label}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {value && <span style={itemValueStyles}>{value}</span>}
        <span style={{ color: theme.colors.textMuted, fontSize: '18px' }}>›</span>
      </div>
    </GlassCard>
  );

  return (
    <div style={containerStyles}>
      <Header title={t('settings.title')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        {/* Profile Section */}
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Personalization</h3>
          {renderSettingItem(
            <GuruIcon size={24} color={theme.colors.primary} />,
            t('settings.profile'),
            userProfile?.name,
            () => navigate('profile')
          )}
        </div>

        {/* Preferences Section */}
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Preferences</h3>
          {renderSettingItem(
            <LanguageIcon size={24} color={theme.colors.primary} />,
            t('settings.language'),
            currentLanguage.toUpperCase(),
            () => navigate('language')
          )}
        </div>

        {/* App Section */}
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>App</h3>
          {renderSettingItem(
            <ShareIcon size={24} color={theme.colors.primary} />,
            t('settings.shareApp'),
            null,
            handleShare
          )}
          {renderSettingItem(
            <StarIcon size={24} color={theme.colors.primary} />,
            t('settings.rateApp'),
            null,
            handleRate
          )}
        </div>

        {/* Legal Section */}
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Legal & Spirit</h3>
          {renderSettingItem(
            <LockIcon size={24} color={theme.colors.primary} />,
            t('settings.privacyPolicy'),
            null,
            () => navigate('privacy-policy')
          )}
          {renderSettingItem(
            <InfoIcon size={24} color={theme.colors.primary} />,
            t('settings.disclaimer'),
            null,
            () => navigate('disclaimer')
          )}
        </div>

        {/* Danger Zone */}
        <div style={{ ...sectionStyles, marginTop: theme.spacing.xl }}>
          <h3 style={{ ...sectionTitleStyles, color: theme.colors.error }}>Danger Zone</h3>
          {renderSettingItem(
            <TrashIcon size={24} color={theme.colors.error} />,
            t('settings.clearData'),
            null,
            handleReset,
            true
          )}
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: theme.spacing.xl, 
          color: theme.colors.textMuted,
          fontSize: theme.typography.sizes.xs,
          opacity: 0.5
        }}>
          Sanskrit Grammar v1.0.0<br />
          Built with Wisdom
        </div>
      </div>

      <BottomNav currentRoute="settings" />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SettingsScreen;
