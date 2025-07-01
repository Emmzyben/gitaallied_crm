import React, { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import { useNotification } from '../components/dashboard/NotificationContext';
import { useNavigate } from 'react-router-dom';

const AddCustomer: React.FC = () => {
  const navigate = useNavigate();
  const { addCustomer, loading, error } = useCustomers();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showNotification({ type: 'error', message: 'Name and Email are required' });
      return;
    }
    const lastContact = new Date().toLocaleString();
    const customer = { name, email, phone, company, lastContact };
    const key = await addCustomer(customer);
    if (key) {
      showNotification({ type: 'success', message: 'Customer added successfully' });
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      navigate('/customers');
    } else {
      showNotification({ type: 'error', message: 'Failed to add customer' });
    }
  };
//@task redirect to Customers page after adding a customer
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full  bg-white p-8 m-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name *</label>
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
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email *</label>
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
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Adding...' : 'Add Customer'}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
