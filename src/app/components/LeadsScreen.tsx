import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  User,
  X,
} from 'lucide-react';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: 'Website' | 'Walk-in' | 'Social Media';
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';
  assignedTo: string;
  createdAt: string;
  notes: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Ahmed Al Mansoori',
    phone: '+971501234567',
    email: 'ahmed@email.com',
    source: 'Website',
    status: 'New',
    assignedTo: 'Michael Chen',
    createdAt: '2026-04-13',
    notes: 'Interested in FUE procedure',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+971507654321',
    email: 'sarah@email.com',
    source: 'Walk-in',
    status: 'Contacted',
    assignedTo: 'Michael Chen',
    createdAt: '2026-04-12',
    notes: 'Follow-up scheduled for next week',
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    phone: '+971509876543',
    email: 'mohammed@email.com',
    source: 'Social Media',
    status: 'Qualified',
    assignedTo: 'Sarah Johnson',
    createdAt: '2026-04-11',
    notes: 'Ready for consultation',
  },
  {
    id: '4',
    name: 'Emily Chen',
    phone: '+971503456789',
    email: 'emily@email.com',
    source: 'Website',
    status: 'Converted',
    assignedTo: 'Michael Chen',
    createdAt: '2026-04-10',
    notes: 'Booked procedure for next month',
  },
  {
    id: '5',
    name: 'Khalid Hassan',
    phone: '+971502345678',
    email: 'khalid@email.com',
    source: 'Social Media',
    status: 'New',
    assignedTo: 'Sarah Johnson',
    createdAt: '2026-04-13',
    notes: 'Requesting quote',
  },
];

const statusColors = {
  New: 'bg-blue-100 text-blue-700 border-blue-200',
  Contacted: 'bg-purple-100 text-purple-700 border-purple-200',
  Qualified: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Converted: 'bg-green-100 text-green-700 border-green-200',
  Lost: 'bg-red-100 text-red-700 border-red-200',
};

const sourceColors = {
  Website: 'bg-blue-50 text-blue-700',
  'Walk-in': 'bg-green-50 text-green-700',
  'Social Media': 'bg-orange-50 text-orange-700',
};

interface LeadsScreenProps {
  userRole: string;
}

export const LeadsScreen: React.FC<LeadsScreenProps> = ({ userRole }) => {
  const [leads, setLeads] = useState(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterSource, setFilterSource] = useState<string>('All');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSource = filterSource === 'All' || lead.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailModal(true);
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter((l) => l.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-foreground mb-1">Leads Management</h1>
          <p className="text-muted-foreground">Track and manage all your leads</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
            <Upload className="w-4 h-4" />
            Import Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Sources</option>
            <option value="Website">Website</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Social Media">Social Media</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Contact</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Source</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Assigned To</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Created</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="text-foreground">{lead.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-foreground">{lead.phone}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${sourceColors[lead.source]}`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-foreground">{lead.assignedTo}</td>
                  <td className="py-4 px-4 text-muted-foreground">{lead.createdAt}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewLead(lead)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      {userRole === 'Admin' && (
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No leads found matching your criteria
          </div>
        )}
      </div>

      {showDetailModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl text-foreground">Lead Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <div className="text-foreground mt-1">{selectedLead.name}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <select
                    value={selectedLead.status}
                    className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg"
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Converted</option>
                    <option>Lost</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <div className="text-foreground mt-1">{selectedLead.phone}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <div className="text-foreground mt-1">{selectedLead.email}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Source</label>
                  <div className="text-foreground mt-1">{selectedLead.source}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Assigned To</label>
                  <select
                    value={selectedLead.assignedTo}
                    className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg"
                  >
                    <option>Michael Chen</option>
                    <option>Sarah Johnson</option>
                    <option>Emma Williams</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Notes</label>
                <textarea
                  value={selectedLead.notes}
                  className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg h-24"
                />
              </div>
              <div>
                <h3 className="text-foreground mb-3">Activity Timeline</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-foreground">Lead created</div>
                      <div className="text-sm text-muted-foreground">{selectedLead.createdAt}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4 border-t border-border">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
