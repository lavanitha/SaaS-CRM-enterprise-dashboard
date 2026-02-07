import { useState, useEffect } from "react";
import { getDashboardStats } from "../api/dashboardApi";
import { ShoppingCart, Users, DollarSign, RotateCcw } from "lucide-react";
import KPICard from "../components/UI/KPICard";
import ChartCard from "../components/UI/ChartCard";
import DataTable from "../components/UI/DataTable";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  monthlyRevenue,
  yearlyRevenue
} from "../data/mockData";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [revenueView, setRevenueView] =
    useState<"monthly" | "yearly">("monthly");

  const revenueData =
    revenueView === "monthly" ? monthlyRevenue : yearlyRevenue;

  const xAxisKey = revenueView === "monthly" ? "month" : "year";

  // 👇👇👇 PASTE STEP 4 RIGHT HERE 👇👇👇
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboardStats();
        setData(res);
      } catch (error) {
        console.error("Failed to load dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const miniChartData = [
    { value: 45 }, { value: 52 }, { value: 48 }, { value: 61 }, { value: 55 }, { value: 67 }, { value: 72 }
  ];

  const orderColumns = [
    { header: 'Order ID', accessor: 'orderId' },
{ header: 'Customer', accessor: 'customerName' },

    {
      header: 'Amount',
      accessor: 'amount',
      cell: (value: unknown) => `$${(value as number).toLocaleString()}`
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: unknown) => {
const status = (value as string).toLowerCase();
        const colors = {
          completed: 'bg-green-100 text-green-700',
          processing: 'bg-blue-100 text-blue-700',
          pending: 'bg-yellow-100 text-yellow-700'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      }
    },
    { header: 'Date', accessor: 'date' }
  ];
  if (loading) return <div>Loading dashboard...</div>;
if (!data) return <div>No dashboard data</div>;


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
  title="Total Orders"
  value={data.kpis.totalOrders}
  change={0}
  trend="up"
  icon={ShoppingCart}
  chartData={miniChartData}
/>

        <KPICard
  title="Total Customers"
  value={data.kpis.totalCustomers}
  change={0}
  trend="up"
  icon={Users}
  chartData={miniChartData}
/>

        <KPICard
  title="Total Revenue"
  value={data.kpis.totalRevenue}
  change={0}
  trend="up"
  icon={DollarSign}
  prefix="$"
  chartData={miniChartData}
/>

        <KPICard
  title="Returning Buyers"
  value={data.kpis.returningPercentage}
  change={0}
  trend="up"
  icon={RotateCcw}
  suffix="%"
  chartData={miniChartData}
/>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Revenue Insights"
            subtitle="Track your revenue performance over time"
            action={
              <div className="flex space-x-2">
                <button
                  onClick={() => setRevenueView('monthly')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    revenueView === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setRevenueView('yearly')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    revenueView === 'yearly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yearly
                </button>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey={xAxisKey} stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div>
          <ChartCard title="Sales Growth" subtitle="Year-over-year growth rate">
            <div className="flex items-center justify-center py-8">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#3B82F6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={502.4}
                    strokeDashoffset={502.4 - (502.4 * 78) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">78%</span>
                  <span className="text-sm text-gray-500 mt-1">Growth Rate</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500">Target</p>
                <p className="text-lg font-semibold text-gray-900">75%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Achieved</p>
                <p className="text-lg font-semibold text-green-600">78%</p>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>

      <ChartCard title="Recent Orders" subtitle="Latest transactions from your customers">
<DataTable columns={orderColumns} data={data.recentOrders} />
      </ChartCard>
    </div>
  );
};

export default Dashboard;
