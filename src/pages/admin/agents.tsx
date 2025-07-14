import React from 'react';
import { useFetchUsers } from '../../hooks/useFetchUsers';

const AllAgents: React.FC = () => {
  const { users, loading, error } = useFetchUsers();

  if (loading) return <div>Loading agents...</div>;
  if (error) return <div>Error loading agents: {error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">All Agents</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.company || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.createdAt || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAgents;
