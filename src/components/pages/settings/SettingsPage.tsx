'use client';

import React, { useState } from 'react';
import { useRouter } from '@/stores/router';
import { useUserStore } from '@/stores/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  User, Bell, Palette, Globe, Link2, Trash2, Shield, Save,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { user, setUser, logout } = useUserStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [trendAlerts, setTrendAlerts] = useState(true);

  const handleSave = () => {
    setUser(user ? { ...user, name, email } : null);
    toast.success('Settings saved successfully!');
  };

  const handleDisconnect = () => {
    toast.info('Channel disconnected');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion requested. You will receive a confirmation email.');
  };

  return (
    <div className="space-y-6">
      {/* Profile */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" /> Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yt-red to-yt-accent flex items-center justify-center text-white text-xl font-bold">
              {name?.split(' ').map((n) => n[0]).join('') || 'U'}
            </div>
            <div>
              <Button variant="outline" size="sm">Change Avatar</Button>
              <p className="text-[11px] text-muted-foreground mt-1">JPG, PNG, or GIF. Max 2MB.</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <Button className="bg-yt-red hover:bg-yt-red/90 text-white" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Connected Channels */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Link2 className="h-4 w-4" /> Connected Channels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">YouTube Channel</p>
                <p className="text-xs text-muted-foreground">Connected as {user?.name || 'User'}</p>
              </div>
            </div>
            <Badge className="bg-yt-success/10 text-yt-success border-yt-success/30">Connected</Badge>
          </div>
          <Button variant="outline" size="sm" className="mt-3" onClick={handleDisconnect}>
            Disconnect Channel
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Email Notifications', desc: 'Receive important updates via email', checked: emailNotifs, onChange: setEmailNotifs },
            { label: 'Push Notifications', desc: 'Browser push notifications for real-time alerts', checked: pushNotifs, onChange: setPushNotifs },
            { label: 'Weekly Digest', desc: 'Receive a weekly summary of your channel analytics', checked: weeklyDigest, onChange: setWeeklyDigest },
            { label: 'Trend Alerts', desc: 'Get notified when new trends are detected in your niche', checked: trendAlerts, onChange: setTrendAlerts },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={item.checked} onCheckedChange={item.onChange} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4" /> Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select defaultValue="gmt">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                  <SelectItem value="est">EST (UTC-5)</SelectItem>
                  <SelectItem value="pst">PST (UTC-8)</SelectItem>
                  <SelectItem value="cat">CAT (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 text-red-500">
            <Shield className="h-4 w-4" /> Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-lg border border-red-500/20">
            <div>
              <p className="text-sm font-medium text-red-500">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all associated data</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-500 border-red-500/30 hover:bg-red-500/10" onClick={handleDeleteAccount}>
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
