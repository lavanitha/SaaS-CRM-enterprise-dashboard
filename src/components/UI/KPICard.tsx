import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  chartData?: { value: number }[];
  prefix?: string;
  suffix?: string;
}

const KPICard = ({ title, value, change, trend, icon: Icon, chartData, prefix = '', suffix = '' }: KPICardProps) => {
  const isPositive = trend === 'up';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </h3>
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}

        {chartData && (
          <div className="flex-1 ml-4" style={{ height: 32 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
