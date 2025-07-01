import React, { useState, useEffect } from 'react';
import { useEditCustomer } from '../hooks/useEditCustomer';
import { useNotification } from '../components/dashboard/NotificationContext';

interface Customer {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  lastContact?: string;
}

interface EditCustomerProps {
  customer: Customer;
  onClose: () => void;
}

const EditCustomer: React.FC<EditCustomerProps> = ({ customer, onClose }) => {
  const { updateCustomer, loading, error } = useEditCustomer();
  const { showNotification } = useNotification();

  const [name, setName] = useState(customer.name || '');
  const [email, setEmail] = useState(customer.email || '');
  const [phone, setPhone] = useState(customer.phone || '');
  const [company, setCompany] = useState(customer.company || '');

  useEffect(() => {
    setName(customer.name || '');
    setEmail(customer.email || '');
    setPhone(customer.phone || '');
    setCompany(customer.company || '');
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showNotification({ type: 'error', message: 'Name and Email are required' });
      return;
    }
    const lastContact = new Date().toLocaleString();
    const updates = { name, email, phone, company, lastContact };
    const success = await updateCustomer(customer.id, updates);
    if (success) {
      showNotification({ type: 'success', message: 'Customer updated successfully' });
      onClose();
    } else {
      showNotification({ type: 'error', message: error || 'Failed to update customer' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
            <input
              id="company"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
