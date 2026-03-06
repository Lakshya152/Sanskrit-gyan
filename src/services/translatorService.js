/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sastrik Translator Service
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Uses: OpenRouter API -> liquid/lfm-2.5-1.2b-thinking:free
 * Handles: Translating modern text to Sanskrit, or Sanskrit Shlokas/words to modern languages,
 * providing word-by-word breakdowns, grammar analysis, and spiritual meaning.
 */

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = import.meta.env.VITE_OPENROUTER_BASE_URL;
const REASONING_MODEL = import.meta.env.VITE_AI_REASONING_MODEL;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📜 TRANSLATOR SYSTEM PROMPT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const generateTranslatorPrompt = (language) => {
  const languageMap = {
    en: "English",
    hi: "Hindi",
    es: "Spanish",
    fr: "French",
    it: "Italian",
    ko: "Korean"
  };
  
  const targetLanguage = languageMap[language] || "English";

  return `
You are a Master Sastrik (Scriptural) Translator and Grammarian.
Your sacred duty is to translate text between Sanskrit and ${targetLanguage}.

CRITICAL INSTRUCTIONS (MUST OBEY):
1. TONE: Highly calm, human-like, symbolic, and spiritual.
2. FORMAT: All answers MUST be long-form and beautifully structured. Use paragraphs and bullet points.
3. NO FEAR/NO ADVICE: Never use fear-based language or give medical/legal advice. 
4. LANGUAGE: Your explanations MUST be entirely in ${targetLanguage}.

TRANSLATION WORKFLOW:
If the user provides a modern language phrase:
- Translate it into pristine, grammatically perfect Sanskrit (Devanagari script).
- Explain the grammar used (Shabd Roop, Dhatu Roop, Lakar, Vibhakti).
- Provide a brief spiritual reflection on the phrase.

If the user provides a Sanskrit word or Shloka:
- Provide a word-by-word breakdown (Padacheda).
- Identify the root (Dhatu) or noun base, and its grammatical form.
- Provide the literal translation in ${targetLanguage}.
- Provide the deep, symbolic spiritual meaning in ${targetLanguage}.

Do not take shortcuts. Honor the systematic beauty of Sanskrit.
  `.trim();
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🕉️ TRANSLATION API CALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const translateSastrikText = async (text, language) => {
  if (!API_KEY) {
    throw new Error("OpenRouter API key is missing. The digital temple is currently unreachable.");
  }

  if (!text || text.trim() === '') {
    throw new Error("Please provide text to translate.");
  }

  try {
    const systemPrompt = generateTranslatorPrompt(language);

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Please translate and analyze the following text:\n\n"${text}"` }
    ];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": import.meta.env.VITE_APP_NAME,
      },
      body: JSON.stringify({
        model: REASONING_MODEL,
        messages: messages,
        temperature: 0.4, // Lower temperature for more accurate and deterministic translations
        max_tokens: 2000,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Translator API Error:", errorData);
      throw new Error("The translation spirits are currently resting. Please try again later.");
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Received an empty scroll from the translator.");
    }

  } catch (error) {
    console.error("Translator Service Error:", error);
    throw error;
  }
};
