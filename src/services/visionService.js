/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 👁️ Vision AI & Sanskrit Image Analysis Service
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Uses: OpenRouter API -> allenai/molmo-2-8b:free
 * Handles: Image upload, Sanskrit text extraction from images, and spiritual interpretation.
 */

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = import.meta.env.VITE_OPENROUTER_BASE_URL;
const VISION_MODEL = import.meta.env.VITE_AI_VISION_MODEL;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧠 VISION SYSTEM PROMPT GENERATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const generateVisionPrompt = (language, userProfile) => {
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
You are a highly advanced spiritual Vision AI capable of reading and interpreting Sanskrit text from images.
Your purpose is to deeply analyze the uploaded image and extract its essence.

CRITICAL INSTRUCTIONS (MUST OBEY):
1. TONE: Be exceedingly calm, spiritual, and human-like.
2. LANGUAGE: You MUST respond entirely in ${targetLanguage}.
3. FORMAT: Long-form and structured. First, describe what you see. Second, extract any visible Sanskrit or spiritual text. Third, offer a profound, metaphorical interpretation of the image's meaning.
4. NO FEAR / NO ADVICE: Never use fear-based language or offer medical/legal advice based on images.

If the image contains a Sanskrit Shloka or word, break down its grammatical structure (Dhatu, Vibhakti, Sandhi) if visible, and explain it gently.
  `.trim();
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🖼️ MAIN VISION ANALYSIS FUNCTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const analyzeImage = async (base64Image, language, userProfile) => {
  if (!API_KEY) {
    throw new Error("OpenRouter API key is missing from environment variables.");
  }

  try {
    const systemPrompt = generateVisionPrompt(language, userProfile);
    
    // Format message for OpenRouter Vision API (Multimodal structure)
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: [
          { type: 'text', text: "Please interpret this spiritual image and read any Sanskrit text present." },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            }
          }
        ]
      }
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
        model: VISION_MODEL,
        messages: formattedMessages,
        temperature: 0.6, // Slightly lower for more accurate text extraction
        max_tokens: 1500,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Vision API Error:", errorData);
      throw new Error(errorData.error?.message || "The vision guide could not clearly see the image.");
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error("The vision guide remained silent. Please try another image.");
    }

  } catch (error) {
    console.error("Vision Service Error:", error);
    throw error;
  }
};
