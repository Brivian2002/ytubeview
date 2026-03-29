'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Copy, Download, Map } from 'lucide-react';
import { toast } from 'sonner';

interface SitemapEntry {
  id: string;
  url: string;
  frequency: string;
  priority: string;
}

export default function SitemapGeneratorPage() {
  const [entries, setEntries] = useState<SitemapEntry[]>([
    { id: '1', url: 'https://www.example.com/', frequency: 'daily', priority: '1.0' },
    { id: '2', url: 'https://www.example.com/blog', frequency: 'daily', priority: '0.8' },
    { id: '3', url: 'https://www.example.com/about', frequency: 'monthly', priority: '0.5' },
    { id: '4', url: 'https://www.example.com/contact', frequency: 'monthly', priority: '0.5' },
    { id: '5', url: 'https://www.example.com/blog/youtube-seo-guide', frequency: 'weekly', priority: '0.7' },
  ]);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now().toString(), url: '', frequency: 'monthly', priority: '0.5' }]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof SitemapEntry, value: string) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const generatedXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${e.frequency}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const copyOutput = () => {
    navigator.clipboard.writeText(generatedXML);
    toast.success('Sitemap XML copied to clipboard!');
  };

  const downloadOutput = () => {
    const blob = new Blob([generatedXML], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('sitemap.xml downloaded!');
  };

  return (
    <div className="space-y-6">
      {/* URLs Input */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Map className="h-4 w-4 text-yt-red" />
              Sitemap Generator
            </CardTitle>
            <Button variant="outline" size="sm" onClick={addEntry}>
              <Plus className="h-4 w-4 mr-1" /> Add URL
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-1">
              <div className="col-span-6">URL</div>
              <div className="col-span-3">Frequency</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-1" />
            </div>
            {entries.map((entry) => (
              <div key={entry.id} className="grid grid-cols-12 gap-2 items-center">
                <Input
                  value={entry.url}
                  onChange={(e) => updateEntry(entry.id, 'url', e.target.value)}
                  placeholder="https://www.example.com/page"
                  className="col-span-6"
                />
                <Select value={entry.frequency} onValueChange={(v) => updateEntry(entry.id, 'frequency', v)}>
                  <SelectTrigger className="col-span-3 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="always">Always</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={entry.priority} onValueChange={(v) => updateEntry(entry.id, 'priority', v)}>
                  <SelectTrigger className="col-span-2 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" className="col-span-1 text-red-500 hover:text-red-600" onClick={() => removeEntry(entry.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">{entries.length} URLs added</p>
        </CardContent>
      </Card>

      {/* XML Preview */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Generated XML</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyOutput}>
                <Copy className="h-4 w-4 mr-1" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadOutput}>
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono overflow-x-auto border border-border/50 text-green-500">
            {generatedXML}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
