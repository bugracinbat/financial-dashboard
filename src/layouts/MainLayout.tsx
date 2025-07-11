import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
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
} from "@heroicons/react/24/outline";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";

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

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPage =
    navigation.find((item) => item.href === location.pathname)?.name ||
    "Overview";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Sidebar />
      <Sidebar 
        isMobile 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main content */}
      <div className="lg:pl-64">
        <Header 
          currentPage={currentPage} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
