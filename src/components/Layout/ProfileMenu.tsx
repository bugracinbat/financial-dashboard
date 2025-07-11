import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function ProfileMenu() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative ml-2" ref={profileMenuRef}>
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
      >
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="h-9 w-9 rounded-full object-cover ring-2 ring-white/50 shadow-lg"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900">
            Jane Doe
          </p>
          <p className="text-xs text-gray-500">jane@example.com</p>
        </div>
      </button>

      {showProfileMenu && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              Jane Doe
            </p>
            <p className="text-xs text-gray-500">jane@example.com</p>
          </div>
          <div className="p-2">
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowProfileMenu(false)}
            >
              <UserCircleIcon className="h-4 w-4 text-gray-400" />
              <span>My Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowProfileMenu(false)}
            >
              <CogIcon className="h-4 w-4 text-gray-400" />
              <span>Account Settings</span>
            </Link>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
              <span>Help & Support</span>
            </button>
          </div>
          <div className="p-2 border-t border-gray-100">
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}