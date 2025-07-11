import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import PageTransition from "./components/PageTransition";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import AccessibilityEnhancements from "./components/AccessibilityEnhancements";
import DashboardSkeleton from "./components/LoadingStates/DashboardSkeleton";
import SkeletonCard from "./components/LoadingStates/SkeletonCard";
import { ToastProvider } from "./components/ToastNotification";
import { usePerformanceMonitor } from "./hooks/usePerformanceMonitor";

// Lazy load all page components for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Accounts = lazy(() => import("./pages/Accounts"));
const Investments = lazy(() => import("./pages/Investments"));
const CreditCards = lazy(() => import("./pages/CreditCards"));
const Loans = lazy(() => import("./pages/Loans"));
const Services = lazy(() => import("./pages/Services"));
const Privileges = lazy(() => import("./pages/Privileges"));
const Settings = lazy(() => import("./pages/Settings"));

// Enhanced loading components for different pages
const DashboardLoader = () => <DashboardSkeleton />;
const PageLoader = () => (
  <div className="space-y-6">
    <SkeletonCard height="h-32" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkeletonCard height="h-64" />
      <SkeletonCard height="h-64" />
    </div>
    <SkeletonCard height="h-96" />
  </div>
);

const getPageLoader = (pathname: string) => {
  if (pathname === '/') return <DashboardLoader />;
  return <PageLoader />;
};

function AppContent() {
  usePerformanceMonitor();
  
  return (
    <Router basename="/financial-dashboard">
      <AccessibilityEnhancements />
      <MainLayout>
        <main id="main-content" tabIndex={-1}>
          <PageTransition>
            <Suspense fallback={getPageLoader(window.location.pathname)}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/credit-cards" element={<CreditCards />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/services" element={<Services />} />
                <Route path="/privileges" element={<Privileges />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </main>
      </MainLayout>
      <KeyboardShortcuts />
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;