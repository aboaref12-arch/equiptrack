
import { useQuery } from "@tanstack/react-query";
import { listOrders } from "@/services/orders";
import { listStores } from "@/services/stores";
import { listServiceRequests } from "@/services/service-requests";
import { listActivity } from "@/services/activity";

function KPI({ title, value }: { title: string; value: number }) {
  return (
    <div className="border rounded p-4">
      <div className="text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

export default function AdminPage() {
  const { data: orders } = useQuery({ queryKey: ["kpi-orders"], queryFn: () => listOrders({ page:1, page_size:1 }) });
  const { data: stores } = useQuery({ queryKey: ["kpi-stores"], queryFn: () => listStores({ page:1, page_size:1 }) });
  const { data: sr }     = useQuery({ queryKey: ["kpi-sr"],     queryFn: () => listServiceRequests({ page:1, page_size:1 }) });
  const { data: act }    = useQuery({ queryKey: ["activity"],   queryFn: () => listActivity({ page:1, page_size:20 }) });

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Admin — Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <KPI title="Orders" value={orders?.count ?? 0} />
        <KPI title="Stores" value={stores?.count ?? 0} />
        <KPI title="Service Requests" value={sr?.count ?? 0} />
      </div>

      <div>
        <h2 className="font-semibold mb-2">Recent Activity</h2>
        <div className="border rounded overflow-auto">
          <table className="w-full text-sm">
            <thead><tr><th className="p-2 text-left">Time</th><th className="p-2 text-left">User</th><th className="p-2 text-left">Object</th><th className="p-2 text-left">Message</th></tr></thead>
            <tbody>
              {act?.results?.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-2">{new Date(a.action_time).toLocaleString()}</td>
                  <td className="p-2">{a.user}</td>
                  <td className="p-2">{a.object_repr}</td>
                  <td className="p-2">{a.change_message || "-"}</td>
                </tr>
              )) || <tr><td className="p-2">No activity</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
