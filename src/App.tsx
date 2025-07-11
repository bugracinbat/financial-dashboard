import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

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

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router basename="/financial-dashboard">
      <MainLayout>
        <Suspense fallback={<PageLoader />}>
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
      </MainLayout>
    </Router>
  );
}

export default App;