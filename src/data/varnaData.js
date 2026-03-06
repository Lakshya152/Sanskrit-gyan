/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Grammar - Varna (Letters)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Varna refers to the fundamental sounds/letters of the Sanskrit alphabet (Varnamala).
 * It is scientifically organized based on the phonetic positions of the human vocal tract.
 */

export const varnaData = {
  title: "वर्ण (Varna) - Letters",
  description: "The Sanskrit alphabet system is highly systematic. The letters are divided into two main categories based on how sound is produced.",
  types: [
    {
      name: "स्वर (Svara)",
      englishName: "Vowels",
      definition: "Sounds that can be pronounced independently, without the help of other letters.",
      examples: "अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ",
      note: "Vowels are the breath of the language."
    },
    {
      name: "व्यञ्जन (Vyanjana)",
      englishName: "Consonants",
      definition: "Sounds that cannot be pronounced fully without the help of a vowel (usually 'a' / 'अ').",
      examples: "क ख ग घ ङ, च छ ज झ ञ... etc.",
      note: "Consonants are the body of the language. They are grouped systematically by where the tongue touches the mouth (throat, palate, teeth, lips)."
    }
  ],
  summary: "So Varna = the scientific system of letters (स्वर + व्यञ्जन)."
};
