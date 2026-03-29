'use client';

import React, { useState } from 'react';
import { useRouter } from '@/stores/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, X, ArrowLeft, Zap, Crown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PLANS } from '@/types';

const allFeatures = [
  { feature: 'Searches per day', free: '5', pro: '100', premium: '999' },
  { feature: 'Channel Analytics', free: 'Basic', pro: 'Advanced', premium: 'Full + Bulk' },
  { feature: 'Video Analytics', free: 'Basic', pro: 'Advanced', premium: 'Full + AI Insights' },
  { feature: 'SEO Studio', free: false, pro: true, premium: true },
  { feature: 'Thumbnail Lab', free: false, pro: true, premium: true },
  { feature: 'Transcript Lab', free: false, pro: true, premium: true },
  { feature: 'Revenue Tools', free: false, pro: true, premium: true },
  { feature: 'Trending & Viral', free: 'Limited', pro: 'Full', premium: 'Full + Early Access' },
  { feature: 'Robots.txt Generator', free: true, pro: true, premium: true },
  { feature: 'Sitemap Generator', free: true, pro: true, premium: true },
  { feature: 'Competitor Tracking', free: false, pro: 'Basic', premium: 'Advanced + Bulk' },
  { feature: 'Historical Data', free: '30 days', pro: '6 months', premium: '2 years' },
  { feature: 'Saved Projects', free: false, pro: true, premium: true },
  { feature: 'Export Options', free: 'Limited', pro: 'PDF, CSV', premium: 'PDF, CSV, DOCX' },
  { feature: 'API Access', free: false, pro: false, premium: 'On Request' },
  { feature: 'Priority Support', free: false, pro: true, premium: true },
  { feature: 'Multi-channel Compare', free: false, pro: false, premium: true },
];

const billingFaqs = [
  { q: 'How does billing work?', a: 'You\'ll be billed monthly on the date you subscribed. Payments are processed securely through Paystack with support for cards and mobile money (for Ghana).' },
  { q: 'Can I switch plans?', a: 'Yes! You can upgrade or downgrade your plan at any time from your billing page. Changes take effect immediately, and billing is prorated.' },
  { q: 'Is there a free trial?', a: 'We offer a generous Free tier that never expires. For Pro and Premium, we offer a 7-day money-back guarantee if you\'re not satisfied.' },
  { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, and mobile money payments through Paystack. All transactions are encrypted and secure.' },
  { q: 'Can I get a refund?', a: 'We offer a 7-day money-back guarantee for new subscribers. Contact our support team within 7 days of your first payment to request a refund.' },
];

export default function PricingPage() {
  const { navigate } = useRouter();
  const [annual, setAnnual] = useState(false);

  const planIcons = { free: Sparkles, pro: Zap, premium: Crown };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('home')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Ytubeview" className="w-7 h-7 rounded" />
              <span className="font-bold gradient-text">Ytubeview</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('login')}>Log In</Button>
            <Button size="sm" className="bg-yt-red hover:bg-yt-red/90 text-white" onClick={() => navigate('signup')}>Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Choose Your <span className="gradient-text">Growth Plan</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Start free, upgrade when you\'re ready. No hidden fees, cancel anytime.
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className={cn('text-sm', !annual && 'font-semibold')}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={cn(
                'relative w-12 h-6 rounded-full transition-colors',
                annual ? 'bg-yt-red' : 'bg-muted'
              )}
            >
              <span
                className={cn(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                  annual ? 'left-7' : 'left-1'
                )}
              />
            </button>
            <span className={cn('text-sm', annual && 'font-semibold')}>
              Annual <Badge variant="outline" className="text-yt-red border-yt-red/30 text-[10px] ml-1">Save 20%</Badge>
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(PLANS).map(([key, plan]) => {
              const Icon = planIcons[key as keyof typeof planIcons];
              const monthlyPrice = plan.price;
              const price = annual ? Math.round(monthlyPrice * 0.8) : monthlyPrice;

              return (
                <Card key={key} className={cn(
                  'relative overflow-hidden transition-all',
                  key === 'pro' && 'border-yt-red/50 shadow-xl shadow-yt-red/10 scale-[1.02]',
                  key === 'premium' && 'border-yellow-500/50'
                )}>
                  {key === 'pro' && (
                    <div className="absolute top-0 left-0 right-0 bg-yt-red text-white text-xs font-semibold text-center py-1">
                      MOST POPULAR
                    </div>
                  )}
                  {key === 'premium' && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-semibold text-center py-1">
                      BEST VALUE
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        key === 'free' ? 'bg-muted' : key === 'pro' ? 'bg-yt-red/10' : 'bg-yellow-500/10'
                      )}>
                        <Icon className={cn(
                          'h-5 w-5',
                          key === 'free' ? 'text-muted-foreground' : key === 'pro' ? 'text-yt-red' : 'text-yellow-500'
                        )} />
                      </div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <div className="mb-6">
                      <span className="text-4xl font-extrabold">
                        {price === 0 ? 'Free' : `$${price}`}
                      </span>
                      {price > 0 && <span className="text-muted-foreground text-sm">/month</span>}
                      {annual && price > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          ${Math.round(monthlyPrice * 12 * 0.8)}/year (billed annually)
                        </p>
                      )}
                    </div>
                    <Button
                      className={cn(
                        'w-full mb-6',
                        key === 'pro' ? 'bg-yt-red hover:bg-yt-red/90 text-white' :
                        key === 'premium' ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:opacity-90' : ''
                      )}
                      variant={key === 'free' ? 'outline' : 'default'}
                      onClick={() => navigate('signup')}
                    >
                      {price === 0 ? 'Get Started' : 'Subscribe Now'}
                    </Button>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className={cn(
                            'h-4 w-4 mt-0.5 shrink-0',
                            key === 'pro' ? 'text-yt-red' : key === 'premium' ? 'text-yellow-500' : 'text-yt-success'
                          )} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Feature <span className="gradient-text">Comparison</span>
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold">Free</th>
                      <th className="text-center p-4 font-semibold">
                        <span className="text-yt-red">Pro</span>
                      </th>
                      <th className="text-center p-4 font-semibold">
                        <span className="text-yellow-500">Premium</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFeatures.map((row) => (
                      <tr key={row.feature} className="border-b border-border/50 last:border-0">
                        <td className="p-4 text-muted-foreground">{row.feature}</td>
                        <td className="p-4 text-center">
                          {typeof row.free === 'boolean' ? (
                            row.free ? <Check className="h-4 w-4 text-yt-success mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                          ) : (
                            <span>{row.free}</span>
                          )}
                        </td>
                        <td className="p-4 text-center bg-muted/20">
                          {typeof row.pro === 'boolean' ? (
                            row.pro ? <Check className="h-4 w-4 text-yt-success mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                          ) : (
                            <span className="font-medium">{row.pro}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.premium === 'boolean' ? (
                            row.premium ? <Check className="h-4 w-4 text-yt-success mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                          ) : (
                            <span className="font-medium">{row.premium}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Billing FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Billing <span className="gradient-text">FAQ</span>
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {billingFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-sm text-muted-foreground">
              <strong>Payment Processing:</strong> All payments are securely processed through <span className="font-semibold text-foreground">Paystack</span>. 
              We support Visa, Mastercard, and mobile money payments. Your payment information is encrypted and never stored on our servers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start Growing <span className="gradient-text">Today</span>
          </h2>
          <p className="text-muted-foreground mb-6">Join thousands of creators already using Ytubeview</p>
          <div className="flex justify-center gap-3">
            <Button className="bg-yt-red hover:bg-yt-red/90 text-white" onClick={() => navigate('signup')}>
              Get Started Free
            </Button>
            <Button variant="outline" onClick={() => navigate('contact')}>Contact Sales</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
