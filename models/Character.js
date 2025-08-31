/**
 * Character - Represents a One Piece character with traits and description generation
 */
export class Character {
  constructor(traits = {}) {
    this.traits = traits; // Map of trait_code -> trait_value object
    this.id = this.generateId();
    this.createdAt = new Date().toISOString();
  }

  /**
   * Generate a unique ID for the character
   */
  generateId() {
    return 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Set a trait value for the character
   */
  setTrait(traitCode, traitValue) {
    this.traits[traitCode] = traitValue;
  }

  /**
   * Get a trait value for the character
   */
  getTrait(traitCode) {
    return this.traits[traitCode];
  }

  /**
   * Get all traits
   */
  getAllTraits() {
    return { ...this.traits };
  }

  /**
   * Generate a character description paragraph
   */
  generateDescription(dataManager, settingsManager) {
    if (!dataManager || !dataManager.isLoaded()) {
      return "Character data is not loaded.";
    }

    const sentences = [];
    const availableTraits = settingsManager.filterTraits(dataManager.getTraits());

    availableTraits.forEach(trait => {
      const traitValue = this.traits[trait.code];
      if (traitValue && traitValue.value) {
        // Replace %XXX% placeholder with the actual trait value
        const sentence = trait.sentence.replace('%XXX%', traitValue.value);
        sentences.push(sentence);
      }
    });

    if (sentences.length === 0) {
      return "This character has no defined traits.";
    }

    // Join sentences into a paragraph
    return sentences.join(' ');
  }

  /**
   * Generate a random character
   */
  static generateRandom(dataManager, settingsManager) {
    if (!dataManager || !dataManager.isLoaded()) {
      throw new Error('Data manager is not loaded');
    }

    const character = new Character();
    const availableTraits = settingsManager.filterTraits(dataManager.getTraits());

    availableTraits.forEach(trait => {
      const randomValue = dataManager.getRandomTraitValue(trait.code);
      if (randomValue) {
        character.setTrait(trait.code, randomValue);
      }
    });

    return character;
  }

  /**
   * Create character from form data
   */
  static fromFormData(formData, dataManager) {
    const character = new Character();
    
    Object.entries(formData).forEach(([traitCode, valueId]) => {
      if (valueId) {
        const traitValues = dataManager.getTraitValues(traitCode);
        const selectedValue = traitValues.find(tv => tv.id === parseInt(valueId));
        if (selectedValue) {
          character.setTrait(traitCode, selectedValue);
        }
      }
    });

    return character;
  }

  /**
   * Save character to localStorage
   */
  save() {
    try {
      const storageKey = 'op-character-creator-current-character';
      const characterData = {
        id: this.id,
        traits: this.traits,
        createdAt: this.createdAt
      };
      localStorage.setItem(storageKey, JSON.stringify(characterData));
    } catch (error) {
      console.warn('Failed to save character to localStorage:', error);
    }
  }

  /**
   * Load character from localStorage
   */
  static load() {
    try {
      const storageKey = 'op-character-creator-current-character';
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const characterData = JSON.parse(stored);
        const character = new Character(characterData.traits);
        character.id = characterData.id;
        character.createdAt = characterData.createdAt;
        return character;
      }
    } catch (error) {
      console.warn('Failed to load character from localStorage:', error);
    }
    return null;
  }

  /**
   * Check if character has all required traits
   */
  isComplete(dataManager, settingsManager) {
    if (!dataManager || !dataManager.isLoaded()) {
      return false;
    }

    const requiredTraits = settingsManager.filterTraits(dataManager.getTraits());
    return requiredTraits.every(trait => {
      const traitValue = this.traits[trait.code];
      return traitValue && traitValue.value;
    });
  }

  /**
   * Get character summary for display
   */
  getSummary() {
    const traitCount = Object.keys(this.traits).length;
    return {
      id: this.id,
      traitCount,
      createdAt: this.createdAt,
      hasTraits: traitCount > 0
    };
  }
}
