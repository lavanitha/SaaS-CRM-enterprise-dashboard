import { Eye, Edit2 } from "lucide-react";

interface Deal {
  id: string;
  company: string;
  stage: string;
  value: number;
  probability: number;
  closeDate: string;
  owner: string;
}

interface Props {
  deals: Deal[];
}

const stageStyles: Record<string, string> = {
  Prospecting: "bg-purple-100 text-purple-700",
  Qualification: "bg-blue-100 text-blue-700",
  Proposal: "bg-yellow-100 text-yellow-700",
  Negotiation: "bg-orange-100 text-orange-700",
  Closed: "bg-green-100 text-green-700",
};

const DealProgressionTable = ({ deals }: Props) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Deal Progression
          </h3>
          <p className="text-sm text-gray-500">
            Track individual opportunities
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm border rounded-lg">
            Filter
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg">
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Deal Name</th>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-left">Stage</th>
              <th className="px-6 py-3 text-right">Value</th>
              <th className="px-6 py-3 text-left">Probability</th>
              <th className="px-6 py-3 text-left">Close Date</th>
              <th className="px-6 py-3 text-left">Owner</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {deal.company}
                </td>

                <td className="px-6 py-4">{deal.company}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      stageStyles[deal.stage]
                    }`}
                  >
                    {deal.stage}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-semibold">
                  ${deal.value.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 h-2 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">
                      {deal.probability}%
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">{deal.closeDate}</td>

                <td className="px-6 py-4">{deal.owner}</td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <Eye className="w-4 h-4 text-gray-500 cursor-pointer" />
                    <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealProgressionTable;
