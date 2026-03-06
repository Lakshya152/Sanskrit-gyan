/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Sanskrit Grammar - Utility Helpers
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Pure utility functions used across the application.
 */

/**
 * Creates a promise-based delay (used for animations and transitions)
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Formats a date string to a human-readable format
 * @param {string} dateString - ISO date string or date input value
 * @param {string} locale - Language code (en, hi, es, fr, it, ko)
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, locale = 'en') => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const localeMap = {
      en: 'en-US',
      hi: 'hi-IN',
      es: 'es-ES',
      fr: 'fr-FR',
      it: 'it-IT',
      ko: 'ko-KR'
    };
    return date.toLocaleDateString(localeMap[locale] || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.warn('Date formatting failed:', error);
    return dateString;
  }
};

/**
 * Validates that a string is not empty or whitespace
 * @param {string} value - The string to validate
 * @returns {boolean}
 */
export const isNotEmpty = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Validates a name (at least 2 characters, no numbers)
 * @param {string} name - The name to validate
 * @returns {boolean}
 */
export const isValidName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  // Allow letters (including Devanagari and other scripts), spaces, and hyphens
  const nameRegex = /^[a-zA-Z\u0900-\u097F\u0080-\u024F\uAC00-\uD7AF\s\-'.]+$/;
  return nameRegex.test(trimmed);
};

/**
 * Validates a date of birth (must be in the past, person must be at least 5 years old)
 * @param {string} dateString - The date string to validate
 * @returns {boolean}
 */
export const isValidDOB = (dateString) => {
  if (!dateString) return false;
  try {
    const dob = new Date(dateString);
    const now = new Date();
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(now.getFullYear() - 5);
    
    // Must be in the past and person must be at least 5 years old
    return dob < fiveYearsAgo;
  } catch (error) {
    return false;
  }
};

/**
 * Converts an image File object to a base64 data URI
 * Required by the Vision AI service for image analysis
 * @param {File} file - The image file to convert
 * @returns {Promise<string>} base64 data URI string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      reject(new Error('Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.'));
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      reject(new Error('Image too large. Maximum size is 5MB.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Truncates a string to a maximum length and adds ellipsis
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum allowed length
 * @returns {string}
 */
export const truncate = (str, maxLength = 100) => {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength).trim() + '...';
};

/**
 * Generates a unique ID for chat messages and other dynamic elements
 * @returns {string}
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Debounce function to limit rapid function calls (useful for search inputs)
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function}
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
