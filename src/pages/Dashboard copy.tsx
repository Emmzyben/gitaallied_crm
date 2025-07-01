import React from 'react';
import { 
  Phone, 
  UserCheck, 
  Clock, 
  AlertCircle,
  MessageCircle, 
  BarChart,
  Download,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import RecentCalls from '../components/dashboard/RecentCalls';
import PerformanceChart from '../components/dashboard/PerformanceChart';

const Dashboard: React.FC = () => {
  const recentCalls = [
    {
      id: '1',
      customer: { name: 'John Smith' },
      agent: 'Sarah Johnson',
      time: 'Today, 9:30 AM',
      duration: '5m 23s',
      status: 'completed' as const
    },
    {
      id: '2',
      customer: { name: 'Emily Brown' },
      agent: 'Michael Chen',
      time: 'Today, 10:15 AM',
      duration: '3m 45s',
      status: 'completed' as const
    },
    {
      id: '3',
      customer: { name: 'Robert Garcia' },
      agent: 'Jessica Lee',
      time: 'Today, 11:02 AM',
      duration: '-',
      status: 'missed' as const
    },
    {
      id: '4',
      customer: { name: 'Amy Wilson' },
      agent: 'David Kim',
      time: 'Today, 11:47 AM',
      duration: '8m 12s',
      status: 'transferred' as const
    },
    {
      id: '5',
      customer: { name: 'Thomas Moore' },
      agent: 'Sarah Johnson',
      time: 'Today, 1:23 PM',
      duration: '4m 18s',
      status: 'completed' as const
    }
  ];

  // Sample data for performance chart
  const performanceData = [
    { name: 'Sarah J.', calls: 65, resolutionRate: 92 },
    { name: 'Michael C.', calls: 45, resolutionRate: 88 },
    { name: 'Jessica L.', calls: 58, resolutionRate: 90 },
    { name: 'David K.', calls: 52, resolutionRate: 85 },
    { name: 'Lisa T.', calls: 49, resolutionRate: 89 }
  ];

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Download size={16} className="inline-block mr-2" />
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Calendar size={16} className="inline-block mr-2" />
            Today
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/call-logs">
          <StatCard
            title="Total Calls"
            value="1,284"
            change={{ value: 12, isPositive: true }}
            icon={<Phone />}
            color="blue"
          />
        </Link>
        <Link to="/agent-performance">
          <StatCard
            title="Average Wait Time"
            value="1m 45s"
            change={{ value: 8, isPositive: false }}
            icon={<Clock />}
            color="cyan"
          />
        </Link>
        <Link to="/reports">
          <StatCard
            title="Resolution Rate"
            value="89%"
            change={{ value: 2, isPositive: true }}
            icon={<UserCheck />}
            color="green"
          />
        </Link>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={performanceData} />
        <RecentCalls calls={recentCalls} />
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/call-logs">
          <StatCard
            title="Missed Calls"
            value="43"
            change={{ value: 5, isPositive: false }}
            icon={<AlertCircle />}
            color="red"
          />
        </Link>
        <Link to="/reports">
          <StatCard
            title="Customer Satisfaction"
            value="4.7/5"
            change={{ value: 3, isPositive: true }}
            icon={<MessageCircle />}
            color="purple"
          />
        </Link>
        <Link to="/reports">
          <StatCard
            title="SLA Compliance"
            value="94%"
            change={{ value: 1, isPositive: true }}
            icon={<BarChart />}
            color="yellow"
          />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;