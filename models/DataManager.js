/**
 * DataManager - Handles loading and managing character trait data
 */
export class DataManager {
  constructor() {
    this.data = null;
    this.traits = [];
    this.traitValues = new Map(); // Map of trait_code -> array of values
  }

  /**
   * Load data from the public/data.json file
   */
  async loadData() {
    try {
      const response = await fetch('/op-character-creator/data.json');
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.status}`);
      }

      this.data = await response.json();
      this.processData();
      return this.data;
    } catch (error) {
      console.error('Error loading character data:', error);
      throw error;
    }
  }

  /**
   * Process the loaded data into more usable structures
   */
  processData() {
    if (!this.data) return;

    this.traits = this.data.traits || [];

    // Group trait values by trait_code
    this.traitValues.clear();
    if (this.data.trait_values) {
      this.data.trait_values.forEach(traitValue => {
        const traitCode = traitValue.trait_code;
        if (!this.traitValues.has(traitCode)) {
          this.traitValues.set(traitCode, []);
        }
        this.traitValues.get(traitCode).push(traitValue);
      });
    }
  }

  /**
   * Get all traits
   */
  getTraits() {
    return this.traits;
  }

  /**
   * Get trait by code
   */
  getTrait(traitCode) {
    return this.traits.find(trait => trait.code === traitCode);
  }

  /**
   * Get all values for a specific trait
   */
  getTraitValues(traitCode) {
    return this.traitValues.get(traitCode) || [];
  }

  /**
   * Get a random value for a specific trait
   */
  getRandomTraitValue(traitCode) {
    const values = this.getTraitValues(traitCode);
    if (values.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  /**
   * Get all trait codes
   */
  getTraitCodes() {
    return this.traits.map(trait => trait.code);
  }

  /**
   * Check if data is loaded
   */
  isLoaded() {
    return this.data !== null;
  }
}

// Create a singleton instance
export const dataManager = new DataManager();
