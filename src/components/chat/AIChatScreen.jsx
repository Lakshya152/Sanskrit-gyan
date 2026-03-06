import React, { useState, useEffect, useRef } from 'react';
import { theme } from '../../theme/theme';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import { sendChatMessage } from '../../services/aiService';
import { analyzeSanskritImage } from '../../services/visionService';
import { getFromStorage, saveToStorage } from '../../services/storageService';
import { fileToBase64, generateId } from '../../utils/helpers';
import { buildChatPrompt, buildVisionPrompt } from '../../utils/promptBuilder';

// Components
import Header from '../common/Header';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import LoadingSpinner from '../common/LoadingSpinner';
import DisclaimerBanner from '../common/DisclaimerBanner';

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 AI Chat Screen
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Primary interaction point for AI Sanskrit Guidance.
 * Supports: Text Chat (Reasoning) & Image Analysis (Vision).
 * PERSISTENCE: Chat history is saved locally.
 */
const AIChatScreen = () => {
  const { t, currentLanguage } = useLanguage();
  const { userProfile } = useAppContext();
  
  // State
  const [messages, setMessages] = useState([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  
  const scrollRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    const savedHistory = getFromStorage('chat_history', []);
    if (savedHistory.length > 0) {
      setMessages(savedHistory);
    } else {
      // Initial Spiritual Greeting
      const greeting = {
        id: 'initial_greet',
        role: 'assistant',
        content: `Namaste, ${userProfile?.name || 'Seeker'}. I am your spiritual guide in the vast ocean of Sanskrit. How may I assist your journey into grammar and wisdom today?`,
        timestamp: Date.now()
      };
      setMessages([greeting]);
    }
  }, [userProfile?.name]);

  // Save history whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveToStorage('chat_history', messages);
    }
    // Scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Text Message
  const onSendMessage = async (text) => {
    const userMsg = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    try {
      // Build localized/personalized prompt
      const prompt = buildChatPrompt(text, currentLanguage, userProfile);
      
      // Call AI Service (Logic model)
      const aiResponse = await sendChatMessage(
        [...messages, prompt], 
        currentLanguage, 
        userProfile
      );

      const assistantMsg = {
        id: generateId(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      const errorMsg = {
        id: generateId(),
        role: 'assistant',
        content: "Forgive me, seeker. The digital winds are turbulent and I cannot reach the temple of wisdom right now. Please try again soon.",
        timestamp: Date.now(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Handle Image Upload & Vision Analysis
  const onImageUpload = async (file) => {
    setIsAnalyzingImage(true);
    
    try {
      const base64Image = await fileToBase64(file);
      
      // Add local image preview message
      const imageMsg = {
        id: generateId(),
        role: 'user',
        content: "Sent a sacred image for analysis.",
        image: base64Image,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, imageMsg]);

      // Call Vision Service (Vision model)
      const visionPrompt = buildVisionPrompt("", currentLanguage, userProfile);
      const visionResponse = await analyzeSanskritImage(base64Image, visionPrompt, currentLanguage);

      const assistantMsg = {
        id: generateId(),
        role: 'assistant',
        content: visionResponse,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMsg]);

    } catch (error) {
      const errorMsg = {
        id: generateId(),
        role: 'assistant',
        content: "I could not decipher the markings on this image. Ensure the light is clear and the text is Sanskrit.",
        timestamp: Date.now(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  const containerStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: theme.colors.background,
    paddingTop: '64px', // Header offset
    paddingBottom: '80px', // Input offset
  };

  const messageListStyles = {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    WebkitOverflowScrolling: 'touch',
  };

  const typingIndicatorStyles = {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    animation: 'pulse 1.5s infinite',
  };

  return (
    <div style={containerStyles}>
      <Header title={t('chat.headerTitle')} showBack={true} />
      
      <div 
        ref={scrollRef} 
        style={messageListStyles} 
        className="hide-scrollbar"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isAiTyping && (
          <div style={typingIndicatorStyles}>
             <LoadingSpinner size={24} message={t('chat.aiTyping')} />
          </div>
        )}

        {isAnalyzingImage && (
           <div style={typingIndicatorStyles}>
             <LoadingSpinner size={24} message={t('chat.analyzingImage')} />
           </div>
        )}
      </div>

      <DisclaimerBanner dismissible={true} />
      
      <ChatInput 
        onSend={onSendMessage} 
        onImage={onImageUpload}
        disabled={isAiTyping || isAnalyzingImage}
      />

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default AIChatScreen;
