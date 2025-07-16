import React, { useState, useMemo } from 'react';
import { Search, Plus, Clock, Calendar, Tag} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFetchTickets } from '../hooks/useFetchTickets';

const TICKETS_PER_PAGE = 10;

const Tickets: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, loading, error, deleteTicket } = useFetchTickets();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [showDateRange, setShowDateRange] = useState(false);

  // Dropdown menu state for actions
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Helper to render priority badge
  const renderPriorityBadge = (priority: string) => {
    let color = '';
    switch (priority) {
      case 'critical':
        color = 'bg-red-600 text-white';
        break;
      case 'high':
        color = 'bg-orange-500 text-white';
        break;
      case 'medium':
        color = 'bg-yellow-400 text-gray-900';
        break;
      case 'low':
        color = 'bg-green-500 text-white';
        break;
      default:
        color = 'bg-gray-300 text-gray-700';
    }
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
        {priority[0].toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Helper to render status badge
  const renderStatusBadge = (status: string) => {
    let color = '';
    switch (status) {
      case 'open':
        color = 'bg-blue-500 text-white';
        break;
      case 'pending':
        color = 'bg-yellow-500 text-white';
        break;
      case 'resolved':
        color = 'bg-green-600 text-white';
        break;
      default:
        color = 'bg-gray-300 text-gray-700';
    }
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
        {status[0].toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Filtered tickets
  const filtered = useMemo(() => {
    return tickets.filter(t => {
      const matchesSearch =
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.customer as string)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.subject as string)?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPriority = !selectedPriority || t.priority === selectedPriority;
      const matchesStatus = !selectedStatus || t.status === selectedStatus;

      // Filter by date range if set
      const createdDate = new Date(t.created || '');
      const afterStart = !startDate || (startDate && createdDate >= new Date(startDate));
      const beforeEnd = !endDate || (endDate && createdDate <= new Date(endDate));

      return matchesSearch && matchesPriority && matchesStatus && afterStart && beforeEnd;
    });
  }, [tickets, searchTerm, selectedPriority, selectedStatus, startDate, endDate]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / TICKETS_PER_PAGE);
  const paginatedTickets = filtered.slice(
    (currentPage - 1) * TICKETS_PER_PAGE,
    currentPage * TICKETS_PER_PAGE
  );

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    pending: tickets.filter(t => t.status === 'pending').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  }), [tickets]);

  const handleDelete = async (id: string) => {
    if (window.confirm(`Really delete ticket ${id}?`)) {
      await deleteTicket(id);
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div className="text-red-500">Failed to load: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
              <button 
               onClick={() => navigate('/create-ticket')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus size={16} className="mr-2" />
                Create Ticket
              </button>
            </div>
      
   
     

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100">
              <Tag size={16} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Total Tickets</p>
              <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
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
              <p className="text-lg font-semibold text-gray-900">{stats.open}</p>
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
              <p className="text-lg font-semibold text-gray-900">{stats.pending}</p>
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
              <p className="text-lg font-semibold text-gray-900">{stats.resolved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
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
                        onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on filter change
              }}
                      />
                    </div>
          
          <div className="sm:w-44">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                value={selectedPriority ?? ''} onChange={e => {
            setSelectedPriority(e.target.value || null);
            setCurrentPage(1);}}>
                <option value="">All Priorities</option>
            {['critical', 'high', 'medium', 'low'].map(p => (
              <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
             
            </div>
          </div>
          
           
          <div className="sm:w-44">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                value={selectedStatus ?? ''} onChange={e => {
            setSelectedStatus(e.target.value || null);
            setCurrentPage(1);
          }
              }>
                <option value="">All Status</option>
            {['open', 'pending', 'resolved'].map(s => (
              <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
            ))}
              </select>
              
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDateRange(!showDateRange)}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Calendar size={16} className="mr-2" />
              {startDate && endDate
                ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
                : 'Date Range'}
            </button>
            {showDateRange && (
              <div className="absolute z-10 mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Start Date
                  <input
                    type="date"
                    className="block w-full mt-1 border border-gray-300 rounded-md"
                    value={startDate || ''}
                    onChange={e => {
                      setStartDate(e.target.value || null);
                      setCurrentPage(1);
                    }}
                  />
                </label>
                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
                  End Date
                  <input
                    type="date"
                    className="block w-full mt-1 border border-gray-300 rounded-md"
                    value={endDate || ''}
                    onChange={e => {
                      setEndDate(e.target.value || null);
                      setCurrentPage(1);
                    }}
                  />
                </label>
                <button
                  onClick={() => setShowDateRange(false)}
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead>
              <tr className="bg-gray-50">
              
                <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
                <th scope="col" className="px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map(ticket => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  
                  <td className="px-4 py-2">{ticket.customer}</td>
                  <td className="px-4 py-2">
                    {ticket.priority ? renderPriorityBadge(ticket.priority) : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {ticket.status ? renderStatusBadge(ticket.status) : 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {ticket.created
                      ? new Date(ticket.created).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-gray-500">{ticket.agent}</td>
                  <td className="px-4 py-2 text-gray-500">
                    {ticket.lastUpdate
                      ? new Date(ticket.lastUpdate).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                      : 'N/A'}
                  </td>
                    <td className="px-4 py-2 text-right" onClick={e => e.stopPropagation()}>
                    <div className="relative inline-block text-left z-[10000]">
                      <button
                        className="p-2 rounded-full hover:bg-gray-100"
                        onClick={e => {
                          e.stopPropagation();
                          setDropdownOpen(dropdownOpen === ticket.id ? null : ticket.id);
                        }}
                      >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                          <circle cx="5" cy="12" r="2" fill="currentColor" />
                          <circle cx="12" cy="12" r="2" fill="currentColor" />
                          <circle cx="19" cy="12" r="2" fill="currentColor" />
                        </svg>
                      </button>
                      {dropdownOpen === ticket.id && (
                        <>
                          {/* Overlay to close dropdown when clicking outside */}
                          <div
                            className="fixed inset-0 z-[90]"
                            onClick={() => setDropdownOpen(null)}
                          />
                          <div
                            className="origin-bottom-right absolute right-0 bottom-10 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[110]"
                            onClick={e => e.stopPropagation()}
                          >
                            <div className="py-1">
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  setDropdownOpen(null);
                                  navigate(`/tickets/${ticket.id}`);
                                }}
                              >
                                Details
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={() => {
                                  setDropdownOpen(null);
                                  handleDelete(ticket.id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t">
          <span className="text-sm text-gray-700">
            Showing {paginatedTickets.length} of {filtered.length} filtered tickets
          </span>
          <div>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="btn-pagination disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-2 text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="btn-pagination disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
