/**
 * SettingsManager - Handles user settings and preferences
 */
export class SettingsManager {
  constructor() {
    this.settings = {
      showVoiceTrait: true, // Default to showing voice trait
    };
    this.storageKey = 'op-character-creator-settings';
    this.loadSettings();
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        this.settings = { ...this.settings, ...parsedSettings };
      }
    } catch (error) {
      console.warn('Failed to load settings from localStorage:', error);
    }
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    } catch (error) {
      console.warn('Failed to save settings to localStorage:', error);
    }
  }

  /**
   * Get the voice trait visibility setting
   */
  getShowVoiceTrait() {
    return this.settings.showVoiceTrait;
  }

  /**
   * Set the voice trait visibility setting
   */
  setShowVoiceTrait(show) {
    this.settings.showVoiceTrait = show;
    this.saveSettings();
  }

  /**
   * Toggle the voice trait visibility setting
   */
  toggleVoiceTrait() {
    this.setShowVoiceTrait(!this.settings.showVoiceTrait);
    return this.settings.showVoiceTrait;
  }

  /**
   * Get all settings
   */
  getAllSettings() {
    return { ...this.settings };
  }

  /**
   * Reset settings to defaults
   */
  resetSettings() {
    this.settings = {
      showVoiceTrait: true,
    };
    this.saveSettings();
  }

  /**
   * Filter traits based on current settings
   */
  filterTraits(traits) {
    if (!this.settings.showVoiceTrait) {
      return traits.filter(trait => trait.code !== 'voice_trait');
    }
    return traits;
  }

  /**
   * Check if a trait should be shown based on settings
   */
  shouldShowTrait(traitCode) {
    if (traitCode === 'voice_trait') {
      return this.settings.showVoiceTrait;
    }
    return true;
  }
}

// Create a singleton instance
export const settingsManager = new SettingsManager();
