/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Grammar - App Actions
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Handles Share App and Rate App functionality.
 * Uses Web Share API with clipboard fallback.
 */

const APP_NAME = "Sanskrit Grammar – Words & Grammar Guidance";
const APP_DESCRIPTION = "Learn Sanskrit grammar with AI-powered spiritual guidance. Explore Shabd Roop, Dhatu Roop, Sandhi, Samas, and more.";

/**
 * Gets the current app URL for sharing
 * @returns {string} The app URL
 */
const getAppURL = () => {
  // In production, this would be the Play Store link or web URL
  // For now, use the current origin
  return window.location.origin;
};

/**
 * Share the app using Web Share API or clipboard fallback
 * @returns {Promise<{success: boolean, method: string}>}
 */
export const shareApp = async () => {
  const shareData = {
    title: APP_NAME,
    text: `${APP_DESCRIPTION}\n\nDownload now:`,
    url: getAppURL()
  };

  try {
    // Check if Web Share API is available (most mobile browsers support it)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    }

    // Fallback: Copy to clipboard
    const shareText = `${APP_NAME}\n\n${APP_DESCRIPTION}\n\n${getAppURL()}`;
    await copyToClipboard(shareText);
    return { success: true, method: 'clipboard' };
    
  } catch (error) {
    // User cancelled the share dialog — this is NOT an error
    if (error.name === 'AbortError') {
      return { success: false, method: 'cancelled' };
    }

    console.warn('[AppActions] Share failed:', error);

    // Last resort fallback: try clipboard
    try {
      const shareText = `${APP_NAME}\n\n${APP_DESCRIPTION}\n\n${getAppURL()}`;
      await copyToClipboard(shareText);
      return { success: true, method: 'clipboard' };
    } catch (clipboardError) {
      return { success: false, method: 'failed' };
    }
  }
};

/**
 * Copy text to clipboard (used as share fallback)
 * @param {string} text - Text to copy
 * @returns {Promise<void>}
 */
const copyToClipboard = async (text) => {
  try {
    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // Fallback: document.execCommand
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (!success) {
      throw new Error('execCommand copy failed');
    }
  } catch (error) {
    throw new Error('Failed to copy to clipboard');
  }
};

/**
 * Rate the app — opens the Play Store or App Store link
 * Falls back to in-app thank you message if no store link is configured
 * @returns {Promise<{success: boolean, method: string}>}
 */
export const rateApp = async () => {
  // Replace this with your actual Play Store link once published
  const playStoreURL = `https://play.google.com/store/apps/details?id=com.sanskrit.grammar`;
  const appStoreURL = `https://apps.apple.com/app/sanskrit-grammar/id000000000`;

  try {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes('android');
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    let storeURL = playStoreURL; // Default to Play Store

    if (isIOS) {
      storeURL = appStoreURL;
    } else if (isAndroid) {
      storeURL = playStoreURL;
    }

    // Open in new tab/window
    const newWindow = window.open(storeURL, '_blank', 'noopener,noreferrer');

    if (newWindow) {
      return { success: true, method: 'store' };
    }

    // If popup was blocked, try direct navigation
    window.location.href = storeURL;
    return { success: true, method: 'redirect' };

  } catch (error) {
    console.warn('[AppActions] Rate app failed:', error);
    return { success: false, method: 'failed' };
  }
};
