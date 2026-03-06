import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import useNavigation from '../../hooks/useNavigation';
import useSnackbar from '../../hooks/useSnackbar';
import { isValidName, isValidDOB } from '../../utils/helpers';
import Header from '../common/Header';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';
import OmLogo from '../../assets/OmLogo';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Profile Setup Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Collects user profile: Name, DOB, Gender
 * Used ONLY for AI personalization tone.
 */
const ProfileSetup = () => {
  const { t } = useLanguage();
  const { updateProfile, completeOnboarding } = useAppContext();
  const { navigate } = useNavigation();
  const { error } = useSnackbar();

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isValidName(formData.name)) {
      newErrors.name = 'Please enter a valid name (at least 2 characters)';
    }

    if (!isValidDOB(formData.dob)) {
      newErrors.dob = 'Please enter a valid date of birth (must be at least 5 years old)';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      error('Please fill in all fields correctly');
      return;
    }

    // Save profile to context
    updateProfile(formData);

    // Mark onboarding as complete
    completeOnboarding();

    // Navigate to home
    navigate('home');
  };

  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: `radial-gradient(ellipse at center, ${theme.colors.surfaceHighlight} 0%, ${theme.colors.background} 70%)`,
    paddingTop: '64px', // Header height
  };

  const contentStyles = {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.xl,
  };

  const headerSectionStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  };

  const titleStyles = {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    textAlign: 'center',
  };

  const subtitleStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: '1.5',
  };

  const formStyles = {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
  };

  const inputGroupStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  };

  const labelStyles = {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textMain,
  };

  const inputStyles = {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.borderGlow}`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMain,
    fontFamily: theme.typography.fontFamily,
    transition: `all ${theme.animations.fast}`,
  };

  const inputErrorStyles = {
    borderColor: theme.colors.error,
  };

  const errorTextStyles = {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.error,
    marginTop: '4px',
  };

  const genderOptionsStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing.sm,
  };

  const genderButtonStyles = (isSelected) => ({
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    border: isSelected 
      ? `2px solid ${theme.colors.primary}` 
      : `1px solid ${theme.colors.borderGlow}`,
    background: isSelected 
      ? 'rgba(244, 168, 37, 0.1)' 
      : theme.colors.surface,
    color: isSelected ? theme.colors.primary : theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    cursor: 'pointer',
    transition: `all ${theme.animations.fast}`,
  });

  const genderOptions = [
    { value: 'male', label: t('profile.genderMale') },
    { value: 'female', label: t('profile.genderFemale') },
    { value: 'other', label: t('profile.genderOther') },
    { value: 'prefer-not-to-say', label: t('profile.genderPreferNotToSay') },
  ];

  return (
    <div style={containerStyles}>
      <Header title={t('profile.title')} showBack={false} />

      <div style={contentStyles}>
        <div style={headerSectionStyles}>
          <OmLogo size={80} animate={false} />
          <h1 style={titleStyles}>{t('profile.title')}</h1>
          <p style={subtitleStyles}>
            This helps us personalize your spiritual guidance
          </p>
        </div>

        <form style={formStyles} onSubmit={handleSubmit}>
          {/* Name Input */}
          <div style={inputGroupStyles}>
            <label style={labelStyles}>{t('profile.nameLabel')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder={t('profile.namePlaceholder')}
              style={{
                ...inputStyles,
                ...(errors.name ? inputErrorStyles : {}),
              }}
            />
            {errors.name && <span style={errorTextStyles}>{errors.name}</span>}
          </div>

          {/* Date of Birth Input */}
          <div style={inputGroupStyles}>
            <label style={labelStyles}>{t('profile.dobLabel')}</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              style={{
                ...inputStyles,
                ...(errors.dob ? inputErrorStyles : {}),
              }}
            />
            {errors.dob && <span style={errorTextStyles}>{errors.dob}</span>}
          </div>

          {/* Gender Selection */}
          <div style={inputGroupStyles}>
            <label style={labelStyles}>{t('profile.genderLabel')}</label>
            <div style={genderOptionsStyles}>
              {genderOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  style={genderButtonStyles(formData.gender === option.value)}
                  onClick={() => handleInputChange('gender', option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {errors.gender && <span style={errorTextStyles}>{errors.gender}</span>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            style={{ marginTop: theme.spacing.md }}
          >
            {t('profile.submit')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
