'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Users, CreditCard, Flag, ToggleLeft, BarChart3, Shield,
  Search, MoreHorizontal, Ban, CheckCircle2,
} from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Alex Rivera', email: 'alex@example.com', plan: 'premium', status: 'active', searches: 450, joined: 'Dec 2024' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', plan: 'pro', status: 'active', searches: 210, joined: 'Nov 2024' },
  { id: '3', name: 'Marcus Johnson', email: 'marcus@example.com', plan: 'pro', status: 'active', searches: 180, joined: 'Oct 2024' },
  { id: '4', name: 'Priya Patel', email: 'priya@example.com', plan: 'free', status: 'active', searches: 22, joined: 'Jan 2025' },
  { id: '5', name: 'James Wilson', email: 'james@example.com', plan: 'premium', status: 'suspended', searches: 0, joined: 'Sep 2024' },
  { id: '6', name: 'Emily Brown', email: 'emily@example.com', plan: 'free', status: 'active', searches: 4, joined: 'Jan 2025' },
  { id: '7', name: 'David Kim', email: 'david@example.com', plan: 'pro', status: 'active', searches: 320, joined: 'Aug 2024' },
  { id: '8', name: 'Lisa Taylor', email: 'lisa@example.com', plan: 'free', status: 'inactive', searches: 0, joined: 'Jul 2024' },
];

const mockPayments = [
  { id: 'PAY-001', user: 'Alex Rivera', amount: '$30.00', plan: 'Premium', method: 'Visa ****4242', date: 'Jan 1, 2025', status: 'success' },
  { id: 'PAY-002', user: 'Sarah Chen', amount: '$10.00', plan: 'Pro', method: 'Mastercard ****8888', date: 'Jan 1, 2025', status: 'success' },
  { id: 'PAY-003', user: 'Marcus Johnson', amount: '$10.00', plan: 'Pro', method: 'Mobile Money', date: 'Dec 28, 2024', status: 'success' },
  { id: 'PAY-004', user: 'David Kim', amount: '$10.00', plan: 'Pro', method: 'Visa ****1234', date: 'Dec 25, 2024', status: 'failed' },
  { id: 'PAY-005', user: 'Alex Rivera', amount: '$30.00', plan: 'Premium', method: 'Visa ****4242', date: 'Dec 1, 2024', status: 'success' },
];

const featureFlags = [
  { name: 'Advanced AI Analysis', enabled: true, description: 'Enable AI-powered video analysis features' },
  { name: 'Bulk Channel Import', enabled: true, description: 'Allow bulk import of channels for analysis' },
  { name: 'Real-time Trending', enabled: false, description: 'Real-time trending video notifications' },
  { name: 'Export to PDF', enabled: true, description: 'PDF export for reports and analytics' },
  { name: 'API v2 Access', enabled: false, description: 'New API version for external integrations' },
  { name: 'Dark Mode Default', enabled: true, description: 'Set dark mode as default theme' },
];

const quotaData = [
  { plan: 'Free', dailySearches: 5, exports: 5, channels: 3 },
  { plan: 'Pro', dailySearches: 100, exports: 50, channels: 25 },
  { plan: 'Premium', dailySearches: 999, exports: 200, channels: 100 },
];

const systemStats = [
  { label: 'Total Users', value: '15,247', change: '+342 this week' },
  { label: 'Active Subscriptions', value: '3,891', change: '+128 this month' },
  { label: 'Revenue (MTD)', value: '$47,630', change: '+12.4%' },
  { label: 'API Calls Today', value: '284,912', change: 'Healthy' },
  { label: 'Avg Response Time', value: '142ms', change: '-15ms' },
  { label: 'Uptime', value: '99.97%', change: 'Last 30 days' },
];

export default function AdminPage() {
  const [userSearch, setUserSearch] = useState('');

  return (
    <div className="space-y-6">
      {/* System Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {systemStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-3">
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold mt-1">{stat.value}</p>
              <p className="text-[10px] text-yt-success">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="users">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="users" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <Users className="h-3 w-3" /> Users
          </TabsTrigger>
          <TabsTrigger value="payments" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <CreditCard className="h-3 w-3" /> Payments
          </TabsTrigger>
          <TabsTrigger value="features" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <Flag className="h-3 w-3" /> Feature Flags
          </TabsTrigger>
          <TabsTrigger value="quotas" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <ToggleLeft className="h-3 w-3" /> Quotas
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <BarChart3 className="h-3 w-3" /> Analytics
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <CardTitle className="text-base">User Management</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Search users..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} className="pl-8 h-8 text-xs w-64" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium text-muted-foreground">User</th>
                      <th className="text-center py-2 font-medium text-muted-foreground hidden sm:table-cell">Plan</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-2 font-medium text-muted-foreground hidden md:table-cell">Searches</th>
                      <th className="text-right py-2 font-medium text-muted-foreground hidden md:table-cell">Joined</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.filter((u) => !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())).map((user) => (
                      <tr key={user.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="py-2.5">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-2.5 text-center hidden sm:table-cell">
                          <Badge variant="outline" className={user.plan === 'premium' ? 'text-yellow-500 border-yellow-500/30' : user.plan === 'pro' ? 'text-yt-red border-yt-red/30' : ''}>
                            {user.plan}
                          </Badge>
                        </td>
                        <td className="py-2.5 text-center">
                          <Badge variant="outline" className={user.status === 'active' ? 'text-yt-success border-yt-success/30' : user.status === 'suspended' ? 'text-red-500 border-red-500/30' : 'text-muted-foreground'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-2.5 text-right hidden md:table-cell">{user.searches}</td>
                        <td className="py-2.5 text-right hidden md:table-cell text-muted-foreground">{user.joined}</td>
                        <td className="py-2.5 text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Payment Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-2 font-medium text-muted-foreground">User</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-2 font-medium text-muted-foreground hidden sm:table-cell">Method</th>
                      <th className="text-left py-2 font-medium text-muted-foreground hidden md:table-cell">Date</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPayments.map((p) => (
                      <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="py-2.5 font-mono text-xs">{p.id}</td>
                        <td className="py-2.5">{p.user}</td>
                        <td className="py-2.5 text-right font-medium">{p.amount}</td>
                        <td className="py-2.5 text-muted-foreground hidden sm:table-cell">{p.method}</td>
                        <td className="py-2.5 text-muted-foreground hidden md:table-cell">{p.date}</td>
                        <td className="py-2.5 text-center">
                          <Badge variant="outline" className={p.status === 'success' ? 'text-yt-success border-yt-success/30' : 'text-red-500 border-red-500/30'}>
                            {p.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feature Flags Tab */}
        <TabsContent value="features" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Feature Flags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {featureFlags.map((flag) => (
                  <div key={flag.name} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{flag.name}</p>
                      <p className="text-xs text-muted-foreground">{flag.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={flag.enabled ? 'text-yt-success border-yt-success/30' : 'text-muted-foreground'}>
                        {flag.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                      <Switch checked={flag.enabled} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quotas Tab */}
        <TabsContent value="quotas" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quota Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium text-muted-foreground">Plan</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Daily Searches</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Monthly Exports</th>
                      <th className="text-center py-2 font-medium text-muted-foreground">Max Channels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotaData.map((q) => (
                      <tr key={q.plan} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 font-medium">{q.plan}</td>
                        <td className="py-2.5 text-center">{q.dailySearches}</td>
                        <td className="py-2.5 text-center">{q.exports}</td>
                        <td className="py-2.5 text-center">{q.channels}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Plan Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { plan: 'Free', count: 11356, pct: 74.5 },
                  { plan: 'Pro', count: 2780, pct: 18.2 },
                  { plan: 'Premium', count: 1111, pct: 7.3 },
                ].map((p) => (
                  <div key={p.plan}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{p.plan}</span>
                      <span className="text-sm font-medium">{p.count.toLocaleString()} ({p.pct}%)</span>
                    </div>
                    <Progress value={p.pct} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'API Server', status: 'Operational', ok: true },
                  { label: 'Database', status: 'Operational', ok: true },
                  { label: 'Cache Layer', status: 'Operational', ok: true },
                  { label: 'Email Service', status: 'Operational', ok: true },
                  { label: 'Payment Gateway', status: 'Operational', ok: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-sm">{s.label}</span>
                    <Badge variant="outline" className={s.ok ? 'text-yt-success border-yt-success/30' : 'text-red-500 border-red-500/30'}>
                      <CheckCircle2 className="h-3 w-3 mr-1" /> {s.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
