import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import ChartCard from "../UI/ChartCard";

const data = [
  { month: "Jan", forecast: 1800000, actual: 1600000 },
  { month: "Feb", forecast: 1950000, actual: 1750000 },
  { month: "Mar", forecast: 2100000 },
  { month: "Apr", forecast: 2250000 },
  { month: "May", forecast: 2400000 },
  { month: "Jun", forecast: 2550000 }
];

const RevenueForecast = () => {
  return (
    <ChartCard
      title="Revenue Forecast"
      subtitle="Weighted pipeline projections"
      rightContent={
        <span className="text-green-600 text-sm font-medium">
          +15.3% vs last quarter
        </span>
      }
    >
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ForecastCard title="Best Case" value="$2.8M" confidence="95%" />
        <ForecastCard
          title="Most Likely"
          value="$2.1M"
          confidence="75%"
          highlight
        />
        <ForecastCard title="Worst Case" value="$1.5M" confidence="50%" />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#2563EB"
            strokeWidth={3}
            dot
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#10B981"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

const ForecastCard = ({
  title,
  value,
  confidence,
  highlight
}: {
  title: string;
  value: string;
  confidence: string;
  highlight?: boolean;
}) => (
  <div
    className={`p-4 rounded-lg border ${
      highlight
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200 bg-gray-50"
    }`}
  >
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold mt-1">{value}</p>
    <p className="text-xs text-gray-400">{confidence} confidence</p>
  </div>
);

export default RevenueForecast;
