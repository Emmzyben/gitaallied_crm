import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare,  Clock, AlertCircle } from 'lucide-react';
import { useFetchTicket } from '../../hooks/useFetchTicket';
// import { useUpdateTicketStatus } from '../../hooks/useUpdateTicketStatus';
// import { useAddTicketUpdate } from '../../hooks/useAddTicketUpdate';

const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error } = useFetchTicket(id);
  // const { updateStatus, loading: updatingStatus } = useUpdateTicketStatus();
  // const { addUpdate, loading: addingUpdat } = useAddTicketUpdate();

  // const [newStatus, setNewStatus] = useState<string>('');
  // const [replyContent, setReplyContent] = useState<string>('');

  if (loading) {
    return <div>Loading ticket details...</div>;
  }

  if (error || !ticket) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Ticket not found</h2>
          <p className="mt-2 text-gray-600">The ticket you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/admin/tickets"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to tickets
          </Link>
        </div>
      </div>
    );
  }

  const renderPriorityBadge = (priority: string) => {
    const colorClasses: Record<string, string> = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[priority] || ''}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const renderStatusBadge = (status: string) => {
    const colorClasses: Record<string, string> = {
      open: 'bg-blue-100 text-blue-800',
      pending: 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status] || ''}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setNewStatus(e.target.value);
  // };

  // const handleUpdateStatus = async () => {
  //   if (!newStatus) return;
  //   await updateStatus(ticket.id, newStatus);
  // };

  // const handleCloseTicket = async () => {
  //   await updateStatus(ticket.id, 'resolved');
  // };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/all-tickets"
            className="inline-flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to tickets
          </Link>
          <h1 className="text-1 font-bold text-gray-900">Ticket {ticket.id}</h1>
          {renderStatusBadge(ticket.status || '')}
        </div>
        {/* <div className="flex items-center space-x-3">
          <button
            onClick={handleCloseTicket}
            disabled={updatingStatus}
            className="px-2 py-2 bg-green-600 border border-gray-300 rounded-lg text-sm font-medium text-[#fff] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Close Ticket
          </button>
          <select
            value={newStatus}
            onChange={handleStatusChange}
            disabled={updatingStatus}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
          <button
            onClick={handleUpdateStatus}
            disabled={updatingStatus || !newStatus}
            className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Update Status
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Ticket Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{ticket.subject}</h2>
               
              </div>
              <p className="text-gray-600">{ticket.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                    {ticket.created ? new Date(ticket.created).toLocaleString() : 'N/A'}
                </span>
                <span className="flex items-center">
                  <MessageSquare size={16} className="mr-1" />
                  {ticket.updates?.length || 0} responses
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Updates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Updates</h3>
            <div className="space-y-6">
              {(ticket.updates && typeof ticket.updates === 'object' && !Array.isArray(ticket.updates))
                ? Object.entries(ticket.updates).map(([key, update]) => {
                    const typedUpdate = update as {
                      type: string;
                      author: string;
                      timestamp?: string;
                      content: string;
                    };
                    return (
                      <div key={key} className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            {typedUpdate.type === 'system' ? (
                              <AlertCircle size={20} />
                            ) : (
                              typedUpdate.author.charAt(0)
                            )}
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">{typedUpdate.author}</h4>
                            <span className="text-sm text-gray-500">
                              {typedUpdate.timestamp ? new Date(typedUpdate.timestamp).toLocaleString() : ''}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{typedUpdate.content}</p>
                        </div>
                      </div>
                    );
                  })
                : ticket.updates?.map((update) => (
                  <div key={update.id} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        {update.type === 'system' ? (
                          <AlertCircle size={20} />
                        ) : (
                          update.author.charAt(0)
                        )}
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{update.author}</h4>
                          <span className="text-sm text-gray-500">
                          {update.timestamp ? new Date(update.timestamp).toLocaleString() : ''}
                          </span>
                      </div>
                      <p className="text-sm text-gray-600">{update.content}</p>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Reply Box */}
            {/* <div className="mt-6">
              <label htmlFor="reply" className="sr-only">Add reply</label>
              <div className="relative">
            <textarea
              id="reply"
              rows={3}
              className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Add a reply..."
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
            />
            <div className="absolute bottom-2 right-2 flex items-center space-x-2">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Paperclip size={16} />
              </button>
            </div>
          </div>
            <div className="mt-2 flex justify-end">
            <button
              onClick={async () => {
              if (!replyContent.trim()) return;
              // await addUpdate(ticket.id, {
              //   type: 'comment',
              //   content: replyContent.trim(),
              //   author: ticket.agent || 'Unknown',
              //   timestamp: new Date().toISOString(),
              // });
              setReplyContent('');
              }}
              disabled
              className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Send Reply
            </button>
            </div>
            </div> */}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">Customer Details</span>
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
            </h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
              <div className="h-14 w-14 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xl font-bold shadow">
                {ticket.customer ? ticket.customer.charAt(0).toUpperCase() : ''}
              </div>
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-400" title="Active"></span>
              </div>
              <div>
              <p className="text-base font-semibold text-gray-900">
                {ticket.customer || <span className="italic text-gray-400">Unknown</span>}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                {typeof ticket.customerEmail === 'string' && ticket.customerEmail && (
                <a
                  href={`mailto:${ticket.customerEmail}`}
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6"></path>
                  </svg>
                  {ticket.customerEmail}
                </a>
                )}
              </div>
              {typeof ticket.customerPhone === 'string' && ticket.customerPhone && (
                <div className="flex items-center space-x-2 mt-1">
                  <a
                    href={`tel:${ticket.customerPhone}`}
                    className="text-sm text-gray-700 hover:underline flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.7.7a16.001 16.001 0 006.586 6.586l.7-.7a2 2 0 011.95-.45l1.2.3A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z"></path>
                    </svg>
                    {ticket.customerPhone}
                  </a>
                </div>
              )}
              </div>
            </div>
            </div>

          {/* Ticket Properties */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Properties</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                {renderStatusBadge(ticket.status || '')}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Priority</span>
                {renderPriorityBadge(ticket.priority || '')}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm text-gray-900">{ticket.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Assigned To</span>
                <span className="text-sm text-gray-900">{ticket.agent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Created</span>
                <span className="text-sm text-gray-900">
                  {ticket.created ? new Date(ticket.created).toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last Updated</span>
                <span className="text-sm text-gray-900">
                  {ticket.lastUpdate ? new Date(ticket.lastUpdate).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
