import React from 'react';
import { 
  Users, User, ShoppingBag, DollarSign, AlertTriangle, 
  TrendingUp, Truck, CheckCircle, Clock
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  // Mock data for charts
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];
  
  const orderStatusData = [
    { name: 'Completed', value: 65 },
    { name: 'In Progress', value: 25 },
    { name: 'Pending', value: 10 },
  ];
  
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];
  
  const topVendorData = [
    { name: 'Laundry Express', orders: 125 },
    { name: 'Clean Fold', orders: 98 },
    { name: 'Wash House', orders: 86 },
    { name: 'Quick Wash', orders: 72 },
    { name: 'Sparkle Clean', orders: 65 },
  ];

  // Stats cards data
  const statsCards = [
    { 
      title: 'Total Users',
      value: '1,250',
      change: '+15%',
      icon: <User size={20} className="text-white" />,
      bgColor: 'bg-indigo-600' 
    },
    { 
      title: 'Total Vendors',
      value: '85',
      change: '+8%',
      icon: <Users size={20} className="text-white" />,
      bgColor: 'bg-emerald-600' 
    },
    { 
      title: 'Active Orders',
      value: '324',
      change: '+12%',
      icon: <ShoppingBag size={20} className="text-white" />,
      bgColor: 'bg-blue-600' 
    },
    { 
      title: 'Revenue (MTD)',
      value: '₹29,850',
      change: '+23%',
      icon: <DollarSign size={20} className="text-white" />,
      bgColor: 'bg-amber-500' 
    },
    { 
      title: 'Pending Approvals',
      value: '12',
      change: '-',
      icon: <Clock size={20} className="text-white" />,
      bgColor: 'bg-purple-600' 
    },
    { 
      title: 'Active Disputes',
      value: '4',
      change: '-',
      icon: <AlertTriangle size={20} className="text-white" />,
      bgColor: 'bg-red-600' 
    },
  ];

  // Recent order data
  const recentOrders = [
    { 
      id: 'ORD-7829', 
      customer: 'John Smith', 
      vendor: 'Laundry Express', 
      amount: '₹48.50', 
      status: 'Delivered', 
      date: '2025-05-09'
    },
    { 
      id: 'ORD-7828', 
      customer: 'Emma Wilson', 
      vendor: 'Clean Fold', 
      amount: '₹32.75', 
      status: 'In Progress', 
      date: '2025-05-09'
    },
    { 
      id: 'ORD-7827', 
      customer: 'Michael Brown', 
      vendor: 'Quick Wash', 
      amount: '₹54.00', 
      status: 'Pending', 
      date: '2025-05-09'
    },
    { 
      id: 'ORD-7826', 
      customer: 'Sarah Johnson', 
      vendor: 'Wash House', 
      amount: '₹28.50', 
      status: 'Delivered', 
      date: '2025-05-08'
    },
    { 
      id: 'ORD-7825', 
      customer: 'David Lee', 
      vendor: 'Sparkle Clean', 
      amount: '₹42.25', 
      status: 'Delivered', 
      date: '2025-05-08'
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'badge-success';
      case 'In Progress':
        return 'badge-info';
      case 'Pending':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle size={14} className="mr-1" />;
      case 'In Progress':
        return <Truck size={14} className="mr-1" />;
      case 'Pending':
        return <Clock size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-800 ">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated: May 10, 2025 09:45 AM</span>
          <button className="btn btn-outline flex items-center">
            <TrendingUp size={16} className="mr-1" /> 
            Reports
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="card flex items-center p-6">
            <div className={`rounded-full p-3 ${stat.bgColor} mr-4`}>
              {stat.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                {stat.change !== '-' && (
                  <span className="ml-2 text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Revenue Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Revenue" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Vendors</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topVendorData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
          <button className="btn btn-outline text-sm">View All Orders</button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Order ID</th>
                <th className="table-header-cell">Customer</th>
                <th className="table-header-cell">Vendor</th>
                <th className="table-header-cell">Amount</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Date</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {recentOrders.map((order, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell font-medium text-gray-900">{order.id}</td>
                  <td className="table-cell">{order.customer}</td>
                  <td className="table-cell">{order.vendor}</td>
                  <td className="table-cell font-medium">{order.amount}</td>
                  <td className="table-cell">
                    <span className={`badge ${getStatusBadgeClass(order.status)} flex items-center`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="table-cell">{order.date}</td>
                  <td className="table-cell">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;