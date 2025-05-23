import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Call {
  id: string;
  customer: {
    name: string;
    avatar?: string;
  };
  agent: string;
  time: string;
  duration: string;
  status: 'completed' | 'missed' | 'transferred';
}

const statusClasses = {
  completed: 'bg-green-100 text-green-800',
  missed: 'bg-red-100 text-red-800',
  transferred: 'bg-blue-100 text-blue-800'
};

const statusLabels = {
  completed: 'Completed',
  missed: 'Missed',
  transferred: 'Transferred'
};

interface RecentCallsProps {
  calls: Call[];
}

const RecentCalls: React.FC<RecentCallsProps> = ({ calls }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Recent Calls</h3>
          <Link 
            to="/call-logs"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            View all
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {calls.map((call) => (
              <tr 
                key={call.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => window.location.href = `/call-logs?id=${call.id}`}
              >
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm overflow-hidden">
                      {call.customer.avatar ? (
                        <img src={call.customer.avatar} alt={call.customer.name} className="h-full w-full object-cover" />
                      ) : (
                        call.customer.name.charAt(0)
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{call.customer.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                  <Link to={`/agent-performance?agent=${encodeURIComponent(call.agent)}`}>
                    {call.agent}
                  </Link>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                  {call.time}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                  {call.duration}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[call.status]}`}>
                    {statusLabels[call.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCalls;