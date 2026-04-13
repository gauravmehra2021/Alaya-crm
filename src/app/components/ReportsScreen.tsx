import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const monthlyRevenueData = [
  { month: 'Jan', revenue: 180000, target: 200000 },
  { month: 'Feb', revenue: 195000, target: 200000 },
  { month: 'Mar', revenue: 215000, target: 200000 },
  { month: 'Apr', revenue: 228000, target: 220000 },
  { month: 'May', revenue: 242000, target: 220000 },
  { month: 'Jun', revenue: 268000, target: 250000 },
];

const supervisorPerformanceData = [
  { name: 'Michael Chen', leads: 85, conversions: 24, conversionRate: 28.2 },
  { name: 'Sarah Johnson', leads: 78, conversions: 22, conversionRate: 28.2 },
  { name: 'Emma Williams', leads: 65, conversions: 15, conversionRate: 23.1 },
];

const packageBreakdownData = [
  { package: 'FUE Basic', sold: 45, revenue: 675000 },
  { package: 'FUE Premium', sold: 32, revenue: 800000 },
  { package: 'DHI', sold: 18, revenue: 540000 },
];

export const ReportsScreen: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-6-months');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-foreground mb-1">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive performance insights</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-6-months">Last 6 Months</option>
            <option value="this-year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="text-3xl text-foreground mb-1">AED 2.4M</div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
          <div className="text-sm text-accent mt-2">+15.3% vs last period</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="text-3xl text-foreground mb-1">342</div>
          <div className="text-sm text-muted-foreground">Total Conversions</div>
          <div className="text-sm text-accent mt-2">+8.2% vs last period</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-chart-3/10 rounded-lg">
              <Target className="w-6 h-6" style={{ color: 'var(--chart-3)' }} />
            </div>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="text-3xl text-foreground mb-1">26.6%</div>
          <div className="text-sm text-muted-foreground">Conversion Rate</div>
          <div className="text-sm text-accent mt-2">+2.1% vs last period</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-chart-4/10 rounded-lg">
              <Calendar className="w-6 h-6" style={{ color: 'var(--chart-4)' }} />
            </div>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="text-3xl text-foreground mb-1">AED 7,018</div>
          <div className="text-sm text-muted-foreground">Avg. Deal Size</div>
          <div className="text-sm text-accent mt-2">+4.5% vs last period</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-lg text-foreground mb-1">Revenue Performance</h2>
          <p className="text-sm text-muted-foreground">Monthly revenue vs targets</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Actual Revenue" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#E2E8F0" name="Target" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg text-foreground mb-1">Supervisor Performance</h2>
            <p className="text-sm text-muted-foreground">Lead conversion by supervisor</p>
          </div>
          <div className="space-y-4">
            {supervisorPerformanceData.map((supervisor, index) => (
              <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-foreground">{supervisor.name}</div>
                  <div className="text-sm text-accent">{supervisor.conversionRate}%</div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{supervisor.leads} leads</span>
                  <span>•</span>
                  <span>{supervisor.conversions} conversions</span>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${supervisor.conversionRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg text-foreground mb-1">Package Breakdown</h2>
            <p className="text-sm text-muted-foreground">Revenue by service package</p>
          </div>
          <div className="space-y-4">
            {packageBreakdownData.map((pkg, index) => (
              <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-foreground">{pkg.package}</div>
                  <div className="text-primary">AED {pkg.revenue.toLocaleString()}</div>
                </div>
                <div className="text-sm text-muted-foreground">{pkg.sold} procedures sold</div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: `${(pkg.revenue / 800000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
