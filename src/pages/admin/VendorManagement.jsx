import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, Edit, Trash2, 
  CheckCircle, XCircle, MapPin, Phone, Mail, AlertCircle,Plus
} from 'lucide-react';
import AddVendorModal from './component/AddVendorModal';

const VendorManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  
  // Mock data for vendors
  const vendorsData = [
    {
      id: 'V1001',
      name: 'Laundry Express',
      owner: 'Robert Johnson',
      email: 'robert@laundryexpress.com',
      phone: '(555) 123-4567',
      status: 'Active',
      address: '123 Main St, New York, NY 10001',
      serviceAreas: ['Manhattan', 'Brooklyn'],
      joinDate: '2024-01-15',
      rating: 4.8,
      ordersCompleted: 1243,
      commissionRate: 15,
      services: [
        { name: 'Wash & Fold', price: '₹2.50/lb' },
        { name: 'Dry Cleaning', price: '₹5.00/item' },
        { name: 'Ironing', price: '₹3.00/item' }
      ]
    },
    {
      id: 'V1002',
      name: 'Clean Fold',
      owner: 'Sarah Williams',
      email: 'sarah@cleanfold.com',
      phone: '(555) 234-5678',
      status: 'Active',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      serviceAreas: ['Brooklyn', 'Queens'],
      joinDate: '2024-02-10',
      rating: 4.6,
      ordersCompleted: 985,
      commissionRate: 18,
      services: [
        { name: 'Wash & Fold', price: '₹2.75/lb' },
        { name: 'Dry Cleaning', price: '₹6.50/item' },
        { name: 'Stain Removal', price: '₹8.00/item' }
      ]
    },
    {
      id: 'V1003',
      name: 'Quick Wash',
      owner: 'David Chen',
      email: 'david@quickwash.com',
      phone: '(555) 345-6789',
      status: 'Pending',
      address: '789 Pine Blvd, Queens, NY 11354',
      serviceAreas: ['Queens'],
      joinDate: '2025-05-05',
      rating: 0,
      ordersCompleted: 0,
      commissionRate: 20,
      services: [
        { name: 'Wash & Fold', price: '₹2.25/lb' },
        { name: 'Express Service', price: '₹5.00 extra' }
      ]
    },
    {
      id: 'V1004',
      name: 'Wash House',
      owner: 'Maria Garcia',
      email: 'maria@washhouse.com',
      phone: '(555) 456-7890',
      status: 'Active',
      address: '321 Elm St, Bronx, NY 10452',
      serviceAreas: ['Bronx', 'Manhattan'],
      joinDate: '2024-03-20',
      rating: 4.5,
      ordersCompleted: 756,
      commissionRate: 15,
      services: [
        { name: 'Wash & Fold', price: '₹2.40/lb' },
        { name: 'Dry Cleaning', price: '₹5.50/item' },
        { name: 'Bedding & Linens', price: '₹20.00/set' }
      ]
    },
    {
      id: 'V1005',
      name: 'Sparkle Clean',
      owner: 'James Wilson',
      email: 'james@sparkle.com',
      phone: '(555) 567-8901',
      status: 'Suspended',
      address: '567 Maple Dr, Staten Island, NY 10301',
      serviceAreas: ['Staten Island'],
      joinDate: '2024-01-05',
      rating: 3.2,
      ordersCompleted: 293,
      commissionRate: 20,
      services: [
        { name: 'Wash & Fold', price: '₹2.30/lb' },
        { name: 'Premium Service', price: '₹10.00 extra' }
      ]
    },
    {
      id: 'V1006',
      name: 'Eco Laundry',
      owner: 'Emily Green',
      email: 'emily@ecolaundry.com',
      phone: '(555) 678-9012',
      status: 'Pending',
      address: '890 Cedar St, Brooklyn, NY 11215',
      serviceAreas: ['Brooklyn'],
      joinDate: '2025-05-08',
      rating: 0,
      ordersCompleted: 0,
      commissionRate: 18,
      services: [
        { name: 'Eco-Friendly Wash', price: '₹3.50/lb' },
        { name: 'Organic Dry Cleaning', price: '₹8.00/item' }
      ]
    }
  ];
  
  // Filter vendors based on active tab
  const filteredVendors = vendorsData.filter(vendor => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return vendor.status === 'Active';
    if (activeTab === 'pending') return vendor.status === 'Pending';
    if (activeTab === 'suspended') return vendor.status === 'Suspended';
    return true;
  });
  
  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'badge-success';
      case 'Pending':
        return 'badge-warning';
      case 'Suspended':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendors, setVendors] = useState([]);
  
  const handleAddVendor = (newVendor) => {
    setVendors(prev => [...prev, newVendor]);
    // In a real app, you would likely make an API call here
    console.log("New vendor added:", newVendor);
  };
  
  return (
    <div>
       {isModalOpen && (
        <AddVendorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddVendor={handleAddVendor}
        />
      )}
      <div className="flex items-center justify-between mb-6 pt-6">
        <h1 className="text-2xl font-bold text-gray-800">Vendor Management</h1>
        <button 
        className="font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 flex items-center" 
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={18} className="mr-1" />
        Add New Vendor
      </button>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`${
              activeTab === 'all'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            All Vendors
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">
              {vendorsData.length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('active')}
            className={`${
              activeTab === 'active'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Active
            <span className="ml-2 bg-green-100 text-green-600 py-0.5 px-2.5 rounded-full text-xs">
              {vendorsData.filter(v => v.status === 'Active').length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('pending')}
            className={`${
              activeTab === 'pending'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Pending Approval
            <span className="ml-2 bg-yellow-100 text-yellow-600 py-0.5 px-2.5 rounded-full text-xs">
              {vendorsData.filter(v => v.status === 'Pending').length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('suspended')}
            className={`${
              activeTab === 'suspended'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Suspended
            <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2.5 rounded-full text-xs">
              {vendorsData.filter(v => v.status === 'Suspended').length}
            </span>
          </button>
        </nav>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="form-input p-2 pl-10 block w-full"
            placeholder="Search vendors..."
          />
        </div>
        <div className="flex space-x-2">
          <button className="btn btn-outline flex items-center">
            <Filter size={16} className="mr-2" />
            Filter
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Vendors List */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Vendor ID</th>
                <th className="table-header-cell">Name</th>
                <th className="table-header-cell">Owner</th>
                <th className="table-header-cell">Contact</th>
                <th className="table-header-cell">Service Areas</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Commission</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="table-row">
                  <td className="table-cell font-medium text-gray-900">{vendor.id}</td>
                  <td className="table-cell">{vendor.name}</td>
                  <td className="table-cell">{vendor.owner}</td>
                  <td className="table-cell">
                    <div className="text-sm">{vendor.phone}</div>
                    <div className="text-xs text-gray-500">{vendor.email}</div>
                  </td>
                  <td className="table-cell">
                    {vendor.serviceAreas.map((area, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 mr-1 mb-1"
                      >
                        {area}
                      </span>
                    ))}
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${getStatusBadgeClass(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="table-cell">{vendor.commissionRate}%</td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewVendor(vendor)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit size={16} />
                      </button>
                      {vendor.status === 'Pending' && (
                        <button className="text-green-600 hover:text-green-800">
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {vendor.status === 'Active' && (
                        <button className="text-red-600 hover:text-red-800">
                          <XCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Vendor Detail Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold text-gray-900">Vendor Details</h3>
              <button 
                onClick={() => setSelectedVendor(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedVendor.name}</h2>
                  <p className="text-sm text-gray-500">ID: {selectedVendor.id}</p>
                </div>
                <span className={`badge ${getStatusBadgeClass(selectedVendor.status)}`}>
                  {selectedVendor.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Owner Information</h4>
                  <p className="text-sm font-medium text-gray-900">{selectedVendor.owner}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Mail size={16} className="mr-1" />
                    {selectedVendor.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Phone size={16} className="mr-1" />
                    {selectedVendor.phone}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Business Information</h4>
                  <div className="flex items-start text-sm text-gray-500">
                    <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                    <span>{selectedVendor.address}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    <span className="font-medium">Service Areas:</span> {selectedVendor.serviceAreas.join(', ')}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    <span className="font-medium">Commission Rate:</span> {selectedVendor.commissionRate}%
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Service & Pricing</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">Service</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedVendor.services.map((service, index) => (
                        <tr key={index}>
                          <td className="py-2 text-sm font-medium text-gray-900">{service.name}</td>
                          <td className="py-2 text-sm text-gray-500">{service.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-gray-500">Join Date</div>
                  <div className="mt-1 text-xl font-semibold text-gray-900">{selectedVendor.joinDate}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-gray-500">Orders Completed</div>
                  <div className="mt-1 text-xl font-semibold text-gray-900">{selectedVendor.ordersCompleted}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-gray-500">Rating</div>
                  <div className="mt-1 text-xl font-semibold text-gray-900">
                    {selectedVendor.rating > 0 ? `${selectedVendor.rating}/5.0` : 'N/A'}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-6 flex justify-between">
                {selectedVendor.status === 'Pending' && (
                  <div className="flex space-x-2">
                    <button className="btn btn-primary flex items-center">
                      <CheckCircle size={16} className="mr-2" />
                      Approve Vendor
                    </button>
                    <button className="btn btn-danger flex items-center">
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </button>
                  </div>
                )}
                
                {selectedVendor.status === 'Active' && (
                  <div className="flex space-x-2">
                    <button className="btn btn-outline flex items-center">
                      <Edit size={16} className="mr-2" />
                      Edit Details
                    </button>
                    <button className="btn btn-danger flex items-center">
                      <AlertCircle size={16} className="mr-2" />
                      Suspend Vendor
                    </button>
                  </div>
                )}
                
                {selectedVendor.status === 'Suspended' && (
                  <div className="flex space-x-2">
                    <button className="btn btn-primary flex items-center">
                      <CheckCircle size={16} className="mr-2" />
                      Reactivate Vendor
                    </button>
                    <button className="btn btn-danger flex items-center">
                      <Trash2 size={16} className="mr-2" />
                      Delete Permanently
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;