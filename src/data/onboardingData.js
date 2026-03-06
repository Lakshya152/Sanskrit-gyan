/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Grammar - Onboarding Flow Data
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * This array defines the sequence of the onboarding slides.
 * Text content is localized dynamically using the translation keys.
 * The 'icon' property refers to a string key that will be matched 
 * to an SVG icon component in the UI.
 */

export const onboardingSlides = [
  {
    id: 'slide-1',
    icon: 'om', // Will render the sacred Om symbol
    titleKey: 'onboarding.slide1Title',
    descKey: 'onboarding.slide1Desc',
  },
  {
    id: 'slide-2',
    icon: 'book', // Will render a scripture/grammar book symbol
    titleKey: 'onboarding.slide2Title',
    descKey: 'onboarding.slide2Desc',
  },
  {
    id: 'slide-3',
    icon: 'guru', // Will render an AI / Guru mind symbol
    titleKey: 'onboarding.slide3Title',
    descKey: 'onboarding.slide3Desc',
  }
];
