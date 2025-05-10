import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Plus,
} from "lucide-react";

// Component for viewing vendor details
const ViewVendorModal = ({
  vendor,
  onClose,
  onEdit,
  onSuspend,
  onActivate,
  onDelete,
}) => {
  if (!vendor) return null;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
      case "Suspended":
        return "bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold text-gray-900">
            Vendor Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XCircle size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{vendor.name}</h2>
              <p className="text-sm text-gray-500">ID: {vendor.id}</p>
            </div>
            <span className={getStatusBadgeClass(vendor.status)}>
              {vendor.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Owner Information
              </h4>
              <p className="text-sm font-medium text-gray-900">
                {vendor.owner}
              </p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Mail size={16} className="mr-1" />
                {vendor.email}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Phone size={16} className="mr-1" />
                {vendor.phone}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Business Information
              </h4>
              <div className="flex items-start text-sm text-gray-500">
                <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                <span>{vendor.address}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                <span className="font-medium">Service Areas:</span>{" "}
                {vendor.serviceAreas.join(", ")}
              </div>
              <div className="mt-1 text-sm text-gray-500">
                <span className="font-medium">Commission Rate:</span>{" "}
                {vendor.commissionRate}%
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Service & Pricing
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">
                      Service
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {vendor.services.map((service, index) => (
                    <tr key={index}>
                      <td className="py-2 text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="py-2 text-sm text-gray-500">
                        {service.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-sm font-medium text-gray-500">Join Date</div>
              <div className="mt-1 text-xl font-semibold text-gray-900">
                {vendor.joinDate}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-sm font-medium text-gray-500">
                Orders Completed
              </div>
              <div className="mt-1 text-xl font-semibold text-gray-900">
                {vendor.ordersCompleted}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-sm font-medium text-gray-500">Rating</div>
              <div className="mt-1 text-xl font-semibold text-gray-900">
                {vendor.rating > 0 ? `${vendor.rating}/5.0` : "N/A"}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-6 flex justify-between">
            {vendor.status === "Pending" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onActivate(vendor.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Approve Vendor
                </button>
                <button
                  onClick={() => onDelete(vendor.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
                >
                  <XCircle size={16} className="mr-2" />
                  Reject
                </button>
              </div>
            )}

            {vendor.status === "Active" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(vendor)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Details
                </button>
                <button
                  onClick={() => onSuspend(vendor.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
                >
                  <AlertCircle size={16} className="mr-2" />
                  Suspend Vendor
                </button>
              </div>
            )}

            {vendor.status === "Suspended" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onActivate(vendor.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Reactivate Vendor
                </button>
                <button
                  onClick={() => onDelete(vendor.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Permanently
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for editing vendor details
const EditVendorModal = ({ vendor, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: vendor.name,
    owner: vendor.owner,
    email: vendor.email,
    phone: vendor.phone,
    address: vendor.address,
    serviceAreas: vendor.serviceAreas.join(", "),
    commissionRate: vendor.commissionRate,
    services: [...vendor.services],
  });

  const [serviceItem, setServiceItem] = useState({ name: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddService = () => {
    if (serviceItem.name && serviceItem.price) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, { ...serviceItem }],
      }));
      setServiceItem({ name: "", price: "" });
    }
  };

  const handleRemoveService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleServiceItemChange = (e) => {
    const { name, value } = e.target;
    setServiceItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create updated vendor object with form data
    const updatedVendor = {
      ...vendor,
      ...formData,
      serviceAreas: formData.serviceAreas.split(",").map((area) => area.trim()),
    };

    // Call the onSave function passed from parent
    onSave(updatedVendor);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold text-gray-900">Edit Vendor</h3>
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
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Business Information
              </h4>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  rows="3"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="serviceAreas"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service Areas *
                </label>
                <input
                  type="text"
                  id="serviceAreas"
                  name="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  placeholder="Manhattan, Brooklyn, Queens (comma separated)"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="commissionRate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Commission Rate (%) *
                </label>
                <input
                  type="number"
                  id="commissionRate"
                  name="commissionRate"
                  value={formData.commissionRate}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Owner Information
              </h4>

              <div className="mb-4">
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Owner Name *
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Services & Pricing
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="min-w-full mb-4">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">
                      Service
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">
                      Price
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2 w-16">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formData.services.map((service, index) => (
                    <tr key={index}>
                      <td className="py-2 text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="py-2 text-sm text-gray-500">
                        {service.price}
                      </td>
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
                  <label
                    htmlFor="serviceName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Name
                  </label>
                  <input
                    type="text"
                    id="serviceName"
                    name="name"
                    value={serviceItem.name}
                    onChange={handleServiceItemChange}
                    className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    placeholder="e.g. Dry Cleaning"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="servicePrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="servicePrice"
                    name="price"
                    value={serviceItem.price}
                    onChange={handleServiceItemChange}
                    className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    placeholder="e.g. ₹5.00/item"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="font-medium rounded-lg text-sm px-5 py-2.5 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 mt-1"
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
                className="font-medium rounded-lg text-sm px-5 py-2.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="font-medium rounded-lg text-sm px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for adding a new vendor
const AddVendorModal = ({ isOpen, onClose, onAddVendor }) => {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    email: "",
    phone: "",
    address: "",
    serviceAreas: "",
    commissionRate: 15,
    services: [{ name: "Wash & Fold", price: "₹2.50/lb" }],
  });

  const [serviceItem, setServiceItem] = useState({ name: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddService = () => {
    if (serviceItem.name && serviceItem.price) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, { ...serviceItem }],
      }));
      setServiceItem({ name: "", price: "" });
    }
  };

  const handleRemoveService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleServiceItemChange = (e) => {
    const { name, value } = e.target;
    setServiceItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create vendor object with form data
    const newVendor = {
      id: `V${Math.floor(1000 + Math.random() * 9000)}`, // Generate random ID
      ...formData,
      serviceAreas: formData.serviceAreas.split(",").map((area) => area.trim()),
      status: "Pending",
      joinDate: new Date().toISOString().split("T")[0],
      rating: 0,
      ordersCompleted: 0,
    };

    // Call the onAddVendor function passed from parent
    onAddVendor(newVendor);

    // Reset form and close modal
    setFormData({
      name: "",
      owner: "",
      email: "",
      phone: "",
      address: "",
      serviceAreas: "",
      commissionRate: 15,
      services: [{ name: "Wash & Fold", price: "₹2.50/lb" }],
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-20 shadow-2xl">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold text-gray-900">
            Add New Vendor
          </h3>
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
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Business Information
              </h4>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  rows="3"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="serviceAreas"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service Areas *
                </label>
                <input
                  type="text"
                  id="serviceAreas"
                  name="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  placeholder="Manhattan, Brooklyn, Queens (comma separated)"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="commissionRate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Commission Rate (%) *
                </label>
                <input
                  type="number"
                  id="commissionRate"
                  name="commissionRate"
                  value={formData.commissionRate}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Owner Information
              </h4>

              <div className="mb-4">
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Owner Name *
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Services & Pricing
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="min-w-full mb-4">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">
                      Service
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">
                      Price
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2 w-16">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {formData.services.map((service, index) => (
                    <tr key={index}>
                      <td className="py-2 text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="py-2 text-sm text-gray-500">
                        {service.price}
                      </td>
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
                  <label
                    htmlFor="serviceName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Name
                  </label>
                  <input
                    type="text"
                    id="serviceName"
                   
                    name="name"
                    value={serviceItem.name}
                    onChange={handleServiceItemChange}
                    className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    placeholder="e.g. Dry Cleaning"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="servicePrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="servicePrice"
                    name="price"
                    value={serviceItem.price}
                    onChange={handleServiceItemChange}
                    className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    placeholder="e.g. ₹5.00/item"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="font-medium rounded-lg text-sm px-5 py-2.5 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 mt-1"
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
                className="font-medium rounded-lg text-sm px-5 py-2.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="font-medium rounded-lg text-sm px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Add Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Vendor Management component
const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    {
      id: "V1001",
      name: "CleanLaundry Express",
      owner: "Rahul Sharma",
      email: "rahul@cleanlaundry.com",
      phone: "+91-98765-43210",
      address: "123 MG Road, Bangalore, Karnataka 560001",
      serviceAreas: ["Indiranagar", "Koramangala", "HSR Layout"],
      status: "Active",
      commissionRate: 15,
      joinDate: "2024-01-15",
      ordersCompleted: 248,
      rating: 4.8,
      services: [
        { name: "Wash & Fold", price: "₹80/kg" },
        { name: "Dry Cleaning", price: "₹250/item" },
        { name: "Ironing", price: "₹30/item" },
      ],
    },
    {
      id: "V1002",
      name: "Premium Dry Cleaners",
      owner: "Priya Patel",
      email: "priya@premiumcleaners.com",
      phone: "+91-87654-32109",
      address: "456 Church Street, Bangalore, Karnataka 560008",
      serviceAreas: ["Whitefield", "Marathahalli", "Bellandur"],
      status: "Active",
      commissionRate: 18,
      joinDate: "2024-02-01",
      ordersCompleted: 176,
      rating: 4.5,
      services: [
        { name: "Premium Dry Cleaning", price: "₹350/item" },
        { name: "Stain Removal", price: "₹150/stain" },
        { name: "Shoe Cleaning", price: "₹400/pair" },
      ],
    },
    {
      id: "V1003",
      name: "Quick Wash Services",
      owner: "Amit Kumar",
      email: "amit@quickwash.in",
      phone: "+91-76543-21098",
      address: "789 100 Feet Road, Chennai, Tamil Nadu 600042",
      serviceAreas: ["Adyar", "T Nagar", "Nungambakkam"],
      status: "Pending",
      commissionRate: 12,
      joinDate: "2024-05-05",
      ordersCompleted: 0,
      rating: 0,
      services: [
        { name: "Express Laundry", price: "₹100/kg" },
        { name: "Corporate Uniforms", price: "₹200/set" },
      ],
    },
    {
      id: "V1004",
      name: "Eco Friendly Cleaners",
      owner: "Ananya Reddy",
      email: "ananya@ecofriendly.co",
      phone: "+91-65432-10987",
      address: "321 Green Park, Hyderabad, Telangana 500032",
      serviceAreas: ["Banjara Hills", "Jubilee Hills", "Gachibowli"],
      status: "Suspended",
      commissionRate: 15,
      joinDate: "2023-11-10",
      ordersCompleted: 89,
      rating: 3.2,
      services: [
        { name: "Organic Cleaning", price: "₹120/kg" },
        { name: "Green Dry Cleaning", price: "₹300/item" },
      ],
    },
    {
      id: "V1005",
      name: "Royal Laundry",
      owner: "Vikram Singh",
      email: "vikram@royallaundry.com",
      phone: "+91-54321-09876",
      address: "654 Civil Lines, New Delhi, Delhi 110054",
      serviceAreas: ["Connaught Place", "Karol Bagh", "Rajouri Garden"],
      status: "Active",
      commissionRate: 20,
      joinDate: "2023-09-20",
      ordersCompleted: 412,
      rating: 4.9,
      services: [
        { name: "Premium Laundry", price: "₹150/kg" },
        { name: "Curtain Cleaning", price: "₹500/piece" },
        { name: "Carpet Cleaning", price: "₹50/sq.ft" },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter vendors based on search query and status filter
  const filteredVendors = vendors.filter((vendor) => {
    const matchesQuery =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || vendor.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  // Handler for viewing vendor details
  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setIsViewModalOpen(true);
  };

  // Handler for editing vendor
  const handleEditVendor = (vendor) => {
    setSelectedVendor(vendor);
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  // Handler for saving edited vendor
  const handleSaveVendor = (updatedVendor) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) =>
        vendor.id === updatedVendor.id ? updatedVendor : vendor
      )
    );
    setIsEditModalOpen(false);
    // Optionally show success message
  };

  // Handler for activating vendor
  const handleActivateVendor = (vendorId) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) =>
        vendor.id === vendorId ? { ...vendor, status: "Active" } : vendor
      )
    );
    setIsViewModalOpen(false);
    // Optionally show success message
  };

  // Handler for suspending vendor
  const handleSuspendVendor = (vendorId) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) =>
        vendor.id === vendorId ? { ...vendor, status: "Suspended" } : vendor
      )
    );
    setIsViewModalOpen(false);
    // Optionally show success message
  };

  // Handler for deleting vendor
  const handleDeleteVendor = (vendorId) => {
    setVendors((prevVendors) =>
      prevVendors.filter((vendor) => vendor.id !== vendorId)
    );
    setIsViewModalOpen(false);
    // Optionally show success message
  };

  // Handler for adding new vendor
  const handleAddVendor = (newVendor) => {
    setVendors((prevVendors) => [...prevVendors, newVendor]);
    // Optionally show success message
  };

  return (
    <div className=" w-full mx-auto">
      <div className="mb-6 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
      
      </div>
        {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card border-l-indigo-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Total Vendors</h3>
          <p className="text-2xl font-bold text-gray-800">143</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
        </div>
        
        <div className="stat-card border-l-emerald-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Active Vendors</h3>
          <p className="text-2xl font-bold text-gray-800">128</p>
          <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
        </div>
        
        <div className="stat-card border-l-red-500">
          <h3 className="text-gray-500 text-sm uppercase font-semibold">Suspended Vendors</h3>
          <p className="text-2xl font-bold text-gray-800">15</p>
          <p className="text-xs text-gray-500 mt-1">No change from last month</p>
        </div>
      </div>
      

      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search vendors by name, ID, or owner..."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <div className="flex items-center">
                <Filter size={18} className="text-gray-500 mr-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block pl-3 pr-10 py-2.5 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center"
            >
              <Plus size={18} className="mr-2" />
              Add Vendor
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                      >
                        Vendor
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Service Areas
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Rating
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Orders
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredVendors.length > 0 ? (
                      filteredVendors.map((vendor) => (
                        <tr
                          key={vendor.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleViewVendor(vendor)}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8">
                            <div className="flex items-center">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {vendor.name}
                                </div>
                                <div className="text-gray-500">{vendor.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">{vendor.owner}</div>
                            <div className="text-gray-500">{vendor.email}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {vendor.serviceAreas.slice(0, 2).join(", ")}
                            {vendor.serviceAreas.length > 2 && "..."}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={
                                vendor.status === "Active"
                                  ? "bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium"
                                  : vendor.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-medium"
                                  : "bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-medium"
                              }
                            >
                              {vendor.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {vendor.rating > 0 ? `${vendor.rating}/5.0` : "N/A"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {vendor.ordersCompleted}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewVendor(vendor);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              View
                              <span className="sr-only">, {vendor.name}</span>
                            </button>
                            {vendor.status === "Active" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditVendor(vendor);
                                }}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Edit
                                <span className="sr-only">, {vendor.name}</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-3 py-6 text-center text-sm text-gray-500"
                        >
                          No vendors found matching your search criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Vendor Modal */}
      {isViewModalOpen && selectedVendor && (
        <ViewVendorModal
          vendor={selectedVendor}
          onClose={() => setIsViewModalOpen(false)}
          onEdit={handleEditVendor}
          onSuspend={handleSuspendVendor}
          onActivate={handleActivateVendor}
          onDelete={handleDeleteVendor}
        />
      )}

      {/* Edit Vendor Modal */}
      {isEditModalOpen && selectedVendor && (
        <EditVendorModal
          vendor={selectedVendor}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveVendor}
        />
      )}

      {/* Add Vendor Modal */}
      <AddVendorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVendor={handleAddVendor}
      />
    </div>
  );
};

export default VendorManagement;
