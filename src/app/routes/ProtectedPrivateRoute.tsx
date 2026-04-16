// import React from 'react'

// const ProtectedPrivateRoute = () => {



//  const { isAuthenticated, user, pendingAuth } = useAuth();
//   const [activeTab, setActiveTab] = useState<NavigationItem>('Dashboard');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);

//   const handleLoginSuccess = () => {
//     setShowOTP(true);
//   };

//   const handleOTPSuccess = () => {
//     setShowOTP(false);
//   };

//   const handleOTPBack = () => {
//     setShowOTP(false);
//   };

//   if (!isAuthenticated) {
//     if (showOTP && pendingAuth) {
//       return <OTPScreen onVerifySuccess={handleOTPSuccess} onBack={handleOTPBack} />;
//     }
//     return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
//   }







//   return (
//     <div>
      
//     </div>
//   )
// }

// export default ProtectedPrivateRoute













import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const ProtectedPrivateRoute = () => {
  const { isAuthenticated, pendingAuth } = useAuth();

  // 🔐 Not logged in → go to login
  if (!isAuthenticated && !pendingAuth) {
    return <Navigate to="/" replace />;
  }

  // 🔐 OTP step pending → go to OTP page
  if (!isAuthenticated && pendingAuth) {
    return <Navigate to="/otp" replace />;
  }

  // ✅ Logged in → allow access
  return <Outlet />;
};

export default ProtectedPrivateRoute;