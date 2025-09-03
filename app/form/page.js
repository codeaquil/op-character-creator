'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import TraitSelector from '../../components/TraitSelector';
import CharacterDisplay from '../../components/CharacterDisplay';
import { Character } from '../../models/Character';
import { dataManager } from '../../models/DataManager';
import { settingsManager } from '../../models/SettingsManager';

export default function FormPage() {
  const [formData, setFormData] = useState({});
  const [character, setCharacter] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  // Load data and initialize form
  useEffect(() => {
    async function initializeForm() {
      try {
        setIsLoading(true);
        setError(null);

        // Load data if not already loaded
        if (!dataManager.isLoaded()) {
          await dataManager.loadData();
        }

        // Try to load existing character to populate form
        const existingCharacter = Character.load();
        if (existingCharacter) {
          const traits = existingCharacter.getAllTraits();
          const initialFormData = {};
          
          Object.entries(traits).forEach(([traitCode, traitValue]) => {
            if (settingsManager.shouldShowTrait(traitCode)) {
              initialFormData[traitCode] = traitValue.id.toString();
            }
          });
          
          setFormData(initialFormData);
          updateCharacterPreview(initialFormData);
        }
      } catch (err) {
        console.error('Failed to initialize form:', err);
        setError('Failed to load character data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    initializeForm();
  }, []);

  const handleTraitChange = (traitCode, valueId) => {
    const newFormData = {
      ...formData,
      [traitCode]: valueId
    };
    setFormData(newFormData);
    updateCharacterPreview(newFormData);
  };

  const updateCharacterPreview = (currentFormData) => {
    try {
      const newCharacter = Character.fromFormData(currentFormData, dataManager);
      const newDescription = newCharacter.generateDescription(dataManager, settingsManager);
      
      setCharacter(newCharacter);
      setDescription(newDescription);
      setShowPreview(Object.keys(currentFormData).length > 0);
    } catch (err) {
      console.error('Failed to update character preview:', err);
    }
  };

  const handleSave = () => {
    if (character && character.isComplete(dataManager, settingsManager)) {
      character.save();
      router.push('/character');
    }
  };

  const handleReset = () => {
    setFormData({});
    setCharacter(null);
    setDescription('');
    setShowPreview(false);
  };

  const isFormComplete = character && character.isComplete(dataManager, settingsManager);
  const availableTraits = settingsManager.filterTraits(dataManager.getTraits());

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-6xl mb-4">✏️</div>
            <h2 className="text-2xl font-semibold text-outer-space dark:text-gray-200 mb-2">Loading...</h2>
            <p className="text-outer-space/70 dark:text-gray-300">Preparing character form...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-alizarin-crimson/10 dark:bg-alizarin-crimson/20 border border-alizarin-crimson/30 dark:border-alizarin-crimson/50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-alizarin-crimson dark:text-red-400 mb-2">Error</h2>
              <p className="text-outer-space/70 dark:text-gray-300 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-ripe-mango dark:bg-dark-ripe-mango hover:bg-ripe-mango/90 dark:hover:bg-dark-ripe-mango/90 text-outer-space dark:text-dark-outer-space font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-outer-space dark:text-gray-200 text-center mb-2">
              Create Your Character
            </h1>
            <p className="text-outer-space/70 dark:text-gray-300 text-center">
              Choose traits to build your One Piece-inspired character
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <div className="bg-diamond dark:bg-dark-diamond rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-outer-space dark:text-gray-200 mb-4">Character Traits</h2>
                
                {availableTraits.map((trait) => (
                  <TraitSelector
                    key={trait.code}
                    trait={trait}
                    traitValues={dataManager.getTraitValues(trait.code)}
                    selectedValue={formData[trait.code]}
                    onChange={handleTraitChange}
                  />
                ))}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    disabled={!isFormComplete}
                    className={`
                      flex-1 font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px] flex items-center justify-center
                      ${isFormComplete
                        ? 'bg-ripe-mango dark:bg-dark-ripe-mango hover:bg-ripe-mango/90 dark:hover:bg-dark-ripe-mango/90 text-outer-space dark:text-dark-outer-space'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <span className="mr-2">💾</span>
                    Save Character
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-alizarin-crimson dark:bg-red-600 hover:bg-alizarin-crimson/90 dark:hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px] flex items-center justify-center"
                  >
                    <span className="mr-2">🔄</span>
                    Reset Form
                  </button>
                </div>

                {!isFormComplete && (
                  <p className="text-sm text-outer-space/60 dark:text-gray-400 text-center mt-3">
                    Please select all traits to save your character
                  </p>
                )}
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              {showPreview ? (
                <CharacterDisplay
                  character={character}
                  description={description}
                  showActions={false}
                />
              ) : (
                <div className="bg-diamond dark:bg-dark-diamond rounded-lg p-6 text-center">
                  <div className="text-6xl mb-4">👻</div>
                  <h3 className="text-xl font-semibold text-outer-space dark:text-gray-200 mb-2">Character Preview</h3>
                  <p className="text-outer-space/70 dark:text-gray-300">
                    Start selecting traits to see your character come to life!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
