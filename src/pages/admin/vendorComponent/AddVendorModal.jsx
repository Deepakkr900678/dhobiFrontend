import React, { useState } from "react";
import { XCircle, AlertCircle } from "lucide-react";

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
    services: [{ name: "Wash & Fold", price: "₹80/kg" }],
  });

  const [serviceItem, setServiceItem] = useState({ name: "", price: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddService = () => {
    if (serviceItem.name && serviceItem.price) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, { ...serviceItem }],
      }));
      setServiceItem({ name: "", price: "" });
    } else {
      // Show validation error
      if (!serviceItem.name) {
        setErrors((prev) => ({
          ...prev,
          serviceName: "Service name is required",
        }));
      }
      if (!serviceItem.price) {
        setErrors((prev) => ({ ...prev, servicePrice: "Price is required" }));
      }
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

    // Clear error when field is edited
    if (name === "name" && errors.serviceName) {
      setErrors((prev) => ({ ...prev, serviceName: null }));
    }
    if (name === "price" && errors.servicePrice) {
      setErrors((prev) => ({ ...prev, servicePrice: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name) newErrors.name = "Business name is required";
    if (!formData.owner) newErrors.owner = "Owner name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.serviceAreas)
      newErrors.serviceAreas = "Service areas are required";

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Commission rate validation
    if (formData.commissionRate < 0 || formData.commissionRate > 100) {
      newErrors.commissionRate = "Commission rate must be between 0 and 100";
    }

    // Services validation
    if (formData.services.length === 0) {
      newErrors.services = "At least one service is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create vendor object with form data
      const newVendor = {
        id: `V${Math.floor(1000 + Math.random() * 9000)}`, // This will be replaced by MongoDB _id
        ...formData,
        serviceAreas: formData.serviceAreas
          .split(",")
          .map((area) => area.trim()),
        status: "Pending",
        joinDate: new Date().toISOString().split("T")[0],
        rating: 0,
        ordersCompleted: 0,
      };

      // Call the onAddVendor function passed from parent
      await onAddVendor(newVendor);

      // Reset form and close modal
      setFormData({
        name: "",
        owner: "",
        email: "",
        phone: "",
        address: "",
        serviceAreas: "",
        commissionRate: 15,
        services: [{ name: "Wash & Fold", price: "₹80/kg" }],
      });

      onClose();
    } catch (error) {
      console.error("Error adding vendor:", error);
      setErrors({ submit: "Failed to add vendor. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-20">
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

        {errors.submit && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle
              size={18}
              className="text-red-500 mr-2 flex-shrink-0 mt-0.5"
            />
            <span className="text-red-700 text-sm">{errors.submit}</span>
          </div>
        )}

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
                  className={`block w-full rounded-md border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
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
                  className={`block w-full rounded-md border ${
                    errors.address ? "border-red-300" : "border-gray-300"
                  } shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
                  rows="3"
                  required
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
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
                  className={`block w-full rounded-md border ${
                    errors.serviceAreas ? "border-red-300" : "border-gray-300"
                  } shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
                  placeholder="Manhattan, Brooklyn, Queens (comma separated)"
                  required
                />
                {errors.serviceAreas && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.serviceAreas}
                  </p>
                )}
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
                  className={`block w-full rounded-md border ${
                    errors.commissionRate ? "border-red-300" : "border-gray-300"
                  } shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
                  min="0"
                  max="100"
                  required
                />
                {errors.commissionRate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.commissionRate}
                  </p>
                )}
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
                  className={`block w-full rounded-md border ${
                    errors.owner ? "border-red-300" : "border-gray-300"
                  } shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
                  required
                />
                {errors.owner && (
                  <p className="mt-1 text-sm text-red-600">{errors.owner}</p>
                )}
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
                  className={`block w-full rounded-md border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
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
                  className={`block w-full rounded-md border ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  } shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
                  placeholder="(555) 123-4567"
                  required
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Services & Pricing
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              {errors.services && (
                <p className="mb-2 text-sm text-red-600">{errors.services}</p>
              )}
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
                    className={`block w-full rounded-md border ${
                      errors.serviceName ? "border-red-300" : "border-gray-300"
                    } shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
                    placeholder="e.g. Dry Cleaning"
                  />
                  {errors.serviceName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.serviceName}
                    </p>
                  )}
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
                    className={`block w-full rounded-md border ${
                      errors.servicePrice ? "border-red-300" : "border-gray-300"
                    } shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
                    placeholder="e.g. ₹5.00/item"
                  />
                  {errors.servicePrice && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.servicePrice}
                    </p>
                  )}
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
                className="font-medium rounded-lg text-sm px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Add Vendor"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVendorModal;
