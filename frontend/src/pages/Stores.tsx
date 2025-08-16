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
  MapPin,
  Store as StoreIcon,
  Mail,
  Phone
} from "lucide-react";

// Mock stores data
const storesData = [
  {
    id: "ST-001",
    brand: "Brand A",
    storeName: "Riyadh Mall Store",
    city: "Riyadh",
    location: "King Fahd Road, Riyadh",
    email: "riyadh.mall@brand-a.com",
    phone: "+966501234567",
    status: "Active",
    orders: 12,
    lastService: "2024-01-10"
  },
  {
    id: "ST-002", 
    brand: "Brand B",
    storeName: "Jeddah Center Store",
    city: "Jeddah",
    location: "Al Tahlia Street, Jeddah",
    email: "jeddah.center@brand-b.com",
    phone: "+966502345678",
    status: "Active",
    orders: 8,
    lastService: "2024-01-08"
  },
  {
    id: "ST-003",
    brand: "Brand A", 
    storeName: "Dammam Plaza Store",
    city: "Dammam",
    location: "Prince Mohammed Street, Dammam",
    email: "dammam.plaza@brand-a.com",
    phone: "+966503456789",
    status: "Maintenance",
    orders: 15,
    lastService: "2024-01-05"
  },
  {
    id: "ST-004",
    brand: "Brand C",
    storeName: "Mecca Gateway Store", 
    city: "Mecca",
    location: "Ibrahim Al Khalil Street, Mecca",
    email: "mecca.gateway@brand-c.com",
    phone: "+966504567890",
    status: "Active",
    orders: 6,
    lastService: "2024-01-12"
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    "Active": "default",
    "Maintenance": "secondary",
    "Inactive": "outline"
  } as const;
  
  return variants[status as keyof typeof variants] || "outline";
};

export default function Stores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const filteredStores = storesData.filter(store => {
    const matchesSearch = store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || store.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const uniqueBrands = [...new Set(storesData.map(store => store.brand))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stores Management</h1>
          <p className="text-muted-foreground">Manage store locations and information</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add Store
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Stores
            </CardTitle>
            <StoreIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{storesData.length}</div>
            <p className="text-xs text-success">Active locations</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Stores
            </CardTitle>
            <StoreIcon className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {storesData.filter(s => s.status === "Active").length}
            </div>
            <p className="text-xs text-success">Operational</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cities
            </CardTitle>
            <MapPin className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {new Set(storesData.map(s => s.city)).size}
            </div>
            <p className="text-xs text-muted-foreground">Different locations</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Brands
            </CardTitle>
            <StoreIcon className="h-5 w-5 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{uniqueBrands.length}</div>
            <p className="text-xs text-muted-foreground">Different brands</p>
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
                placeholder="Search by store name, city, or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Brand
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Brand</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedBrand("all")}>
                  All Brands
                </DropdownMenuItem>
                {uniqueBrands.map((brand) => (
                  <DropdownMenuItem key={brand} onClick={() => setSelectedBrand(brand)}>
                    {brand}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Stores Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StoreIcon className="h-5 w-5" />
            Stores List ({filteredStores.length})
          </CardTitle>
          <CardDescription>
            Complete list of store locations and their information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store ID</TableHead>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Last Service</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.map((store) => (
                  <TableRow key={store.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{store.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{store.storeName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {store.location}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{store.brand}</TableCell>
                    <TableCell>{store.city}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-xs flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {store.email}
                        </p>
                        <p className="text-xs flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {store.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(store.status)}>
                        {store.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{store.orders}</TableCell>
                    <TableCell>{new Date(store.lastService).toLocaleDateString()}</TableCell>
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
                            Edit Store
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MapPin className="mr-2 h-4 w-4" />
                            View on Map
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