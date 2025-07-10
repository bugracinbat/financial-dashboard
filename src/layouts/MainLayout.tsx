import { ReactNode, useState } from "react";
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
  { name: "Setting", href: "/settings", icon: Cog6ToothIcon },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPage = navigation.find(item => item.href === location.pathname)?.name || "Overview";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 z-30">
        <div className="flex h-16 items-center px-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-[#0066FF] p-2 rounded-lg">
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
            <span className="text-xl font-bold text-[#1E293B]">
              WealthWave
            </span>
          </div>
        </div>
        <nav className="px-3 mt-6">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 mb-1 rounded-xl transition-all text-sm ${
                  isActive
                    ? "bg-[#0066FF] text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 flex-shrink-0 ${
                    isActive ? "text-white" : ""
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
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 ease-in-out z-50 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-[#0066FF] p-2 rounded-lg">
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
            <span className="text-xl font-bold text-[#1E293B]">
              WealthWave
            </span>
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
                className={`group flex items-center px-3 py-2 mb-1 rounded-xl transition-all text-sm ${
                  isActive
                    ? "bg-[#0066FF] text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 flex-shrink-0 ${
                    isActive ? "text-white" : ""
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
        <header className="sticky top-0 z-10 h-16 bg-white border-b border-gray-100 flex items-center px-6">
          <button
            className="lg:hidden mr-4"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6 text-gray-400" />
          </button>
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[#1E293B]">{currentPage}</h1>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search for something"
                    className="w-64 pl-10 pr-4 py-2 bg-[#F8FAFC] border border-gray-100 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <button className="p-2 rounded-xl hover:bg-gray-50">
                <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-50">
                <BellIcon className="h-5 w-5 text-gray-400" />
              </button>
              <button className="ml-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC]">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
