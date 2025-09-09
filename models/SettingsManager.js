/**
 * SettingsManager - Handles user settings and preferences
 */
export class SettingsManager {
  constructor() {
    this.settings = {
      showVoiceTrait: true, // Default to showing voice trait
      showPersonalityTrait: true, // Default to showing personality trait
      showWeaponTrait: true, // Default to showing weapon trait
    };
    this.storageKey = 'op-character-creator-settings';
    this.loadSettings();
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }
    
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
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }
    
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
   * Get the personality trait visibility setting
   */
  getShowPersonalityTrait() {
    return this.settings.showPersonalityTrait;
  }

  /**
   * Set the personality trait visibility setting
   */
  setShowPersonalityTrait(show) {
    this.settings.showPersonalityTrait = show;
    this.saveSettings();
  }

  /**
   * Toggle the personality trait visibility setting
   */
  togglePersonalityTrait() {
    this.setShowPersonalityTrait(!this.settings.showPersonalityTrait);
    return this.settings.showPersonalityTrait;
  }

  /**
   * Get the weapon trait visibility setting
   */
  getShowWeaponTrait() {
    return this.settings.showWeaponTrait;
  }

  /**
   * Set the weapon trait visibility setting
   */
  setShowWeaponTrait(show) {
    this.settings.showWeaponTrait = show;
    this.saveSettings();
  }

  /**
   * Toggle the weapon trait visibility setting
   */
  toggleWeaponTrait() {
    this.setShowWeaponTrait(!this.settings.showWeaponTrait);
    return this.settings.showWeaponTrait;
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
      showPersonalityTrait: true,
      showWeaponTrait: true,
    };
    this.saveSettings();
  }

  /**
   * Filter traits based on current settings
   */
  filterTraits(traits) {
    return traits.filter(trait => {
      if (trait.code === 'voice_trait' && !this.settings.showVoiceTrait) {
        return false;
      }
      if (trait.code === 'personality_trait' && !this.settings.showPersonalityTrait) {
        return false;
      }
      if (trait.code === 'weapon_trait' && !this.settings.showWeaponTrait) {
        return false;
      }
      return true;
    });
  }

  /**
   * Check if a trait should be shown based on settings
   */
  shouldShowTrait(traitCode) {
    if (traitCode === 'voice_trait') {
      return this.settings.showVoiceTrait;
    }
    if (traitCode === 'personality_trait') {
      return this.settings.showPersonalityTrait;
    }
    if (traitCode === 'weapon_trait') {
      return this.settings.showWeaponTrait;
    }
    return true;
  }
}

// Create a singleton instance
export const settingsManager = new SettingsManager();
