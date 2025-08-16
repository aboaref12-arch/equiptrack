import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ShoppingCart, 
  Store, 
  Wrench, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

// Mock data
const kpiData = [
  {
    title: "Total Orders",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-primary"
  },
  {
    title: "Active Stores",
    value: "89",
    change: "+3%",
    trend: "up", 
    icon: Store,
    color: "text-success"
  },
  {
    title: "Service Requests",
    value: "34",
    change: "-8%",
    trend: "down",
    icon: Wrench,
    color: "text-warning"
  },
  {
    title: "Total Revenue",
    value: "$284K",
    change: "+15%",
    trend: "up",
    icon: DollarSign,
    color: "text-primary"
  }
];

const ordersByRegion = [
  { region: "Riyadh", orders: 45, amount: 125000 },
  { region: "Jeddah", orders: 38, amount: 98000 },
  { region: "Dammam", orders: 32, amount: 87000 },
  { region: "Mecca", orders: 28, amount: 76000 },
  { region: "Medina", orders: 24, amount: 65000 }
];

const statusData = [
  { name: "Completed", value: 156, color: "#22c55e" },
  { name: "In Progress", value: 67, color: "#3b82f6" },
  { name: "Pending", value: 34, color: "#f59e0b" },
  { name: "Delayed", value: 12, color: "#ef4444" }
];

const recentOrders = [
  {
    id: "PO-2024-001",
    store: "Store Riyadh Mall",
    type: "AC Installation",
    status: "In Progress",
    amount: "$12,500"
  },
  {
    id: "PO-2024-002", 
    store: "Store Jeddah Center",
    type: "Compressor Repair",
    status: "Completed",
    amount: "$3,200"
  },
  {
    id: "PO-2024-003",
    store: "Store Dammam Plaza",
    type: "Additional Work",
    status: "Pending",
    amount: "$8,900"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your purchase orders and equipment management</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <p className={`text-xs flex items-center gap-1 ${
                kpi.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                <TrendingUp className="h-3 w-3" />
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Orders by Region Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Orders by Region</CardTitle>
            <CardDescription>Regional distribution of purchase orders</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordersByRegion}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Current status of all orders</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest purchase orders and service requests</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.store}</p>
                    <p className="text-xs text-muted-foreground">{order.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{order.amount}</p>
                  <Badge 
                    variant={
                      order.status === "Completed" ? "default" :
                      order.status === "In Progress" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}