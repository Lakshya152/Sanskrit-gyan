import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import { translateSastrikText } from '../../services/translatorService';
import Header from '../common/Header';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import DisclaimerBanner from '../common/DisclaimerBanner';
import { TranslateIcon, OmLogo } from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Translator Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Handles deep translations between Sanskrit and modern languages.
 * Provides word-by-word breakdown, grammar analysis, and spiritual meaning.
 */
const TranslatorScreen = () => {
  const { t, currentLanguage } = useLanguage();
  const { userProfile } = useAppContext();
  
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    setResult('');

    try {
      // Call the specialized Sastrik Translator Service
      const translation = await translateSastrikText(inputText.trim(), currentLanguage);
      setResult(translation);
    } catch (error) {
      setResult(`The spirits of translation are silent: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: theme.colors.background,
    paddingTop: '64px', // Header offset
  };

  const contentStyles = {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    paddingBottom: '100px', // Space for bottom padding
    WebkitOverflowScrolling: 'touch',
  };

  const inputSectionStyles = {
    animation: 'fadeInDown 0.6s ease-out',
  };

  const textareaStyles = {
    width: '100%',
    minHeight: '120px',
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.borderGlow}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    color: theme.colors.textMain,
    fontSize: theme.typography.sizes.md,
    fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif",
    resize: 'none',
    outline: 'none',
    lineHeight: '1.6',
    boxShadow: theme.shadows.glow,
  };

  const resultContainerStyles = {
    animation: 'fadeInUp 0.8s ease-out',
  };

  const resultTextStyles = {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMain,
    lineHeight: '1.8',
    whiteSpace: 'pre-wrap', // Essential for preserving AI's structured breakdown
  };

  const introSectionStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
    opacity: result ? 0.3 : 1, // Fade intro when result is shown
    transition: 'opacity 0.5s ease',
  };

  return (
    <div style={containerStyles}>
      <Header title={t('home.features.translator')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        {/* Intro Branding (Visible before search) */}
        {!result && !isLoading && (
          <div style={introSectionStyles}>
            <div style={{ animation: 'omPulse 3s infinite' }}>
              <TranslateIcon size={64} color={theme.colors.primary} />
            </div>
            <h2 style={{ color: theme.colors.primary }}>Sastrik Interpretation</h2>
            <p style={{ color: theme.colors.textMuted, fontSize: '14px' }}>
              Enter a Shloka or a phrase. The Guru will provide a word-by-word breakdown (Padacheda), 
              grammatical analysis, and deep spiritual meaning.
            </p>
          </div>
        )}

        {/* Input Area */}
        <div style={inputSectionStyles}>
          <textarea
            style={textareaStyles}
            placeholder="Type modern text or paste a Sanskrit Shloka..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing.md }}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              icon={<TranslateIcon size={20} color="#fff" />}
            >
              Consult the Guru
            </Button>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div style={{ padding: theme.spacing.xxl }}>
            <LoadingSpinner message="Deciphering the sacred vibrations..." />
          </div>
        )}

        {/* Results Area */}
        {result && !isLoading && (
          <div style={resultContainerStyles}>
            <GlassCard padding="lg" style={{ border: `1px solid ${theme.colors.primary}40` }}>
              <div style={{ 
                fontSize: theme.typography.sizes.xs, 
                color: theme.colors.primary, 
                textTransform: 'uppercase', 
                marginBottom: theme.spacing.md,
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}>
                Guru's Interpretation:
              </div>
              <div style={resultTextStyles}>
                {result}
              </div>
            </GlassCard>
            
            <div style={{ 
              marginTop: theme.spacing.xl, 
              display: 'flex', 
              justifyContent: 'center' 
            }}>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setResult('');
                  setInputText('');
                }}
              >
                New Translation
              </Button>
            </div>
          </div>
        )}
      </div>

      <DisclaimerBanner dismissible={true} />

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes omPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        textarea::placeholder {
          color: ${theme.colors.textMuted};
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default TranslatorScreen;
