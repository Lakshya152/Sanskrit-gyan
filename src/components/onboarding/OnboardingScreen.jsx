import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import useNavigation from '../../hooks/useNavigation';
import { onboardingSlides } from '../../data/onboardingData';
import OnboardingSlide from './OnboardingSlide';
import Button from '../common/Button';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Onboarding Screen Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Swipeable 3-slide introduction to the app.
 * Explains: Systematic grammar, Grammar pillars, AI guidance.
 */
const OnboardingScreen = () => {
  const { t } = useLanguage();
  const { navigate } = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalSlides = onboardingSlides.length;
  const isLastSlide = currentSlide === totalSlides - 1;

  const handleNext = () => {
    if (isLastSlide) {
      navigate('profile');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    navigate('profile');
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const threshold = 50; // Minimum swipe distance

    if (distance > threshold && currentSlide < totalSlides - 1) {
      // Swipe left - next slide
      setCurrentSlide((prev) => prev + 1);
    } else if (distance < -threshold && currentSlide > 0) {
      // Swipe right - previous slide
      setCurrentSlide((prev) => prev - 1);
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: `radial-gradient(ellipse at center, ${theme.colors.surfaceHighlight} 0%, ${theme.colors.background} 70%)`,
    position: 'relative',
    overflow: 'hidden',
  };

  const slidesContainerStyles = {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    touchAction: 'pan-y', // Allow vertical scrolling but control horizontal
  };

  const slidesWrapperStyles = {
    display: 'flex',
    height: '100%',
    transition: `transform ${theme.animations.smooth}`,
    transform: `translateX(-${currentSlide * 100}%)`,
  };

  const controlsStyles = {
    padding: theme.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    background: theme.colors.background,
    borderTop: `1px solid ${theme.colors.borderGlow}`,
  };

  const paginationStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  };

  const dotStyles = (isActive) => ({
    width: isActive ? '24px' : '8px',
    height: '8px',
    borderRadius: theme.borderRadius.full,
    background: isActive ? theme.colors.primary : theme.colors.borderGlow,
    transition: `all ${theme.animations.fast}`,
    cursor: 'pointer',
  });

  const buttonsStyles = {
    display: 'flex',
    gap: theme.spacing.md,
  };

  return (
    <div style={containerStyles}>
      {/* Slides */}
      <div
        style={slidesContainerStyles}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div style={slidesWrapperStyles}>
          {onboardingSlides.map((slide) => (
            <OnboardingSlide
              key={slide.id}
              icon={slide.icon}
              title={t(slide.titleKey)}
              description={t(slide.descKey)}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={controlsStyles}>
        {/* Pagination Dots */}
        <div style={paginationStyles}>
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              style={dotStyles(index === currentSlide)}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

        {/* Buttons */}
        <div style={buttonsStyles}>
          {!isLastSlide && (
            <Button
              variant="ghost"
              fullWidth
              onClick={handleSkip}
            >
              {t('common.skip')}
            </Button>
          )}
          <Button
            variant="primary"
            fullWidth
            onClick={handleNext}
          >
            {isLastSlide ? t('common.start') : t('common.next')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
