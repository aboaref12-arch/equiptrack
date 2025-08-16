import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  DollarSign,
  Package,
  MapPin,
  BarChart3
} from "lucide-react";

// Mock data for reports
const monthlyOrdersData = [
  { month: "Jan", orders: 45, revenue: 125000, completed: 40 },
  { month: "Feb", orders: 52, revenue: 145000, completed: 48 },
  { month: "Mar", orders: 38, revenue: 98000, completed: 35 },
  { month: "Apr", orders: 61, revenue: 167000, completed: 58 },
  { month: "May", orders: 55, revenue: 152000, completed: 52 },
  { month: "Jun", orders: 67, revenue: 189000, completed: 63 }
];

const equipmentData = [
  { type: "AC Units", quantity: 156, percentage: 45, cost: 450000 },
  { type: "Compressors", quantity: 89, percentage: 26, cost: 234000 },
  { type: "Electrical", quantity: 67, percentage: 19, cost: 123000 },
  { type: "Other", quantity: 34, percentage: 10, cost: 67000 }
];

const regionData = [
  { name: "Riyadh", value: 35, orders: 45, color: "#3b82f6" },
  { name: "Jeddah", value: 28, orders: 38, color: "#22c55e" },
  { name: "Dammam", value: 22, orders: 32, color: "#f59e0b" },
  { name: "Others", value: 15, orders: 28, color: "#ef4444" }
];

const paymentStatusData = [
  { status: "Paid", amount: 425000, orders: 156, color: "#22c55e" },
  { status: "Approved", amount: 234000, orders: 89, color: "#3b82f6" },
  { status: "Pending", amount: 145000, orders: 67, color: "#f59e0b" }
];

const reportTemplates = [
  {
    title: "Orders by Status Report",
    description: "Complete breakdown of orders by their current status",
    type: "Operational"
  },
  {
    title: "Equipment Summary by Region",
    description: "Equipment distribution across different regions",
    type: "Equipment"
  },
  {
    title: "Service Requests Analysis",
    description: "Analysis of service requests by technician and type",
    type: "Service"
  },
  {
    title: "PO vs Invoice Reconciliation",
    description: "Financial reconciliation between POs and invoices",
    type: "Financial"
  },
  {
    title: "Model Comparison Report",
    description: "Comparison between Quotation, Supplier, and Americana models",
    type: "Comparative"
  }
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive reporting and business intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button className="gradient-primary shadow-glow">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$876K</div>
            <p className="text-xs text-success flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Equipment Installed
            </CardTitle>
            <Package className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">346</div>
            <p className="text-xs text-muted-foreground">Units this period</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Service Efficiency
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">94%</div>
            <p className="text-xs text-success">Completion rate</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Regions
            </CardTitle>
            <MapPin className="h-5 w-5 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground">Cities covered</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Orders Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monthly Orders Trend</CardTitle>
            <CardDescription>Orders and revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stackId="1"
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Orders by Region</CardTitle>
            <CardDescription>Geographic distribution of orders</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Equipment Type Analysis</CardTitle>
          <CardDescription>Breakdown of equipment types by quantity and cost</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {equipmentData.map((equipment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{equipment.type}</p>
                    <p className="text-sm text-muted-foreground">{equipment.quantity} units installed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">${equipment.cost.toLocaleString()}</p>
                  <Badge variant="secondary">{equipment.percentage}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Status Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Payment Status Overview</CardTitle>
          <CardDescription>Financial status breakdown of all orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {paymentStatusData.map((payment, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{payment.status}</h4>
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: payment.color }}
                  />
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  ${payment.amount.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {payment.orders} orders
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Templates
          </CardTitle>
          <CardDescription>Pre-built reports ready for export</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((report, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{report.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {report.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {report.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}