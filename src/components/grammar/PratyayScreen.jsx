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
import { pratyayData } from '../../data/pratyayData';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Pratyay Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays the Pratyay concept (Suffixes).
 * Example: पठ् + क → पाठक
 */
const PratyayScreen = () => {
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
        'pratyay',
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

  const rootBoxStyles = {
    background: 'rgba(211, 84, 0, 0.15)',
    border: `1px solid ${theme.colors.primaryDeep}50`,
    borderRadius: theme.borderRadius.lg,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const suffixBoxStyles = {
    background: 'rgba(46, 204, 113, 0.1)',
    border: `1px solid ${theme.colors.success}50`,
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
    background: `linear-gradient(135deg, rgba(211, 84, 0, 0.2) 0%, rgba(244, 168, 37, 0.1) 100%)`,
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: theme.borderRadius.lg,
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    textAlign: 'center',
    boxShadow: `0 4px 20px ${theme.colors.primary}30`,
  };

  return (
    <div style={containerStyles}>
      <Header title={t('home.features.pratyay')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        <h1 style={titleStyles}>{pratyayData.title}</h1>
        <p style={descriptionStyles}>{pratyayData.description}</p>

        {/* Visual Suffix Equation */}
        <GlassCard padding="lg" style={{ animation: 'fadeInUp 1s ease-out' }}>
          <div style={exampleContainerStyles}>
             <div style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.primary, marginBottom: '-10px' }}>
                Base Root: {pratyayData.example.root} ({pratyayData.example.rootMeaning})
             </div>
            
            <div style={equationStyles}>
              <div style={rootBoxStyles}>
                <span style={textStyles}>{pratyayData.example.root}</span>
                <span style={{ fontSize: '10px', color: theme.colors.primaryDeep }}>ROOT</span>
              </div>
              <span style={{ fontSize: '24px', color: theme.colors.primary }}>+</span>
              <div style={suffixBoxStyles}>
                <span style={{ ...textStyles, color: theme.colors.success }}>{pratyayData.example.suffix}</span>
                <span style={{ fontSize: '10px', color: theme.colors.success }}>SUFFIX</span>
              </div>
            </div>

            <span style={{ fontSize: '24px', color: theme.colors.primary }}>↓</span>

            <div style={resultBoxStyles}>
              <div style={{ ...textStyles, fontSize: theme.typography.sizes.hero, color: theme.colors.primary }}>
                {pratyayData.example.result}
              </div>
              <div style={{ fontSize: theme.typography.sizes.md, color: theme.colors.textMuted, fontStyle: 'italic', marginTop: '8px' }}>
                Result: {pratyayData.example.meaning}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Detailed Explanation Section */}
        <GlassCard padding="lg">
          <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>📖 Detailed Explanation</h3>
          <p style={{ color: theme.colors.textMain, lineHeight: '1.7', textAlign: 'center' }}>
            {pratyayData.detailedExplanation}
          </p>
        </GlassCard>

        <p style={{ textAlign: 'center', color: theme.colors.primary, fontStyle: 'italic', padding: '0 20px' }}>
          {pratyayData.summary}
        </p>

        {/* AI Guru Interaction Section */}
        <GlassCard padding="lg">
          <h3 style={{ color: theme.colors.textMain, marginBottom: theme.spacing.md }}>🔮 Ask the AI Guru about Suffixes</h3>
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
              placeholder="What are Kṛt and Taddhita suffixes?"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              rows={2}
            />
            <Button variant="primary" onClick={handleAskAI} disabled={isLoading || !questionInput.trim()}>Ask</Button>
          </div>

          {isLoading && <LoadingSpinner size={30} message="Reflecting..." style={{ marginTop: '16px' }} />}
          
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

export default PratyayScreen;
