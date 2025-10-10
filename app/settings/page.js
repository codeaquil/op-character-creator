'use client';

import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import ToggleButton from '../../components/ToggleButton';
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
            <h2 className="text-center text-xl font-semibold text-outer-space dark:text-gray-200 mb-6">Character Options</h2>

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

                <ToggleButton
                  enabled={showVoiceTrait}
                  onToggle={handleVoiceTraitToggle}
                  label="Voice Trait"
                  ariaLabel={showVoiceTrait ? 'Voice trait enabled' : 'Voice trait disabled'}
                />
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

                <ToggleButton
                  enabled={showPersonalityTrait}
                  onToggle={handlePersonalityTraitToggle}
                  label="Personality Trait"
                  ariaLabel={showPersonalityTrait ? 'Personality trait enabled' : 'Personality trait disabled'}
                />
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

                <ToggleButton
                  enabled={showWeaponTrait}
                  onToggle={handleWeaponTraitToggle}
                  label="Weapon Trait"
                  ariaLabel={showWeaponTrait ? 'Weapon trait enabled' : 'Weapon trait disabled'}
                />
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
              <h3 className="text-center text-lg font-medium text-outer-space dark:text-gray-200 mb-3">
                Reset Settings
              </h3>

              <button
                onClick={handleResetSettings}
                className="bg-alizarin-crimson dark:bg-red-600 hover:bg-alizarin-crimson/90 dark:hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px] flex items-center justify-center mx-auto"
              >
                <span className="mr-2">🔄</span>
                Reset to Defaults
              </button>
            </div>

            {/* Credits Section */}
            <div className="border-t border-outer-space/20 dark:border-gray-600 pt-6 mt-6">
              <h3 className="text-lg font-medium text-outer-space dark:text-gray-200 mb-3 text-center">
                Credits
              </h3>
              
              <div className="space-y-3 flex flex-col items-center">
                <div className="flex items-center justify-center text-outer-space/70 dark:text-gray-300 text-sm">
                  <span className="font-medium text-outer-space dark:text-gray-200 mr-2">Lead:</span>
                  <a 
                    href="https://raydee99.com" 
                    target="_blank" 
                    className="text-celtic-blue dark:text-blue-400 hover:underline flex items-center"
                  >
                    <span className="mr-1">🔗</span> Ray Demers
                  </a>
                </div>

                <div className="flex items-center justify-center text-outer-space/70 dark:text-gray-300 text-sm">
                  <span className="font-medium text-outer-space dark:text-gray-200 mr-2">Developer:</span>
                  <a 
                    href="https://codeonwebservices.com" 
                    target="_blank" 
                    className="text-celtic-blue dark:text-blue-400 hover:underline flex items-center"
                  >
                    <span className="mr-1">🔗</span> Codeon LLC
                  </a>
                </div>

                <div className="flex items-center justify-center text-outer-space/70 dark:text-gray-300 text-sm">
                  <a 
                    href="https://github.com/codeaquil/op-character-creator" 
                    target="_blank" 
                    className="text-celtic-blue dark:text-blue-400 hover:underline flex items-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" className="mr-2" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                    </svg>
                    View Source Code on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
