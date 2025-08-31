'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import CharacterDisplay from '../../components/CharacterDisplay';
import { Character } from '../../models/Character';
import { dataManager } from '../../models/DataManager';
import { settingsManager } from '../../models/SettingsManager';

export default function CharacterPage() {
  const [character, setCharacter] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Load data and generate initial character
  useEffect(() => {
    async function initializePage() {
      try {
        setIsLoading(true);
        setError(null);

        // Load data if not already loaded
        if (!dataManager.isLoaded()) {
          await dataManager.loadData();
        }

        // Try to load existing character first
        let existingCharacter = Character.load();
        
        if (existingCharacter && existingCharacter.isComplete(dataManager, settingsManager)) {
          setCharacter(existingCharacter);
          setDescription(existingCharacter.generateDescription(dataManager, settingsManager));
        } else {
          // Generate new random character
          generateNewCharacter();
        }
      } catch (err) {
        console.error('Failed to initialize character page:', err);
        setError('Failed to load character data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    initializePage();
  }, []);

  const generateNewCharacter = () => {
    try {
      const newCharacter = Character.generateRandom(dataManager, settingsManager);
      const newDescription = newCharacter.generateDescription(dataManager, settingsManager);
      
      setCharacter(newCharacter);
      setDescription(newDescription);
      
      // Save to localStorage
      newCharacter.save();
    } catch (err) {
      console.error('Failed to generate character:', err);
      setError('Failed to generate character. Please try again.');
    }
  };

  const handleEdit = () => {
    router.push('/form');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-6xl mb-4">⚓</div>
            <h2 className="text-2xl font-semibold text-outer-space mb-2">Loading...</h2>
            <p className="text-outer-space/70">Preparing your character...</p>
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
            <div className="bg-alizarin-crimson/10 border border-alizarin-crimson/30 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-alizarin-crimson mb-2">Error</h2>
              <p className="text-outer-space/70 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-ripe-mango hover:bg-ripe-mango/90 text-outer-space font-semibold py-2 px-4 rounded-lg transition-colors"
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
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-outer-space text-center mb-2">
              Character Generator
            </h1>
            <p className="text-outer-space/70 text-center">
              Your randomly generated One Piece-inspired character
            </p>
          </div>

          <CharacterDisplay
            character={character}
            description={description}
            onGenerateNew={generateNewCharacter}
            onEdit={handleEdit}
            showActions={true}
          />
        </div>
      </main>
    </div>
  );
}
