import React from 'react';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import GlobalStyles from './theme/GlobalStyles';
import useNavigation from './hooks/useNavigation';

// Core UI Components
import ScreenTransition from './components/common/ScreenTransition';
import Snackbar from './components/common/Snackbar';
import ExitDialog from './components/common/ExitDialog';

// Screens
import SplashScreen from './components/splash/SplashScreen';
import LanguageSelection from './components/language/LanguageSelection';
import OnboardingScreen from './components/onboarding/OnboardingScreen';
import ProfileSetup from './components/profile/ProfileSetup';
import HomeScreen from './components/home/HomeScreen';
import AIChatScreen from './components/chat/AIChatScreen';
import WordLookupScreen from './components/wordLookup/WordLookupScreen';
import ShabdRoopScreen from './components/grammar/ShabdRoopScreen';
import DhatuRoopScreen from './components/grammar/DhatuRoopScreen';
import SandhiScreen from './components/grammar/SandhiScreen';
import SamasScreen from './components/grammar/SamasScreen';
import UpsargScreen from './components/grammar/UpsargScreen';
import PratyayScreen from './components/grammar/PratyayScreen';
import VarnaScreen from './components/grammar/VarnaScreen';
import TranslatorScreen from './components/translator/TranslatorScreen';
import AboutGrammarScreen from './components/about/AboutGrammarScreen';
import SettingsScreen from './components/settings/SettingsScreen';
import PrivacyPolicy from './components/settings/PrivacyPolicy';
import DisclaimerScreen from './components/disclaimer/DisclaimerScreen';

const AppContent = () => {
  const { currentRoute } = useNavigation();

  // Dynamic screen renderer based on the History API state
  const renderScreen = () => {
    switch (currentRoute) {
      case 'splash': return <SplashScreen />;
      case 'language': return <LanguageSelection />;
      case 'onboarding': return <OnboardingScreen />;
      case 'profile': return <ProfileSetup />;
      case 'home': return <HomeScreen />;
      case 'chat': return <AIChatScreen />;
      case 'word-lookup': return <WordLookupScreen />;
      case 'shabd-roop': return <ShabdRoopScreen />;
      case 'dhatu-roop': return <DhatuRoopScreen />;
      case 'sandhi': return <SandhiScreen />;
      case 'samas': return <SamasScreen />;
      case 'upsarg': return <UpsargScreen />;
      case 'pratyay': return <PratyayScreen />;
      case 'varna': return <VarnaScreen />;
      case 'translator': return <TranslatorScreen />;
      case 'about-grammar': return <AboutGrammarScreen />;
      case 'settings': return <SettingsScreen />;
      case 'privacy-policy': return <PrivacyPolicy />;
      case 'disclaimer': return <DisclaimerScreen />;
      default: return <SplashScreen />;
    }
  };

  return (
    <>
      <GlobalStyles />
      {/* 
        ScreenTransition manages the smooth fade/slide 
        animations required by the UI/UX guidelines 
      */}
      <ScreenTransition route={currentRoute}>
        {renderScreen()}
      </ScreenTransition>
      
      {/* Global Overlays */}
      <Snackbar />
      <ExitDialog />
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AppProvider>
  );
};

export default App;
