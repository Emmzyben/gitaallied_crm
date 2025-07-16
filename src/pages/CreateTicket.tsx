import React, { useState, useEffect } from 'react';
import { useCreateTicket } from '../hooks/useCreateTicket';
import { useNotification } from '../components/dashboard/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../pages/user';
const CreateTicket: React.FC = () => {
  const navigate = useNavigate();
  const { createTicket, loading, error } = useCreateTicket();
  const { showNotification } = useNotification();
  const { user } = useUser();

  const [customer, setCustomer] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [agent, setAgent] = useState('');
 const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
    useEffect(() => {
      if (user) {
        import('firebase/database').then(({ ref, get }) => {
          import('../firebase/firebase').then(({ database }) => {
            const userRef = ref(database, `crm_table/${user.id}`);
            get(userRef).then((snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val();
                setFormData((prev) => ({
                  ...prev,
                  firstName: data.firstName || '',
                  lastName: data.lastName || '',
                }));
                setAgent(data.firstName + ' ' + data.lastName);
              }
            });
          });
        });
      }
    }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !subject) {
      showNotification({ type: 'error', message: 'Customer and Subject are required' });
      return;
    }
    const ticket = { customer, customerEmail, customerPhone, subject, description,category, priority, agent, status: 'open' };
    const key = await createTicket(ticket);
    if (key) {
      showNotification({ type: 'success', message: 'Ticket created successfully' });
      setCustomer('');
      setCustomerEmail('');
      setCustomerPhone('');
      setSubject('');
      setPriority('medium');
      setAgent('');
      navigate('/tickets');
    } else {
      showNotification({ type: 'error', message: error || 'Failed to create ticket' });
    }
  };

  return (
    <div className="flex items-center justify-center  p-4">
      <div className="w-full  bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
            <div>
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer *</label>
            <input
              id="customer"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={customer}
              onChange={e => setCustomer(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Customer Email</label>
            <input
              id="customerEmail"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={customerEmail}
              onChange={e => setCustomerEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">Customer Phone</label>
            <input
              id="customerPhone"
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={customerPhone}
              onChange={e => setCustomerPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject *</label>
            <input
              id="subject"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
          </div>
         
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="general">General</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              id="priority"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
           <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
            />
          </div>
           
            <div>
              <label htmlFor="agent" className="block text-sm font-medium text-gray-700">Agent</label>
              <input
              id="agent"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              value={formData.firstName + ' ' + formData.lastName}
              readOnly
              />
            </div>
          
          
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Creating...' : 'Create Ticket'}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  </div>
);
};

export default CreateTicket;