import React, { useState } from 'react';
import { Plus, Search, Edit, Shield, X } from 'lucide-react';
import { User } from './AuthContext';

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

interface AccountsScreenProps {
  userRole: string;
}

export const AccountsScreen: React.FC<AccountsScreenProps> = ({ userRole }) => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Front Desk' as User['role'],
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      alert('Please fill in all fields');
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers([...users, user]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', phone: '', role: 'Front Desk' });
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
  };

  if (userRole !== 'Admin') {
    return (
      <div className="p-6">
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl text-foreground mb-2">Access Restricted</h2>
          <p className="text-muted-foreground">Only Admins can access user account management</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-foreground mb-1">Accounts & Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Account
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Phone</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Created</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">
                          {user.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-foreground">{user.email}</td>
                  <td className="py-4 px-4 text-foreground">{user.phone}</td>
                  <td className="py-4 px-4">
                    <select
                      value={user.role}
                      onChange={(e) => {
                        const newRole = e.target.value as User['role'];
                        setUsers(users.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)));
                      }}
                      className="px-3 py-1 bg-background border border-border rounded-lg text-sm"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Front Desk">Front Desk</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded-full text-xs border ${
                        user.active
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-red-100 text-red-700 border-red-200'
                      }`}
                    >
                      {user.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{user.createdAt}</td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Edit">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl text-foreground">Create New Account</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="user@hairtransplant.com"
                />
                <p className="text-xs text-muted-foreground mt-1">OTP will be sent to this email</p>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+971501234567"
                />
                <p className="text-xs text-muted-foreground mt-1">OTP will be sent to this number</p>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Front Desk">Front Desk</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
