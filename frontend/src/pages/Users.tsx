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
  Users as UsersIcon,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Phone
} from "lucide-react";

// Mock users data
const usersData = [
  {
    id: "U-001",
    name: "أحمد محمد علي",
    email: "ahmed.mohammed@company.com",
    phone: "+966501234567",
    role: "Project Manager",
    accessLevel: "Manager",
    department: "Operations",
    status: "Active",
    lastLogin: "2024-01-15T10:30:00",
    ordersCreated: 15,
    region: "Riyadh"
  },
  {
    id: "U-002",
    name: "فاطمة أحمد حسن",
    email: "fatima.ahmed@company.com", 
    phone: "+966502345678",
    role: "Data Entry Operator",
    accessLevel: "Operator",
    department: "Administration",
    status: "Active",
    lastLogin: "2024-01-15T09:15:00",
    ordersCreated: 32,
    region: "Jeddah"
  },
  {
    id: "U-003",
    name: "محمد علي أحمد",
    email: "mohammed.ali@company.com",
    phone: "+966503456789",
    role: "Technician",
    accessLevel: "Technician",
    department: "Technical",
    status: "Active",
    lastLogin: "2024-01-14T16:45:00",
    ordersCreated: 8,
    region: "Dammam"
  },
  {
    id: "U-004",
    name: "سارة محمد يوسف",
    email: "sarah.mohammed@company.com",
    phone: "+966504567890",
    role: "Administrator",
    accessLevel: "Admin",
    department: "IT",
    status: "Active",
    lastLogin: "2024-01-15T11:20:00",
    ordersCreated: 5,
    region: "All"
  },
  {
    id: "U-005",
    name: "عبدالله أحمد محمد",
    email: "abdullah.ahmed@company.com",
    phone: "+966505678901",
    role: "Contractor",
    accessLevel: "Contractor",
    department: "External",
    status: "Inactive",
    lastLogin: "2024-01-10T14:30:00",
    ordersCreated: 0,
    region: "Mecca"
  }
];

const getRoleBadge = (role: string) => {
  const variants = {
    "Administrator": "default",
    "Project Manager": "secondary",
    "Data Entry Operator": "outline",
    "Technician": "outline",
    "Contractor": "secondary"
  } as const;
  
  return variants[role as keyof typeof variants] || "outline";
};

const getStatusBadge = (status: string) => {
  const variants = {
    "Active": "default",
    "Inactive": "destructive"
  } as const;
  
  return variants[status as keyof typeof variants] || "outline";
};

const getAccessIcon = (accessLevel: string) => {
  const icons = {
    "Admin": Shield,
    "Manager": UserCheck,
    "Operator": UsersIcon,
    "Technician": UsersIcon,
    "Contractor": UserX
  };
  
  return icons[accessLevel as keyof typeof icons] || UsersIcon;
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = [...new Set(usersData.map(user => user.role))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their access permissions</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <UsersIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{usersData.length}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <UserCheck className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {usersData.filter(u => u.status === "Active").length}
            </div>
            <p className="text-xs text-success">Currently active</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Administrators
            </CardTitle>
            <Shield className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {usersData.filter(u => u.accessLevel === "Admin").length}
            </div>
            <p className="text-xs text-muted-foreground">Admin access</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Departments
            </CardTitle>
            <UsersIcon className="h-5 w-5 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {new Set(usersData.map(u => u.department)).size}
            </div>
            <p className="text-xs text-muted-foreground">Different departments</p>
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
                placeholder="Search by name, email, role, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Role
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>User Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedRole("all")}>
                  All Roles
                </DropdownMenuItem>
                {uniqueRoles.map((role) => (
                  <DropdownMenuItem key={role} onClick={() => setSelectedRole(role)}>
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            Users List ({filteredUsers.length})
          </CardTitle>
          <CardDescription>
            Complete list of system users and their access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const AccessIcon = getAccessIcon(user.accessLevel);
                  return (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <UsersIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-xs flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </p>
                          <p className="text-xs flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadge(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <AccessIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{user.accessLevel}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{user.ordersCreated}</TableCell>
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
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Manage Permissions
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