
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Navbar } from "../components/Navbar";
import { NavigationItem, Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";


const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationItem>('Dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  // const userRole = user?.role || 'Front Desk';

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout