import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, Phone, ArrowDownUp, Star, Download } from 'lucide-react';

// Sample call log data
const CALL_LOGS_DATA = [
  { id: 1, customer: 'Jane Cooper', agent: 'Sarah Johnson', time: '2025-06-12 09:30 AM', duration: '5m 23s', callType: 'Inbound', status: 'Completed', rating: 5 },
  { id: 2, customer: 'Wade Warren', agent: 'Michael Chen', time: '2025-06-12 10:15 AM', duration: '3m 45s', callType: 'Outbound', status: 'Completed', rating: 4 },
  { id: 3, customer: 'Esther Howard', agent: 'Jessica Lee', time: '2025-06-12 11:02 AM', duration: '-', callType: 'Inbound', status: 'Missed', rating: 0 },
  { id: 4, customer: 'Cameron Williamson', agent: 'David Kim', time: '2025-06-12 11:47 AM', duration: '8m 12s', callType: 'Inbound', status: 'Transferred', rating: 3 },
  { id: 5, customer: 'Brooklyn Simmons', agent: 'Sarah Johnson', time: '2025-06-12 01:23 PM', duration: '4m 18s', callType: 'Outbound', status: 'Completed', rating: 5 },
  { id: 6, customer: 'Leslie Alexander', agent: 'Michael Chen', time: '2025-06-12 02:10 PM', duration: '7m 32s', callType: 'Inbound', status: 'Completed', rating: 4 },
  { id: 7, customer: 'Jenny Wilson', agent: 'Jessica Lee', time: '2025-06-12 03:05 PM', duration: '2m 56s', callType: 'Outbound', status: 'Completed', rating: 5 },
  { id: 8, customer: 'Guy Hawkins', agent: 'David Kim', time: '2025-06-12 04:17 PM', duration: '-', callType: 'Inbound', status: 'Missed', rating: 0 },
  { id: 9, customer: 'Robert Fox', agent: 'Sarah Johnson', time: '2025-06-12 04:45 PM', duration: '6m 19s', callType: 'Inbound', status: 'Completed', rating: 3 },
  { id: 10, customer: 'Jacob Jones', agent: 'Michael Chen', time: '2025-06-12 05:30 PM', duration: '5m 44s', callType: 'Outbound', status: 'Completed', rating: 4 },
];

const CallLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCallType, setSelectedCallType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Filter call logs based on search term, call type, and status
  const filteredCallLogs = CALL_LOGS_DATA.filter(log => {
    const matchesSearch = 
      log.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.agent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCallType = selectedCallType === null || log.callType === selectedCallType;
    const matchesStatus = selectedStatus === null || log.status === selectedStatus;
    
    return matchesSearch && matchesCallType && matchesStatus;
  });

  // Function to render the rating stars
  const renderRating = (rating: number) => {
    if (rating === 0) return <span className="text-gray-400 text-xs">No rating</span>;
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={14}
            fill={i < rating ? '#FFB800' : 'none'}
            stroke={i < rating ? '#FFB800' : '#D1D5DB'}
            className="mr-0.5"
          />
        ))}
      </div>
    );
  };

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    let colorClass = '';
    
    switch (status) {
      case 'Completed':
        colorClass = 'bg-green-100 text-green-800';
        break;
      case 'Missed':
        colorClass = 'bg-red-100 text-red-800';
        break;
      case 'Transferred':
        colorClass = 'bg-blue-100 text-blue-800';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Call Logs</h1>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Calendar size={16} className="mr-2" />
            Date Range
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by customer or agent..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="sm:w-40">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                value={selectedCallType || ''}
                onChange={(e) => setSelectedCallType(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Inbound">Inbound</option>
                <option value="Outbound">Outbound</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <Phone size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="sm:w-40">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                value={selectedStatus || ''}
                onChange={(e) => setSelectedStatus(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Missed">Missed</option>
                <option value="Transferred">Transferred</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Time
                    <ArrowDownUp size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Duration
                    <Clock size={14} className="ml-1 text-gray-400" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Call Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCallLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.agent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`mr-2 ${log.callType === 'Inbound' ? 'text-green-600' : 'text-blue-600'}`}>
                        {log.callType === 'Inbound' ? 
                          <Phone className="h-4 w-4 transform rotate-135" /> : 
                          <Phone className="h-4 w-4 transform -rotate-45" />
                        }
                      </span>
                      <span className="text-sm text-gray-900">{log.callType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatusBadge(log.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderRating(log.rating)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CallLogs;