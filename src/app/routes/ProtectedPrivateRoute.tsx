import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const ProtectedPrivateRoute = () => {
  const { isAuthenticated, pendingAuth } = useAuth();

  if (!isAuthenticated && pendingAuth) {
    return <Navigate to="/otp" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedPrivateRoute;
