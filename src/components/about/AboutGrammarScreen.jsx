import React from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../common/Header';
import GlassCard from '../common/GlassCard';
import { grammarSummaryData } from '../../data/grammarSummaryData';
import OmLogo from '../../assets/OmLogo';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 About Grammar Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays the philosophy of Sanskrit grammar.
 * Features the "Simple Summary" table as requested.
 */
const AboutGrammarScreen = () => {
  const { t } = useLanguage();
  const { intro, summaryTable } = grammarSummaryData;

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
    gap: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
    WebkitOverflowScrolling: 'touch',
  };

  const introSectionStyles = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.md,
    animation: 'fadeInUp 0.6s ease-out',
  };

  const introTitleStyles = {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    lineHeight: '1.2',
  };

  const introTextStyles = {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.textMain,
    lineHeight: '1.8',
    textAlign: 'center',
    opacity: 0.9,
    fontStyle: 'italic',
  };

  const tableContainerStyles = {
    animation: 'fadeInUp 0.8s ease-out',
  };

  const tableTitleStyles = {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semiBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const tableWrapperStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    border: `1px solid ${theme.colors.borderGlow}`,
  };

  const thStyles = {
    background: 'rgba(211, 84, 0, 0.2)',
    color: theme.colors.primary,
    padding: theme.spacing.md,
    textAlign: 'left',
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: `2px solid ${theme.colors.primary}40`,
  };

  const tdStyles = {
    padding: theme.spacing.md,
    color: theme.colors.textMain,
    fontSize: theme.typography.sizes.md,
    borderBottom: `1px solid ${theme.colors.borderGlow}`,
  };

  const sanskritCellStyles = {
    ...tdStyles,
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.primary,
  };

  return (
    <div style={containerStyles}>
      <Header title={t('home.features.about')} showBack={true} />

      <div style={contentStyles} className="hide-scrollbar">
        {/* Philosophical Intro Section */}
        <div style={introSectionStyles}>
          <OmLogo size={60} />
          <h2 style={introTitleStyles}>{intro.title}</h2>
          <GlassCard padding="lg">
            <p style={introTextStyles}>
              "{intro.content}"
            </p>
          </GlassCard>
        </div>

        {/* Simple Summary Table Section */}
        <div style={tableContainerStyles}>
          <h3 style={tableTitleStyles}>
            ✨ {summaryTable.title}
          </h3>
          
          <div style={{ borderRadius: theme.borderRadius.lg, overflow: 'hidden' }}>
            <table style={tableWrapperStyles}>
              <thead>
                <tr>
                  {summaryTable.headers.map((header, idx) => (
                    <th key={idx} style={thStyles}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {summaryTable.rows.map((row, idx) => (
                  <tr key={idx} style={{ 
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)' 
                  }}>
                    <td style={sanskritCellStyles}>
                      {row.term}
                    </td>
                    <td style={tdStyles}>
                      {row.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: theme.spacing.lg, 
          color: theme.colors.textMuted,
          fontSize: theme.typography.sizes.sm,
          lineHeight: '1.6'
        }}>
          Sanskrit grammar is the study of <strong>Śabda-anuśāsana</strong> — the science of language. It is a path to understanding the structure of creation itself.
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AboutGrammarScreen;
