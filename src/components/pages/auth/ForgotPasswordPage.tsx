'use client';

import React, { useState } from 'react';
import { useRouter } from '@/stores/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      toast.success('Reset link sent!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('login')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Ytubeview" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-lg gradient-text">Ytubeview</span>
          </div>
        </div>

        <Card>
          {!sent ? (
            <>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Reset your password</CardTitle>
                <CardDescription>Enter your email and we&apos;ll send you a reset link</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-yt-red hover:bg-yt-red/90 text-white" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Remember your password?{' '}
                  <button onClick={() => navigate('login')} className="text-yt-red hover:underline font-medium">
                    Sign in
                  </button>
                </p>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-yt-success/10 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-yt-success" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Check your email</CardTitle>
                <CardDescription className="text-center">
                  We&apos;ve sent a password reset link to <strong>{email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
                  Didn&apos;t receive it? Send again
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => navigate('login')}>
                  Back to Sign In
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
