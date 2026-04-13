import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { OTPScreen } from './components/OTPScreen';
import { Sidebar, NavigationItem } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardScreen } from './components/DashboardScreen';
import { LeadsScreen } from './components/LeadsScreen';
import { EmployeesScreen } from './components/EmployeesScreen';
import { AccountsScreen } from './components/AccountsScreen';
import { ProductsScreen } from './components/ProductsScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { SettingsScreen } from './components/SettingsScreen';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, pendingAuth } = useAuth();
  const [activeTab, setActiveTab] = useState<NavigationItem>('Dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const handleLoginSuccess = () => {
    setShowOTP(true);
  };

  const handleOTPSuccess = () => {
    setShowOTP(false);
  };

  const handleOTPBack = () => {
    setShowOTP(false);
  };

  if (!isAuthenticated) {
    if (showOTP && pendingAuth) {
      return <OTPScreen onVerifySuccess={handleOTPSuccess} onBack={handleOTPBack} />;
    }
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const renderScreen = () => {
    const userRole = user?.role || 'Front Desk';

    switch (activeTab) {
      case 'Dashboard':
        return <DashboardScreen />;
      case 'Leads':
        return <LeadsScreen userRole={userRole} />;
      case 'Employees':
        return <EmployeesScreen userRole={userRole} />;
      case 'Accounts':
        return <AccountsScreen userRole={userRole} />;
      case 'Products':
        return <ProductsScreen userRole={userRole} />;
      case 'Reports':
        return <ReportsScreen />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

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
          <main className="flex-1 overflow-auto">{renderScreen()}</main>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}