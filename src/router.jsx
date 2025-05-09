import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthRouter';

// Auth Pages
import Login from './pages/auth/Login';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import VendorManagement from './pages/admin/VendorManagement';
import UserManagement from './pages/admin/UserManagement';
import OrderManagement from './pages/admin/OrderManagement';
import RevenuePayments from './pages/admin/RevenuePayments';
import Reports from './pages/admin/Reports';

// Auth Guard
const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('admin_token');
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
        </Route>
        
        {/* Admin Routes - All protected */}
        <Route 
          path="/admin" 
          element={
            // <ProtectedRoute>
              <AdminLayout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="vendors" element={<VendorManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="revenue" element={<RevenuePayments />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;