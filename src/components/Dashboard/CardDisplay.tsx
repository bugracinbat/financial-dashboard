interface CardDisplayProps {
  variant: "dark" | "light";
  balance: string;
  cardHolder: string;
  cardNumber: string;
  validThru: string;
  animationDelay?: string;
}

export default function CardDisplay({
  variant,
  balance,
  cardHolder,
  cardNumber,
  validThru,
  animationDelay = "0s",
}: CardDisplayProps) {
  const isDark = variant === "dark";

  return (
    <div
      className="w-full animate-fade-in"
      style={{ animationDelay }}
    >
      <div
        className={`rounded-2xl p-6 relative overflow-hidden h-full ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white animate-gradient shadow-2xl shadow-purple-900/50 card-hover"
            : "glass glass-hover shadow-xl"
        }`}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className={`text-sm mb-1 ${isDark ? "opacity-80" : "text-gray-500"}`}>
              Balance
            </p>
            <p className={`text-2xl font-semibold ${isDark ? "" : "text-gray-900"}`}>
              {balance}
            </p>
          </div>
          <div className="absolute top-0 right-0 mt-6 mr-6">
            <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
              <circle cx="16" cy="10" r="6" fill="#FF9F00" />
              <circle
                cx="26"
                cy="10"
                r="6"
                fill="#FF0000"
                fillOpacity="0.8"
              />
            </svg>
          </div>
        </div>
        <div className="space-y-3">
          <p className={`text-sm ${isDark ? "opacity-80" : "text-gray-500"}`}>
            CARD HOLDER
          </p>
          <p className={`font-medium ${isDark ? "" : "text-gray-900"}`}>
            {cardHolder}
          </p>
          <div className="flex justify-between items-center">
            <p className={`font-medium tracking-wider ${isDark ? "" : "text-gray-900"}`}>
              {cardNumber}
            </p>
            <div className={`text-sm ${isDark ? "opacity-80" : "text-gray-500"}`}>
              <span className="block">VALID THRU</span>
              <p>{validThru}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}