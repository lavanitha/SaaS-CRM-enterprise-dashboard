import { useState } from "react";
import { Eye, Download } from "lucide-react";

interface Column {
  header: string;
  accessor: string;
  cell?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
}

const DataTable = ({ columns, data }: DataTableProps) => {
  // 🔹 NEW STATE
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // 🔹 FILTER LOGIC (SEARCH + DROPDOWN)
  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.orderId?.toString().toLowerCase().includes(search.toLowerCase()) ||
      row.customerName?.toString().toLowerCase().includes(search.toLowerCase()) ||
      row.product?.toString().toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || row.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* 🔹 SEARCH + DROPDOWN (MATCH IMAGE) */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* 🔹 TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}

              {/* 🔹 ACTIONS COLUMN */}
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-4 px-4 text-sm text-gray-900">
                    {column.cell
                      ? column.cell(row[column.accessor], row)
                      : String(row[column.accessor] || "")}
                  </td>
                ))}

                {/* 🔹 ACTION ICONS */}
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end gap-4 text-gray-500">
                    <Eye className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                    <Download className="w-4 h-4 cursor-pointer hover:text-green-600" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 🔹 EMPTY STATE */}
        {filteredData.length === 0 && (
          <div className="text-center py-6 text-sm text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
