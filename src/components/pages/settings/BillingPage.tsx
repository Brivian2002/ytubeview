'use client';

import React from 'react';
import { useRouter } from '@/stores/router';
import { useUserStore } from '@/stores/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { PLANS } from '@/types';
import {
  Crown, Receipt, Download, ArrowUpRight, CheckCircle2, AlertCircle,
  Calendar, CreditCard,
} from 'lucide-react';
import { toast } from 'sonner';

const paymentHistory = [
  { id: 'INV-2024-001', date: 'Jan 1, 2025', amount: '$10.00', plan: 'Pro', status: 'Paid' },
  { id: 'INV-2024-012', date: 'Dec 1, 2024', amount: '$10.00', plan: 'Pro', status: 'Paid' },
  { id: 'INV-2024-011', date: 'Nov 1, 2024', amount: '$10.00', plan: 'Pro', status: 'Paid' },
  { id: 'INV-2024-010', date: 'Oct 1, 2024', amount: '$0.00', plan: 'Free', status: 'N/A' },
  { id: 'INV-2024-009', date: 'Sep 1, 2024', amount: '$0.00', plan: 'Free', status: 'N/A' },
];

export default function BillingPage() {
  const { user, setPlan } = useUserStore();
  const currentPlan = user?.plan || 'free';
  const planInfo = PLANS[currentPlan];

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Crown className="h-4 w-4 text-yellow-500" /> Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                currentPlan === 'premium' ? 'bg-yellow-500/10' : currentPlan === 'pro' ? 'bg-yt-red/10' : 'bg-muted'
              }`}>
                <Crown className={`h-6 w-6 ${currentPlan === 'premium' ? 'text-yellow-500' : currentPlan === 'pro' ? 'text-yt-red' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{planInfo.name} Plan</h3>
                  <Badge className={currentPlan === 'premium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' : currentPlan === 'pro' ? 'bg-yt-red/10 text-yt-red border-yt-red/30' : ''}>
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {planInfo.price === 0 ? 'Free forever' : `$${planInfo.price}/month • Renews monthly`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {currentPlan === 'free' && (
                <Button className="bg-yt-red hover:bg-yt-red/90 text-white" onClick={() => { setPlan('pro'); toast.success('Upgraded to Pro!'); }}>
                  <ArrowUpRight className="h-4 w-4 mr-1" /> Upgrade to Pro
                </Button>
              )}
              {currentPlan === 'pro' && (
                <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:opacity-90" onClick={() => { setPlan('premium'); toast.success('Upgraded to Premium!'); }}>
                  <ArrowUpRight className="h-4 w-4 mr-1" /> Upgrade to Premium
                </Button>
              )}
              {currentPlan !== 'free' && (
                <Button variant="outline" onClick={() => { setPlan('free'); toast.info('Downgraded to Free plan'); }}>
                  Downgrade
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Searches Today', used: 23, total: planInfo.searchesPerDay, icon: '🔍' },
          { label: 'Exports This Month', used: 8, total: currentPlan === 'free' ? 5 : 50, icon: '📄' },
          { label: 'Days Until Renewal', used: 18, total: 30, icon: '📅' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{stat.label}</span>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl font-bold">{stat.used}</span>
                <span className="text-sm text-muted-foreground">/ {stat.total === 999 ? '∞' : stat.total}</span>
              </div>
              <Progress value={Math.min((stat.used / stat.total) * 100, 100)} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plan Comparison */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Plan Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium text-muted-foreground">Feature</th>
                  <th className="text-center py-2 font-medium text-muted-foreground">Free</th>
                  <th className="text-center py-2 font-medium text-yt-red">Pro</th>
                  <th className="text-center py-2 font-medium text-yellow-500">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Price', free: '$0', pro: '$10/mo', premium: '$30/mo' },
                  { feature: 'Daily Searches', free: '5', pro: '100', premium: 'Unlimited' },
                  { feature: 'Channel Analytics', free: 'Basic', pro: 'Advanced', premium: 'Full + Bulk' },
                  { feature: 'SEO Studio', free: '—', pro: '✓', premium: '✓' },
                  { feature: 'Thumbnail Lab', free: '—', pro: '✓', premium: '✓' },
                  { feature: 'Revenue Tools', free: '—', pro: '✓', premium: '✓' },
                  { feature: 'API Access', free: '—', pro: '—', premium: '✓' },
                  { feature: 'Priority Support', free: '—', pro: '✓', premium: '✓' },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 text-muted-foreground">{row.feature}</td>
                    <td className="py-2.5 text-center">{row.free}</td>
                    <td className="py-2.5 text-center">{row.pro}</td>
                    <td className="py-2.5 text-center">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Receipt className="h-4 w-4" /> Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium text-muted-foreground">Invoice</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Plan</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">Amount</th>
                  <th className="text-center py-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-2 font-medium text-muted-foreground">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="py-2.5 font-mono text-xs">{p.id}</td>
                    <td className="py-2.5">{p.date}</td>
                    <td className="py-2.5">{p.plan}</td>
                    <td className="py-2.5 text-right">{p.amount}</td>
                    <td className="py-2.5 text-center">
                      <Badge variant="outline" className={p.status === 'Paid' ? 'text-yt-success border-yt-success/30' : 'text-muted-foreground'}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right">
                      {p.status === 'Paid' && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cancel Subscription */}
      {currentPlan !== 'free' && (
        <Card className="border-red-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-500">Cancel Subscription</p>
              <p className="text-xs text-muted-foreground">Your access continues until the end of your billing period</p>
            </div>
            <Button variant="outline" className="text-red-500 border-red-500/30 hover:bg-red-500/10" onClick={() => { setPlan('free'); toast.info('Subscription cancelled'); }}>
              Cancel Subscription
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Payment Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
            <div className="w-10 h-7 rounded bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white text-[10px] font-bold">
              VISA
            </div>
            <div>
              <p className="text-sm font-medium">•••• •••• •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2026</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">Update</Button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">
            Payments are processed securely through <strong>Paystack</strong>. We never store your full card details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
