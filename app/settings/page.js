'use client';

import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { settingsManager } from '../../models/SettingsManager';

export default function SettingsPage() {
  const [showVoiceTrait, setShowVoiceTrait] = useState(true);
  const [showPersonalityTrait, setShowPersonalityTrait] = useState(true);
  const [showWeaponTrait, setShowWeaponTrait] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Load current settings
    setShowVoiceTrait(settingsManager.getShowVoiceTrait());
    setShowPersonalityTrait(settingsManager.getShowPersonalityTrait());
    setShowWeaponTrait(settingsManager.getShowWeaponTrait());
    setIsLoading(false);
  }, []);

  const handleVoiceTraitToggle = () => {
    const newValue = settingsManager.toggleVoiceTrait();
    setShowVoiceTrait(newValue);

    // Show save confirmation
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handlePersonalityTraitToggle = () => {
    const newValue = settingsManager.togglePersonalityTrait();
    setShowPersonalityTrait(newValue);

    // Show save confirmation
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleWeaponTraitToggle = () => {
    const newValue = settingsManager.toggleWeaponTrait();
    setShowWeaponTrait(newValue);

    // Show save confirmation
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleResetSettings = () => {
    settingsManager.resetSettings();
    setShowVoiceTrait(settingsManager.getShowVoiceTrait());
    setShowPersonalityTrait(settingsManager.getShowPersonalityTrait());
    setShowWeaponTrait(settingsManager.getShowWeaponTrait());

    // Show reset confirmation
    setSaveStatus('reset');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <h2 className="text-2xl font-semibold text-outer-space dark:text-gray-200 mb-2">Loading...</h2>
            <p className="text-outer-space/70 dark:text-gray-300">Loading settings...</p>
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
            <h1 className="text-3xl font-bold text-outer-space dark:text-gray-200 text-center mb-2">
              Settings
            </h1>
            <p className="text-outer-space/70 dark:text-gray-300 text-center">
              Customize your character creation experience
            </p>
          </div>

          <div className="bg-diamond dark:bg-dark-diamond rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-outer-space dark:text-gray-200 mb-6">Character Options</h2>

            {/* Voice Trait Toggle */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 mr-4">
                  <h3 className="text-lg font-medium text-outer-space dark:text-gray-200 mb-2">
                    Voice Trait
                  </h3>
                  <p className="text-outer-space/70 dark:text-gray-300 text-sm">
                    Include voice and vocal quirks in character generation.
                    Some players may find these traits difficult to mimic during roleplay.
                  </p>
                </div>

                <button
                  onClick={handleVoiceTraitToggle}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-celtic-blue dark:focus:ring-dark-celtic-blue focus:ring-offset-2 dark:focus:ring-offset-dark-outer-space
                    ${showVoiceTrait ? 'bg-ripe-mango dark:bg-dark-ripe-mango' : 'bg-gray-300 dark:bg-gray-600'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${showVoiceTrait ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              <div className="text-sm">
                <span className="text-outer-space/60 dark:text-gray-400">Status: </span>
                <span className={`font-bold ${showVoiceTrait ? 'text-outer-space dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                  {showVoiceTrait ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Personality Trait Toggle */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 mr-4">
                  <h3 className="text-lg font-medium text-outer-space dark:text-gray-200 mb-2">
                    Personality Trait
                  </h3>
                  <p className="text-outer-space/70 dark:text-gray-300 text-sm">
                    Include personality quirks and behavioral traits in character generation.
                    These traits help define how your character acts and behaves.
                  </p>
                </div>

                <button
                  onClick={handlePersonalityTraitToggle}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-celtic-blue dark:focus:ring-dark-celtic-blue focus:ring-offset-2 dark:focus:ring-offset-dark-outer-space
                    ${showPersonalityTrait ? 'bg-ripe-mango dark:bg-dark-ripe-mango' : 'bg-gray-300 dark:bg-gray-600'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${showPersonalityTrait ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              <div className="text-sm">
                <span className="text-outer-space/60 dark:text-gray-400">Status: </span>
                <span className={`font-bold ${showPersonalityTrait ? 'text-outer-space dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                  {showPersonalityTrait ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Weapon Trait Toggle */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 mr-4">
                  <h3 className="text-lg font-medium text-outer-space dark:text-gray-200 mb-2">
                    Weapon Trait
                  </h3>
                  <p className="text-outer-space/70 dark:text-gray-300 text-sm">
                    Include weaponry and combat abilities in character generation.
                    These traits define how your character fights and what weapons they use.
                  </p>
                </div>

                <button
                  onClick={handleWeaponTraitToggle}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-celtic-blue dark:focus:ring-dark-celtic-blue focus:ring-offset-2 dark:focus:ring-offset-dark-outer-space
                    ${showWeaponTrait ? 'bg-ripe-mango dark:bg-dark-ripe-mango' : 'bg-gray-300 dark:bg-gray-600'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${showWeaponTrait ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              <div className="text-sm">
                <span className="text-outer-space/60 dark:text-gray-400">Status: </span>
                <span className={`font-bold ${showWeaponTrait ? 'text-outer-space dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                  {showWeaponTrait ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Save Status */}
            {saveStatus && (
              <div className={`
                mb-6 p-3 rounded-lg text-center text-sm font-medium
                ${saveStatus === 'saved' 
                  ? 'bg-ripe-mango/20 dark:bg-dark-ripe-mango/20 text-outer-space dark:text-gray-200 border border-ripe-mango/30 dark:border-dark-ripe-mango/30' 
                  : 'bg-celtic-blue/20 dark:bg-dark-celtic-blue/20 text-outer-space dark:text-gray-200 border border-celtic-blue/30 dark:border-dark-celtic-blue/30'
                }
              `}>
                {saveStatus === 'saved' ? '✅ Settings saved automatically' : '🔄 Settings reset to defaults'}
              </div>
            )}

            {/* Reset Section */}
            <div className="border-t border-outer-space/20 dark:border-gray-600 pt-6">
              <h3 className="text-lg font-medium text-outer-space dark:text-gray-200 mb-3">
                Reset Settings
              </h3>
              <p className="text-outer-space/70 dark:text-gray-300 text-sm mb-4">
                Reset all settings back to their default values.
              </p>

              <button
                onClick={handleResetSettings}
                className="bg-alizarin-crimson dark:bg-red-600 hover:bg-alizarin-crimson/90 dark:hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px] flex items-center justify-center"
              >
                <span className="mr-2">🔄</span>
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
