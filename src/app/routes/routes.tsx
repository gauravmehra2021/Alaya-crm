import { Routes, Route, Outlet } from "react-router-dom";
import { DashboardScreen } from "../components/DashboardScreen";
import { LeadsScreen } from "../components/LeadsScreen";
import { EmployeesScreen } from "../components/EmployeesScreen";
import { AccountsScreen } from "../components/AccountsScreen";
import { ProductsScreen } from "../components/ProductsScreen";
import { ReportsScreen } from "../components/ReportsScreen";
import { SettingsScreen } from "../components/SettingsScreen";
import MainLayout from "../layout/MainLayout";
import ProtectedPublicRoute from "./ProtectedPublicRoute";
import ProtectedPrivateRoute from "./ProtectedPrivateRoute";
import { LoginScreen } from "../components/LoginScreen";
import { OTPScreen } from "../components/OTPScreen";
import { NotFoundScreen } from "../components/NotFoundScreen";
import { useAuth } from "../components/AuthContext";



export const AppRoutes = () => {
    const { user } = useAuth();
   const userRole = user?.role || 'Front Desk';
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<ProtectedPublicRoute />}>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/otp" element={<OTPScreen />} />
      </Route>

      {/* Private Routes with Layout */}
      <Route element={<ProtectedPrivateRoute />}>
        <Route element={<MainLayout />}>
          
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/leads" element={<LeadsScreen userRole={userRole} />} />
          <Route path="/employees" element={<EmployeesScreen userRole={userRole} />} />
          <Route path="/accounts" element={<AccountsScreen  userRole={userRole}/>} />
          <Route path="/products" element={<ProductsScreen userRole={userRole} />} />
          <Route path="/reports" element={<ReportsScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />

        </Route>
      </Route>

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};