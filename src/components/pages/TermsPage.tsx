'use client';

import React from 'react';
import { useRouter } from '@/stores/router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-background">
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
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          {[
            { title: '1. Acceptance of Terms', content: 'By accessing and using Ytubeview, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.' },
            { title: '2. Description of Service', content: 'Ytubeview provides YouTube analytics, SEO optimization tools, trending insights, revenue estimation, and growth intelligence tools. Our services analyze publicly available YouTube data and do not access private YouTube accounts.' },
            { title: '3. User Accounts', content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must be at least 13 years old to create an account.' },
            { title: '4. Subscription Plans', content: 'We offer Free, Pro, and Premium subscription plans. Paid plans are billed monthly through Paystack. Subscription fees are non-refundable except as required by applicable law or during the 7-day money-back guarantee period for new subscribers.' },
            { title: '5. Acceptable Use', content: 'You agree not to: (a) use the service for any unlawful purpose; (b) attempt to gain unauthorized access to any part of the service; (c) use automated tools to scrape data from our service; (d) resell or redistribute our data without permission; (e) misuse the service to harass or harm others.' },
            { title: '6. Intellectual Property', content: 'All content, features, and functionality of Ytubeview are owned by Bright Dumashie and are protected by copyright, trademark, and other intellectual property laws. YouTube data analyzed by our service remains the property of its respective owners.' },
            { title: '7. Revenue Estimates Disclaimer', content: 'Revenue estimates, CPM calculations, and earnings projections provided by our tools are estimates based on publicly available data and industry averages. They should not be considered as financial advice or guarantees of actual earnings.' },
            { title: '8. Limitation of Liability', content: 'Ytubeview shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the service. Our total liability shall not exceed the amount you paid for the service in the 12 months preceding the claim.' },
            { title: '9. Termination', content: 'We may terminate or suspend your account at any time for any reason, including violation of these terms. You may cancel your subscription at any time from your billing settings.' },
            { title: '10. Governing Law', content: 'These terms shall be governed by the laws of Ghana, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Ghana.' },
            { title: '11. Changes to Terms', content: 'We reserve the right to modify these terms at any time. Material changes will be communicated via email or notification. Continued use of the service after changes constitutes acceptance.' },
            { title: '12. Contact', content: 'For questions about these Terms of Service, please contact us at legal@ytubeview.com.' },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
