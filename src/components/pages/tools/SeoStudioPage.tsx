'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Search, Sparkles, Copy, RefreshCw, CheckCircle2, XCircle,
  Lightbulb, Hash, FileText, ListChecks, Target, Tag, Type, AlignLeft,
} from 'lucide-react';
import { toast } from 'sonner';

const mockKeywords = [
  { keyword: 'youtube algorithm 2025', volume: '22.4K', difficulty: 35, cpc: '$1.20' },
  { keyword: 'youtube seo tips', volume: '18.1K', difficulty: 28, cpc: '$0.95' },
  { keyword: 'how to rank youtube videos', volume: '14.7K', difficulty: 42, cpc: '$1.45' },
  { keyword: 'youtube title optimization', volume: '11.2K', difficulty: 22, cpc: '$0.80' },
  { keyword: 'youtube tags for views', volume: '9.8K', difficulty: 18, cpc: '$0.65' },
  { keyword: 'youtube description template', volume: '8.5K', difficulty: 15, cpc: '$0.55' },
  { keyword: 'best youtube video length', volume: '15.3K', difficulty: 31, cpc: '$0.90' },
  { keyword: 'youtube thumbnail design', volume: '12.9K', difficulty: 25, cpc: '$1.10' },
];

const mockTitles = [
  { title: 'YouTube Algorithm 2025: The Complete Guide to Ranking Videos', ctr: 8.5 },
  { title: '10 YouTube SEO Tips That Will 3x Your Views in 2025', ctr: 9.2 },
  { title: 'How I Rank #1 on YouTube Every Time (SEO Secrets)', ctr: 7.8 },
  { title: 'YouTube SEO in 2025: Everything You Need to Know', ctr: 8.1 },
  { title: 'The YouTube Algorithm Doesn\'t Want You to Know This...', ctr: 9.8 },
];

const mockDescription = `📝 YouTube SEO is the key to growing your channel in 2025. In this video, I break down exactly how the YouTube algorithm works and share my proven strategies for ranking videos.

🔥 What You'll Learn:
• How the YouTube algorithm really works in 2025
• The exact SEO strategy I use to rank #1
• Title, description, and tag optimization tips
• Thumbnail design principles for maximum CTR
• The truth about video length and retention

⏱️ Timestamps:
00:00 - Introduction
01:30 - How the Algorithm Works
05:45 - Title Optimization
09:20 - Description Strategy
12:10 - Tags That Actually Work
15:30 - Thumbnail Tips
18:00 - Final Tips & Summary

📱 Connect With Me:
• Twitter: @yourchannel
• Instagram: @yourchannel

#YouTube #SEO #YouTubeAlgorithm #ContentCreator #VideoMarketing`;

const mockHashtags = ['#YouTube', '#SEO', '#YouTubeTips', '#ContentCreator', '#VideoMarketing', '#YouTubeAlgorithm', '#Growth', '#Viral', '#YouTubeGrowth', '#CreatorTips', '#ChannelGrowth', '#VideoSEO', '#YouTubeTips2025', '#DigitalMarketing', '#SocialMedia'];

const mockTags = ['youtube algorithm 2025', 'youtube seo', 'how to rank youtube videos', 'youtube ranking factors', 'youtube search optimization', 'video seo tips', 'youtube growth strategy', 'content creation tips', 'youtube marketing', 'video marketing strategy', 'channel growth tips', 'youtube tips 2025', 'search ranking', 'video optimization', 'youtube success'];

const mockChapters = [
  { time: '00:00', title: 'Introduction & Hook' },
  { time: '01:30', title: 'Understanding the YouTube Algorithm' },
  { time: '05:45', title: 'Title Optimization Strategies' },
  { time: '09:20', title: 'Description Best Practices' },
  { time: '12:10', title: 'Tags That Actually Drive Views' },
  { time: '15:30', title: 'Thumbnail Design Principles' },
  { time: '18:00', title: 'Final Tips & Action Steps' },
];

const checklistItems = [
  { label: 'Title includes main keyword', checked: true },
  { label: 'Title is 50-70 characters', checked: false },
  { label: 'Description is at least 200 words', checked: true },
  { label: 'First 3 lines of description are compelling', checked: true },
  { label: 'Includes relevant hashtags (3-5)', checked: true },
  { label: 'Has 10-15 relevant tags', checked: false },
  { label: 'Tags include long-tail keywords', checked: true },
  { label: 'Thumbnail is high contrast with text', checked: true },
  { label: 'Video has chapters/timestamps', checked: true },
  { label: 'End screen and cards are set up', checked: false },
  { label: 'Default thumbnail is NOT used', checked: true },
  { label: 'Category and language are correct', checked: true },
];

const seoScoreData = {
  title: { score: 85, feedback: 'Good keyword placement, consider adding a power word' },
  description: { score: 72, feedback: 'Good length but missing some secondary keywords' },
  tags: { score: 68, feedback: 'Add more long-tail keywords for better discoverability' },
  overall: 75,
};

export default function SeoStudioPage() {
  const [topic, setTopic] = useState('');
  const [activeTab, setActiveTab] = useState('keywords');
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Topic Input */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter your video topic (e.g., YouTube SEO tips for beginners)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-yt-red hover:bg-yt-red/90 text-white">
              <Sparkles className="h-4 w-4 mr-2" /> Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="keywords" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <Target className="h-3 w-3" /> Keywords
          </TabsTrigger>
          <TabsTrigger value="titles" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <Type className="h-3 w-3" /> Titles
          </TabsTrigger>
          <TabsTrigger value="description" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <AlignLeft className="h-3 w-3" /> Description
          </TabsTrigger>
          <TabsTrigger value="hashtags" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <Hash className="h-3 w-3" /> Hashtags
          </TabsTrigger>
          <TabsTrigger value="tags" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <Tag className="h-3 w-3" /> Tags
          </TabsTrigger>
          <TabsTrigger value="chapters" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <ListChecks className="h-3 w-3" /> Chapters
          </TabsTrigger>
          <TabsTrigger value="checklist" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <FileText className="h-3 w-3" /> Checklist
          </TabsTrigger>
          <TabsTrigger value="score" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <Target className="h-3 w-3" /> Score
          </TabsTrigger>
        </TabsList>

        {/* Keywords */}
        <TabsContent value="keywords" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Keyword Suggestions</CardTitle>
                <Button variant="ghost" size="sm"><RefreshCw className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium text-muted-foreground">Keyword</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Volume</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Difficulty</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">CPC</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockKeywords.map((kw) => (
                      <tr key={kw.keyword} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="py-2.5 font-medium">{kw.keyword}</td>
                        <td className="py-2.5 text-right">{kw.volume}</td>
                        <td className="py-2.5 text-right">
                          <Badge variant="outline" className={kw.difficulty <= 25 ? 'text-yt-success border-yt-success/30' : kw.difficulty <= 40 ? 'text-yt-warning border-yt-warning/30' : 'text-red-500 border-red-500/30'}>
                            {kw.difficulty}%
                          </Badge>
                        </td>
                        <td className="py-2.5 text-right text-muted-foreground">{kw.cpc}</td>
                        <td className="py-2.5 text-right">
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(kw.keyword, kw.keyword)}>
                            <Copy className="h-3 w-3" />
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

        {/* Titles */}
        <TabsContent value="titles" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">CTR-Optimized Title Suggestions</CardTitle>
                <Button variant="ghost" size="sm"><RefreshCw className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockTitles.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-yt-red/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.title.length} characters</p>
                  </div>
                  <Badge className="bg-yt-success/10 text-yt-success border-yt-success/30 shrink-0">
                    {t.ctr}% CTR
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(t.title, `title-${i}`)}>
                    {copied === `title-${i}` ? <CheckCircle2 className="h-4 w-4 text-yt-success" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Description */}
        <TabsContent value="description" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">SEO-Optimized Description</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm"><RefreshCw className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mockDescription, 'desc')}>
                    {copied === 'desc' ? <CheckCircle2 className="h-4 w-4 text-yt-success" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea value={mockDescription} rows={18} className="text-sm font-mono" readOnly />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hashtags */}
        <TabsContent value="hashtags" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Suggested Hashtags</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mockHashtags.join(' '), 'hashtags')}>
                  {copied === 'hashtags' ? <CheckCircle2 className="h-4 w-4 text-yt-success" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockHashtags.map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-yt-red/10 hover:text-yt-red hover:border-yt-red/30 transition-colors py-1.5 px-3">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tags */}
        <TabsContent value="tags" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">YouTube Tags</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mockTags.join(', '), 'tags')}>
                  {copied === 'tags' ? <CheckCircle2 className="h-4 w-4 text-yt-success" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="py-1.5 px-3 text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">Total: {mockTags.length} tags • {mockTags.join(', ').length} / 500 characters</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chapters */}
        <TabsContent value="chapters" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Video Chapters</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => {
                  const text = mockChapters.map(c => `${c.time} ${c.title}`).join('\n');
                  copyToClipboard(text, 'chapters');
                }}>
                  {copied === 'chapters' ? <CheckCircle2 className="h-4 w-4 text-yt-success" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockChapters.map((ch, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30">
                    <Badge variant="outline" className="font-mono text-xs shrink-0">{ch.time}</Badge>
                    <span className="text-sm">{ch.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Checklist */}
        <TabsContent value="checklist" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Pre-Upload SEO Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklistItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
                    <Checkbox checked={item.checked} />
                    <span className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : ''}`}>{item.label}</span>
                    {item.checked ? (
                      <CheckCircle2 className="h-4 w-4 text-yt-success ml-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/40 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">
                  {checklistItems.filter(i => i.checked).length}/{checklistItems.length} items completed
                </p>
                <Progress value={(checklistItems.filter(i => i.checked).length / checklistItems.length) * 100} className="mt-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Score */}
        <TabsContent value="score" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Overall SEO Score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-4">
                <div className="relative w-28 h-28 mb-3">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="8" />
                    <circle cx="56" cy="56" r="48" fill="none" stroke="#FF0000" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${(seoScoreData.overall / 100) * 301.6} 301.6`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{seoScoreData.overall}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
                <Badge className={seoScoreData.overall >= 70 ? 'bg-yt-success/10 text-yt-success border-yt-success/30' : 'bg-yt-warning/10 text-yt-warning border-yt-warning/30'}>
                  {seoScoreData.overall >= 70 ? 'Good' : 'Needs Work'}
                </Badge>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(seoScoreData).filter(([k]) => k !== 'overall').map(([key, val]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium capitalize">{key}</span>
                      <span className="text-sm font-bold">{val.score}/100</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-1">
                      <div
                        className={`h-2 rounded-full ${val.score >= 80 ? 'bg-yt-success' : val.score >= 60 ? 'bg-yt-warning' : 'bg-red-500'}`}
                        style={{ width: `${val.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{val.feedback}</p>
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
