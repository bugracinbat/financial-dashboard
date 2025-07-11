import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const searchSuggestions = [
  "Recent transactions",
  "Credit card payments",
  "Investment portfolio",
  "Account settings",
  "Monthly expenses",
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative hidden sm:block" ref={searchRef}>
      <div className="relative">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search for something"
          className="w-64 pl-10 pr-4 py-2.5 glass border border-white/20 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSearchSuggestions(true)}
        />
      </div>
      {showSearchSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          {searchQuery && (
            <div className="p-3 border-b border-gray-100">
              <p className="text-xs text-gray-500">
                Search results for "{searchQuery}"
              </p>
            </div>
          )}
          <div className="p-2">
            {searchSuggestions
              .filter((suggestion) =>
                suggestion
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setShowSearchSuggestions(false);
                  }}
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 inline mr-2" />
                  {suggestion}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}