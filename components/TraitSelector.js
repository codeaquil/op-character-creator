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
      <label className="block text-lg font-semibold text-outer-space dark:text-gray-200 mb-2">
        {trait.title}
      </label>
      
      <select
        value={selectedValue || ''}
        onChange={(e) => onChange(trait.code, e.target.value)}
        disabled={disabled}
        className={`
          w-full p-4 rounded-lg border-2 text-base
          bg-white dark:bg-gray-800 border-celtic-blue/30 dark:border-dark-celtic-blue/30
          text-outer-space dark:text-gray-200
          focus:border-celtic-blue dark:focus:border-dark-celtic-blue focus:outline-none focus:ring-2 focus:ring-celtic-blue/20 dark:focus:ring-dark-celtic-blue/20
          disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed
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
    </div>
  );
}
