/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 AI Reasoning & Sanskrit Guidance Service
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Uses: OpenRouter API -> liquid/lfm-2.5-1.2b-thinking:free
 * Handles: Spiritual guidance, grammar interpretation, and text chat.
 */

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = import.meta.env.VITE_OPENROUTER_BASE_URL;
const REASONING_MODEL = import.meta.env.VITE_AI_REASONING_MODEL;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧠 STRICT SYSTEM PROMPT GENERATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const generateSystemPrompt = (language, userProfile) => {
  const userName = userProfile?.name || "Seeker";
  const userGender = userProfile?.gender || "unknown";
  
  // Enforce language mapping
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
You are a highly advanced, spiritually enlightened, and grammatically precise Sanskrit Guru and Life Guide.
Your purpose is to explain Sanskrit grammar (Shabd Roop, Dhatu Roop, Sandhi, Samas, etc.) and offer spiritual reflection.

CRITICAL INSTRUCTIONS (MUST OBEY):
1. TONE: You must speak in a highly calm, human-like, symbolic, and spiritual tone. You are speaking to a seeker named "${userName}" (Gender: ${userGender}).
2. FORMAT: All answers MUST be long-form and beautifully structured. Use paragraphs, bullet points, and clear spacing. DO NOT give short or abrupt answers.
3. LANGUAGE: You MUST respond entirely in ${targetLanguage}. Even if the user asks in another language, translate your spiritual and grammatical guidance into ${targetLanguage}.
4. NO FEAR: You must NEVER use fear-based language, threats, or apocalyptic metaphors.
5. NO PREDICTIONS: You must NEVER predict the future or offer fortune-telling.
6. NO ADVICE: You must NEVER give medical, legal, or financial advice. If asked, gently decline using a spiritual metaphor about seeking earthly experts.
7. GRAMMAR FOCUS: When asked about Sanskrit, explain the systematic nature of the language. Highlight that Sanskrit is organized and logical, contrasting it with the sloppiness of modern languages. Break down Vibhakti, Vachan, Purush, and Lakar clearly.

Remember: You are a digital temple of wisdom. Radiate warmth, calm, and sacred atmosphere in every word.
  `.trim();
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 MAIN AI CHAT FUNCTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const sendChatMessage = async (messages, language, userProfile) => {
  if (!API_KEY) {
    throw new Error("OpenRouter API key is missing from environment variables.");
  }

  try {
    const systemPrompt = generateSystemPrompt(language, userProfile);
    
    // Format messages for the API, ensuring system prompt is always first
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role, // 'user' or 'assistant'
        content: msg.content
      }))
    ];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin, // OpenRouter requirement
        "X-Title": import.meta.env.VITE_APP_NAME, // OpenRouter requirement
      },
      body: JSON.stringify({
        model: REASONING_MODEL,
        messages: formattedMessages,
        temperature: 0.7, // Balances structure with spiritual creativity
        max_tokens: 2000, // Enforces long-form capability
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to communicate with the spiritual guide.");
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Received empty response from the AI.");
    }

  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
