'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import {
  Eye, Users, Heart, Upload, TrendingUp, DollarSign, ArrowUpRight,
  ArrowDownRight, Play, Clock, AlertTriangle, FileText, Zap, Tv, Search,
} from 'lucide-react';

const stats = [
  { label: 'Total Views', value: '12.4M', change: '+12.3%', up: true, icon: Eye, color: 'text-blue-500' },
  { label: 'Subscribers', value: '845K', change: '+5.2%', up: true, icon: Users, color: 'text-yt-red' },
  { label: 'Engagement Rate', value: '4.8%', change: '+0.3%', up: true, icon: Heart, color: 'text-pink-500' },
  { label: 'Upload Freq', value: '3.2/wk', change: '+0.2', up: true, icon: Upload, color: 'text-green-500' },
  { label: 'Growth Rate', value: '+15.4%', change: '+2.1%', up: true, icon: TrendingUp, color: 'text-purple-500' },
  { label: 'Est. Revenue', value: '$4,200', change: '+8.7%', up: true, icon: DollarSign, color: 'text-yellow-500' },
];

const subGrowthData = [
  { month: 'Jul', subs: 680 },
  { month: 'Aug', subs: 710 },
  { month: 'Sep', subs: 735 },
  { month: 'Oct', subs: 770 },
  { month: 'Nov', subs: 810 },
  { month: 'Dec', subs: 845 },
];

const viewsData = [
  { month: 'Jul', views: 1800000 },
  { month: 'Aug', views: 2100000 },
  { month: 'Sep', views: 1950000 },
  { month: 'Oct', views: 2300000 },
  { month: 'Nov', views: 2400000 },
  { month: 'Dec', views: 1850000 },
];

const viralVideos = [
  { title: 'How I Gained 100K Subscribers in 6 Months', views: '2.4M', eng: '6.2%', channel: 'TechVision Pro', time: '2 days ago' },
  { title: 'The Ultimate YouTube SEO Guide 2024', views: '1.8M', eng: '5.8%', channel: 'GrowthMasters', time: '5 days ago' },
  { title: '10 Thumbnail Mistakes Killing Your Views', views: '1.2M', eng: '7.1%', channel: 'CreatorLab', time: '1 week ago' },
  { title: 'YouTube Algorithm Secrets Revealed', views: '980K', eng: '5.4%', channel: 'TechVision Pro', time: '1 week ago' },
  { title: 'How to Go Viral on YouTube in 2024', views: '870K', eng: '4.9%', channel: 'GrowthMasters', time: '2 weeks ago' },
];

const topChannels = [
  { name: 'TechVision Pro', subs: '2.1M', videos: 342, avgViews: '450K', score: 92 },
  { name: 'GrowthMasters', subs: '1.5M', videos: 218, avgViews: '380K', score: 88 },
  { name: 'CreatorLab', subs: '980K', videos: 156, avgViews: '290K', score: 85 },
  { name: 'Viral Academy', subs: '750K', videos: 98, avgViews: '220K', score: 81 },
  { name: 'Niche Domination', subs: '520K', videos: 67, avgViews: '180K', score: 78 },
];

const audienceData = [
  { name: '18-24', value: 35 },
  { name: '25-34', value: 30 },
  { name: '35-44', value: 20 },
  { name: '45-54', value: 10 },
  { name: '55+', value: 5 },
];

const COLORS = ['#FF0000', '#e94560', '#00b0ff', '#ffab00', '#00c853'];

const alerts = [
  { type: 'success', msg: 'Your channel reached 845K subscribers!', time: '2h ago' },
  { type: 'info', msg: 'New trending topic detected: "AI Video Editing"', time: '5h ago' },
  { type: 'warning', msg: 'Upload frequency dropped below 3 videos/week', time: '1d ago' },
  { type: 'info', msg: 'Weekly analytics report is ready to view', time: '2d ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? 'text-yt-success' : 'text-red-500'}`}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Subscriber Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={subGrowthData}>
                <defs>
                  <linearGradient id="subsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF0000" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: 'currentColor', fontSize: 12 }} />
                <YAxis className="text-xs" tick={{ fill: 'currentColor', fontSize: 12 }} tickFormatter={(v) => `${v}K`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: number) => [`${value}K`, 'Subscribers']}
                />
                <Area type="monotone" dataKey="subs" stroke="#FF0000" fill="url(#subsGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: 'currentColor', fontSize: 12 }} />
                <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M`, 'Views']}
                />
                <Bar dataKey="views" fill="#FF0000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Viral Videos + Audience */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Viral Videos</CardTitle>
              <Badge variant="outline" className="text-yt-red border-yt-red/30">
                <TrendingUp className="h-3 w-3 mr-1" /> Trending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {viralVideos.map((v, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-24 h-14 rounded-md bg-gradient-to-br from-yt-red/20 to-yt-accent/20 flex items-center justify-center shrink-0">
                    <Play className="h-5 w-5 text-yt-red" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{v.title}</p>
                    <p className="text-xs text-muted-foreground">{v.channel} • {v.time}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">{v.views}</p>
                    <p className="text-xs text-yt-success">{v.eng} eng</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Audience Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={audienceData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={2}>
                  {audienceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {audienceData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="font-medium ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Channels + Alerts + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium text-muted-foreground">Channel</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Subs</th>
                    <th className="text-right py-2 font-medium text-muted-foreground hidden sm:table-cell">Videos</th>
                    <th className="text-right py-2 font-medium text-muted-foreground hidden sm:table-cell">Avg Views</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {topChannels.map((ch) => (
                    <tr key={ch.name} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                      <td className="py-3 font-medium">{ch.name}</td>
                      <td className="py-3 text-right">{ch.subs}</td>
                      <td className="py-3 text-right hidden sm:table-cell">{ch.videos}</td>
                      <td className="py-3 text-right hidden sm:table-cell">{ch.avgViews}</td>
                      <td className="py-3 text-right">
                        <Badge variant="outline" className={ch.score >= 90 ? 'text-yt-success border-yt-success/30' : ch.score >= 80 ? 'text-yellow-500 border-yellow-500/30' : 'text-muted-foreground'}>
                          {ch.score}/100
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { icon: Tv, label: 'Analyze Channel', color: 'text-blue-500' },
                { icon: Play, label: 'Analyze Video', color: 'text-yt-red' },
                { icon: Search, label: 'SEO Check', color: 'text-green-500' },
                { icon: TrendingUp, label: 'View Trends', color: 'text-purple-500' },
              ].map((action) => (
                <Button key={action.label} variant="ghost" className="w-full justify-start gap-3 h-10">
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yt-warning" />
                Alerts
              </CardTitle>
            </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.type === 'success' ? 'bg-yt-success' : alert.type === 'warning' ? 'bg-yt-warning' : 'bg-yt-info'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs">{alert.msg}</p>
                    <p className="text-[10px] text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          </Card>
        </div>
      </div>

      {/* Saved Reports */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Saved Reports
            </CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: 'Weekly Analytics - Dec 2024', date: 'Jan 1, 2025', type: 'PDF' },
              { name: 'Channel Comparison Report', date: 'Dec 28, 2024', type: 'CSV' },
              { name: 'SEO Audit - TechVision Pro', date: 'Dec 25, 2024', type: 'PDF' },
              { name: 'Revenue Breakdown Q4 2024', date: 'Dec 20, 2024', type: 'PDF' },
            ].map((report) => (
              <div key={report.name} className="p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline" className="text-[10px]">{report.type}</Badge>
                </div>
                <p className="text-sm font-medium truncate">{report.name}</p>
                <p className="text-xs text-muted-foreground">{report.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
