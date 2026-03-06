/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Grammar - Dhatu Roop (Verb Forms)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * A Dhatu (धातु) is a verb root.
 * When we conjugate it into different verb forms based on:
 * - Purush (पुरुष) – person
 * - Vachan (वचन) – number
 * - Kaal (काल) – tense
 * Those forms are called Dhatu Roop.
 */

export const dhatuRoopData = {
  title: "गम् धातु रूप (परस्मैपदी)",
  description: "Example: Conjugation of the verb root 'गम्' (to go) in the Present Tense (लट् लकार).",
  headers: ["Person (पुरुष)", "Singular (एकवचन)", "Dual (द्विवचन)", "Plural (बहुवचन)"],
  rows: [
    {
      person: "प्रथम पुरुष (Third Person)",
      singular: "गच्छति",
      dual: "गच्छतः",
      plural: "गच्छन्ति",
      meaning: "(He/She/It) goes"
    },
    {
      person: "मध्यम पुरुष (Second Person)",
      singular: "गच्छसि",
      dual: "गच्छथः",
      plural: "गच्छथ",
      meaning: "(You) go"
    },
    {
      person: "उत्तम पुरुष (First Person)",
      singular: "गच्छामि",
      dual: "गच्छावः",
      plural: "गच्छामः",
      meaning: "(I/We) go"
    }
  ],
  examples: [
    {
      sanskrit: "रामः विद्यालयं गच्छति",
      translation: "Ram goes to school"
    },
    {
      sanskrit: "अहं गृहं गच्छामि",
      translation: "I go home"
    }
  ],
  summary: "So Dhatu Roop = verb conjugation based on person, number, and tense."
};
