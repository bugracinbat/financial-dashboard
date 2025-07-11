import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import SearchBar from "./SearchBar";
import NotificationDropdown from "./NotificationDropdown";
import ProfileMenu from "./ProfileMenu";

interface HeaderProps {
  currentPage: string;
  onMenuClick: () => void;
}

export default function Header({ currentPage, onMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 h-16 glass border-b border-white/10 flex items-center px-6 transition-all duration-300 ${
        isScrolled
          ? "shadow-lg backdrop-blur-xl bg-white/95 border-gray-200/50"
          : "shadow-sm backdrop-blur-xl bg-white/80"
      }`}
    >
      <button
        className="lg:hidden mr-4"
        onClick={onMenuClick}
      >
        <Bars3Icon className="h-6 w-6 text-gray-400" />
      </button>
      <div className="flex-1 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#1E293B]">
          {currentPage}
        </h1>
        <div className="flex items-center space-x-4">
          <SearchBar />
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl glass-hover transition-all hover:scale-110"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <Link
            to="/settings"
            className="p-2.5 rounded-xl glass-hover transition-transform hover:scale-110"
          >
            <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
          </Link>

          <NotificationDropdown />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}