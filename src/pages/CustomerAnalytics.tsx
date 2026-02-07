import { Users, UserCheck, UserX, DollarSign } from 'lucide-react';
import KPICard from '../components/UI/KPICard';
import ChartCard from '../components/UI/ChartCard';
import TopCustomersTable from "../components/customers/TopCustomersTable";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

import {
  customerKPIs,
  customerSegments,
  customerGrowth,
  topCustomers
} from '../data/mockData';

const CustomerAnalytics = () => {
  const segmentColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Customer Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Understand your customer base and behavior patterns.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Customers"
          value={customerKPIs.totalCustomers.value}
          change={customerKPIs.totalCustomers.change}
          trend="up"
          icon={Users}
        />
        <KPICard
          title="Active Customers"
          value={customerKPIs.activeCustomers.value}
          change={customerKPIs.activeCustomers.change}
          trend="up"
          icon={UserCheck}
        />
        <KPICard
          title="Churned Customers"
          value={customerKPIs.churnedCustomers.value}
          change={customerKPIs.churnedCustomers.change}
          trend="up"
          icon={UserX}
        />
        <KPICard
          title="Avg. Lifetime Value"
          value={customerKPIs.lifetimeValue.value}
          change={customerKPIs.lifetimeValue.change}
          trend="up"
          icon={DollarSign}
          prefix="$"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Customer Segmentation"
          subtitle="Distribution of customers by segment"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percentage }) =>
                  `${name} ${percentage}%`
                }
              >
                {customerSegments.map((_, index) => (
                  <Cell
                    key={index}
                    fill={segmentColors[index % segmentColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Customer Growth"
          subtitle="Active and churned customers over time"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="active" stroke="#3B82F6" />
              <Line dataKey="churned" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top Customers */}
      <ChartCard
  title="Top Customers"
  subtitle="Highest value customers by revenue"
>
  <TopCustomersTable customers={topCustomers} />
</ChartCard>
    </div>
  );
};

export default CustomerAnalytics;
