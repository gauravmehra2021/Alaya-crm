import React, { useState } from 'react';
import { Search, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from './AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState(3);

  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 pl-16 md:pl-6">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads, patients, appointments..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-sm text-foreground">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.role}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-border">
                <div className="text-sm text-foreground">{user?.email}</div>
                <div className="text-xs text-muted-foreground">{user?.phone}</div>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-destructive hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
