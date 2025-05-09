import React, { useState } from 'react';
import { XCircle, Plus } from 'lucide-react';

const AddVendorModal = ({ isOpen, onClose, onAddVendor }) => {
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    email: '',
    phone: '',
    address: '',
    serviceAreas: '',
    commissionRate: 15,
    services: [{ name: 'Wash & Fold', price: '₹2.50/lb' }]
  });
  
  const [serviceItem, setServiceItem] = useState({ name: '', price: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddService = () => {
    if (serviceItem.name && serviceItem.price) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, { ...serviceItem }]
      }));
      setServiceItem({ name: '', price: '' });
    }
  };
  
  const handleRemoveService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };
  
  const handleServiceItemChange = (e) => {
    const { name, value } = e.target;
    setServiceItem(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create vendor object with form data
    const newVendor = {
      id: `V${Math.floor(1000 + Math.random() * 9000)}`, // Generate random ID
      ...formData,
      serviceAreas: formData.serviceAreas.split(',').map(area => area.trim()),
      status: 'Pending',
      joinDate: new Date().toISOString().split('T')[0],
      rating: 0,
      ordersCompleted: 0
    };
    
    // Call the onAddVendor function passed from parent
    onAddVendor(newVendor);
    
    // Reset form and close modal
    setFormData({
      name: '',
      owner: '',
      email: '',
      phone: '',
      address: '',
      serviceAreas: '',
      commissionRate: 15,
      services: [{ name: 'Wash & Fold', price: '₹2.50/lb' }]
    });
    
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-20 shadow-2xl"> 
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold text-gray-900">Add New Vendor</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XCircle size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Business Information</h4>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Business Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  rows="3"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="serviceAreas" className="block text-sm font-medium text-gray-700 mb-1">Service Areas *</label>
                <input
                  type="text"
                  id="serviceAreas"
                  name="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  placeholder="Manhattan, Brooklyn, Queens (comma separated)"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%) *</label>
                <input
                  type="number"
                  id="commissionRate"
                  name="commissionRate"
                  value={formData.commissionRate}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Owner Information</h4>
              
              <div className="mb-4">
                <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">Owner Name *</label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Services & Pricing</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="min-w-full mb-4">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">Service</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">Price</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2 w-16">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formData.services.map((service, index) => (
                    <tr key={index}>
                      <td className="py-2 text-sm font-medium text-gray-900">{service.name}</td>
                      <td className="py-2 text-sm text-gray-500">{service.price}</td>
                      <td className="py-2">
                        <button 
                          type="button" 
                          onClick={() => handleRemoveService(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                  <input
                    type="text"
                    id="serviceName"
                    name="name"
                    value={serviceItem.name}
                    onChange={handleServiceItemChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    placeholder="e.g. Dry Cleaning"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="servicePrice" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    id="servicePrice"
                    name="price"
                    value={serviceItem.price}
                    onChange={handleServiceItemChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    placeholder="e.g. ₹5.00/item"
                  />
                </div>
                <div>
                  <button 
                    type="button"
                    onClick={handleAddService}
                    className="font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200 mt-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-6 flex justify-end">
            <div className="flex space-x-2">
              <button 
                type="button" 
                onClick={onClose}
                className="font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                className="font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
              >
                Submit Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component that integrates the Add Vendor functionality
const VendorManagementWithAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendors, setVendors] = useState([]);
  
  const handleAddVendor = (newVendor) => {
    setVendors(prev => [...prev, newVendor]);
    // In a real app, you would likely make an API call here
    console.log("New vendor added:", newVendor);
  };
  
  return (
    <div className="flex items-center justify-between mb-6 pt-6">
      <h1 className="text-2xl font-bold text-gray-800">Vendor Management</h1>
      <button 
        className="font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 flex items-center" 
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={18} className="mr-1" />
        Add New Vendor
      </button>
      
      {isModalOpen && (
        <AddVendorModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddVendor={handleAddVendor}
        />
      )}
    </div>
  );
};

export default AddVendorModal;