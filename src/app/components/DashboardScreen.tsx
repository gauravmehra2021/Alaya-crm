import React from 'react';
import {
  Users,
  UserCheck,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Globe,
  UserPlus,
  Share2,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const kpiData = [
  {
    title: 'Total Leads',
    value: '1,284',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'primary',
  },
  {
    title: 'Converted Clients',
    value: '342',
    change: '+8.2%',
    trend: 'up',
    icon: UserCheck,
    color: 'accent',
  },
  {
    title: 'Pending Leads',
    value: '156',
    change: '-3.1%',
    trend: 'down',
    icon: Clock,
    color: 'chart-4',
  },
  {
    title: 'Revenue (AED)',
    value: '2.4M',
    change: '+15.3%',
    trend: 'up',
    icon: DollarSign,
    color: 'chart-3',
  },
];

const leadSourceData = [
  { name: 'Website', value: 485, color: '#3B82F6' },
  { name: 'Walk-in', value: 312, color: '#10B981' },
  { name: 'Social Media', value: 487, color: '#F59E0B' },
];

const monthlyConversionsData = [
  { month: 'Jan', conversions: 28, leads: 95 },
  { month: 'Feb', conversions: 32, leads: 102 },
  { month: 'Mar', conversions: 38, leads: 118 },
  { month: 'Apr', conversions: 42, leads: 125 },
  { month: 'May', conversions: 45, leads: 132 },
  { month: 'Jun', conversions: 48, leads: 140 },
];

const recentActivity = [
  { id: 1, action: 'New lead assigned', user: 'Sarah Johnson', time: '5 min ago', type: 'lead' },
  { id: 2, action: 'Appointment scheduled', user: 'Michael Chen', time: '12 min ago', type: 'appointment' },
  { id: 3, action: 'Lead converted to client', user: 'Emma Williams', time: '1 hour ago', type: 'conversion' },
  { id: 4, action: 'Follow-up reminder set', user: 'Sarah Johnson', time: '2 hours ago', type: 'reminder' },
  { id: 5, action: 'New consultation booked', user: 'Front Desk', time: '3 hours ago', type: 'appointment' },
];

export const DashboardScreen: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl text-foreground mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your clinic performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor = kpi.trend === 'up' ? 'text-accent' : 'text-destructive';

          return (
            <div key={kpi.title} className="bg-card border border-border rounded-xl p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-${kpi.color}/10 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${kpi.color}`} style={{ color: `var(--${kpi.color})` }} />
                </div>
                <div className={`flex items-center gap-1 ${trendColor}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm">{kpi.change}</span>
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl text-foreground mb-1">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h2 className="text-lg text-foreground mb-1">Lead Sources</h2>
            <p className="text-sm text-muted-foreground">Distribution of lead channels</p>
          </div>
          <div className="h-56 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 pt-4 border-t border-border">
            {leadSourceData.map((source) => (
              <div key={source.name} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm text-muted-foreground">{source.name}</span>
                </div>
                <div className="text-xl text-foreground">{source.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <h2 className="text-lg text-foreground mb-1">Monthly Conversions</h2>
            <p className="text-sm text-muted-foreground">Leads vs conversions trend</p>
          </div>
          <div className="h-56 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyConversionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} name="Total Leads" />
                <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} name="Conversions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg text-foreground mb-1">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">Latest updates and actions</p>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start md:items-center gap-3 md:gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                {activity.type === 'lead' && <UserPlus className="w-5 h-5 text-primary" />}
                {activity.type === 'appointment' && <Clock className="w-5 h-5 text-primary" />}
                {activity.type === 'conversion' && <UserCheck className="w-5 h-5 text-accent" />}
                {activity.type === 'reminder' && <Clock className="w-5 h-5 text-chart-3" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground text-sm md:text-base">{activity.action}</div>
                <div className="text-xs md:text-sm text-muted-foreground">by {activity.user}</div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
