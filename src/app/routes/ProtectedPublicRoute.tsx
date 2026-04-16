import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const ProtectedPublicRoute = () => {
  const { isAuthenticated, pendingAuth } = useAuth();
  const { pathname } = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (pendingAuth && pathname !== "/otp") {
    return <Navigate to="/otp" replace />;
  }

  return <Outlet />;
};

export default ProtectedPublicRoute;