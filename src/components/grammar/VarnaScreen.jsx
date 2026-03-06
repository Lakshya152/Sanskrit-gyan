import React, { useState } from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import { sendChatMessage } from '../../services/aiService';
import { buildGrammarPrompt } from '../../utils/promptBuilder';
import Header from '../common/Header';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { varnaData } from '../../data/varnaData';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Varna Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Explains the Sanskrit alphabet system (Varnamala).
 * Distinguishes between Swar (Vowels) and Vyanjan (Consonants).
 */
const VarnaScreen = () => {
  const { t, currentLanguage } = useLanguage();
  const { userProfile } = useAppContext();
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionInput, setQuestionInput] = useState('');

  const handleAskAI = async () => {
    if (!questionInput.trim()) return;

    setIsLoading(true);
    setAiResponse('');

    try {
      const prompt = buildGrammarPrompt(
        'varna',
        questionInput,
        currentLanguage,
        userProfile
      );

      const response = await sendChatMessage(
        [prompt],
        currentLanguage,
        userProfile
      );

      setAiResponse(response);
    } catch (error) {
      setAiResponse(`Error: ${error.message}`);
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
    paddingTop: '64px',
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

  const titleStyles = {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    textAlign: 'center',
    animation: 'fadeInUp 0.6s ease-out',
  };

  const descriptionStyles = {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: '1.6',
    animation: 'fadeInUp 0.8s ease-out',
  };

  const typeCardStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    border: `1px solid ${theme.colors.borderGlow}`,
    animation: 'fadeInUp 1s ease-out',
  };

  const typeHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.colors.borderGlow}`,
    paddingBottom: theme.spacing.sm,
  };

  const typeTitleStyles = {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
  };

  const englishTypeStyles = {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const examplesBoxStyles = {
    background: 'rgba(244, 168, 37, 0.05)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: '20px',
    color: theme.colors.textMain,
    textAlign: 'center',
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    letterSpacing: '4px',
    lineHeight: '2',
    border: `1px dashed ${theme.colors.primary}40`,
  };

  const noteStyles = {
    fontSize: theme.typography.sizes.xs,
    fontStyle: 'italic',
    color: theme.colors.primary,
    textAlign: 'right',
    marginTop: theme.spacing.xs,
  };

  return (
    <div style={containerStyles}>
      <Header title={t('home.features.varna')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        <h1 style={titleStyles}>{varnaData.title}</h1>
        <p style={descriptionStyles}>{varnaData.description}</p>

        {/* Alphabet Types */}
        {varnaData.types.map((type, index) => (
          <GlassCard key={index} padding="lg" style={typeCardStyles}>
            <div style={typeHeaderStyles}>
              <span style={typeTitleStyles}>{type.name}</span>
              <span style={englishTypeStyles}>{type.englishName}</span>
            </div>
            
            <p style={{ color: theme.colors.textMain, fontSize: '14px', lineHeight: '1.5' }}>
              {type.definition}
            </p>

            <div style={examplesBoxStyles}>
              {type.examples}
            </div>

            <div style={noteStyles}>
              ✨ {type.note}
            </div>
          </GlassCard>
        ))}

        <p style={{ 
          textAlign: 'center', 
          color: theme.colors.primary, 
          fontStyle: 'italic',
          fontSize: theme.typography.sizes.md,
          marginTop: theme.spacing.md 
        }}>
          {varnaData.summary}
        </p>

        {/* AI Section */}
        <GlassCard padding="lg" style={{ marginTop: theme.spacing.xl }}>
          <h3 style={{ color: theme.colors.textMain, marginBottom: theme.spacing.md }}>🔮 Ask the Guru about Sanskrit Sounds</h3>
          <div style={{ display: 'flex', gap: theme.spacing.sm }}>
            <textarea
              style={{
                flex: 1,
                background: theme.colors.surface,
                border: `1px solid ${theme.colors.borderGlow}`,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                color: theme.colors.textMain,
                fontFamily: theme.typography.fontFamily,
                resize: 'none',
                fontSize: '14px'
              }}
              placeholder="Explain the pronunciation of the 'Ka-varga'..."
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              rows={2}
            />
            <Button variant="primary" onClick={handleAskAI} disabled={isLoading || !questionInput.trim()}>Ask</Button>
          </div>

          {isLoading && <LoadingSpinner size={30} style={{ marginTop: '16px' }} />}
          
          {aiResponse && (
            <div style={{ 
              marginTop: theme.spacing.lg, 
              color: theme.colors.textMain, 
              lineHeight: '1.6', 
              fontSize: '14px', 
              whiteSpace: 'pre-wrap',
              borderTop: `1px solid ${theme.colors.borderGlow}`,
              paddingTop: theme.spacing.md
            }}>
              {aiResponse}
            </div>
          )}
        </GlassCard>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default VarnaScreen;
