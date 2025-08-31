'use client';

import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { settingsManager } from '../../models/SettingsManager';

export default function SettingsPage() {
  const [showVoiceTrait, setShowVoiceTrait] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Load current settings
    setShowVoiceTrait(settingsManager.getShowVoiceTrait());
    setIsLoading(false);
  }, []);

  const handleVoiceTraitToggle = () => {
    const newValue = settingsManager.toggleVoiceTrait();
    setShowVoiceTrait(newValue);
    
    // Show save confirmation
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleResetSettings = () => {
    settingsManager.resetSettings();
    setShowVoiceTrait(settingsManager.getShowVoiceTrait());
    
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
            <h2 className="text-2xl font-semibold text-outer-space mb-2">Loading...</h2>
            <p className="text-outer-space/70">Loading settings...</p>
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
              Settings
            </h1>
            <p className="text-outer-space/70 text-center">
              Customize your character creation experience
            </p>
          </div>

          <div className="bg-diamond rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-outer-space mb-6">Character Options</h2>
            
            {/* Voice Trait Toggle */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 mr-4">
                  <h3 className="text-lg font-medium text-outer-space mb-2">
                    Voice Trait
                  </h3>
                  <p className="text-outer-space/70 text-sm">
                    Include voice and vocal quirks in character generation. 
                    Some players may find these traits difficult to mimic during roleplay.
                  </p>
                </div>
                
                <button
                  onClick={handleVoiceTraitToggle}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-celtic-blue focus:ring-offset-2
                    ${showVoiceTrait ? 'bg-ripe-mango' : 'bg-gray-300'}
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
                <span className="text-outer-space/60">Status: </span>
                <span className={`font-medium ${showVoiceTrait ? 'text-ripe-mango' : 'text-gray-500'}`}>
                  {showVoiceTrait ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Save Status */}
            {saveStatus && (
              <div className={`
                mb-6 p-3 rounded-lg text-center text-sm font-medium
                ${saveStatus === 'saved' 
                  ? 'bg-ripe-mango/20 text-outer-space border border-ripe-mango/30' 
                  : 'bg-celtic-blue/20 text-outer-space border border-celtic-blue/30'
                }
              `}>
                {saveStatus === 'saved' ? '✅ Settings saved automatically' : '🔄 Settings reset to defaults'}
              </div>
            )}

            {/* Reset Section */}
            <div className="border-t border-outer-space/20 pt-6">
              <h3 className="text-lg font-medium text-outer-space mb-3">
                Reset Settings
              </h3>
              <p className="text-outer-space/70 text-sm mb-4">
                Reset all settings back to their default values.
              </p>
              
              <button
                onClick={handleResetSettings}
                className="bg-alizarin-crimson hover:bg-alizarin-crimson/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px] flex items-center justify-center"
              >
                <span className="mr-2">🔄</span>
                Reset to Defaults
              </button>
            </div>

            {/* Info Section */}
            <div className="border-t border-outer-space/20 pt-6 mt-6">
              <h3 className="text-lg font-medium text-outer-space mb-3">
                About Settings
              </h3>
              <div className="text-sm text-outer-space/70 space-y-2">
                <p>• Settings are automatically saved to your browser's local storage</p>
                <p>• Changes apply immediately to character generation and forms</p>
                <p>• Existing characters are not affected by settings changes</p>
                <p>• Settings persist between browser sessions</p>
              </div>
            </div>
          </div>

          {/* Current Settings Summary */}
          <div className="mt-6 bg-white/30 rounded-lg p-4">
            <h3 className="font-medium text-outer-space mb-2">Current Configuration</h3>
            <div className="text-sm text-outer-space/70">
              <div className="flex justify-between items-center">
                <span>Voice Trait:</span>
                <span className={`font-medium ${showVoiceTrait ? 'text-ripe-mango' : 'text-gray-500'}`}>
                  {showVoiceTrait ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
