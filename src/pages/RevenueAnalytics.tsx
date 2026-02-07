import { DollarSign, TrendingUp, Target, Calendar } from 'lucide-react';
import KPICard from '../components/UI/KPICard';
import ChartCard from '../components/UI/ChartCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { revenueKPIs, revenueByProduct, revenueByRegion, revenueGrowth } from '../data/mockData';

const RevenueAnalytics = () => {
  const productColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
  const regionColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Revenue Analytics</h1>
        <p className="text-gray-500 mt-1">Track your revenue performance and forecast.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Revenue MTD"
          value={revenueKPIs.mtd.value}
          change={revenueKPIs.mtd.change}
          trend="up"
          icon={Calendar}
          prefix="$"
        />
        <KPICard
          title="Revenue QTD"
          value={revenueKPIs.qtd.value}
          change={revenueKPIs.qtd.change}
          trend="up"
          icon={TrendingUp}
          prefix="$"
        />
        <KPICard
          title="Revenue YTD"
          value={revenueKPIs.ytd.value}
          change={revenueKPIs.ytd.change}
          trend="up"
          icon={DollarSign}
          prefix="$"
        />
        <KPICard
          title="Annual Recurring Revenue"
          value={revenueKPIs.arr.value}
          change={revenueKPIs.arr.change}
          trend="up"
          icon={Target}
          prefix="$"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">MTD Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Actual</span>
                <span className="text-sm font-bold text-gray-900">${revenueKPIs.mtd.value.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Target</span>
                <span className="text-sm font-bold text-gray-900">${revenueKPIs.mtd.target.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(revenueKPIs.mtd.value / revenueKPIs.mtd.target) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {((revenueKPIs.mtd.value / revenueKPIs.mtd.target) * 100).toFixed(1)}% of target achieved
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">QTD Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Actual</span>
                <span className="text-sm font-bold text-gray-900">${revenueKPIs.qtd.value.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Target</span>
                <span className="text-sm font-bold text-gray-900">${revenueKPIs.qtd.target.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(revenueKPIs.qtd.value / revenueKPIs.qtd.target) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {((revenueKPIs.qtd.value / revenueKPIs.qtd.target) * 100).toFixed(1)}% of target achieved
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">YTD Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Actual</span>
                <span className="text-sm font-bold text-gray-900">${revenueKPIs.ytd.value.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Target</span>
                <span className="text-sm font-bold text-gray-900">${revenueKPIs.ytd.target.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${(revenueKPIs.ytd.value / revenueKPIs.ytd.target) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {((revenueKPIs.ytd.value / revenueKPIs.ytd.target) * 100).toFixed(1)}% of target achieved
              </p>
            </div>
          </div>
        </div>
      </div>

      <ChartCard title="Revenue Trends" subtitle="Actual vs Forecast vs Target">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={revenueGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3B82F6"
              strokeWidth={3}
              name="Actual Revenue"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Forecast"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue by Product" subtitle="Breakdown of revenue by product line">
          <div className="flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueByProduct}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ product, percentage }) => `${percentage}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {revenueByProduct.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={productColors[index % productColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {revenueByProduct.map((product, index) => (
              <div key={product.product} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: productColors[index] }}
                  />
                  <span className="text-sm font-medium text-gray-900">{product.product}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">${product.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Region" subtitle="Geographic revenue distribution">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueByRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="region" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {revenueByRegion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={regionColors[index % regionColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {revenueByRegion.map((region, index) => (
              <div key={region.region} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: regionColors[index] }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{region.region}</p>
                  <p className="text-xs text-gray-500">${region.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Current Month</p>
          <p className="text-3xl font-bold mb-1">${revenueKPIs.mtd.value.toLocaleString()}</p>
          <p className="text-sm opacity-90">+{revenueKPIs.mtd.change}% vs last month</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Current Quarter</p>
          <p className="text-3xl font-bold mb-1">${revenueKPIs.qtd.value.toLocaleString()}</p>
          <p className="text-sm opacity-90">+{revenueKPIs.qtd.change}% vs last quarter</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Current Year</p>
          <p className="text-3xl font-bold mb-1">${revenueKPIs.ytd.value.toLocaleString()}</p>
          <p className="text-sm opacity-90">+{revenueKPIs.ytd.change}% vs last year</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
