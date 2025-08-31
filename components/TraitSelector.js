'use client';

export default function TraitSelector({ 
  trait, 
  traitValues, 
  selectedValue, 
  onChange, 
  disabled = false 
}) {
  if (!trait || !traitValues) {
    return null;
  }

  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold text-outer-space mb-2">
        {trait.title}
      </label>
      
      <select
        value={selectedValue || ''}
        onChange={(e) => onChange(trait.code, e.target.value)}
        disabled={disabled}
        className={`
          w-full p-4 rounded-lg border-2 text-base
          bg-white border-celtic-blue/30
          focus:border-celtic-blue focus:outline-none focus:ring-2 focus:ring-celtic-blue/20
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          min-h-[48px]
          ${disabled ? 'opacity-50' : ''}
        `}
      >
        <option value="">
          Choose {trait.title.toLowerCase()}...
        </option>
        {traitValues.map((traitValue) => (
          <option key={traitValue.id} value={traitValue.id}>
            {traitValue.value}
          </option>
        ))}
      </select>
      
      {/* Preview sentence */}
      {selectedValue && (
        <div className="mt-3 p-3 bg-diamond/50 rounded-lg">
          <p className="text-outer-space/80 text-sm">
            <strong>Preview:</strong> {
              trait.sentence.replace(
                '%XXX%', 
                traitValues.find(tv => tv.id === parseInt(selectedValue))?.value || ''
              )
            }
          </p>
        </div>
      )}
    </div>
  );
}
