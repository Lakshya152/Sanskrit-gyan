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
import { dhatuRoopData } from '../../data/dhatuRoopData';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Dhatu Roop Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays the verb conjugation table (3 Purush × 3 Vachan).
 * Shows example sentences and allows AI-powered explanations.
 */
const DhatuRoopScreen = () => {
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
        'dhatu-roop',
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

  const exampleSectionTitleStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  };

  const exampleCardStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} 0`,
    borderBottom: `1px solid ${theme.colors.borderGlow}`,
  };

  const sanskritTextStyles = {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.textMain,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
  };

  const translationTextStyles = {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textMuted,
    fontStyle: 'italic',
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

  const meaningRowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.xs} 0`,
    borderBottom: `1px solid ${theme.colors.borderGlow}`,
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

  // Prepare table data
  const tableHeaders = dhatuRoopData.headers;
  const tableRows = dhatuRoopData.rows.map((row) => [
    row.person,
    row.singular,
    row.dual,
    row.plural,
  ]);

  return (
    <div style={containerStyles}>
      <Header title={t('home.features.dhatuRoop')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        {/* Title */}
        <h1 style={titleStyles}>
          {dhatuRoopData.title}
        </h1>

        {/* Description */}
        <p style={descriptionStyles}>
          {dhatuRoopData.description}
        </p>

        {/* Conjugation Table */}
        <GrammarTable
          headers={tableHeaders}
          rows={tableRows}
        />

        {/* Meanings */}
        <GlassCard padding="md" style={{ animation: 'fadeInUp 1s ease-out' }}>
          <h3 style={exampleSectionTitleStyles}>
            Meanings (अर्थ)
          </h3>
          {dhatuRoopData.rows.map((row, index) => (
            <div key={index} style={{
              ...meaningRowStyles,
              borderBottom: index < dhatuRoopData.rows.length - 1
                ? `1px solid ${theme.colors.borderGlow}`
                : 'none',
            }}>
              <span style={{
                fontSize: theme.typography.sizes.sm,
                color: theme.colors.textMain,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
              }}>
                {row.person.split(' ')[0]}
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

        {/* Example Sentences */}
        <GlassCard padding="lg" style={{ animation: 'fadeInUp 1.1s ease-out' }}>
          <h3 style={exampleSectionTitleStyles}>
            📜 Example Sentences (उदाहरण)
          </h3>
          {dhatuRoopData.examples.map((example, index) => (
            <div
              key={index}
              style={{
                ...exampleCardStyles,
                borderBottom: index < dhatuRoopData.examples.length - 1
                  ? `1px solid ${theme.colors.borderGlow}`
                  : 'none',
              }}
            >
              <span style={sanskritTextStyles}>
                {example.sanskrit}
              </span>
              <span style={translationTextStyles}>
                → {example.translation}
              </span>
            </div>
          ))}
        </GlassCard>

        {/* Summary */}
        <p style={summaryStyles}>
          {dhatuRoopData.summary}
        </p>

        {/* Ask AI Section */}
        <GlassCard padding="lg">
          <h3 style={questionTitleStyles}>
            🔮 Ask the Guru about Dhatu Roop
          </h3>

          <div style={{ ...inputContainerStyles, marginTop: theme.spacing.md }}>
            <textarea
              style={inputStyles}
              placeholder="E.g., Show me the Dhatu Roop of 'पठ्' (to read) in लट् लकार..."
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
            <div style={{ marginTop: theme.spacing.md }}>
              <LoadingSpinner size={40} message={t('chat.aiTyping')} />
            </div>
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

export default DhatuRoopScreen;
