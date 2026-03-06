import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import { sendChatMessage } from '../../services/aiService';
import { buildWordLookupPrompt } from '../../utils/promptBuilder';
import Header from '../common/Header';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { SearchIcon } from '../../assets/icons';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Word / Dhatu Lookup Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * User enters a Sanskrit word or verb root.
 * AI Guru generates all forms, meanings, and reflections.
 */
const WordLookupScreen = () => {
  const { t, currentLanguage } = useLanguage();
  const { userProfile } = useAppContext();
  
  const [word, setWord] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async (e) => {
    if (e) e.preventDefault();
    if (!word.trim() || isLoading) return;

    setIsLoading(true);
    setResult('');

    try {
      // Build the specialized lookup prompt
      const prompt = buildWordLookupPrompt(word.trim(), currentLanguage, userProfile);
      
      // Request reasoning from AI Guru
      const response = await sendChatMessage([prompt], currentLanguage, userProfile);
      
      setResult(response);
    } catch (error) {
      setResult(`The Guru was unable to find the root of "${word}". Ensure the spelling is correct or try another word.`);
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
    paddingTop: '64px', // Header height
  };

  const contentStyles = {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  };

  const searchContainerStyles = {
    marginTop: theme.spacing.md,
    animation: 'fadeInDown 0.6s ease-out',
  };

  const inputWrapperStyles = {
    display: 'flex',
    gap: theme.spacing.sm,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.borderGlow}`,
    borderRadius: theme.borderRadius.xl,
    padding: `8px ${theme.spacing.md}`,
    alignItems: 'center',
    boxShadow: theme.shadows.glow,
  };

  const inputStyles = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: theme.colors.textMain,
    fontSize: theme.typography.sizes.lg,
    fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif",
    padding: theme.spacing.sm,
    outline: 'none',
  };

  const resultContainerStyles = {
    animation: 'fadeInUp 0.8s ease-out',
    minHeight: '200px',
  };

  const resultTextStyles = {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMain,
    lineHeight: '1.8',
    whiteSpace: 'pre-wrap', // Important for structured AI tables/lists
  };

  const emptyStateStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
    textAlign: 'center',
    gap: theme.spacing.md,
    opacity: 0.6,
  };

  return (
    <div style={containerStyles}>
      <Header title={t('home.features.wordLookup')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        {/* Search Input Section */}
        <div style={searchContainerStyles}>
          <form onSubmit={handleLookup}>
            <div style={inputWrapperStyles}>
              <SearchIcon size={24} color={theme.colors.primary} />
              <input
                style={inputStyles}
                placeholder="Enter word (e.g. राम, गम्, पठति)..."
                value={word}
                onChange={(e) => setWord(e.target.value)}
                disabled={isLoading}
              />
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleLookup}
                disabled={isLoading || !word.trim()}
              >
                Lookup
              </Button>
            </div>
          </form>
          <p style={{ 
            fontSize: '11px', 
            color: theme.colors.textMuted, 
            textAlign: 'center', 
            marginTop: '12px',
            fontStyle: 'italic' 
          }}>
            The Guru will provide Shabd Roop, Dhatu Roop, and meanings.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div style={{ marginTop: theme.spacing.xxl }}>
            <LoadingSpinner message="Consulting the ancient scripts..." />
          </div>
        )}

        {/* Results Section */}
        {result && !isLoading && (
          <div style={resultContainerStyles}>
            <GlassCard padding="lg">
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
                  setWord('');
                }}
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !isLoading && (
          <div style={emptyStateStyles}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'rgba(244, 168, 37, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.md
            }}>
              <SearchIcon size={40} color={theme.colors.primary} />
            </div>
            <h3 style={{ color: theme.colors.primary }}>Begin Your Inquiry</h3>
            <p style={{ color: theme.colors.textMuted, fontSize: '14px' }}>
              Enter a verb root or a noun to reveal its forms and sacred meaning.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder {
          color: ${theme.colors.textMuted};
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default WordLookupScreen;
