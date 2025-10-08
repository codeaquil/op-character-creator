/**
 * ToggleButton Component
 * A reusable toggle switch button used across the application
 */
export default function ToggleButton({ enabled, onToggle, label, ariaLabel }) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-celtic-blue dark:focus:ring-dark-celtic-blue focus:ring-offset-2 dark:focus:ring-offset-dark-outer-space
        ${enabled ? 'bg-ripe-mango dark:bg-dark-ripe-mango' : 'bg-gray-300 dark:bg-gray-600'}
      `}
      aria-label={ariaLabel || label}
      title={ariaLabel || label}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${enabled ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}
