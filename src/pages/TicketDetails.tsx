import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Paperclip, Clock, User, Tag, AlertCircle, CheckCircle2, MoreVertical } from 'lucide-react';

// Sample ticket data (in a real app, this would come from your backend)
const TICKET_DATA = {
  "TKT-1001": {
    id: "TKT-1001",
    customer: {
      name: "Jane Cooper",
      email: "jane@example.com",
      company: "Microsoft",
      phone: "+1 (555) 123-4567"
    },
    subject: "Cannot access customer portal",
    description: "I've been trying to access the customer portal for the past hour but keep getting an error message saying 'Invalid credentials' even though I'm sure my password is correct.",
    priority: "high",
    status: "open",
    created: "2025-06-12 10:30",
    agent: "Sarah Johnson",
    lastUpdate: "2 hours ago",
    category: "Technical Support",
    updates: [
      {
        id: 1,
        type: "status_change",
        content: "Ticket opened",
        author: "System",
        timestamp: "2025-06-12 10:30"
      },
      {
        id: 2,
        type: "assignment",
        content: "Assigned to Sarah Johnson",
        author: "System",
        timestamp: "2025-06-12 10:31"
      },
      {
        id: 3,
        type: "comment",
        content: "I've initiated a password reset for your account. Please check your email for further instructions.",
        author: "Sarah Johnson",
        timestamp: "2025-06-12 10:45"
      },
      {
        id: 4,
        type: "comment",
        content: "Thank you, I've received the email but the reset link seems to be expired.",
        author: "Jane Cooper",
        timestamp: "2025-06-12 11:00"
      }
    ]
  }
};

const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ticket = TICKET_DATA[id as keyof typeof TICKET_DATA];

  if (!ticket) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Ticket not found</h2>
          <p className="mt-2 text-gray-600">The ticket you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/tickets"
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
    const colorClasses = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[priority as keyof typeof colorClasses]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const renderStatusBadge = (status: string) => {
    const colorClasses = {
      open: 'bg-blue-100 text-blue-800',
      pending: 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status as keyof typeof colorClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/tickets"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to tickets
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Ticket {ticket.id}</h1>
          {renderStatusBadge(ticket.status)}
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Close Ticket
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Ticket Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{ticket.subject}</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              <p className="text-gray-600">{ticket.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {ticket.created}
                </span>
                <span className="flex items-center">
                  <MessageSquare size={16} className="mr-1" />
                  {ticket.updates.length} responses
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Updates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Updates</h3>
            <div className="space-y-6">
              {ticket.updates.map((update) => (
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
                      <span className="text-sm text-gray-500">{update.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">{update.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="mt-6">
              <label htmlFor="reply" className="sr-only">Add reply</label>
              <div className="relative">
                <textarea
                  id="reply"
                  rows={3}
                  className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Add a reply..."
                />
                <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Paperclip size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {ticket.customer.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{ticket.customer.name}</p>
                  <p className="text-sm text-gray-500">{ticket.customer.company}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">{ticket.customer.email}</p>
                <p className="text-gray-600">{ticket.customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Ticket Properties */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Properties</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                {renderStatusBadge(ticket.status)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Priority</span>
                {renderPriorityBadge(ticket.priority)}
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
                <span className="text-sm text-gray-900">{ticket.created}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last Updated</span>
                <span className="text-sm text-gray-900">{ticket.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;