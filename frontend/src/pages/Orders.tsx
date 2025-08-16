import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Download,
  FileText
} from "lucide-react";

// Mock orders data
const ordersData = [
  {
    id: "PO-2024-001",
    dept: "Operations",
    pmName: "أحمد محمد",
    region: "Riyadh",
    city: "Riyadh",
    storeName: "Store Riyadh Mall",
    requestDate: "2024-01-15",
    status: "In Progress",
    priority: "High",
    paymentStatus: "Pending",
    amount: "$12,500",
    items: 3
  },
  {
    id: "PO-2024-002",
    dept: "Maintenance",
    pmName: "فاطمة أحمد",
    region: "Western",
    city: "Jeddah",
    storeName: "Store Jeddah Center",
    requestDate: "2024-01-14",
    status: "Completed",
    priority: "Medium",
    paymentStatus: "Paid",
    amount: "$8,200",
    items: 2
  },
  {
    id: "PO-2024-003",
    dept: "Operations",
    pmName: "محمد علي",
    region: "Eastern",
    city: "Dammam",
    storeName: "Store Dammam Plaza",
    requestDate: "2024-01-13",
    status: "Pending",
    priority: "Low",
    paymentStatus: "Approved",
    amount: "$15,800",
    items: 5
  },
  {
    id: "PO-2024-004",
    dept: "Technical",
    pmName: "سارة محمد",
    region: "Central",
    city: "Riyadh",
    storeName: "Store Riyadh North",
    requestDate: "2024-01-12",
    status: "Delayed",
    priority: "High",
    paymentStatus: "Pending",
    amount: "$22,100",
    items: 4
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    "Completed": "default",
    "In Progress": "secondary", 
    "Pending": "outline",
    "Delayed": "destructive"
  } as const;
  
  return variants[status as keyof typeof variants] || "outline";
};

const getPriorityBadge = (priority: string) => {
  const variants = {
    "High": "destructive",
    "Medium": "secondary",
    "Low": "outline"
  } as const;
  
  return variants[priority as keyof typeof variants] || "outline";
};

const getPaymentBadge = (status: string) => {
  const variants = {
    "Paid": "default",
    "Approved": "secondary",
    "Pending": "outline"
  } as const;
  
  return variants[status as keyof typeof variants] || "outline";
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.pmName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Purchase Orders</h1>
          <p className="text-muted-foreground">Manage all purchase orders and equipment installations</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by PO number, store, or PM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Order Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                  All Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("Completed")}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("In Progress")}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("Pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("Delayed")}>
                  Delayed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Orders List ({filteredOrders.length})
          </CardTitle>
          <CardDescription>
            Complete list of purchase orders with their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>PM</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.storeName}</TableCell>
                    <TableCell>{order.pmName}</TableCell>
                    <TableCell>{order.region}</TableCell>
                    <TableCell>{new Date(order.requestDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityBadge(order.priority)}>
                        {order.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPaymentBadge(order.paymentStatus)}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{order.amount}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}