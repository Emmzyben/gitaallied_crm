import React, { useState } from 'react';
import { Calendar, Download, Briefcase, Phone, ClipboardCheck, Clock, BadgeCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample agent performance data for the overview chart
const performanceData = [
  { name: 'Sarah Johnson', calls: 65, handleTime: 280, resolution: 92 },
  { name: 'Michael Chen', calls: 45, handleTime: 320, resolution: 88 },
  { name: 'Jessica Lee', calls: 58, handleTime: 265, resolution: 90 },
  { name: 'David Kim', calls: 52, handleTime: 305, resolution: 85 },
  { name: 'Lisa Taylor', calls: 49, handleTime: 290, resolution: 89 },
];

// Sample data for trend chart
const trendData = [
  { day: 'Mon', calls: 42, avgHandleTime: 295, resolutionRate: 88 },
  { day: 'Tue', calls: 53, avgHandleTime: 278, resolutionRate: 91 },
  { day: 'Wed', calls: 58, avgHandleTime: 302, resolutionRate: 87 },
  { day: 'Thu', calls: 69, avgHandleTime: 285, resolutionRate: 92 },
  { day: 'Fri', calls: 65, avgHandleTime: 275, resolutionRate: 94 },
  { day: 'Sat', calls: 40, avgHandleTime: 310, resolutionRate: 89 },
  { day: 'Sun', calls: 35, avgHandleTime: 325, resolutionRate: 86 },
];

// Sample agent details
const agentDetails = [
  { id: 1, name: 'Sarah Johnson', role: 'Senior Agent', team: 'Customer Support', status: 'Active', experience: '3 years', photo: null },
  { id: 2, name: 'Michael Chen', role: 'Agent', team: 'Technical Support', status: 'Active', experience: '2 years', photo: null },
  { id: 3, name: 'Jessica Lee', role: 'Senior Agent', team: 'Customer Support', status: 'Active', experience: '4 years', photo: null },
  { id: 4, name: 'David Kim', role: 'Agent', team: 'Sales Support', status: 'Active', experience: '1 year', photo: null },
  { id: 5, name: 'Lisa Taylor', role: 'Team Lead', team: 'Customer Support', status: 'Active', experience: '5 years', photo: null },
];

const AgentPerformance: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get selected agent data or null if no agent is selected
  const selectedAgentData = selectedAgent !== null 
    ? agentDetails.find(agent => agent.id === selectedAgent) 
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Agent Performance</h1>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Calendar size={16} className="mr-2" />
            Last 7 Days
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="px-6 -mb-px flex space-x-8">
            <button
              className={`py-4 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-4 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === 'trends'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('trends')}
            >
              Trends
            </button>
            <button
              className={`py-4 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === 'agents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('agents')}
            >
              Agent Details
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Calls</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">269</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone size={20} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="text-green-600 font-medium">↑ 8%</span> vs last period
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg. Resolution Rate</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">88.8%</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <ClipboardCheck size={20} className="text-green-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="text-green-600 font-medium">↑ 3%</span> vs last period
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg. Handle Time</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">4m 52s</h3>
                    </div>
                    <div className="bg-cyan-100 p-3 rounded-lg">
                      <Clock size={20} className="text-cyan-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="text-red-600 font-medium">↓ 2%</span> vs last period
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Customer Satisfaction</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">4.3/5</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <BadgeCheck size={20} className="text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="text-green-600 font-medium">↑ 5%</span> vs last period
                  </div>
                </div>
              </div>
              
              {/* Performance Chart */}
              <div className="h-96 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Performance Comparison</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `${value}`}
                      label={{ value: 'Calls', angle: -90, position: 'insideLeft', offset: -5, fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                      label={{ value: 'Resolution %', angle: 90, position: 'insideRight', offset: 5, fill: '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar 
                      yAxisId="left" 
                      dataKey="calls" 
                      fill="#0A84FF" 
                      radius={[4, 4, 0, 0]} 
                      name="Total Calls"
                    />
                    <Bar 
                      yAxisId="right" 
                      dataKey="resolution" 
                      fill="#30D158" 
                      radius={[4, 4, 0, 0]} 
                      name="Resolution Rate (%)"
                    />
                    <Bar 
                      yAxisId="left" 
                      dataKey="handleTime" 
                      fill="#FF9F0A" 
                      radius={[4, 4, 0, 0]} 
                      name="Avg. Handle Time (sec)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="h-96 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance Trends</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      label={{ value: 'Calls', angle: -90, position: 'insideLeft', offset: -5, fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                      label={{ value: 'Resolution %', angle: 90, position: 'insideRight', offset: 5, fill: '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => {
                        if (name === 'Resolution Rate') return [`${value}%`, name];
                        if (name === 'Avg. Handle Time') return [`${value}s`, name];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="calls" 
                      stroke="#0A84FF" 
                      strokeWidth={2}
                      dot={{ stroke: '#0A84FF', strokeWidth: 2, r: 4, fill: 'white' }}
                      activeDot={{ r: 6 }}
                      name="Total Calls"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="resolutionRate" 
                      stroke="#30D158" 
                      strokeWidth={2}
                      dot={{ stroke: '#30D158', strokeWidth: 2, r: 4, fill: 'white' }}
                      activeDot={{ r: 6 }}
                      name="Resolution Rate"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="avgHandleTime" 
                      stroke="#FF9F0A" 
                      strokeWidth={2}
                      dot={{ stroke: '#FF9F0A', strokeWidth: 2, r: 4, fill: 'white' }}
                      activeDot={{ r: 6 }}
                      name="Avg. Handle Time"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Agent Details Tab */}
          {activeTab === 'agents' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Agent List */}
                <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">Agents</h3>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {agentDetails.map((agent) => (
                      <li key={agent.id}>
                        <button
                          onClick={() => setSelectedAgent(agent.id)}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center ${
                            selectedAgent === agent.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium flex-shrink-0">
                            {agent.photo ? 
                              <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover rounded-full" /> : 
                              agent.name.charAt(0)
                            }
                          </div>
                          <div className="ml-3">
                            <p className={`text-sm font-medium ${selectedAgent === agent.id ? 'text-blue-700' : 'text-gray-900'}`}>
                              {agent.name}
                            </p>
                            <p className="text-xs text-gray-500">{agent.role}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Agent Details */}
                <div className="lg:col-span-2">
                  {selectedAgentData ? (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-2xl">
                            {selectedAgentData.photo ? 
                              <img src={selectedAgentData.photo} alt={selectedAgentData.name} className="h-full w-full object-cover rounded-full" /> : 
                              selectedAgentData.name.charAt(0)
                            }
                          </div>
                          <div className="ml-5">
                            <h2 className="text-xl font-bold text-gray-900">{selectedAgentData.name}</h2>
                            <p className="text-sm text-gray-500">{selectedAgentData.role} • {selectedAgentData.team}</p>
                            <div className="flex items-center mt-1">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {selectedAgentData.status}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">• {selectedAgentData.experience} experience</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Performance Metrics */}
                      <div className="p-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <div className="p-2 rounded-lg bg-blue-100">
                                <Phone size={18} className="text-blue-600" />
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-500">Total Calls</h4>
                                <p className="text-xl font-bold text-gray-900 mt-0.5">65</p>
                              </div>
                            </div>
                            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                            <p className="mt-1.5 text-xs text-gray-500">80% of team average</p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <div className="p-2 rounded-lg bg-green-100">
                                <ClipboardCheck size={18} className="text-green-600" />
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-500">Resolution Rate</h4>
                                <p className="text-xl font-bold text-gray-900 mt-0.5">92%</p>
                              </div>
                            </div>
                            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <p className="mt-1.5 text-xs text-gray-500">Top performer in team</p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <div className="p-2 rounded-lg bg-yellow-100">
                                <Clock size={18} className="text-yellow-600" />
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-500">Avg. Handle Time</h4>
                                <p className="text-xl font-bold text-gray-900 mt-0.5">4m 40s</p>
                              </div>
                            </div>
                            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <p className="mt-1.5 text-xs text-gray-500">25% below team average</p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <div className="p-2 rounded-lg bg-purple-100">
                                <BadgeCheck size={18} className="text-purple-600" />
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-500">Customer Rating</h4>
                                <p className="text-xl font-bold text-gray-900 mt-0.5">4.6/5</p>
                              </div>
                            </div>
                            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <p className="mt-1.5 text-xs text-gray-500">Top 10% in company</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
                      <Briefcase size={40} className="mx-auto text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Select an Agent</h3>
                      <p className="text-gray-500">Select an agent from the list to view their detailed performance metrics</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentPerformance;