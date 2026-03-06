/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Grammar - Shabd Roop (Noun Forms)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * In Sanskrit, a noun changes its form depending on its role in the sentence.
 * A word changes based on:
 * - Vibhakti (विभक्ति) – grammatical case
 * - Vachan (वचन) – number (singular, dual, plural)
 * - Ling (लिङ्ग) – gender (masculine, feminine, neuter)
 */

export const shabdRoopData = {
  title: "राम शब्द रूप (अकारान्त पुंल्लिंग)",
  description: "Example: Declension of the masculine noun 'Ram'.",
  headers: ["Vibhakti (विभक्ति)", "Singular (एकवचन)", "Dual (द्विवचन)", "Plural (बहुवचन)"],
  rows: [
    {
      case: "प्रथमा (Subject)",
      singular: "रामः",
      dual: "रामौ",
      plural: "रामाः",
      meaning: "Ram"
    },
    {
      case: "द्वितीया (Object)",
      singular: "रामम्",
      dual: "रामौ",
      plural: "रामान्",
      meaning: "Ram (as object)"
    },
    {
      case: "तृतीया (Instrument)",
      singular: "रामेण",
      dual: "रामाभ्याम्",
      plural: "रामैः",
      meaning: "by Ram"
    },
    {
      case: "चतुर्थी (For / to)",
      singular: "रामाय",
      dual: "रामाभ्याम्",
      plural: "रामेभ्यः",
      meaning: "to Ram"
    },
    {
      case: "पंचमी (From)",
      singular: "रामात्",
      dual: "रामाभ्याम्",
      plural: "रामेभ्यः",
      meaning: "from Ram"
    },
    {
      case: "षष्ठी (Possession)",
      singular: "रामस्य",
      dual: "रामयोः",
      plural: "रामाणाम्",
      meaning: "of Ram"
    },
    {
      case: "सप्तमी (Location)",
      singular: "रामे",
      dual: "रामयोः",
      plural: "रामेषु",
      meaning: "in Ram"
    },
    {
      case: "सम्बोधन (Calling)",
      singular: "हे राम",
      dual: "हे रामौ",
      plural: "हे रामाः",
      meaning: "Oh, Ram"
    }
  ],
  summary: "So Shabd Roop = declension of nouns based on grammatical cases."
};
