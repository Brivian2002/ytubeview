'use client';

import React from 'react';
import { useRouter } from '@/stores/router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          {[
            { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This includes your name, email address, and payment information. We also collect usage data including search queries, pages visited, and tool usage patterns.' },
            { title: '2. How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send technical notices and support messages, and respond to your comments and questions. We may also use the information to send promotional communications, monitor and analyze trends, and detect and prevent fraud.' },
            { title: '3. Information Sharing', content: 'We do not sell or rent your personal information to third parties. We may share your information with service providers who perform services on our behalf, such as payment processing (Paystack), hosting, and analytics. We may also share information in response to legal requests or to protect our rights.' },
            { title: '4. Data Security', content: 'We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security. Your payment data is processed securely through Paystack and is never stored on our servers.' },
            { title: '5. YouTube Data', content: 'Our services analyze publicly available YouTube data. We do not access private YouTube accounts or videos. All channel and video data analyzed through our platform is publicly accessible information.' },
            { title: '6. Cookies and Tracking', content: 'We use cookies and similar technologies to collect information about your browsing activity. You can control cookies through your browser settings. We use essential cookies for authentication and optional analytics cookies to improve our services.' },
            { title: '7. Your Rights', content: 'You have the right to access, correct, or delete your personal information. You can manage your account settings or contact us to exercise these rights. You may also opt out of promotional communications at any time.' },
            { title: '8. Third-Party Links', content: 'Our services may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to read their privacy policies.' },
            { title: '9. Children\'s Privacy', content: 'Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.' },
            { title: '10. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.' },
            { title: '11. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at privacy@ytubeview.com.' },
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
