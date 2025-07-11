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
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
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

export default function Sidebar({ isMobile = false, isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center px-6 border-b border-gray-100">
        <div className="flex items-center justify-between w-full">
          <Logo />
          {isMobile && (
            <button onClick={onClose} className="lg:hidden">
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          )}
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
              onClick={isMobile ? onClose : undefined}
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
    </>
  );

  if (isMobile) {
    return (
      <>
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-40 transition-opacity duration-200 lg:hidden ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 lg:hidden shadow-2xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 z-30 shadow-2xl">
      {sidebarContent}
    </div>
  );
}