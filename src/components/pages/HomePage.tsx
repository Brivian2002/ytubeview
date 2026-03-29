'use client';

import React, { useState } from 'react';
import { useRouter } from '@/stores/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTheme } from 'next-themes';
import {
  BarChart3, Tv, Search, Image, FileText, TrendingUp, DollarSign,
  Bot, Shield, Check, ArrowRight, Star, Moon, Sun, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PLANS } from '@/types';

const features = [
  { icon: Tv, title: 'Channel Analyzer', desc: 'Deep-dive into any YouTube channel. Track growth, engagement patterns, and audience demographics.' },
  { icon: BarChart3, title: 'Video Intelligence', desc: 'Analyze video performance with AI-powered scoring, ranking signals, and competitor benchmarking.' },
  { icon: Search, title: 'SEO Studio', desc: 'Generate optimized titles, descriptions, tags, and hashtags that drive views and clicks.' },
  { icon: Image, title: 'Thumbnail Lab', desc: 'Preview, resize, compare thumbnails and get AI-powered CTR suggestions.' },
  { icon: FileText, title: 'Transcript Lab', desc: 'Extract video transcripts, generate summaries, and identify key topics and hooks.' },
  { icon: TrendingUp, title: 'Trending & Viral', desc: 'Spot viral trends early with real-time tracking across niches and regions.' },
  { icon: DollarSign, title: 'Revenue Tools', desc: 'Estimate earnings, calculate RPM/CPM, and check monetization readiness.' },
  { icon: Bot, title: 'Technical SEO', desc: 'Generate robots.txt and sitemaps optimized for YouTube creator websites.' },
];

const steps = [
  { step: '01', title: 'Connect & Analyze', desc: 'Enter any YouTube channel URL or video link to instantly get comprehensive analytics and insights.' },
  { step: '02', title: 'Optimize & Create', desc: 'Use AI-powered tools to optimize your titles, descriptions, thumbnails, and tags for maximum visibility.' },
  { step: '03', title: 'Grow & Monetize', desc: 'Track your growth, discover trends, estimate revenue, and scale your YouTube channel effectively.' },
];

const testimonials = [
  { name: 'Alex Rivera', role: 'Tech Creator, 250K subs', text: 'Ytubeview helped me increase my CTR by 340% using the SEO Studio. The keyword suggestions are incredibly accurate.', rating: 5 },
  { name: 'Sarah Chen', role: 'Lifestyle Vlogger, 180K subs', text: 'The Trending tool helped me catch the minimalist living wave early. That single video got 2M views!', rating: 5 },
  { name: 'Marcus Johnson', role: 'Gaming Creator, 500K subs', text: 'Revenue Tools gave me the clarity I needed to plan my content strategy. I tripled my AdSense earnings.', rating: 5 },
  { name: 'Priya Patel', role: 'Education Creator, 90K subs', text: 'The Thumbnail Lab A/B comparison feature is a game-changer. My thumbnails are finally getting noticed.', rating: 5 },
];

const faqs = [
  { q: 'What is Ytubeview?', a: 'Ytubeview is an all-in-one YouTube intelligence platform that provides analytics, SEO optimization, trending insights, revenue estimation, and growth tools for content creators and marketers.' },
  { q: 'Is there a free plan?', a: 'Yes! Our Free plan includes 5 searches per day with basic channel and video statistics, limited trend tracking, and basic exports.' },
  { q: 'How accurate are the analytics?', a: 'Our analytics are based on publicly available YouTube data combined with proprietary algorithms. Revenue estimates use industry-standard CPM data but should be treated as approximations.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. You can cancel your Pro or Premium subscription at any time from your billing page. You\'ll retain access until the end of your billing period.' },
  { q: 'Do you support multiple channels?', a: 'Pro users can track multiple channels, and Premium users get unlimited multi-channel comparisons with bulk analysis capabilities.' },
  { q: 'How does the SEO Studio work?', a: 'Our SEO Studio uses AI to analyze trending topics and generate optimized titles, descriptions, tags, and hashtags tailored to your niche and audience.' },
];

export default function HomePage() {
  const { navigate } = useRouter();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Ytubeview" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-lg gradient-text">Ytubeview</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('pricing')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</button>
            <button onClick={() => navigate('contact')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" onClick={() => navigate('login')}>Log In</Button>
            <Button className="bg-yt-red hover:bg-yt-red/90 text-white" onClick={() => navigate('signup')}>
              Get Started Free
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3">
            <button onClick={() => { navigate('pricing'); setMobileMenuOpen(false); }} className="block w-full text-left text-sm py-2">Pricing</button>
            <button onClick={() => { navigate('contact'); setMobileMenuOpen(false); }} className="block w-full text-left text-sm py-2">Contact</button>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => { navigate('login'); setMobileMenuOpen(false); }}>Log In</Button>
              <Button className="flex-1 bg-yt-red hover:bg-yt-red/90 text-white" onClick={() => { navigate('signup'); setMobileMenuOpen(false); }}>Sign Up</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yt-red/5 via-transparent to-yt-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(233,69,96,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 md:pt-32 md:pb-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 border-yt-red/30 text-yt-red bg-yt-red/5">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trusted by 15,000+ YouTube Creators
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Unlock{' '}
              <span className="gradient-text">YouTube Growth</span>
              <br />
              Intelligence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The all-in-one platform for channel analytics, SEO optimization, trend discovery, and revenue intelligence. Grow smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-yt-red hover:bg-yt-red/90 text-white text-base px-8 h-12" onClick={() => navigate('signup')}>
                Start Free — No Credit Card
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 h-12" onClick={() => navigate('pricing')}>
                View Pricing
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              5 free searches/day • No credit card required • Cancel anytime
            </p>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Channels Analyzed', value: '2.4M+' },
              { label: 'Videos Tracked', value: '48M+' },
              { label: 'Active Users', value: '15K+' },
              { label: 'Avg. CTR Boost', value: '+340%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Grow on YouTube</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed for creators, marketers, and agencies who are serious about YouTube growth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <Card key={f.title} className="group hover:border-yt-red/30 hover:shadow-lg hover:shadow-yt-red/5 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-yt-red/10 flex items-center justify-center mb-3 group-hover:bg-yt-red/20 transition-colors">
                    <f.icon className="h-5 w-5 text-yt-red" />
                  </div>
                  <h3 className="font-semibold mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-yt-red/10 border-2 border-yt-red/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-yt-red font-bold text-lg">{s.step}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-muted-foreground">Start free and upgrade as you grow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {Object.entries(PLANS).map(([key, plan]) => (
              <Card
                key={key}
                className={cn(
                  'relative overflow-hidden',
                  key === 'pro' && 'border-yt-red/50 shadow-lg shadow-yt-red/10 scale-105'
                )}
              >
                {key === 'pro' && (
                  <div className="absolute top-0 left-0 right-0 bg-yt-red text-white text-xs font-semibold text-center py-1">
                    MOST POPULAR
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-extrabold">
                      {plan.price === 0 ? 'Free' : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && <span className="text-muted-foreground text-sm">/month</span>}
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-yt-success mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={cn(
                      'w-full',
                      key === 'pro'
                        ? 'bg-yt-red hover:bg-yt-red/90 text-white'
                        : key === 'premium'
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:opacity-90'
                          : ''
                    )}
                    variant={key === 'free' ? 'outline' : 'default'}
                    onClick={() => navigate('signup')}
                  >
                    {plan.price === 0 ? 'Get Started' : 'Upgrade Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="link" onClick={() => navigate('pricing')}>
              View full pricing comparison <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Creators</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yt-red to-yt-accent flex items-center justify-center text-white font-bold text-sm">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl bg-gradient-to-r from-yt-red to-yt-accent p-8 md:p-16 text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Channel?</h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Join 15,000+ creators who use Ytubeview to grow faster and earn more on YouTube.
              </p>
              <Button size="lg" variant="secondary" className="text-base px-8 h-12" onClick={() => navigate('signup')}>
                Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Ytubeview" className="w-7 h-7 rounded" />
                <span className="font-bold gradient-text">Ytubeview</span>
              </div>
              <p className="text-sm text-muted-foreground">YouTube intelligence, analytics, and growth platform for creators.</p>
            </div>
            {[
              { title: 'Top Categories', links: ['Music', 'Gaming', 'Tech', 'Education'] },
              { title: 'Top Subscribers', links: ['MrBeast', 'T-Series', 'Cocomelon', 'SET India'] },
              { title: 'Top Views', links: ['Baby Shark', 'Despacito', 'Shape of You', 'See You Again'] },
              { title: 'Most Subs Gained', links: ['MrBeast', 'Kids Diana Show', 'Vlad and Niki', 'Like Nastya'] },
              { title: 'Quick Links', links: ['Pricing', 'Contact', 'Privacy Policy', 'Terms of Service'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ytubeview. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              POWERED BY <span className="font-semibold text-foreground">Bright Dumashie</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
