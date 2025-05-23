import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  BarChart, 
  Ticket, 
  FileText, 
  Settings,
  Headphones
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/customers', label: 'Customers', icon: <Users size={18} /> },
    { path: '/call-logs', label: 'Call Logs', icon: <Phone size={18} /> },
    { path: '/agent-performance', label: 'Agent Performance', icon: <BarChart size={18} /> },
    { path: '/tickets', label: 'Tickets', icon: <Ticket size={18} /> },
    { path: '/reports', label: 'Reports', icon: <FileText size={18} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white h-screen sticky top-0 border-r border-gray-200 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="flex items-center px-6 py-5 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Headphones className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-semibold text-gray-800">GitaAllied</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`mr-3 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Summary */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-700">AU</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">admin@gitaalliedtech.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;