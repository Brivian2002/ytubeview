'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Search, Eye, ThumbsUp, MessageCircle, Share2, Clock, TrendingUp,
  Play, Star, CheckCircle2, XCircle, AlertTriangle, Zap,
} from 'lucide-react';

const mockVideo = {
  title: 'How I Gained 100K Subscribers in 6 Months - Complete Strategy',
  channel: 'TechVision Pro',
  views: '2.4M',
  likes: '142K',
  comments: '8.9K',
  shares: '12.3K',
  duration: '18:42',
  publishDate: 'December 15, 2024',
  thumbnail: null,
  tags: ['youtube growth', 'how to get subscribers', 'youtube strategy 2024', 'youtube tips', 'channel growth'],
};

const performanceScore = 85;

const rankingSignals = [
  { label: 'Title Optimization', score: 92, status: 'good' },
  { label: 'Description Quality', score: 78, status: 'good' },
  { label: 'Tags Relevance', score: 85, status: 'good' },
  { label: 'Thumbnail CTR', score: 71, status: 'warning' },
  { label: 'Engagement Rate', score: 88, status: 'good' },
  { label: 'Watch Time', score: 82, status: 'good' },
  { label: 'Click-Through Rate', score: 65, status: 'warning' },
  { label: 'Session Duration Impact', score: 90, status: 'good' },
];

const engagementBreakdown = [
  { name: 'Likes', value: 142000, color: '#FF0000' },
  { name: 'Comments', value: 8900, color: '#00b0ff' },
  { name: 'Shares', value: 12300, color: '#00c853' },
];

const competitorVideos = [
  { title: 'How to Get Your First 100K Subscribers', channel: 'GrowthMasters', views: '1.8M', score: 82 },
  { title: 'YouTube Growth Strategy That Works', channel: 'CreatorLab', views: '1.2M', score: 79 },
  { title: '100K Subscribers in 30 Days Challenge', channel: 'Viral Academy', views: '980K', score: 76 },
  { title: 'The Real Way to Grow on YouTube', channel: 'Niche Domination', views: '750K', score: 73 },
];

const keywordOpps = [
  { keyword: 'youtube subscriber growth tips', volume: '14.8K', difficulty: 'Low', opportunity: 'High' },
  { keyword: 'how to get 100k subscribers fast', volume: '22.1K', difficulty: 'Medium', opportunity: 'High' },
  { keyword: 'youtube channel growth strategy 2025', volume: '8.9K', difficulty: 'Low', opportunity: 'Very High' },
  { keyword: 'subscribers growth hack youtube', volume: '5.4K', difficulty: 'Low', opportunity: 'Very High' },
  { keyword: 'youtube algorithm for subscribers', volume: '18.3K', difficulty: 'High', opportunity: 'Medium' },
];

export default function VideoAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [analyzed, setAnalyzed] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter YouTube video URL (e.g., https://youtube.com/watch?v=...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-yt-red hover:bg-yt-red/90 text-white" onClick={() => setAnalyzed(true)}>
              Analyze Video
            </Button>
          </div>
        </CardContent>
      </Card>

      {analyzed && (
        <>
          {/* Video Preview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-full sm:w-80 h-44 rounded-lg bg-gradient-to-br from-yt-red/20 to-yt-accent/20 flex items-center justify-center shrink-0">
                  <Play className="h-12 w-12 text-yt-red" />
                </div>
                <div className="flex-1 space-y-3">
                  <h2 className="text-lg font-bold leading-tight">{mockVideo.title}</h2>
                  <p className="text-sm text-muted-foreground">{mockVideo.channel} • {mockVideo.publishDate}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-bold">{mockVideo.views}</p>
                        <p className="text-[11px] text-muted-foreground">Views</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-yt-red" />
                      <div>
                        <p className="text-sm font-bold">{mockVideo.likes}</p>
                        <p className="text-[11px] text-muted-foreground">Likes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-bold">{mockVideo.comments}</p>
                        <p className="text-[11px] text-muted-foreground">Comments</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-bold">{mockVideo.duration}</p>
                        <p className="text-[11px] text-muted-foreground">Duration</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mockVideo.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[11px]">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Score */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Performance Score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-4">
                <div className="relative w-28 h-28 mb-3">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="8" />
                    <circle cx="56" cy="56" r="48" fill="none" stroke="#FF0000" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${(performanceScore / 100) * 301.6} 301.6`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{performanceScore}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
                <Badge className="bg-yt-success/10 text-yt-success border-yt-success/30">Excellent Performance</Badge>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ranking Signals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rankingSignals.map((signal) => (
                    <div key={signal.label} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{signal.label}</span>
                          <span className="text-xs font-medium">{signal.score}/100</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${signal.score >= 80 ? 'bg-yt-success' : signal.score >= 65 ? 'bg-yt-warning' : 'bg-red-500'}`}
                            style={{ width: `${signal.score}%` }}
                          />
                        </div>
                      </div>
                      {signal.score >= 80 ? (
                        <CheckCircle2 className="h-4 w-4 text-yt-success shrink-0" />
                      ) : signal.score >= 65 ? (
                        <AlertTriangle className="h-4 w-4 text-yt-warning shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement + Competitors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Engagement Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={engagementBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} width={70} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {engagementBreakdown.map((entry, index) => (
                        <rect key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-3">
                  {engagementBreakdown.map((e) => (
                    <div key={e.name} className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: e.color }} />
                      <span className="text-muted-foreground">{e.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Related Competitor Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {competitorVideos.map((v, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center shrink-0 text-xs font-bold text-muted-foreground">
                        #{i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{v.title}</p>
                        <p className="text-xs text-muted-foreground">{v.channel} • {v.views} views</p>
                      </div>
                      <Badge variant="outline" className="text-[11px] shrink-0">{v.score}/100</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Keyword Opportunities */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Keyword Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium text-muted-foreground">Keyword</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Monthly Volume</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Difficulty</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Opportunity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordOpps.map((kw) => (
                      <tr key={kw.keyword} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="py-2.5 font-medium">{kw.keyword}</td>
                        <td className="py-2.5 text-right">{kw.volume}</td>
                        <td className="py-2.5 text-right">
                          <Badge variant="outline" className={kw.difficulty === 'Low' ? 'text-yt-success border-yt-success/30' : kw.difficulty === 'Medium' ? 'text-yt-warning border-yt-warning/30' : 'text-red-500 border-red-500/30'}>
                            {kw.difficulty}
                          </Badge>
                        </td>
                        <td className="py-2.5 text-right font-medium text-yt-red">{kw.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
