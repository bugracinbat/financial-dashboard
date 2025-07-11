export default function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/25">
        <svg
          className="w-6 h-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 12 Q 6 6 9 12 T 15 12 T 21 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 17 Q 6 11 9 17 T 15 17 T 21 17"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text
            x="12"
            y="10"
            fontSize="8"
            fontWeight="bold"
            fill="currentColor"
            textAnchor="middle"
          >
            $
          </text>
        </svg>
      </div>
      <div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          WealthWave
        </span>
        <p className="text-xs text-gray-500 -mt-1">Smart Finance</p>
      </div>
    </div>
  );
}