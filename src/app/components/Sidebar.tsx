import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCog,
  ShoppingBag,
  BarChart3,
  Settings,
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export type NavigationItem =
  | 'Dashboard'
  | 'Leads'
  | 'Employees'
  | 'Accounts'
  | 'Products'
  | 'Reports'
  | 'Settings';

interface SidebarProps {
  activeTab: NavigationItem;
  onTabChange: (tab: NavigationItem) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { id: 'Dashboard' as NavigationItem, icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'Leads' as NavigationItem, icon: UserCircle, label: 'Leads' },
  { id: 'Employees' as NavigationItem, icon: Users, label: 'Employees' },
  { id: 'Accounts' as NavigationItem, icon: UserCog, label: 'Accounts / Users' },
  { id: 'Products' as NavigationItem, icon: ShoppingBag, label: 'Products & Services' },
  { id: 'Reports' as NavigationItem, icon: BarChart3, label: 'Reports' },
  { id: 'Settings' as NavigationItem, icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, collapsed, onToggleCollapse }) => {
  return (
    <div
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300`}
    >
      <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="text-lg text-sidebar-foreground">HT CRM</h2>
            <p className="text-xs text-muted-foreground">Hair Transplant</p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-sidebar-foreground" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
