import React, { useState } from 'react';
import { Calendar, Download, FileText, BarChart, PieChart, TrendingUp, Users, Clock, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, Legend } from 'recharts';

// Sample data for call volume chart
const callVolumeData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
  { name: 'Jul', value: 4300 },
  { name: 'Aug', value: 5300 },
  { name: 'Sep', value: 4500 },
  { name: 'Oct', value: 3500 },
  { name: 'Nov', value: 4800 },
  { name: 'Dec', value: 5600 },
];

// Sample data for call category pie chart
const callCategoryData = [
  { name: 'Technical Support', value: 45 },
  { name: 'Customer Service', value: 25 },
  { name: 'Billing', value: 15 },
  { name: 'Sales Inquiry', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0'];

// Sample data for agent performance
const agentPerformanceData = [
  { name: 'Sarah J.', resolved: 240, transferred: 20 },
  { name: 'Michael C.', resolved: 180, transferred: 30 },
  { name: 'Jessica L.', resolved: 200, transferred: 15 },
  { name: 'David K.', resolved: 170, transferred: 40 },
  { name: 'Lisa T.', resolved: 210, transferred: 10 },
];

// Sample data for SLA compliance
const slaComplianceData = [
  { name: 'Jan', value: 92 },
  { name: 'Feb', value: 94 },
  { name: 'Mar', value: 91 },
  { name: 'Apr', value: 95 },
  { name: 'May', value: 93 },
  { name: 'Jun', value: 98 },
  { name: 'Jul', value: 97 },
  { name: 'Aug', value: 94 },
  { name: 'Sep', value: 95 },
  { name: 'Oct', value: 96 },
  { name: 'Nov', value: 94 },
  { name: 'Dec', value: 95 },
];

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              className="appearance-none block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
          </div>
          
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="px-6 -mb-px flex space-x-8 overflow-x-auto">
            <button
              className={`py-4 border-b-2 font-medium text-sm whitespace-nowrap focus:outline-none ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-4 border-b-2 font-medium text-sm whitespace-nowrap focus:outline-none ${
                activeTab === 'call-volume'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('call-volume')}
            >
              Call Volume
            </button>
            <button
              className={`py-4 border-b-2 font-medium text-sm whitespace-nowrap focus:outline-none ${
                activeTab === 'agent-performance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('agent-performance')}
            >
              Agent Performance
            </button>
            <button
              className={`py-4 border-b-2 font-medium text-sm whitespace-nowrap focus:outline-none ${
                activeTab === 'customer-satisfaction'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('customer-satisfaction')}
            >
              Customer Satisfaction
            </button>
            <button
              className={`py-4 border-b-2 font-medium text-sm whitespace-nowrap focus:outline-none ${
                activeTab === 'sla'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('sla')}
            >
              SLA Compliance
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Overview Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Calls</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">15,842</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <BarChart size={20} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="text-green-600 font-medium">↑ 12%</span> vs last period
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg. Resolution Time</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">5m 12s</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Clock size={20} className="text-green-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="text-green-600 font-medium">↓ 8%</span> vs last period
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Customer Satisfaction</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">4.7/5</h3>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Users size={20} className="text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="text-green-600 font-medium">↑ 4%</span> vs last period
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">SLA Compliance</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">94.5%</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <TrendingUp size={20} className="text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="text-green-600 font-medium">↑ 2%</span> vs last period
                  </div>
                </div>
              </div>
              
              {/* Overview Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Call Volume Chart */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Call Volume</h3>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        Total Calls
                      </span>
                    </div>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={callVolumeData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0A84FF" 
                          fill="#0A84FF20" 
                          activeDot={{ r: 6 }} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Call Category Distribution */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Category Distribution</h3>
                  <div className="h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={callCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {callCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Agent Performance */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Performance</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={agentPerformanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="horizontal"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="resolved" fill="#30D158" name="Resolved" />
                        <Bar dataKey="transferred" fill="#FF9F0A" name="Transferred" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* SLA Compliance */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">SLA Compliance Trend</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={slaComplianceData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                          domain={[80, 100]}
                        />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#5E5CE6" 
                          fill="#5E5CE620" 
                          activeDot={{ r: 6 }} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Available Reports */}
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Daily Call Volume', icon: <BarChart size={16} />, type: 'PDF' },
                    { title: 'Agent Performance Summary', icon: <Users size={16} />, type: 'XLSX' },
                    { title: 'Customer Satisfaction Analysis', icon: <PieChart size={16} />, type: 'PDF' },
                    { title: 'SLA Compliance Report', icon: <TrendingUp size={16} />, type: 'PDF' },
                    { title: 'Call Category Distribution', icon: <PieChart size={16} />, type: 'XLSX' },
                    { title: 'Call Resolution Times', icon: <Clock size={16} />, type: 'CSV' },
                  ].map((report, index) => (
                    <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        {report.icon}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{report.title}</p>
                        <p className="text-xs text-gray-500">{report.type}</p>
                      </div>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 'overview' && (
            <div className="text-center py-20">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">{activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Report</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Detailed {activeTab.split('-').join(' ')} analytics are available in this section. 
                Use the date range selector above to customize your view.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;