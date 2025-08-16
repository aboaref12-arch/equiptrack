import { useState } from "react";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Store, 
  Wrench, 
  FileText, 
  Users, 
  Settings,
  ChevronDown,
  Building2
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Purchase Orders", url: "/orders", icon: ShoppingCart },
  { title: "Stores", url: "/stores", icon: Store },
  { title: "Service Requests", url: "/service-requests", icon: Wrench },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Users", url: "/users", icon: Users },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-card" 
      : "hover:bg-accent hover:text-accent-foreground transition-smooth";

  return (
    <Sidebar
      className="border-r border-border transition-smooth"
      collapsible="icon"
    >
      <SidebarContent>
        {/* Logo/Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-foreground">PO Manager</h2>
                <p className="text-xs text-muted-foreground">Equipment & Services</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium px-4 py-2">
            {!isCollapsed && "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                        ${getNavClass({ isActive })}
                      `}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <div className="mt-auto p-2 border-t border-border">
          <SidebarMenuButton asChild className="h-11">
            <NavLink 
              to="/settings" 
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                ${getNavClass({ isActive })}
              `}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}