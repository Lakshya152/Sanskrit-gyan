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
import GrammarTable from './GrammarTable';
import { shabdRoopData } from '../../data/shabdRoopData';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Shabd Roop Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays the noun declension table (8 Vibhaktis × 3 Vachans).
 * Allows AI-powered deeper explanations.
 */
const ShabdRoopScreen = () => {
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
        'shabd-roop',
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
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: '1.5',
    animation: 'fadeInUp 0.8s ease-out',
  };

  const summaryStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    padding: theme.spacing.md,
    animation: 'fadeInUp 1s ease-out',
  };

  const questionSectionStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    animation: 'fadeInUp 1.2s ease-out',
  };

  const questionTitleStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textMain,
  };

  const inputContainerStyles = {
    display: 'flex',
    gap: theme.spacing.sm,
    alignItems: 'flex-end',
  };

  const inputStyles = {
    flex: 1,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.borderGlow}`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMain,
    fontFamily: theme.typography.fontFamily,
    resize: 'none',
    minHeight: '48px',
  };

  const aiResponseStyles = {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMain,
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap',
    padding: theme.spacing.lg,
    animation: 'fadeInUp 0.5s ease-out',
  };

  // Prepare table data for GrammarTable component
  const tableHeaders = shabdRoopData.headers;
  const tableRows = shabdRoopData.rows.map((row) => [
    row.case,
    row.singular,
    row.dual,
    row.plural,
  ]);

  return (
    <div style={containerStyles}>
      <Header title={t('home.features.shabdRoop')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        {/* Title */}
        <h1 style={titleStyles}>
          {shabdRoopData.title}
        </h1>

        {/* Description */}
        <p style={descriptionStyles}>
          {shabdRoopData.description}
        </p>

        {/* Grammar Table */}
        <GrammarTable
          headers={tableHeaders}
          rows={tableRows}
        />

        {/* Meaning Reference */}
        <GlassCard padding="md" style={{ animation: 'fadeInUp 1s ease-out' }}>
          <h3 style={{
            fontSize: theme.typography.sizes.md,
            fontWeight: theme.typography.weights.semiBold,
            color: theme.colors.primary,
            marginBottom: theme.spacing.md,
          }}>
            Meanings (अर्थ)
          </h3>
          {shabdRoopData.rows.map((row, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: `${theme.spacing.xs} 0`,
                borderBottom: index < shabdRoopData.rows.length - 1
                  ? `1px solid ${theme.colors.borderGlow}`
                  : 'none',
              }}
            >
              <span style={{
                fontSize: theme.typography.sizes.sm,
                color: theme.colors.textMain,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
              }}>
                {row.case.split(' ')[0]}
              </span>
              <span style={{
                fontSize: theme.typography.sizes.sm,
                color: theme.colors.textMuted,
              }}>
                {row.meaning}
              </span>
            </div>
          ))}
        </GlassCard>

        {/* Summary */}
        <p style={summaryStyles}>
          {shabdRoopData.summary}
        </p>

        {/* Ask AI Section */}
        <GlassCard padding="lg" style={{ ...questionSectionStyles }}>
          <h3 style={questionTitleStyles}>
            🔮 Ask the Guru about Shabd Roop
          </h3>

          <div style={inputContainerStyles}>
            <textarea
              style={inputStyles}
              placeholder="E.g., Explain the difference between Tritiya and Chaturthi Vibhakti..."
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              rows={2}
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleAskAI}
              disabled={isLoading || !questionInput.trim()}
            >
              Ask
            </Button>
          </div>

          {/* AI Response */}
          {isLoading && (
            <LoadingSpinner size={40} message={t('chat.aiTyping')} />
          )}

          {aiResponse && !isLoading && (
            <GlassCard padding="lg" style={{ marginTop: theme.spacing.md }}>
              <div style={aiResponseStyles}>
                {aiResponse}
              </div>
            </GlassCard>
          )}
        </GlassCard>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ShabdRoopScreen;
