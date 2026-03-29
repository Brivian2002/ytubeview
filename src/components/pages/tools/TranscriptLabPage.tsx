'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search, FileText, Download, Sparkles, Clock, Highlighter,
  ListChecks, BookOpen, Copy, CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

const mockTranscript = [
  { time: '00:00', speaker: 'Host', text: 'Hey everyone, welcome back to the channel! Today we\'re diving deep into YouTube SEO strategies that actually work in 2025.' },
  { time: '00:15', speaker: 'Host', text: 'If you\'ve been struggling to get views on your YouTube videos, this is going to be a game changer for you.' },
  { time: '00:30', speaker: 'Host', text: 'Before we jump in, make sure you hit that subscribe button and turn on notifications so you never miss an upload.' },
  { time: '00:45', speaker: 'Host', text: 'Now, the first thing you need to understand about YouTube SEO is that the algorithm has changed significantly in 2025.' },
  { time: '01:15', speaker: 'Host', text: 'It\'s no longer just about keywords and tags. YouTube now focuses heavily on user satisfaction signals like watch time, engagement, and click-through rate.' },
  { time: '01:45', speaker: 'Host', text: 'The second most important factor is your title. Your title needs to be compelling while including your target keyword naturally.' },
  { time: '02:20', speaker: 'Host', text: 'I\'ve tested this extensively. Titles with numbers and power words consistently outperform generic titles by 40-60% in terms of CTR.' },
  { time: '02:50', speaker: 'Host', text: 'Let me show you some real examples from my own channel. This video titled "7 YouTube SEO Secrets" got 3x more clicks than my previous video.' },
  { time: '03:30', speaker: 'Host', text: 'The third critical element is your thumbnail. Your thumbnail and title work together as a package. If one is weak, your CTR will suffer.' },
  { time: '04:00', speaker: 'Host', text: 'I recommend using high contrast colors, including a face with emotion, and keeping text to 3-5 words maximum.' },
  { time: '04:30', speaker: 'Host', text: 'Now let\'s talk about descriptions. Many creators make the mistake of writing a one-line description. That\'s leaving views on the table.' },
  { time: '05:00', speaker: 'Host', text: 'Your description should be at least 200 words, include your primary keyword in the first 25 words, and have a clear structure with timestamps.' },
  { time: '05:45', speaker: 'Host', text: 'For tags, YouTube has confirmed they use them as a signal, but they\'re not as important as they used to be. Focus on 10-15 highly relevant tags.' },
  { time: '06:15', speaker: 'Host', text: 'One strategy that\'s been working incredibly well for me is creating video series. When you chain videos together, you create a viewing session.' },
  { time: '06:45', speaker: 'Host', text: 'The algorithm rewards you for keeping viewers on YouTube longer. If your video leads to 3 more video views, that\'s a huge signal.' },
  { time: '07:15', speaker: 'Host', text: 'Let\'s now talk about the biggest mistake I see creators making with YouTube Shorts. They treat them completely separately from their long-form content.' },
  { time: '07:45', speaker: 'Host', text: 'Instead, use your Shorts to drive traffic to your long-form videos. Include a link in the Short\'s description pointing to the full video.' },
  { time: '08:15', speaker: 'Host', text: 'Alright, let\'s summarize the key strategies: optimize your title with power words, create compelling thumbnails, write detailed descriptions, use video chapters.' },
  { time: '08:45', speaker: 'Host', text: 'If you found this helpful, please like this video and subscribe. Drop a comment below with your biggest YouTube SEO challenge.' },
  { time: '09:00', speaker: 'Host', text: 'I\'ll be doing a live Q&A next week where I\'ll review your channels. Until next time, keep creating amazing content!' },
];

const mockSummary = {
  keyPoints: [
    'YouTube algorithm in 2025 prioritizes user satisfaction signals over keywords',
    'Titles with numbers and power words increase CTR by 40-60%',
    'Thumbnails should use high contrast, faces with emotion, and minimal text',
    'Descriptions should be 200+ words with keywords in the first 25 words',
    'Video series and content chains boost algorithm rankings significantly',
    'YouTube Shorts should drive traffic to long-form content',
  ],
  hooks: [
    'Power opening: Immediately states the value proposition',
    'Pattern interrupt: Uses specific numbers and data points',
    'Social proof: References real channel examples and results',
  ],
  topics: [
    { topic: 'YouTube Algorithm 2025', confidence: 95 },
    { topic: 'Title Optimization', confidence: 90 },
    { topic: 'Thumbnail Design', confidence: 88 },
    { topic: 'Description Strategy', confidence: 85 },
    { topic: 'Video Series Strategy', confidence: 80 },
    { topic: 'YouTube Shorts Integration', confidence: 78 },
  ],
};

export default function TranscriptLabPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [extracted, setExtracted] = useState(true);
  const [highlightedWord, setHighlightedWord] = useState('');

  const filteredTranscript = searchQuery
    ? mockTranscript.filter((t) => t.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : mockTranscript;

  const highlightText = (text: string) => {
    if (!highlightedWord) return text;
    const parts = text.split(new RegExp(`(${highlightedWord})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlightedWord.toLowerCase()
        ? <mark key={i} className="bg-yellow-400/30 text-yellow-300 rounded px-0.5">{part}</mark>
        : part
    );
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter YouTube video URL to extract transcript"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-yt-red hover:bg-yt-red/90 text-white" onClick={() => setExtracted(true)}>
              <FileText className="h-4 w-4 mr-2" /> Extract Transcript
            </Button>
          </div>
        </CardContent>
      </Card>

      {extracted && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transcript Viewer */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <CardTitle className="text-base">Transcript</CardTitle>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search transcript..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-8 text-xs"
                      />
                    </div>
                    <div className="relative flex-1 sm:flex-initial">
                      <Highlighter className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Highlight word..."
                        value={highlightedWord}
                        onChange={(e) => setHighlightedWord(e.target.value)}
                        className="pl-8 h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3 pr-4">
                    {filteredTranscript.map((line, i) => (
                      <div key={i} className="flex gap-3 hover:bg-muted/30 p-2 rounded-lg transition-colors">
                        <Badge variant="outline" className="font-mono text-[11px] shrink-0 h-6 mt-0.5">{line.time}</Badge>
                        <p className="text-sm leading-relaxed">{highlightText(line.text)}</p>
                      </div>
                    ))}
                    {searchQuery && filteredTranscript.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-8">No matches found for &ldquo;{searchQuery}&rdquo;</p>
                    )}
                  </div>
                </ScrollArea>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">{mockTranscript.length} segments • ~9 min</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const text = mockTranscript.map(t => `[${t.time}] ${t.text}`).join('\n\n');
                      navigator.clipboard.writeText(text);
                      toast.success('Transcript copied!');
                    }}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    AI Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Key Points</h4>
                      <ul className="space-y-1.5">
                        {mockSummary.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs">
                            <CheckCircle2 className="h-3.5 w-3.5 text-yt-success mt-0.5 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    Key Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockSummary.topics.map((topic) => (
                      <div key={topic.topic} className="flex items-center justify-between">
                        <span className="text-xs">{topic.topic}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-1.5">
                            <div className="h-1.5 rounded-full bg-yt-red" style={{ width: `${topic.confidence}%` }} />
                          </div>
                          <span className="text-[10px] text-muted-foreground w-8 text-right">{topic.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Download className="h-4 w-4 text-green-500" />
                    Export
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {['TXT', 'DOCX', 'PDF'].map((format) => (
                    <Button key={format} variant="outline" className="w-full justify-start" size="sm">
                      <Download className="h-3.5 w-3.5 mr-2" />
                      Download as {format}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Chapter Breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Chapter Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { time: '00:00 - 00:30', title: 'Intro & Hook', duration: '30s', topic: 'Introduction' },
                  { time: '00:30 - 01:45', title: 'Algorithm Changes 2025', duration: '1m 15s', topic: 'Algorithm' },
                  { time: '01:45 - 02:50', title: 'Title Optimization', duration: '1m 05s', topic: 'Titles' },
                  { time: '02:50 - 04:00', title: 'Thumbnail Strategy', duration: '1m 10s', topic: 'Thumbnails' },
                  { time: '04:00 - 05:45', title: 'Description Best Practices', duration: '1m 45s', topic: 'Descriptions' },
                  { time: '05:45 - 06:45', title: 'Tags & Video Series', duration: '1m 00s', topic: 'Tags' },
                  { time: '06:45 - 08:15', title: 'Shorts Integration', duration: '1m 30s', topic: 'Shorts' },
                  { time: '08:15 - 09:00', title: 'Summary & CTA', duration: '45s', topic: 'Conclusion' },
                ].map((ch, i) => (
                  <div key={i} className="p-3 rounded-lg border border-border/50 hover:border-yt-red/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="font-mono text-[10px]">{ch.time}</Badge>
                      <Badge variant="secondary" className="text-[10px]">{ch.duration}</Badge>
                    </div>
                    <p className="text-sm font-medium">{ch.title}</p>
                    <p className="text-xs text-muted-foreground">{ch.topic}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
