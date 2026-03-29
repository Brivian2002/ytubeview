'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DollarSign, Calculator, TrendingUp, CreditCard, BarChart3, CheckCircle2,
  XCircle, AlertTriangle, Info,
} from 'lucide-react';

export default function RevenueToolsPage() {
  const [views, setViews] = useState('100000');
  const [cpm, setCpm] = useState('4.50');
  const [revenue, setRevenue] = useState('');
  const [rpmViews, setRpmViews] = useState('500000');
  const [rpmRevenue, setRpmRevenue] = useState('1800');

  const estEarnings = (parseFloat(views.replace(/,/g, '')) * parseFloat(cpm)) / 1000;
  const estRPM = parseFloat(rpmViews.replace(/,/g, '')) > 0
    ? (parseFloat(rpmRevenue.replace(/,/g, '')) / parseFloat(rpmViews.replace(/,/g, ''))) * 1000
    : 0;

  const revenueByNiche = [
    { niche: 'Finance & Investing', lowCPM: '$12.00', highCPM: '$30.00', avgRPM: '$5.50' },
    { niche: 'Technology', lowCPM: '$6.00', highCPM: '$18.00', avgRPM: '$3.20' },
    { niche: 'Business', lowCPM: '$8.00', highCPM: '$22.00', avgRPM: '$4.10' },
    { niche: 'Education', lowCPM: '$4.00', highCPM: '$12.00', avgRPM: '$2.80' },
    { niche: 'Health & Fitness', lowCPM: '$5.00', highCPM: '$15.00', avgRPM: '$3.00' },
    { niche: 'Gaming', lowCPM: '$2.00', highCPM: '$8.00', avgRPM: '$1.80' },
    { niche: 'Entertainment', lowCPM: '$1.50', highCPM: '$6.00', avgRPM: '$1.40' },
    { niche: 'Lifestyle & Vlogs', lowCPM: '$1.00', highCPM: '$5.00', avgRPM: '$1.20' },
    { niche: 'Music', lowCPM: '$0.50', highCPM: '$3.00', avgRPM: '$0.80' },
    { niche: 'Kids & Family', lowCPM: '$0.30', highCPM: '$2.00', avgRPM: '$0.60' },
  ];

  const revenueByCountry = [
    { country: 'United States', cpm: '$7.00 - $30.00', avgRPM: '$4.50' },
    { country: 'United Kingdom', cpm: '$5.00 - $25.00', avgRPM: '$3.80' },
    { country: 'Australia', cpm: '$5.50 - $22.00', avgRPM: '$3.50' },
    { country: 'Canada', cpm: '$5.00 - $20.00', avgRPM: '$3.20' },
    { country: 'Germany', cpm: '$4.00 - $18.00', avgRPM: '$2.90' },
    { country: 'India', cpm: '$0.50 - $4.00', avgRPM: '$0.60' },
    { country: 'Brazil', cpm: '$0.80 - $5.00', avgRPM: '$0.90' },
    { country: 'Nigeria', cpm: '$0.30 - $2.00', avgRPM: '$0.40' },
  ];

  const sponsorTiers = [
    { tier: 'Micro (1K-10K)', priceRange: '$50 - $500', avgCPM: '$5.00', desc: 'Small channels, niche audiences' },
    { tier: 'Mid (10K-100K)', priceRange: '$500 - $5,000', avgCPM: '$8.00', desc: 'Growing channels with engaged audiences' },
    { tier: 'Large (100K-1M)', priceRange: '$5,000 - $50,000', avgCPM: '$12.00', desc: 'Established channels with broad reach' },
    { tier: 'Mega (1M+)', priceRange: '$50,000+', avgCPM: '$20.00', desc: 'Top-tier channels with massive audiences' },
  ];

  const monetizationChecklist = [
    { label: '1,000 subscribers', checked: true, required: true },
    { label: '4,000 watch hours in last 12 months', checked: true, required: true },
    { label: 'AdSense account linked', checked: true, required: true },
    { label: '2-step verification enabled', checked: true, required: true },
    { label: 'No active community strikes', checked: true, required: true },
    { label: 'Original content (no reuploads)', checked: true, required: true },
    { label: 'Advertiser-friendly content', checked: true, required: false },
    { label: 'Regular upload schedule', checked: true, required: false },
    { label: 'Active community engagement', checked: false, required: false },
    { label: 'Channel trailer published', checked: false, required: false },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <CardContent className="p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Revenue Estimates Disclaimer</p>
            <p className="text-xs text-muted-foreground">All revenue figures are estimates based on industry averages. Actual earnings vary based on niche, audience geography, seasonality, and YouTube&apos;s dynamic CPM rates. These tools are for planning purposes only.</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="earnings">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="earnings" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <DollarSign className="h-3 w-3" /> Earnings
          </TabsTrigger>
          <TabsTrigger value="rpm" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <Calculator className="h-3 w-3" /> RPM
          </TabsTrigger>
          <TabsTrigger value="cpm" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <BarChart3 className="h-3 w-3" /> CPM
          </TabsTrigger>
          <TabsTrigger value="ranges" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <TrendingUp className="h-3 w-3" /> Revenue Range
          </TabsTrigger>
          <TabsTrigger value="sponsor" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <CreditCard className="h-3 w-3" /> Sponsor Value
          </TabsTrigger>
          <TabsTrigger value="readiness" className="text-xs gap-1.5 data-[state=active]:bg-yt-red data-[state=active]:text-white">
            <CheckCircle2 className="h-3 w-3" /> Monetization
          </TabsTrigger>
        </TabsList>

        {/* Earnings Estimator */}
        <TabsContent value="earnings" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Earnings Estimator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Monthly Views</label>
                  <Input
                    type="text"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    placeholder="e.g., 100000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CPM ($)</label>
                  <Input
                    type="text"
                    value={cpm}
                    onChange={(e) => setCpm(e.target.value)}
                    placeholder="e.g., 4.50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estimated Monthly Revenue</label>
                  <div className="h-10 rounded-md bg-muted/50 border border-border flex items-center px-3">
                    <span className="text-lg font-bold gradient-text">
                      ${isNaN(estEarnings) ? '0.00' : estEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">(Estimated)</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-muted/30 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">Daily Earnings</p>
                    <p className="text-lg font-bold">${isNaN(estEarnings) ? '0' : (estEarnings / 30).toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">Yearly Earnings</p>
                    <p className="text-lg font-bold">${isNaN(estEarnings) ? '0' : (estEarnings * 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">Per 1K Views</p>
                    <p className="text-lg font-bold">${cpm || '0.00'}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RPM Calculator */}
        <TabsContent value="rpm" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">RPM Calculator</CardTitle>
              <p className="text-xs text-muted-foreground">Revenue Per Mille = (Total Revenue / Total Views) × 1,000</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Views</label>
                  <Input type="text" value={rpmViews} onChange={(e) => setRpmViews(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Revenue ($)</label>
                  <Input type="text" value={rpmRevenue} onChange={(e) => setRpmRevenue(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">RPM</label>
                  <div className="h-10 rounded-md bg-muted/50 border border-border flex items-center px-3">
                    <span className="text-lg font-bold gradient-text">${estRPM.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CPM Reference */}
        <TabsContent value="cpm" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">CPM Calculator</CardTitle>
              <p className="text-xs text-muted-foreground">CPM = (Cost / Impressions) × 1,000</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cost ($)</label>
                  <Input type="text" placeholder="e.g., 450" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Impressions</label>
                  <Input type="text" placeholder="e.g., 100000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CPM ($)</label>
                  <div className="h-10 rounded-md bg-muted/50 border border-border flex items-center px-3">
                    <span className="text-lg font-bold gradient-text">$4.50</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Range */}
        <TabsContent value="ranges" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revenue by Niche</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-medium text-muted-foreground">Niche</th>
                        <th className="text-right py-2 font-medium text-muted-foreground">CPM Range</th>
                        <th className="text-right py-2 font-medium text-muted-foreground">Avg RPM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueByNiche.map((r) => (
                        <tr key={r.niche} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                          <td className="py-2.5 font-medium">{r.niche}</td>
                          <td className="py-2.5 text-right text-muted-foreground">{r.lowCPM} - {r.highCPM}</td>
                          <td className="py-2.5 text-right font-medium text-yt-success">{r.avgRPM}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revenue by Country</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-medium text-muted-foreground">Country</th>
                        <th className="text-right py-2 font-medium text-muted-foreground">CPM Range</th>
                        <th className="text-right py-2 font-medium text-muted-foreground">Avg RPM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueByCountry.map((r) => (
                        <tr key={r.country} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                          <td className="py-2.5 font-medium">{r.country}</td>
                          <td className="py-2.5 text-right text-muted-foreground">{r.cpm}</td>
                          <td className="py-2.5 text-right font-medium text-yt-success">{r.avgRPM}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sponsor Value */}
        <TabsContent value="sponsor" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sponsorship Read Value Estimator</CardTitle>
              <p className="text-xs text-muted-foreground">Estimated sponsorship rates based on channel size</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sponsorTiers.map((tier) => (
                  <div key={tier.tier} className="p-4 rounded-lg border border-border/50 hover:border-yt-red/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{tier.tier}</Badge>
                      <Badge className="bg-yt-red/10 text-yt-red border-yt-red/30 text-xs">{tier.avgCPM}/1K views</Badge>
                    </div>
                    <p className="text-lg font-bold gradient-text">{tier.priceRange}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tier.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> These are estimated ranges. Actual sponsorship rates depend on niche, engagement rate, audience demographics, content quality, and negotiation skills. Rates shown are per dedicated sponsorship segment (60-90 seconds).
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monetization Readiness */}
        <TabsContent value="readiness" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monetization Readiness Checker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monetizationChecklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30">
                    <Checkbox checked={item.checked} disabled />
                    <span className="text-sm flex-1">{item.label}</span>
                    {item.required ? (
                      <Badge variant="outline" className="text-yt-red border-yt-red/30 text-[10px]">Required</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground text-[10px]">Recommended</Badge>
                    )}
                    {item.checked ? (
                      <CheckCircle2 className="h-4 w-4 text-yt-success shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-yt-success/10 border border-yt-success/30 text-center">
                <CheckCircle2 className="h-8 w-8 text-yt-success mx-auto mb-2" />
                <p className="text-sm font-semibold text-yt-success">Channel Meets YPP Requirements!</p>
                <p className="text-xs text-muted-foreground mt-1">Your channel is eligible for the YouTube Partner Program</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
