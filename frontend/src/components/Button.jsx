export function Button({ label, onClick, type = "button", disabled = false }) {
    return (
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {label}
      </button>
    );
}
  