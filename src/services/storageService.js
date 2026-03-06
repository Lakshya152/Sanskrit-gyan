/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔮 Local Storage Wrapper Service
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Safely handles saving, retrieving, and deleting data from the browser's localStorage.
 * Prevents app crashes in incognito mode or if storage quota is exceeded.
 */

const PREFIX = 'sanskrit_app_';

/**
 * Safely stringify and save data to localStorage
 * @param {string} key - The key to save under (without prefix)
 * @param {any} value - The data to save
 * @returns {boolean} True if successful, false otherwise
 */
export const saveToStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(`${PREFIX}${key}`, serializedValue);
    return true;
  } catch (error) {
    console.warn(`[StorageService] Failed to save key "${key}":`, error);
    // Handle QuotaExceededError specifically if needed in the future
    return false;
  }
};

/**
 * Safely retrieve and parse data from localStorage
 * @param {string} key - The key to retrieve (without prefix)
 * @param {any} defaultValue - What to return if the key doesn't exist or parsing fails
 * @returns {any} The parsed data or the defaultValue
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(`${PREFIX}${key}`);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.warn(`[StorageService] Failed to retrieve key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Remove a specific item from localStorage
 * @param {string} key - The key to remove (without prefix)
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch (error) {
    console.warn(`[StorageService] Failed to remove key "${key}":`, error);
  }
};

/**
 * Clear ALL app data from localStorage (useful for a "Reset App" settings feature)
 */
export const clearAppStorage = () => {
  try {
    const keysToRemove = [];
    // Find all keys belonging to this app
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) {
        keysToRemove.push(key);
      }
    }
    // Remove them
    keysToRemove.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.warn('[StorageService] Failed to clear app storage:', error);
    return false;
  }
};
