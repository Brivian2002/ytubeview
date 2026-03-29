'use client';

import React, { Suspense, lazy, useEffect } from 'react';
import { useRouter } from '@/stores/router';
import { useUserStore } from '@/stores/user';
import { ROUTES, type AppRoute } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load page components
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const PricingPage = lazy(() => import('@/components/pages/PricingPage'));
const LoginPage = lazy(() => import('@/components/pages/auth/LoginPage'));
const SignupPage = lazy(() => import('@/components/pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('@/components/pages/auth/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('@/components/pages/DashboardPage'));
const ChannelAnalyzerPage = lazy(() => import('@/components/pages/analyzer/ChannelAnalyzerPage'));
const VideoAnalyzerPage = lazy(() => import('@/components/pages/analyzer/VideoAnalyzerPage'));
const ThumbnailLabPage = lazy(() => import('@/components/pages/tools/ThumbnailLabPage'));
const SeoStudioPage = lazy(() => import('@/components/pages/tools/SeoStudioPage'));
const TranscriptLabPage = lazy(() => import('@/components/pages/tools/TranscriptLabPage'));
const TrendingPage = lazy(() => import('@/components/pages/trending/TrendingPage'));
const RevenueToolsPage = lazy(() => import('@/components/pages/revenue/RevenueToolsPage'));
const RobotsGeneratorPage = lazy(() => import('@/components/pages/settings/RobotsGeneratorPage'));
const SitemapGeneratorPage = lazy(() => import('@/components/pages/settings/SitemapGeneratorPage'));
const SettingsPage = lazy(() => import('@/components/pages/settings/SettingsPage'));
const BillingPage = lazy(() => import('@/components/pages/settings/BillingPage'));
const AdminPage = lazy(() => import('@/components/pages/admin/AdminPage'));
const PrivacyPolicyPage = lazy(() => import('@/components/pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('@/components/pages/TermsPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));

// Public routes that don't require authentication
const PUBLIC_ROUTES: AppRoute[] = [
  'home', 'pricing', 'login', 'signup', 'forgot-password',
  'privacy-policy', 'terms-of-service', 'contact',
];

const pageComponents: Record<AppRoute, React.LazyExoticComponent<React.ComponentType>> = {
  'home': HomePage,
  'pricing': PricingPage,
  'login': LoginPage,
  'signup': SignupPage,
  'forgot-password': ForgotPasswordPage,
  'dashboard': DashboardPage,
  'channel-analyzer': ChannelAnalyzerPage,
  'video-analyzer': VideoAnalyzerPage,
  'thumbnail-lab': ThumbnailLabPage,
  'seo-studio': SeoStudioPage,
  'transcript-lab': TranscriptLabPage,
  'trending': TrendingPage,
  'revenue-tools': RevenueToolsPage,
  'robots-generator': RobotsGeneratorPage,
  'sitemap-generator': SitemapGeneratorPage,
  'settings': SettingsPage,
  'billing': BillingPage,
  'admin': AdminPage,
  'privacy-policy': PrivacyPolicyPage,
  'terms-of-service': TermsPage,
  'contact': ContactPage,
};

function PageLoader() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
      <Skeleton className="h-64 rounded-lg" />
      <Skeleton className="h-48 rounded-lg" />
    </div>
  );
}

export default function Home() {
  const { currentRoute, previousRoute } = useRouter();
  const { isAuthenticated } = useUserStore();

  const isPublicRoute = PUBLIC_ROUTES.includes(currentRoute);
  const PageComponent = pageComponents[currentRoute];

  // Redirect logic for auth-required routes
  const routeInfo = ROUTES.find((r) => r.path === currentRoute);
  const requiresAuth = routeInfo?.requireAuth;

  useEffect(() => {
    if (requiresAuth && !isAuthenticated && currentRoute !== 'login' && currentRoute !== 'signup') {
      // Don't auto-redirect - let user see login option
    }
  }, [currentRoute, isAuthenticated, requiresAuth]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentRoute}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className={isPublicRoute ? '' : 'h-screen'}
      >
        {isPublicRoute ? (
          // Public route - render page directly
          <Suspense fallback={<PageLoader />}>
            <PageComponent />
          </Suspense>
        ) : (
          // Authenticated route - render with AppLayout
          <AppLayout>
            <Suspense fallback={<PageLoader />}>
              <PageComponent />
            </Suspense>
          </AppLayout>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
