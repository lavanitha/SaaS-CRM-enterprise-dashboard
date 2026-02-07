import { Eye } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  revenue: number;
  orders: number;
  ltv: number;
  segment: string;
}

interface Props {
  customers: Customer[];
}

const segmentColors: Record<string, string> = {
  Enterprise: "bg-blue-100 text-blue-700",
  "Mid-Market": "bg-green-100 text-green-700",
  "Small Business": "bg-yellow-100 text-yellow-700",
  Startup: "bg-purple-100 text-purple-700"
};

const TopCustomersTable = ({ customers }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Customer ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-right">Revenue</th>
            <th className="px-6 py-3 text-right">Orders</th>
            <th className="px-6 py-3 text-right">LTV</th>
            <th className="px-6 py-3 text-left">Segment</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {customers.map(customer => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{customer.id}</td>
              <td className="px-6 py-4 font-medium">
                {customer.name}
              </td>
              <td className="px-6 py-4 text-right font-semibold">
                ${customer.revenue.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                {customer.orders}
              </td>
              <td className="px-6 py-4 text-right">
                ${customer.ltv.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    segmentColors[customer.segment]
                  }`}
                >
                  {customer.segment}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <Eye className="w-4 h-4 text-gray-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCustomersTable;
