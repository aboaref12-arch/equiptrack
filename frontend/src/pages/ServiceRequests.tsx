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
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

// Mock service requests data
const serviceRequestsData = [
  {
    id: "SR-2024-001",
    storeId: "ST-001",
    storeName: "Riyadh Mall Store",
    linkedOrderId: "PO-2024-001",
    invoiceNo: "INV-2024-001",
    date: "2024-01-15",
    status: "Open",
    priority: "High",
    type: "AC Maintenance",
    technician: "أحمد علي",
    notes: "AC unit making unusual noise, needs inspection",
    requestedBy: "Store Manager",
    estimatedCost: "$850"
  },
  {
    id: "SR-2024-002",
    storeId: "ST-002",
    storeName: "Jeddah Center Store",
    linkedOrderId: null,
    invoiceNo: "INV-2024-002", 
    date: "2024-01-14",
    status: "In Progress",
    priority: "Medium",
    type: "Compressor Service",
    technician: "محمد حسن",
    notes: "Regular maintenance for compressor unit",
    requestedBy: "Operations Team",
    estimatedCost: "$450"
  },
  {
    id: "SR-2024-003",
    storeId: "ST-003",
    storeName: "Dammam Plaza Store",
    linkedOrderId: "PO-2024-003",
    invoiceNo: "INV-2024-003",
    date: "2024-01-13",
    status: "Completed",
    priority: "Low",
    type: "Electrical Check",
    technician: "سارة أحمد",
    notes: "Completed electrical safety inspection",
    requestedBy: "Safety Team",
    estimatedCost: "$200"
  },
  {
    id: "SR-2024-004", 
    storeId: "ST-004",
    storeName: "Mecca Gateway Store",
    linkedOrderId: null,
    invoiceNo: "INV-2024-004",
    date: "2024-01-12",
    status: "Delayed",
    priority: "High",
    type: "Emergency Repair",
    technician: "فاطمة محمد",
    notes: "Urgent AC repair needed - store getting too hot",
    requestedBy: "Store Manager",
    estimatedCost: "$1,200"
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    "Open": "outline",
    "In Progress": "secondary",
    "Completed": "default",
    "Delayed": "destructive"
  } as const;
  
  return variants[status as keyof typeof variants] || "outline";
};

const getStatusIcon = (status: string) => {
  const icons = {
    "Open": Clock,
    "In Progress": AlertTriangle,
    "Completed": CheckCircle,
    "Delayed": AlertTriangle
  };
  
  return icons[status as keyof typeof icons] || Clock;
};

const getPriorityBadge = (priority: string) => {
  const variants = {
    "High": "destructive",
    "Medium": "secondary",
    "Low": "outline"
  } as const;
  
  return variants[priority as keyof typeof variants] || "outline";
};

export default function ServiceRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredRequests = serviceRequestsData.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.technician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || request.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Service Requests</h1>
          <p className="text-muted-foreground">Manage maintenance and service requests</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          New Service Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Requests
            </CardTitle>
            <Wrench className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{serviceRequestsData.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Requests
            </CardTitle>
            <Clock className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {serviceRequestsData.filter(r => r.status === "Open").length}
            </div>
            <p className="text-xs text-warning">Awaiting action</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-secondary-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {serviceRequestsData.filter(r => r.status === "In Progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {serviceRequestsData.filter(r => r.status === "Completed").length}
            </div>
            <p className="text-xs text-success">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by request ID, store, type, or technician..."
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
                <DropdownMenuLabel>Request Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                  All Requests
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("Open")}>
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("In Progress")}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("Completed")}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("Delayed")}>
                  Delayed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Service Requests Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Service Requests List ({filteredRequests.length})
          </CardTitle>
          <CardDescription>
            Complete list of service requests and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Linked PO</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <TableRow key={request.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.storeName}</p>
                          <p className="text-xs text-muted-foreground">{request.storeId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{request.technician}</TableCell>
                      <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(request.status)} className="flex items-center gap-1 w-fit">
                          <StatusIcon className="h-3 w-3" />
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityBadge(request.priority)}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{request.estimatedCost}</TableCell>
                      <TableCell>
                        {request.linkedOrderId ? (
                          <Badge variant="outline" className="text-xs">
                            {request.linkedOrderId}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">No PO</span>
                        )}
                      </TableCell>
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
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Wrench className="mr-2 h-4 w-4" />
                              Assign Technician
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}