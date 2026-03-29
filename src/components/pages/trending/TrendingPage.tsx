'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp, Play, Eye, Heart, MessageCircle, Clock, Globe, Flame,
  ArrowUpRight, Filter, Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const trendingVideos = [
  { title: 'The Rise of AI Agents in 2025', channel: 'TechVision Pro', views: '4.8M', eng: '8.2%', viralScore: 94, category: 'Tech', country: 'US', growth: '+340%' },
  { title: 'I Tried Living as a Minimalist for 30 Days', channel: 'LifeStyle Hub', views: '3.2M', eng: '7.5%', viralScore: 91, category: 'Lifestyle', country: 'UK', growth: '+280%' },
  { title: 'Breaking Down the Biggest Tech Failures', channel: 'GrowthMasters', views: '2.9M', eng: '9.1%', viralScore: 89, category: 'Tech', country: 'US', growth: '+250%' },
  { title: 'How This Small Channel Hit 1M Subscribers', channel: 'CreatorLab', views: '2.5M', eng: '7.8%', viralScore: 87, category: 'Education', country: 'CA', growth: '+220%' },
  { title: 'The Hidden Features of iPhone 16', channel: 'TechReviewer', views: '2.1M', eng: '6.9%', viralScore: 85, category: 'Tech', country: 'US', growth: '+190%' },
  { title: 'Gaming Setup Tour 2025 - $50K Setup', channel: 'GamerZone', views: '1.8M', eng: '8.5%', viralScore: 83, category: 'Gaming', country: 'DE', growth: '+170%' },
  { title: 'I Built a Business in 24 Hours Challenge', channel: 'EntrepreneurPro', views: '1.6M', eng: '7.2%', viralScore: 81, category: 'Business', country: 'US', growth: '+160%' },
  { title: 'World\'s Spiciest Noodle Challenge', channel: 'FoodieKing', views: '1.5M', eng: '10.2%', viralScore: 80, category: 'Food', country: 'UK', growth: '+150%' },
  { title: 'Why Everyone is Moving to This Country', channel: 'TravelDiaries', views: '1.3M', eng: '6.8%', viralScore: 78, category: 'Travel', country: 'AU', growth: '+140%' },
];

const risingNow = [
  { title: 'New Study Reveals Shocking Sleep Facts', channel: 'ScienceDaily', views: '450K', growth: '+520%', time: '2h ago' },
  { title: 'This Song Just Broke All Records', channel: 'MusicCharts', views: '890K', growth: '+480%', time: '4h ago' },
  { title: 'The App Everyone is Deleting', channel: 'TechNews', views: '670K', growth: '+410%', time: '6h ago' },
  { title: 'Viral Dance Trend Explodes on YouTube', channel: 'ViralWatch', views: '1.2M', growth: '+390%', time: '8h ago' },
];

const categoryTrends = [
  { category: 'Tech', growth: '+45%', videos: 1240, avgViews: '520K' },
  { category: 'Gaming', growth: '+32%', videos: 980, avgViews: '380K' },
  { category: 'Music', growth: '+28%', videos: 1560, avgViews: '890K' },
  { category: 'Education', growth: '+25%', videos: 670, avgViews: '210K' },
  { category: 'Lifestyle', growth: '+22%', videos: 890, avgViews: '340K' },
  { category: 'Business', growth: '+18%', videos: 450, avgViews: '280K' },
];

const regionalData = [
  { region: 'United States', videos: 3420, avgGrowth: '+38%' },
  { region: 'United Kingdom', videos: 2180, avgGrowth: '+32%' },
  { region: 'India', videos: 5420, avgGrowth: '+52%' },
  { region: 'Germany', videos: 1240, avgGrowth: '+28%' },
  { region: 'Brazil', videos: 1890, avgGrowth: '+41%' },
  { region: 'Japan', videos: 1560, avgGrowth: '+35%' },
];

const trendTimeData = [
  { hour: '6am', viral: 2 }, { hour: '9am', viral: 5 },
  { hour: '12pm', viral: 12 }, { hour: '3pm', viral: 8 },
  { hour: '6pm', viral: 18 }, { hour: '9pm', viral: 22 },
  { hour: '12am', viral: 10 },
];

export default function TrendingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const categories = ['All', 'Tech', 'Gaming', 'Music', 'Education', 'Lifestyle', 'Business', 'Food', 'Travel'];
  const countries = ['All', 'US', 'UK', 'CA', 'DE', 'AU', 'IN', 'BR', 'JP'];

  const filteredVideos = trendingVideos.filter((v) => {
    if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;
    if (selectedCountry !== 'All' && v.country !== selectedCountry) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Rising Now */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            Rising Now
            <Badge variant="outline" className="text-orange-500 border-orange-500/30 text-[11px] ml-2">LIVE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {risingNow.map((v, i) => (
              <div key={i} className="p-3 rounded-lg border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30 text-[10px]">
                    <Zap className="h-3 w-3 mr-0.5" /> {v.growth}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{v.time}</span>
                </div>
                <p className="text-sm font-medium truncate">{v.title}</p>
                <p className="text-xs text-muted-foreground">{v.channel} • {v.views} views</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 mr-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Category:</span>
        </div>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            className={cn('h-7 text-xs', selectedCategory === cat && 'bg-yt-red hover:bg-yt-red/90 text-white')}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 mr-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Country:</span>
        </div>
        {countries.map((c) => (
          <Button
            key={c}
            variant={selectedCountry === c ? 'default' : 'outline'}
            size="sm"
            className={cn('h-7 text-xs', selectedCountry === c && 'bg-yt-red hover:bg-yt-red/90 text-white')}
            onClick={() => setSelectedCountry(c)}
          >
            {c}
          </Button>
        ))}
      </div>

      {/* Trending Videos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Trending Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium text-muted-foreground">#</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Video</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">Views</th>
                  <th className="text-right py-2 font-medium text-muted-foreground hidden sm:table-cell">Engagement</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">Viral Score</th>
                  <th className="text-right py-2 font-medium text-muted-foreground hidden md:table-cell">Growth</th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((v, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="py-3 text-muted-foreground font-medium">{i + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-9 rounded bg-gradient-to-br from-yt-red/20 to-yt-accent/20 flex items-center justify-center shrink-0">
                          <Play className="h-3 w-3 text-yt-red" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[250px]">{v.title}</p>
                          <p className="text-xs text-muted-foreground">{v.channel}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right">{v.views}</td>
                    <td className="py-3 text-right hidden sm:table-cell text-yt-success">{v.eng}</td>
                    <td className="py-3 text-right">
                      <Badge variant="outline" className={v.viralScore >= 90 ? 'text-yt-success border-yt-success/30' : v.viralScore >= 80 ? 'text-blue-500 border-blue-500/30' : 'text-muted-foreground'}>
                        {v.viralScore}
                      </Badge>
                    </td>
                    <td className="py-3 text-right hidden md:table-cell">
                      <span className="text-yt-success flex items-center justify-end gap-0.5">
                        <ArrowUpRight className="h-3 w-3" /> {v.growth}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredVideos.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">No videos found for the selected filters</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Category Trends + Viral Score Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Category Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="category" tick={{ fill: 'currentColor', fontSize: 12 }} />
                <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="videos" fill="#FF0000" radius={[4, 4, 0, 0]} name="Trending Videos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Viral Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { factor: 'View Velocity', weight: '30%', desc: 'Speed of view accumulation in first 48 hours' },
              { factor: 'Engagement Rate', weight: '25%', desc: 'Likes, comments, shares relative to views' },
              { factor: 'CTR Performance', weight: '20%', desc: 'Click-through rate vs. niche average' },
              { factor: 'Share Velocity', weight: '15%', desc: 'Rate of sharing across platforms' },
              { factor: 'Retention Score', weight: '10%', desc: 'Average watch time percentage' },
            ].map((item) => (
              <div key={item.factor} className="p-2.5 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-medium text-xs">{item.factor}</span>
                  <Badge variant="outline" className="text-yt-red border-yt-red/30 text-[10px]">{item.weight}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Regional Comparison */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-500" />
            Regional Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium text-muted-foreground">Region</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">Trending Videos</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">Avg. Growth</th>
                </tr>
              </thead>
              <tbody>
                {regionalData.map((r) => (
                  <tr key={r.region} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="py-2.5 font-medium">{r.region}</td>
                    <td className="py-2.5 text-right">{r.videos.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-yt-success">{r.avgGrowth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
