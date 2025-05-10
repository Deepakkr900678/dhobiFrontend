import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Users, ShoppingBag, User, DollarSign, 
  BarChart2, LogOut, Menu, X, Bell, Settings 
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/admin/vendors', label: 'Vendor Management', icon: <Users size={20} /> },
    { path: '/admin/users', label: 'User Management', icon: <User size={20} /> },
    { path: '/admin/orders', label: 'Order Management', icon: <ShoppingBag size={20} /> },
    { path: '/admin/revenue', label: 'Revenue & Payments', icon: <DollarSign size={20} /> },
    { path: '/admin/reports', label: 'Reports & Insights', icon: <BarChart2 size={20} /> },
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="header">
        <div className="flex items-center">
          <button 
            className="lg:hidden mr-2 text-gray-600 hover:text-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center">
            <span className="font-bold text-xl text-indigo-600">
              Dhobi<span className="text-gray-800">Admin</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-600 hover:text-gray-800">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Settings size={20} />
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="ml-2 hidden md:block">
              <div className="text-sm font-medium text-gray-700">Admin User</div>
              <div className="text-xs text-gray-500">admin@dhobi.com</div>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center text-sm text-gray-700 hover:text-red-600"
          >
            <LogOut size={18} className="mr-1" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>
      
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="mt-6">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'sidebar-item-active' : ''}`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;