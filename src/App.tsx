import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

import Dashboard from './pages/Dashboard';
import SalesPipeline from './pages/SalesPipeline';
import CustomerAnalytics from './pages/CustomerAnalytics';
import RevenueAnalytics from './pages/RevenueAnalytics';
import Login from './pages/Login';

/* MAIN APP LAYOUT (Demo Dashboard) */
function AppLayout() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('dashboard');

  // ✅ HIDE layout completely on /login
  if (location.pathname === '/login') {
    return null;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'pipeline':
        return <SalesPipeline />;
      case 'customers':
        return <CustomerAnalytics />;
      case 'revenue':
        return <RevenueAnalytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="ml-64">
        <Header />
        <main className="pt-16">
          <div className="p-8">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
