import React, { useState } from 'react';
import { User, Bell, Users, Phone, ChevronRight } from 'lucide-react';
import { useNotification } from '../components/dashboard/NotificationContext';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { users, loading, error, deleteUser } = useFetchUsers();
  const { showNotification } = useNotification();

  const settingsTabs = [
    { id: 'profile', label: 'Profile Settings', icon: <User size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'users', label: 'Users & Permissions', icon: <Users size={20} /> },
    { id: 'telephony', label: 'Telephony Integration', icon: <Phone size={20} /> },
  ];

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      if (!error) {
        showNotification({ type: 'success', message: 'User deleted successfully' });
      } else {
        showNotification({ type: 'error', message: error });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
          {/* Settings Sidebar */}
          <div className="col-span-1 border-r border-gray-200">
            <nav className="px-4 py-5 space-y-1">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2.5 w-full rounded-lg text-left transition ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span 
                    className={`mr-3 ${
                      activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="col-span-1 md:col-span-3 lg:col-span-4 p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
                  <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Save Changes
                  </button>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        defaultValue="Admin"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                        defaultValue="User"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                        defaultValue="admin@gitaalliedtech.com"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                        defaultValue="+1 (555) 123-4567"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        defaultValue="administrator"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="administrator">Administrator</option>
                        <option value="manager">Manager</option>
                        <option value="agent">Agent</option>
                        <option value="supervisor">Supervisor</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        defaultValue="America/New_York"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="America/Anchorage">Alaska Time (AKT)</option>
                        <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Settings Sections (Placeholders) */}
            {activeTab !== 'profile' && (
              <div className="space-y-6">
              
{/* Users & Permissions Settings */}
{activeTab === 'users' && (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium text-gray-900">Users & Permissions</h2>
      <button
        onClick={() => navigate('/add-user')}
        className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add User
      </button>
    </div>

    <div className="border-t border-gray-200 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users table */}
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200" >
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.role || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    <button
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
)}

{/* Other Settings Sections (Placeholders) */}
{activeTab !== 'profile' && activeTab !== 'users' && (
  <div className="space-y-6">
   
    <div className="border-t border-gray-200 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settings option cards */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {settingsTabs.find(tab => tab.id === activeTab)?.icon}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Setting Option {item}</h3>
                  <p className="text-xs text-gray-500">Description of this setting and what it controls</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-gray-500 text-sm mt-6">
        More {activeTab} settings are available in this section. Configure your preferences to customize your experience.
      </p>
    </div>
  </div>
)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
