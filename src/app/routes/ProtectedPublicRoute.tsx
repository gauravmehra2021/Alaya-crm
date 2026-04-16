import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const ProtectedPublicRoute = () => {
  const { isAuthenticated, pendingAuth } = useAuth();
  console.log(pendingAuth,"pendigaufh")
  // ✅ Already fully logged in → go to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // 🔐 OTP step pending → force OTP page
  if (!isAuthenticated && pendingAuth) {
    debugger
    return <Navigate to="/otp" replace />;
  }

  // ✅ Not logged in → allow access to public pages (login)
  return <Outlet />;
};

export default ProtectedPublicRoute;