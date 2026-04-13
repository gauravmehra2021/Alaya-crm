import React, { useState } from 'react';
import { Bell, Mail, Shield, Users, Database, Globe } from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [leadAssignment, setLeadAssignment] = useState(true);
  const [autoReminders, setAutoReminders] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl text-foreground mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your CRM preferences and configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg text-foreground">Notifications</h2>
                <p className="text-sm text-muted-foreground">Manage how you receive updates</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-foreground">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates via email</div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    emailNotifications ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      emailNotifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-foreground">SMS Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive text message alerts</div>
                </div>
                <button
                  onClick={() => setSmsNotifications(!smsNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    smsNotifications ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      smsNotifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-foreground">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Browser push notifications</div>
                </div>
                <button className="relative w-12 h-6 rounded-full bg-primary">
                  <div className="absolute top-1 w-4 h-4 bg-white rounded-full translate-x-7" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg text-foreground">Lead Management</h2>
                <p className="text-sm text-muted-foreground">Configure lead workflow</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-foreground">Auto Lead Assignment</div>
                  <div className="text-sm text-muted-foreground">Automatically assign new leads to supervisors</div>
                </div>
                <button
                  onClick={() => setLeadAssignment(!leadAssignment)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    leadAssignment ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      leadAssignment ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-foreground">Follow-up Reminders</div>
                  <div className="text-sm text-muted-foreground">Send automatic follow-up reminders</div>
                </div>
                <button
                  onClick={() => setAutoReminders(!autoReminders)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    autoReminders ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      autoReminders ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="py-3">
                <label className="block text-foreground mb-2">Default Follow-up Days</label>
                <input
                  type="number"
                  defaultValue={3}
                  className="w-32 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-chart-3/10 rounded-lg">
                <Database className="w-5 h-5" style={{ color: 'var(--chart-3)' }} />
              </div>
              <div>
                <h2 className="text-lg text-foreground">Data & Integration</h2>
                <p className="text-sm text-muted-foreground">Connect external services</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-foreground">WordPress Website</div>
                      <div className="text-sm text-muted-foreground">Lead form integration</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">
                    Connected
                  </span>
                </div>
              </div>

              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-foreground">Email Service</div>
                      <div className="text-sm text-muted-foreground">SMTP configuration</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-chart-4/10 rounded-lg">
                <Shield className="w-5 h-5" style={{ color: 'var(--chart-4)' }} />
              </div>
              <div>
                <h2 className="text-lg text-foreground">Security</h2>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <div className="text-foreground">Change Password</div>
                <div className="text-sm text-muted-foreground">Update your login password</div>
              </button>

              <button className="w-full px-4 py-3 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <div className="text-foreground">Two-Factor Auth</div>
                <div className="text-sm text-muted-foreground">Manage OTP settings</div>
              </button>

              <button className="w-full px-4 py-3 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <div className="text-foreground">Active Sessions</div>
                <div className="text-sm text-muted-foreground">View logged-in devices</div>
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg text-foreground mb-4">System Info</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Version</span>
                <span className="text-foreground">2.1.5</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Last Backup</span>
                <span className="text-foreground">2 hours ago</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Storage Used</span>
                <span className="text-foreground">2.8 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
