import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'Admin' | 'Manager' | 'Supervisor' | 'Front Desk';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  pendingAuth: { email: string; phone: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Hassan',
    email: 'admin@hairtransplant.com',
    phone: '+971501234567',
    role: 'Admin',
    active: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'manager@hairtransplant.com',
    phone: '+971507654321',
    role: 'Manager',
    active: true,
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'supervisor@hairtransplant.com',
    phone: '+971509876543',
    role: 'Supervisor',
    active: true,
    createdAt: '2024-02-15',
  },
  {
    id: '4',
    name: 'Emma Williams',
    email: 'frontdesk@hairtransplant.com',
    phone: '+971503456789',
    role: 'Front Desk',
    active: true,
    createdAt: '2024-03-01',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingAuth, setPendingAuth] = useState<{ email: string; phone: string } | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find((u) => u.email === email && u.active);
    if (foundUser && password === 'password123') {
      setPendingAuth({ email: foundUser.email, phone: foundUser.phone });
      return true;
    }
    return false;
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    // Mock OTP verification
    if (otp === '123456' && pendingAuth) {
      const foundUser = mockUsers.find((u) => u.email === pendingAuth.email);
      if (foundUser) {
        setUser(foundUser);
        setIsAuthenticated(true);
        setPendingAuth(null);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setPendingAuth(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, verifyOTP, logout, pendingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
