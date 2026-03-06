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
import { upsargData } from '../../data/upsargData';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Upsarg Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays the Upsarg concept (Prefixes).
 * Example: प्र + गम् → प्रगच्छति
 */
const UpsargScreen = () => {
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
        'upsarg',
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
    overflowX: 'hidden',
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    WebkitOverflowScrolling: 'touch',
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

  const exampleContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
  };

  const equationStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  };

  const prefixBoxStyles = {
    background: 'rgba(230, 126, 34, 0.2)',
    border: `1px solid ${theme.colors.accent}50`,
    borderRadius: theme.borderRadius.lg,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const rootBoxStyles = {
    background: 'rgba(211, 84, 0, 0.15)',
    border: `1px solid ${theme.colors.primaryDeep}50`,
    borderRadius: theme.borderRadius.lg,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const textStyles = {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.textMain,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
  };

  const resultBoxStyles = {
    background: `linear-gradient(135deg, ${theme.colors.primaryDeep}30 0%, ${theme.colors.primary}20 100%)`,
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: theme.borderRadius.lg,
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    textAlign: 'center',
    boxShadow: `0 4px 20px ${theme.colors.primary}30`,
  };

  return (
    <div style={containerStyles}>
      <Header title={t('home.features.upsarg')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        <h1 style={titleStyles}>{upsargData.title}</h1>
        <p style={descriptionStyles}>{upsargData.description}</p>

        <GlassCard padding="lg" style={{ animation: 'fadeInUp 1s ease-out' }}>
          <div style={exampleContainerStyles}>
             <div style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.primary, marginBottom: '-10px' }}>
                Base Word: {upsargData.baseRoot.dhatu} ({upsargData.baseRoot.meaning})
             </div>
            
            <div style={equationStyles}>
              <div style={prefixBoxStyles}>
                <span style={textStyles}>{upsargData.example.prefix}</span>
                <span style={{ fontSize: '10px', color: theme.colors.accent }}>PREFIX</span>
              </div>
              <span style={{ fontSize: '24px', color: theme.colors.primary }}>+</span>
              <div style={rootBoxStyles}>
                <span style={textStyles}>{upsargData.example.root}</span>
                <span style={{ fontSize: '10px', color: theme.colors.primaryDeep }}>ROOT</span>
              </div>
            </div>

            <span style={{ fontSize: '24px', color: theme.colors.primary }}>↓</span>

            <div style={resultBoxStyles}>
              <div style={{ ...textStyles, fontSize: theme.typography.sizes.hero, color: theme.colors.primary }}>
                {upsargData.example.result}
              </div>
              <div style={{ fontSize: theme.typography.sizes.md, color: theme.colors.textMuted, fontStyle: 'italic', marginTop: '8px' }}>
                Meaning: {upsargData.example.meaning}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard padding="lg">
          <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>📖 Detailed Explanation</h3>
          <p style={{ color: theme.colors.textMain, lineHeight: '1.7', textAlign: 'center' }}>
            {upsargData.detailedExplanation}
          </p>
        </GlassCard>

        <p style={{ textAlign: 'center', color: theme.colors.primary, fontStyle: 'italic' }}>{upsargData.summary}</p>

        {/* AI Interaction */}
        <GlassCard padding="lg">
          <h3 style={{ color: theme.colors.textMain, marginBottom: theme.spacing.md }}>🔮 Ask about Sanskrit Prefixes</h3>
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
                resize: 'none'
              }}
              placeholder="List all 22 Upsargas..."
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              rows={2}
            />
            <Button variant="primary" onClick={handleAskAI} disabled={isLoading || !questionInput.trim()}>Ask</Button>
          </div>

          {isLoading && <LoadingSpinner size={30} style={{ marginTop: '16px' }} />}
          
          {aiResponse && (
            <div style={{ marginTop: theme.spacing.lg, color: theme.colors.textMain, lineHeight: '1.6', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
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

export default UpsargScreen;
