/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Grammar - AI Prompt Builder
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Dynamically constructs AI prompts by combining:
 * - User's selected language
 * - User's profile (name, gender, DOB)
 * - Specific feature context (grammar, translation, chat, etc.)
 */

const LANGUAGE_MAP = {
  en: "English",
  hi: "Hindi",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  ko: "Korean"
};

/**
 * Extracts personalization data from user profile
 * @param {Object} userProfile - The user's profile object
 * @returns {Object} Extracted personalization fields
 */
const extractPersonalization = (userProfile) => {
  const name = userProfile?.name || "Seeker";
  const gender = userProfile?.gender || "unknown";
  const dob = userProfile?.dob || null;

  let ageContext = "";
  if (dob) {
    try {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        ageContext = "The seeker is young. Use simple, encouraging language.";
      } else if (age >= 18 && age < 40) {
        ageContext = "The seeker is a young adult. Speak with clarity and depth.";
      } else if (age >= 40 && age < 60) {
        ageContext = "The seeker is experienced. Speak with reverence and wisdom.";
      } else {
        ageContext = "The seeker is an elder. Speak with utmost respect and profound simplicity.";
      }
    } catch (error) {
      ageContext = "";
    }
  }

  return { name, gender, ageContext };
};

/**
 * Builds a prompt for general AI Sanskrit Chat
 * @param {string} userMessage - The user's message
 * @param {string} language - Language code (en, hi, etc.)
 * @param {Object} userProfile - User profile object
 * @returns {Object} Formatted message object for the AI service
 */
export const buildChatPrompt = (userMessage, language, userProfile) => {
  const { name, gender, ageContext } = extractPersonalization(userProfile);
  const targetLang = LANGUAGE_MAP[language] || "English";

  const contextNote = `
[CONTEXT]
Seeker Name: ${name}
Gender: ${gender}
${ageContext}
Response Language: ${targetLang}
Topic: General Sanskrit grammar or spiritual question.
[END CONTEXT]
  `.trim();

  return {
    role: 'user',
    content: `${contextNote}\n\n${userMessage}`
  };
};

/**
 * Builds a prompt for Word/Dhatu Lookup
 * @param {string} word - The Sanskrit word or Dhatu to look up
 * @param {string} language - Language code
 * @param {Object} userProfile - User profile object
 * @returns {Object} Formatted message object for the AI service
 */
export const buildWordLookupPrompt = (word, language, userProfile) => {
  const { name } = extractPersonalization(userProfile);
  const targetLang = LANGUAGE_MAP[language] || "English";

  return {
    role: 'user',
    content: `
[CONTEXT]
Seeker Name: ${name}
Response Language: ${targetLang}
Task: Word/Dhatu Lookup
[END CONTEXT]

The seeker has entered the following Sanskrit word or Dhatu root: "${word}"

Please provide:
1. Identify whether this is a noun (Shabd) or a verb root (Dhatu).
2. If it is a noun: show its complete Shabd Roop (all 8 Vibhaktis × 3 Vachans). Identify its Ling (gender) and ending type.
3. If it is a Dhatu: show its complete Dhatu Roop in at least the present tense (लट् लकार, all 3 Purush × 3 Vachan). Identify its Gana (class) and Pada (Parasmaipada/Atmanepada).
4. Provide the meaning of the word in ${targetLang}.
5. Provide 2-3 example sentences using this word.
6. Offer a brief spiritual reflection on the word's deeper significance.

Format the response beautifully with clear headings and tables.
    `.trim()
  };
};

/**
 * Builds a prompt for grammar-specific questions
 * @param {string} topic - Grammar topic (sandhi, samas, etc.)
 * @param {string} question - Specific grammar question
 * @param {string} language - Language code
 * @param {Object} userProfile - User profile object
 * @returns {Object} Formatted message object for the AI service
 */
export const buildGrammarPrompt = (topic, question, language, userProfile) => {
  const { name } = extractPersonalization(userProfile);
  const targetLang = LANGUAGE_MAP[language] || "English";

  const topicMap = {
    'shabd-roop': 'Shabd Roop (Noun Declension / शब्द रूप)',
    'dhatu-roop': 'Dhatu Roop (Verb Conjugation / धातु रूप)',
    'sandhi': 'Sandhi (Sound Joining / संधि)',
    'samas': 'Samas (Compound Words / समास)',
    'upsarg': 'Upsarg (Prefixes / उपसर्ग)',
    'pratyay': 'Pratyay (Suffixes / प्रत्यय)',
    'varna': 'Varna (Letters / वर्ण)',
  };

  const topicName = topicMap[topic] || topic;

  return {
    role: 'user',
    content: `
[CONTEXT]
Seeker Name: ${name}
Response Language: ${targetLang}
Grammar Topic: ${topicName}
[END CONTEXT]

The seeker asks: "${question}"

Please provide a thorough, structured answer about ${topicName}. Include:
- A clear definition
- The grammatical rules involved
- Practical examples with Sanskrit text and ${targetLang} translations
- A brief spiritual reflection on why this aspect of grammar matters

Format your response beautifully with headings, bullet points, and clear spacing.
    `.trim()
  };
};

/**
 * Builds a prompt for the Vision/Image Analysis feature
 * @param {string} userMessage - Optional text accompanying the image
 * @param {string} language - Language code
 * @param {Object} userProfile - User profile object
 * @returns {string} Formatted text prompt for the vision service
 */
export const buildVisionPrompt = (userMessage, language, userProfile) => {
  const { name } = extractPersonalization(userProfile);
  const targetLang = LANGUAGE_MAP[language] || "English";

  return `
[CONTEXT]
Seeker Name: ${name}
Response Language: ${targetLang}
Task: Analyze the uploaded image of Sanskrit text
[END CONTEXT]

${userMessage || "Please analyze this image. If it contains Sanskrit text, translate it, identify the grammar (Shabd Roop, Dhatu Roop, Sandhi, etc.), and provide a spiritual reflection."}

Respond entirely in ${targetLang}. Be thorough, structured, and spiritually warm.
  `.trim();
};
