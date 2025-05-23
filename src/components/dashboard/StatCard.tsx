import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  color: 'blue' | 'cyan' | 'purple' | 'green' | 'yellow' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600'
    },
    cyan: {
      bg: 'bg-cyan-50',
      text: 'text-cyan-700',
      iconBg: 'bg-cyan-100',
      iconText: 'text-cyan-600'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      iconBg: 'bg-yellow-100',
      iconText: 'text-yellow-600'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      iconBg: 'bg-red-100',
      iconText: 'text-red-600'
    }
  };

  const colorClass = colorClasses[color];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-transform duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-1">
              <span className={`text-xs font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-lg ${colorClass.iconBg}`}>
          <div className={`w-6 h-6 ${colorClass.iconText}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;