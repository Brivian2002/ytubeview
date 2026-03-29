'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search, Download, Maximize2, Columns, Sparkles, Save, Image as ImageIcon,
  RotateCcw, FlipHorizontal, Move,
} from 'lucide-react';

const mockThumbnails = [
  { id: 1, title: 'YouTube Growth 2025', url: 'gradient1', channel: 'TechVision Pro', ctr: 8.2 },
  { id: 2, title: 'AI Tools Review', url: 'gradient2', channel: 'CreatorLab', ctr: 7.5 },
  { id: 3, title: 'Passive Income Guide', url: 'gradient3', channel: 'GrowthMasters', ctr: 6.9 },
  { id: 4, title: 'Camera Setup Tutorial', url: 'gradient4', channel: 'Vlog Academy', ctr: 9.1 },
  { id: 5, title: 'Editing Tips Pro', url: 'gradient5', channel: 'EditPro', ctr: 7.8 },
  { id: 6, title: 'Algorithm Hacks', url: 'gradient6', channel: 'TechVision Pro', ctr: 8.6 },
  { id: 7, title: 'Thumbnail Design', url: 'gradient7', channel: 'Design Hub', ctr: 7.2 },
  { id: 8, title: 'Revenue Strategies', url: 'gradient8', channel: 'MoneyMakers', ctr: 6.5 },
  { id: 9, title: 'Channel Branding', url: 'gradient9', channel: 'BrandPro', ctr: 8.0 },
];

const gradients = [
  'from-yt-red to-orange-500',
  'from-blue-600 to-purple-600',
  'from-green-500 to-teal-600',
  'from-purple-500 to-pink-500',
  'from-amber-500 to-red-500',
  'from-indigo-500 to-blue-600',
  'from-rose-500 to-yt-accent',
  'from-cyan-500 to-blue-700',
  'from-emerald-500 to-green-700',
];

const presets = [
  { name: 'YouTube', size: '1280×720', ratio: '16:9' },
  { name: 'Instagram', size: '1080×1080', ratio: '1:1' },
  { name: 'Twitter/X', size: '1200×675', ratio: '16:9' },
  { name: 'Facebook', size: '1200×630', ratio: '1.91:1' },
  { name: 'Custom', size: 'Custom', ratio: 'Custom' },
];

const ctrSuggestions = [
  { tip: 'Add a face with a surprised or excited expression', impact: '+45% CTR' },
  { tip: 'Use 3-5 words max in bold text overlay', impact: '+32% CTR' },
  { tip: 'Include a bright contrasting color for key elements', impact: '+28% CTR' },
  { tip: 'Point arrows or direct gaze toward the subject', impact: '+22% CTR' },
  { tip: 'Add a subtle border or vignette effect', impact: '+15% CTR' },
];

export default function ThumbnailLabPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<number | null>(1);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSecond, setCompareSecond] = useState<number | null>(2);
  const [activePreset, setActivePreset] = useState(0);

  const selectedThumb = mockThumbnails.find((t) => t.id === selected);

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by video URL, keyword, or channel name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-yt-red hover:bg-yt-red/90 text-white">Search Thumbnails</Button>
          </div>
        </CardContent>
      </Card>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" className={compareMode ? 'border-yt-red text-yt-red' : ''} onClick={() => setCompareMode(!compareMode)}>
          <Columns className="h-4 w-4 mr-1" /> A/B Compare
        </Button>
        <div className="hidden sm:flex items-center gap-1 ml-auto">
          {presets.map((preset, i) => (
            <Button
              key={preset.name}
              variant={activePreset === i ? 'default' : 'ghost'}
              size="sm"
              className={activePreset === i ? 'bg-yt-red hover:bg-yt-red/90 text-white h-8' : 'h-8'}
              onClick={() => setActivePreset(i)}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gallery */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Thumbnail Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              {mockThumbnails.map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={() => {
                    if (compareMode) {
                      if (!selected || selected === thumb.id) setSelected(thumb.id);
                      else setCompareSecond(thumb.id);
                    } else {
                      setSelected(thumb.id);
                    }
                  }}
                  className={`relative rounded-lg overflow-hidden aspect-video transition-all ${
                    selected === thumb.id ? 'ring-2 ring-yt-red ring-offset-2 ring-offset-background' : 'hover:ring-1 hover:ring-border'
                  } ${compareSecond === thumb.id ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-background' : ''}`}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${gradients[(thumb.id - 1) % gradients.length]} flex items-center justify-center`}>
                    <ImageIcon className="h-8 w-8 text-white/50" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                    <p className="text-[10px] text-white truncate">{thumb.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preview + Tools */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{compareMode ? 'A/B Comparison' : 'Preview'}</CardTitle>
            </CardHeader>
            <CardContent>
              {compareMode ? (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1">A</p>
                    <div className={`aspect-video rounded bg-gradient-to-br ${gradients[((selected || 1) - 1) % gradients.length]} flex items-center justify-center`}>
                      <ImageIcon className="h-6 w-6 text-white/50" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1">B</p>
                    <div className={`aspect-video rounded bg-gradient-to-br ${gradients[((compareSecond || 2) - 1) % gradients.length]} flex items-center justify-center`}>
                      <ImageIcon className="h-6 w-6 text-white/50" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`aspect-video rounded-lg bg-gradient-to-br ${gradients[((selected || 1) - 1) % gradients.length]} flex items-center justify-center`}>
                  <ImageIcon className="h-10 w-10 text-white/50" />
                </div>
              )}
              {selectedThumb && (
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-medium">{selectedThumb.title}</p>
                  <p className="text-xs text-muted-foreground">{selectedThumb.channel} • Est. CTR: {selectedThumb.ctr}%</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-yt-red hover:bg-yt-red/90 text-white" size="sm">
                <Download className="h-4 w-4 mr-2" /> Download Thumbnail
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Save className="h-4 w-4 mr-2" /> Save to Project
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Maximize2 className="h-4 w-4 mr-2" /> Full Resolution
              </Button>
            </CardContent>
          </Card>

          {/* Size Presets */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Resize Presets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {presets.map((preset, i) => (
                <button
                  key={preset.name}
                  onClick={() => setActivePreset(i)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm transition-colors ${
                    activePreset === i ? 'bg-yt-red/10 text-yt-red border border-yt-red/30' : 'hover:bg-muted/50 border border-transparent'
                  }`}
                >
                  <span className="font-medium">{preset.name}</span>
                  <span className="text-xs text-muted-foreground">{preset.size}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI CTR Suggestions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            AI CTR Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ctrSuggestions.map((suggestion) => (
              <div key={suggestion.tip} className="p-4 rounded-lg border border-border/50 hover:border-yt-red/30 transition-colors">
                <p className="text-sm mb-2">{suggestion.tip}</p>
                <Badge variant="outline" className="text-yt-success border-yt-success/30 text-[11px]">{suggestion.impact}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
