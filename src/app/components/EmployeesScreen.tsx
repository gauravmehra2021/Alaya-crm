import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import { User, UserRole } from './AuthContext';

const mockEmployees: User[] = [
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
  {
    id: '5',
    name: 'John Doe',
    email: 'john@hairtransplant.com',
    phone: '+971505555555',
    role: 'Supervisor',
    active: false,
    createdAt: '2024-01-20',
  },
];

const roleColors = {
  Admin: 'bg-purple-100 text-purple-700 border-purple-200',
  Manager: 'bg-blue-100 text-blue-700 border-blue-200',
  Supervisor: 'bg-green-100 text-green-700 border-green-200',
  'Front Desk': 'bg-orange-100 text-orange-700 border-orange-200',
};

interface EmployeesScreenProps {
  userRole: string;
}

export const EmployeesScreen: React.FC<EmployeesScreenProps> = ({ userRole }) => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'All' || emp.role === filterRole;
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Active' && emp.active) ||
      (filterStatus === 'Inactive' && !emp.active);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleEmployeeStatus = (id: string) => {
    setEmployees(
      employees.map((emp) => (emp.id === id ? { ...emp, active: !emp.active } : emp))
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl text-foreground mb-1">Employees</h1>
          <p className="text-sm text-muted-foreground">Manage your clinic staff</p>
        </div>
        {userRole === 'Admin' && (
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Employee</span>
          </button>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-3 mb-4 md:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Front Desk">Front Desk</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-background border border-border rounded-xl p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">
                    {employee.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                {employee.active ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full border border-red-200">
                    Inactive
                  </span>
                )}
              </div>
              <div className="mb-4">
                <h3 className="text-foreground mb-1">{employee.name}</h3>
                <span className={`inline-block px-3 py-1 text-xs rounded-full border ${roleColors[employee.role]}`}>
                  {employee.role}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-muted-foreground">{employee.email}</div>
                <div className="text-sm text-muted-foreground">{employee.phone}</div>
                <div className="text-sm text-muted-foreground">Joined: {employee.createdAt}</div>
              </div>
              {userRole === 'Admin' && (
                <div className="flex gap-2 pt-4 border-t border-border">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleEmployeeStatus(employee.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      employee.active
                        ? 'border border-destructive text-destructive hover:bg-destructive/10'
                        : 'border border-accent text-accent hover:bg-accent/10'
                    }`}
                  >
                    {employee.active ? (
                      <>
                        <UserX className="w-4 h-4" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4" />
                        Activate
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No employees found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};
