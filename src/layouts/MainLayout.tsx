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

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 z-30">
        <div className="flex h-16 items-center px-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="bg-[#0066FF]/10 p-2 rounded">
              <svg
                className="w-5 h-5 text-[#0066FF]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 4h16v16H4V4z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <path d="M4 4h8v8H4V4z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-[#1E293B]">
              Soar Task
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
        className={`lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-20 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 ease-in-out z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="bg-[#0066FF]/10 p-2 rounded">
              <svg
                className="w-5 h-5 text-[#0066FF]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 4h16v16H4V4z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <path d="M4 4h8v8H4V4z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-[#1E293B]">
              Soar Task
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
                    ? "bg-[#0066FF]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 flex-shrink-0 ${
                    isActive ? "text-white" : ""
                  }`}
                />
                <span className={isActive ? "text-white" : ""}>
                  {item.name}
                </span>
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
            <h1 className="text-xl font-semibold text-[#1E293B]">Overview</h1>
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
