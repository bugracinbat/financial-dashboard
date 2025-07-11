import { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ArrowPathIcon,
  UserIcon,
  ChartBarIcon,
  CreditCardIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

interface MainLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Transactions", href: "/transactions", icon: ArrowPathIcon },
  { name: "Accounts", href: "/accounts", icon: UserIcon },
  { name: "Investments", href: "/investments", icon: ChartBarIcon },
  { name: "Credit Cards", href: "/credit-cards", icon: CreditCardIcon },
  { name: "Loans", href: "/loans", icon: BanknotesIcon },
  { name: "Services", href: "/services", icon: WrenchScrewdriverIcon },
  { name: "My Privileges", href: "/privileges", icon: UserGroupIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

const notifications = [
  {
    id: 1,
    type: "transaction",
    title: "Payment Received",
    message: "You received $1,250 from John Doe",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    title: "Budget Alert",
    message: "You've spent 85% of your monthly budget",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "reminder",
    title: "Bill Due Soon",
    message: "Your credit card payment is due in 3 days",
    time: "3 hours ago",
    read: true,
  },
];

const searchSuggestions = [
  "Recent transactions",
  "Credit card payments",
  "Investment portfolio",
  "Account settings",
  "Monthly expenses",
];

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [unreadNotifications] = useState(
    notifications.filter((n) => !n.read).length
  );

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
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

  const currentPage =
    navigation.find((item) => item.href === location.pathname)?.name ||
    "Overview";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 z-30 shadow-2xl">
        <div className="flex h-16 items-center px-6 border-b border-gray-100">
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
        </div>
        <nav className="px-3 mt-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-900 hover:shadow-md hover:scale-105"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-blue-500"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-40 transition-opacity duration-200 lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 lg:hidden shadow-2xl ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
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
          <button onClick={() => setIsSidebarOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        <nav className="px-3 mt-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-900 hover:shadow-md hover:scale-105"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-blue-500"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header
          className={`sticky top-0 z-40 h-16 glass border-b border-white/10 flex items-center px-6 transition-all duration-300 ${
            isScrolled
              ? "shadow-lg backdrop-blur-xl bg-white/95 border-gray-200/50"
              : "shadow-sm backdrop-blur-xl bg-white/80"
          }`}
        >
          <button
            className="lg:hidden mr-4"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6 text-gray-400" />
          </button>
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[#1E293B]">
              {currentPage}
            </h1>
            <div className="flex items-center space-x-4">
              {/* Enhanced Search with Suggestions */}
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

              {/* Dark Mode Toggle */}
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

              {/* Settings */}
              <Link
                to="/settings"
                className="p-2.5 rounded-xl glass-hover transition-transform hover:scale-110"
              >
                <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
              </Link>

              {/* Notifications with Badge */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 rounded-xl glass-hover transition-transform hover:scale-110 relative"
                >
                  <BellIcon className="h-5 w-5 text-gray-400" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        Notifications
                      </h3>
                      <span className="text-xs text-blue-600 font-medium">
                        {unreadNotifications} new
                      </span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                            !notification.read ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                !notification.read
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50">
                      <button className="w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
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
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
