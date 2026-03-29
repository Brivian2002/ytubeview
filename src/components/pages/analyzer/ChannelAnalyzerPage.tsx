'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import {
  Search, Users, Eye, Video, Calendar, Star, TrendingUp, Globe,
  Heart, MessageCircle, Share2, Clock, Award,
} from 'lucide-react';

const mockChannel = {
  name: 'TechVision Pro',
  handle: '@techvisionpro',
  avatar: null,
  subscribers: '2.1M',
  totalViews: '458M',
  videoCount: '342',
  joinDate: 'March 15, 2018',
  country: 'United States',
  category: 'Science & Technology',
  description: 'Exploring the future of technology, AI, and innovation. New videos every Tuesday and Friday.',
  avgViews: '450K',
  avgEngagement: '5.2%',
  uploadFreq: '3.2 videos/week',
};

const scores = [
  { label: 'Channel Score', value: 87, color: 'text-yt-success' },
  { label: 'Growth Score', value: 92, color: 'text-blue-500' },
  { label: 'SEO Score', value: 78, color: 'text-yellow-500' },
  { label: 'Consistency Score', value: 85, color: 'text-purple-500' },
];

const growthData = [
  { month: 'Jan', subs: 1750 }, { month: 'Feb', subs: 1790 },
  { month: 'Mar', subs: 1830 }, { month: 'Apr', subs: 1880 },
  { month: 'May', subs: 1920 }, { month: 'Jun', subs: 1960 },
  { month: 'Jul', subs: 1990 }, { month: 'Aug', subs: 2030 },
  { month: 'Sep', subs: 2060 }, { month: 'Oct', subs: 2100 },
];

const uploadData = [
  { day: 'Mon', count: 12 }, { day: 'Tue', count: 28 },
  { day: 'Wed', count: 8 }, { day: 'Thu', count: 15 },
  { day: 'Fri', count: 26 }, { day: 'Sat', count: 6 },
  { day: 'Sun', count: 4 },
];

const topVideos = [
  { title: 'The Future of AI in 2025 - What Nobody Tells You', views: '4.2M', eng: '7.8%', likes: '210K', comments: '12.5K', date: 'Dec 2024' },
  { title: 'I Built a $10M SaaS Using Only AI Tools', views: '3.8M', eng: '6.9%', likes: '185K', comments: '9.8K', date: 'Nov 2024' },
  { title: 'Why 99% of Tech Startups Fail', views: '2.9M', eng: '8.1%', likes: '155K', comments: '14.2K', date: 'Oct 2024' },
  { title: '10 AI Tools That Will Replace Your Job', views: '2.5M', eng: '6.4%', likes: '132K', comments: '8.9K', date: 'Sep 2024' },
  { title: 'The Complete Guide to Building an AI App', views: '2.1M', eng: '5.8%', likes: '108K', comments: '7.2K', date: 'Aug 2024' },
];

const demographicData = [
  { name: '18-24', value: 28 },
  { name: '25-34', value: 35 },
  { name: '35-44', value: 22 },
  { name: '45-54', value: 10 },
  { name: '55+', value: 5 },
];

const COLORS = ['#FF0000', '#e94560', '#00b0ff', '#ffab00', '#00c853'];

export default function ChannelAnalyzerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(true);

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter channel URL, handle, or ID (e.g., @techvisionpro)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-yt-red hover:bg-yt-red/90 text-white" onClick={() => setSearched(true)}>
              Analyze Channel
            </Button>
          </div>
        </CardContent>
      </Card>

      {searched && (
        <>
          {/* Channel Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yt-red to-yt-accent flex items-center justify-center text-white text-2xl font-bold shrink-0">
                  TV
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold">{mockChannel.name}</h2>
                    <Badge variant="outline">{mockChannel.handle}</Badge>
                    <Badge className="bg-yt-red/10 text-yt-red border-yt-red/30">{mockChannel.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{mockChannel.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-yt-red" />
                      <div>
                        <p className="text-sm font-bold">{mockChannel.subscribers}</p>
                        <p className="text-[11px] text-muted-foreground">Subscribers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-bold">{mockChannel.totalViews}</p>
                        <p className="text-[11px] text-muted-foreground">Total Views</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-bold">{mockChannel.videoCount}</p>
                        <p className="text-[11px] text-muted-foreground">Videos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-bold">{mockChannel.joinDate}</p>
                        <p className="text-[11px] text-muted-foreground">Joined</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {scores.map((score) => (
              <Card key={score.label}>
                <CardContent className="p-4 text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="4" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#FF0000" strokeWidth="4" strokeLinecap="round"
                        strokeDasharray={`${(score.value / 100) * 176} 176`} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{score.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{score.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Subscriber Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="channelGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF0000" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fill: 'currentColor', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="subs" stroke="#FF0000" fill="url(#channelGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Upload Frequency by Day</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={uploadData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="day" tick={{ fill: 'currentColor', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="count" fill="#FF0000" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Videos + Demographics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Top Performing Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-medium text-muted-foreground">Video</th>
                        <th className="text-right py-2 font-medium text-muted-foreground">Views</th>
                        <th className="text-right py-2 font-medium text-muted-foreground hidden sm:table-cell">Engagement</th>
                        <th className="text-right py-2 font-medium text-muted-foreground hidden md:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topVideos.map((v) => (
                        <tr key={v.title} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                          <td className="py-3 font-medium max-w-xs truncate">{v.title}</td>
                          <td className="py-3 text-right">{v.views}</td>
                          <td className="py-3 text-right hidden sm:table-cell text-yt-success">{v.eng}</td>
                          <td className="py-3 text-right hidden md:table-cell text-muted-foreground">{v.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={demographicData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                      {demographicData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {demographicData.map((d, i) => (
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

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Avg Views/Video', value: mockChannel.avgViews, icon: Eye },
              { label: 'Avg Engagement', value: mockChannel.avgEngagement, icon: Heart },
              { label: 'Upload Frequency', value: mockChannel.uploadFreq, icon: Clock },
              { label: 'Channel Grade', value: 'A+', icon: Award },
            ].map((m) => (
              <Card key={m.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yt-red/10 flex items-center justify-center">
                    <m.icon className="h-5 w-5 text-yt-red" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{m.value}</p>
                    <p className="text-[11px] text-muted-foreground">{m.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
