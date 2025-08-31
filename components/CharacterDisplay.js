'use client';

import { settingsManager } from '../models/SettingsManager';

export default function CharacterDisplay({ character, description, onGenerateNew, onEdit, showActions = true }) {
  if (!character) {
    return (
      <div className="bg-diamond rounded-lg p-6 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h3 className="text-xl font-semibold text-outer-space mb-2">No Character Yet</h3>
        <p className="text-outer-space/70">Generate a random character or create one manually!</p>
      </div>
    );
  }

  const traits = character.getAllTraits();
  // Filter traits based on current settings - hide voice trait if disabled
  const filteredTraits = Object.entries(traits).filter(([traitCode, traitValue]) => {
    return settingsManager.shouldShowTrait(traitCode);
  });

  return (
    <div className="bg-diamond rounded-lg p-6 shadow-lg">
      {/* Character Icon */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">🏴‍☠️</div>
        <h2 className="text-2xl font-bold text-outer-space">Your Character</h2>
      </div>

      {/* Character Description */}
      {description && (
        <div className="bg-white/50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-outer-space mb-2">Character Description</h3>
          <p className="text-outer-space leading-relaxed text-base">{description}</p>
        </div>
      )}

      {/* Trait Details */}
      {filteredTraits.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-outer-space mb-3">Trait Details</h3>
          <div className="space-y-2">
            {filteredTraits.map(([traitCode, traitValue]) => (
              <div key={traitCode} className="bg-white/30 rounded-lg p-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-medium text-outer-space capitalize">
                    {traitCode.replace('_', ' ')}:
                  </span>
                  <span className="text-outer-space/80 mt-1 sm:mt-0">
                    {traitValue.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="flex flex-col sm:flex-row gap-3">
          {onGenerateNew && (
            <button
              onClick={onGenerateNew}
              className="flex-1 bg-ripe-mango hover:bg-ripe-mango/90 text-outer-space font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px] flex items-center justify-center"
            >
              <span className="mr-2">🎲</span>
              Generate New Character
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex-1 bg-celtic-blue hover:bg-celtic-blue/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[48px] flex items-center justify-center"
            >
              <span className="mr-2">✏️</span>
              Edit Character
            </button>
          )}
        </div>
      )}

    </div>
  );
}
