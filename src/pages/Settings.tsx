import React, { useState, useEffect } from 'react';
import { useNotification } from '../components/dashboard/NotificationContext';
import { useUser } from './user';
import { useEditUser } from '../hooks/useEditUser';

const Settings: React.FC = () => {
  const { user } = useUser();
  const { updateUser, loading: updating, error: updateError } = useEditUser();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    timezone: '',
    password: '', // New password field
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
                email: data.email || '',
                phone: data.phone || '',
                role: data.role || '',
                timezone: data.timezone || '',
              }));
            }
          });
        });
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSaveChanges = async () => {
  if (!user) return;

  // Prepare the update payload
  const payload: Omit<typeof formData, 'password'> & { password?: string } = { ...formData };

  // Only include password if it's not empty
  if (!formData.password.trim()) {
    delete payload.password;
  }

  const success = await updateUser(user.id, payload);

  if (success) {
    showNotification({ type: 'success', message: 'Profile updated successfully' });
    setFormData((prev) => ({ ...prev, password: '' })); // Clear password field
  } else {
    showNotification({ type: 'error', message: updateError || 'Failed to update profile' });
  }
};


  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none sm:text-sm"
          >
            <option value="">Select role</option>
            <option value="admin">Administrator</option>
            <option value="manager">Manager</option>
            <option value="agent">Agent</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Leave blank to keep current password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSaveChanges}
          disabled={updating}
          className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {updating ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
