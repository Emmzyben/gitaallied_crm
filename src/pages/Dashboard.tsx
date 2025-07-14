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
import { useFetchDashboardData } from '../hooks/useFetchDashboardData';

import StatCard from '../components/dashboard/StatCard';
import RecentCalls from '../components/dashboard/RecentCalls';
import PerformanceChart from '../components/dashboard/PerformanceChart';

const Dashboard: React.FC = () => {

  const { 
    totalCalls,
    avgWaitTime,
    resolutionRate,
    missedCalls,
    satisfactionScore,
    slaCompliance,
    recentCalls,
    performanceData,
    loading,
    error
  } = useFetchDashboardData();

  const handleExport = () => {
    const csvContent = `Metric,Value
Total Calls,${totalCalls}
Average Wait Time,${avgWaitTime}
Resolution Rate,${resolutionRate}%
Missed Calls,${missedCalls}
Customer Satisfaction,${satisfactionScore}/5
SLA Compliance,${slaCompliance}%
`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dashboard_summary.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

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
            value={totalCalls}
            change={{ value: 12, isPositive: true }}
            icon={<Phone />}
            color="blue"
          />
        </Link>
        <Link to="/agent-performance">
          <StatCard
            title="Average Wait Time"
            value={avgWaitTime}
            change={{ value: 8, isPositive: false }}
            icon={<Clock />}
            color="cyan"
          />
        </Link>
        <Link to="/reports">
          <StatCard
            title="Resolution Rate"
            value={`${resolutionRate}%`}
            change={{ value: 2, isPositive: true }}
            icon={<UserCheck />}
            color="green"
          />
        </Link>
      </div>

      {/* Performance & Recent Calls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={performanceData} />
        <RecentCalls calls={recentCalls.map(call => ({
          ...call,
          agent: call.agent ?? 'Unknown',
          time: call.time ?? '',
          duration: call.duration ?? '',
          status: (call.status as "completed" | "missed" | "transferred") ?? "completed"
        }))} />
      </div>

      {/* Extra Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/call-logs">
          <StatCard
            title="Missed Calls"
            value={missedCalls}
            change={{ value: 5, isPositive: false }}
            icon={<AlertCircle />}
            color="red"
          />
        </Link>
        <Link to="/reports">
          <StatCard
            title="Customer Satisfaction"
            value={`${satisfactionScore}/5`}
            change={{ value: 3, isPositive: true }}
            icon={<MessageCircle />}
            color="purple"
          />
        </Link>
        <Link to="/reports">
          <StatCard
            title="SLA Compliance"
            value={`${slaCompliance}%`}
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
