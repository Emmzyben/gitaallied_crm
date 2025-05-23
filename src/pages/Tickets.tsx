import React, { useState } from 'react';
import { Search, Filter, Plus, Clock, Calendar, ChevronDown, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample ticket data
const TICKETS_DATA = [
  { id: "TKT-1001", customer: "Jane Cooper", subject: "Cannot access customer portal", priority: "high", status: "open", created: "2025-06-12 10:30", agent: "Sarah Johnson", lastUpdate: "2 hours ago" },
  { id: "TKT-1002", customer: "Wade Warren", subject: "Billing discrepancy on recent invoice", priority: "medium", status: "pending", created: "2025-06-11 15:45", agent: "Michael Chen", lastUpdate: "1 day ago" },
  { id: "TKT-1003", customer: "Esther Howard", subject: "Request for product information", priority: "low", status: "resolved", created: "2025-06-10 09:20", agent: "Jessica Lee", lastUpdate: "2 days ago" },
  { id: "TKT-1004", customer: "Cameron Williamson", subject: "Technical support for API integration", priority: "high", status: "open", created: "2025-06-12 11:15", agent: "David Kim", lastUpdate: "3 hours ago" },
  { id: "TKT-1005", customer: "Brooklyn Simmons", subject: "Feedback on new service offering", priority: "low", status: "resolved", created: "2025-06-09 14:30", agent: "Sarah Johnson", lastUpdate: "3 days ago" },
  { id: "TKT-1006", customer: "Leslie Alexander", subject: "Account access recovery", priority: "high", status: "pending", created: "2025-06-12 08:45", agent: "Michael Chen", lastUpdate: "5 hours ago" },
  { id: "TKT-1007", customer: "Jenny Wilson", subject: "Service outage report", priority: "critical", status: "open", created: "2025-06-12 09:10", agent: "Jessica Lee", lastUpdate: "4 hours ago" },
  { id: "TKT-1008", customer: "Guy Hawkins", subject: "Request for refund", priority: "medium", status: "pending", created: "2025-06-11 13:25", agent: "David Kim", lastUpdate: "1 day ago" },
  { id: "TKT-1009", customer: "Robert Fox", subject: "Product feature inquiry", priority: "low", status: "resolved", created: "2025-06-10 16:40", agent: "Sarah Johnson", lastUpdate: "2 days ago" },
  { id: "TKT-1010", customer: "Jacob Jones", subject: "System integration issue", priority: "critical", status: "open", created: "2025-06-12 07:55", agent: "Michael Chen", lastUpdate: "6 hours ago" },
];

const Tickets: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Filter tickets based on search term, priority, and status
  const filteredTickets = TICKETS_DATA.filter(ticket => {
    const matchesSearch = 
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = selectedPriority === null || ticket.priority === selectedPriority;
    const matchesStatus = selectedStatus === null || ticket.status === selectedStatus;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Function to render priority badge
  const renderPriorityBadge = (priority: string) => {
    let colorClass = '';
    
    switch (priority) {
      case 'critical':
        colorClass = 'bg-red-100 text-red-800';
        break;
      case 'high':
        colorClass = 'bg-orange-100 text-orange-800';
        break;
      case 'medium':
        colorClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'low':
        colorClass = 'bg-green-100 text-green-800';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    let colorClass = '';
    
    switch (status) {
      case 'open':
        colorClass = 'bg-blue-100 text-blue-800';
        break;
      case 'pending':
        colorClass = 'bg-purple-100 text-purple-800';
        break;
      case 'resolved':
        colorClass = 'bg-green-100 text-green-800';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleTicketClick = (ticketId: string) => {
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        <button 
          onClick={() => navigate('/tickets/new')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus size={16} className="mr-2" />
          Create Ticket
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100">
              <Tag size={16} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Total Tickets</p>
              <p className="text-lg font-semibold text-gray-900">142</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-red-100">
              <Clock size={16} className="text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Open Tickets</p>
              <p className="text-lg font-semibold text-gray-900">37</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100">
              <Clock size={16} className="text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-lg font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100">
              <Clock size={16} className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Resolved</p>
              <p className="text-lg font-semibold text-gray-900">81</p>
            </div>
          </div>
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
              placeholder="Search tickets..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="sm:w-44">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                value={selectedPriority || ''}
                onChange={(e) => setSelectedPriority(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="sm:w-44">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                value={selectedStatus || ''}
                onChange={(e) => setSelectedStatus(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Calendar size={16} className="mr-2" />
            Date Range
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr 
                  key={ticket.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleTicketClick(ticket.id)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-blue-600">{ticket.id}</div>
                    <div className="text-sm text-gray-900 truncate max-w-xs">{ticket.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderPriorityBadge(ticket.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatusBadge(ticket.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.agent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.lastUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{filteredTickets.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 rounde

d-md border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100 ml-3">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;