import React, { useState } from 'react';
import { Search, Users, MapPin, Clock, AlertCircle, Check, X } from 'lucide-react';

const UserManagement = () => {
  // Sample data - replace with actual API integration
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Arun Sharma',
      email: 'arun.sharma@example.com',
      phone: '+91 9876543210',
      joined: '2023-05-12',
      status: 'active',
      orders: 12,
      addresses: [
        { id: 1, title: 'Home', address: '123 Urban Estate, Sector 5, Delhi' },
        { id: 2, title: 'Office', address: 'Tech Park, Block B, Gurgaon' }
      ]
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 8765432109',
      joined: '2023-06-18',
      status: 'active',
      orders: 8,
      addresses: [
        { id: 3, title: 'Home', address: '45 Lake View Apartments, Mumbai' }
      ]
    },
    {
      id: 3,
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 7654321098',
      joined: '2023-04-03',
      status: 'suspended',
      orders: 3,
      addresses: [
        { id: 4, title: 'Home', address: '78 Green Park, Bangalore' },
        { id: 5, title: 'Work', address: 'Tech Valley, Electronic City, Bangalore' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, status: newStatus} : user
    ));
    
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({...selectedUser, status: newStatus});
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 pt-6">User Management</h1>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card border-l-indigo-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-gray-800">143</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
        </div>
        
        <div className="stat-card border-l-emerald-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Active Users</h3>
          <p className="text-2xl font-bold text-gray-800">128</p>
          <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
        </div>
        
        <div className="stat-card border-l-red-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Suspended Users</h3>
          <p className="text-2xl font-bold text-gray-800">15</p>
          <p className="text-xs text-gray-500 mt-1">No change from last month</p>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="form-input p-2 pl-10 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select className="form-input bg-white py-2">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
            
            <select className="form-input bg-white py-2">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Name</th>
                <th className="table-header-cell">Contact Details</th>
                <th className="table-header-cell">Joined Date</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Orders</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </td>
                    <td className="table-cell">
                      <div className="text-sm text-gray-900">
                        {new Date(user.joined).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="table-cell">
                      {user.status === 'active' ? (
                        <span className="badge badge-success">Active</span>
                      ) : (
                        <span className="badge badge-danger">Suspended</span>
                      )}
                    </td>
                    <td className="table-cell text-center">
                      <div className="text-sm font-medium text-gray-900">{user.orders}</div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewDetails(user)}
                          className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                        >
                          View Details
                        </button>
                        {user.status === 'active' ? (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'suspended')}
                            className="text-red-600 hover:text-red-900 font-medium text-sm"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'active')}
                            className="text-green-600 hover:text-green-900 font-medium text-sm"
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="table-cell text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="h-12 w-12 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
                      <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
              <span className="font-medium">{filteredUsers.length}</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn btn-outline py-1 px-3">Previous</button>
            <button className="btn btn-primary py-1 px-3">Next</button>
          </div>
        </div>
      </div>
      
      {/* User Detail Modal */}
      {isDetailModalOpen && selectedUser && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">User Details</h3>
              <button 
                onClick={closeDetailModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="px-6 py-4">
              {/* User Basic Info */}
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-medium text-xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedUser.name}</h2>
                  <p className="text-gray-500 flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${selectedUser.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {selectedUser.status === 'active' ? 'Active Account' : 'Suspended Account'}
                  </p>
                </div>
              </div>
              
              {/* User Information Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  <button className="border-b-2 border-indigo-500 px-1 py-4 text-sm font-medium text-indigo-600">
                    General Information
                  </button>
                  <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Order History
                  </button>
                </nav>
              </div>
              
              {/* Contact Information */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joined Date</p>
                    <p className="font-medium">
                      {new Date(selectedUser.joined).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="font-medium">{selectedUser.orders}</p>
                  </div>
                </div>
              </div>
              
              {/* Addresses */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Saved Addresses</h4>
                <div className="space-y-4">
                  {selectedUser.addresses.map(address => (
                    <div key={address.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-gray-900">{address.title}</h5>
                          <p className="text-gray-500">{address.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Administrative Actions */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Administrative Actions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.status === 'active' ? (
                    <button 
                      onClick={() => handleStatusChange(selectedUser.id, 'suspended')}
                      className="btn btn-danger flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Suspend Account
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleStatusChange(selectedUser.id, 'active')}
                      className="btn btn-success bg-green-600 text-white hover:bg-green-700 flex items-center"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Activate Account
                    </button>
                  )}
                  <button className="btn btn-outline flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
              <button 
                onClick={closeDetailModal}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default UserManagement;