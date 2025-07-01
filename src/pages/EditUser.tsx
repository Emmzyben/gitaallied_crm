import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditUser } from '../hooks/useEditUser';
import { useFetchUsers } from '../hooks/useFetchUsers';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateUser, loading, error } = useEditUser();
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();

  const [formData, setFormData] = useState({
    id: id || '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: 'agent',
  });

  useEffect(() => {
    if (id && users.length > 0) {
      const user = users.find(u => u.id === id);
      if (user) {
        setFormData({
          id: user.id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          company: user.company || '',
          role: user.role || 'agent',
        });
      }
    }
  }, [id, users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id) {
      alert('User ID is required to update user.');
      return;
    }
    const { id, ...updates } = formData;
    const success = await updateUser(id, updates);
    if (success) {
      alert('User updated successfully');
      navigate('/settings'); // or wherever the user list is
    }
  };

  if (usersLoading) {
    return <p>Loading user data...</p>;
  }

  if (usersError) {
    return <p className="text-red-600">Error loading users: {usersError}</p>;
  }

  return (
    <div className="bg-gray-50 flex flex-col justify-center  sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Edit User
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Removed User ID input since ID comes from route */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm sm:text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="administrator">Admin</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-2">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Updating...' : 'Update User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
