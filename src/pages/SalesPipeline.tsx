import { TrendingUp, DollarSign, Target, Briefcase } from 'lucide-react';
import KPICard from '../components/UI/KPICard';
import ChartCard from '../components/UI/ChartCard';
import DataTable from '../components/UI/DataTable';
import RevenueForecast from '../components/sales/RevenueForecast';
import DealProgressionTable from "../components/sales/DealProgressionTable";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

import { pipelineKPIs, funnelData, deals } from '../data/mockData';

const SalesPipeline = () => {
  const funnelColors = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'];

  const dealColumns = [
    { header: 'Deal ID', accessor: 'id' },
    { header: 'Company', accessor: 'company' },
    {
      header: 'Value',
      accessor: 'value',
      cell: (value: unknown) => `$${(value as number).toLocaleString()}`
    },
    {
      header: 'Stage',
      accessor: 'stage',
      cell: (value: unknown) => {
        const stage = value as string;
        const colors = {
          Prospecting: 'bg-purple-100 text-purple-700',
          Qualification: 'bg-blue-100 text-blue-700',
          Proposal: 'bg-yellow-100 text-yellow-700',
          Negotiation: 'bg-orange-100 text-orange-700',
          Closed: 'bg-green-100 text-green-700'
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              colors[stage as keyof typeof colors]
            }`}
          >
            {stage}
          </span>
        );
      }
    },
    {
      header: 'Probability',
      accessor: 'probability',
      cell: (value: unknown) => {
        const probability = value as number;
        return (
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${probability}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {probability}%
            </span>
          </div>
        );
      }
    },
    {
      header: 'Owner',
      accessor: 'owner',
      cell: (value: unknown) => {
        const owner = value as string;
        const initials = owner
          .split(' ')
          .map(n => n[0])
          .join('');

        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">
                {initials}
              </span>
            </div>
            <span>{owner}</span>
          </div>
        );
      }
    },
    { header: 'Close Date', accessor: 'closeDate' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
        <p className="text-gray-500 mt-1">
          Track and manage your sales opportunities.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Pipeline Value"
          value={pipelineKPIs.totalValue.value}
          change={pipelineKPIs.totalValue.change}
          trend="up"
          icon={DollarSign}
          prefix="$"
        />
        <KPICard
          title="Win Rate"
          value={pipelineKPIs.winRate.value}
          change={pipelineKPIs.winRate.change}
          trend="up"
          icon={Target}
          suffix="%"
        />
        <KPICard
          title="Avg Deal Size"
          value={pipelineKPIs.avgDeal.value}
          change={pipelineKPIs.avgDeal.change}
          trend="down"
          icon={TrendingUp}
          prefix="$"
        />
        <KPICard
          title="Active Deals"
          value={pipelineKPIs.deals.value}
          change={pipelineKPIs.deals.change}
          trend="up"
          icon={Briefcase}
        />
      </div>

      {/* Sales Funnel + Deal Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Sales Funnel"
          subtitle="Deal progression through pipeline stages"
        >
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={funnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis
                dataKey="stage"
                type="category"
                stroke="#6B7280"
                width={100}
              />
              <Tooltip />
              <Bar dataKey="deals" radius={[0, 8, 8, 0]}>
                {funnelData.map((_, index) => (
                  <Cell key={index} fill={funnelColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Deal Velocity Metrics"
          subtitle="Average time spent in each stage"
        >
          <div className="space-y-4">
            {[12, 8, 15, 10, 5].map((days, index) => {
              const percentage = (days / 20) * 100;
              return (
                <div key={funnelData[index].stage} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      {funnelData[index].stage}
                    </span>
                    <span className="text-sm text-gray-500">
                      {days} days
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Sales Cycle</p>
                <p className="text-2xl font-bold">50 days</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">23.3%</p>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* ✅ Revenue Forecast (NEW – exact placement you asked) */}
      <RevenueForecast />

      {/* Active Deals */}
      <DealProgressionTable deals={deals} />

    </div>
  );
};

export default SalesPipeline;
