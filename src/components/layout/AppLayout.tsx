'use client';

import React, { useState } from 'react';
import { useRouter } from '@/stores/router';
import { useUserStore } from '@/stores/user';
import { SIDEBAR_GROUPS, ROUTES } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  Tv,
  PlaySquare,
  Image,
  Search,
  FileText,
  TrendingUp,
  DollarSign,
  Bot,
  Map,
  Settings,
  Receipt,
  LogOut,
  Menu,
  Bell,
  Moon,
  Sun,
  ChevronLeft,
  Shield,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Tv,
  PlaySquare,
  Image,
  Search,
  FileText,
  TrendingUp,
  DollarSign,
  Bot,
  Map,
  Settings,
  Receipt,
  Shield,
};

interface SidebarContentProps {
  collapsed: boolean;
  currentRoute: string;
  user: { id: string; email: string; name: string; image: string | null; plan: string } | null;
  planBadgeColor: string;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

function SidebarContent({ collapsed, currentRoute, user, planBadgeColor, onNavigate, onLogout }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-4">
        <img src="/logo.png" alt="Ytubeview" className="w-8 h-8 rounded-lg" />
        {!collapsed && (
          <span className="font-bold text-lg gradient-text">Ytubeview</span>
        )}
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-2">
        {SIDEBAR_GROUPS.map((group) => {
          const routeInfos = group.routes.map(
            (r) => ROUTES.find((ri) => ri.path === r)!
          );
          return (
            <div key={group.label} className="mb-4">
              {!collapsed && (
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">
                  {group.label}
                </p>
              )}
              {routeInfos.map((routeInfo) => {
                if (!routeInfo) return null;
                const Icon = iconMap[routeInfo.icon || ''] || LayoutDashboard;
                const isActive = currentRoute === routeInfo.path;
                const requiresPlan = routeInfo.requirePlan?.length
                  ? !routeInfo.requirePlan.includes(user?.plan || 'free')
                  : false;

                return (
                  <Tooltip key={routeInfo.path} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onNavigate(routeInfo.path)}
                        className={cn(
                          'flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'bg-yt-red/10 text-yt-red sidebar-active'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                          requiresPlan && 'opacity-60',
                          collapsed && 'justify-center px-2'
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="truncate">{routeInfo.label}</span>
                            {requiresPlan && (
                              <Badge
                                variant="outline"
                                className="ml-auto text-[10px] px-1.5 py-0"
                              >
                                PRO
                              </Badge>
                            )}
                          </>
                        )}
                      </button>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {routeInfo.label}
                        {requiresPlan && ' (Pro+)'}
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
          );
        })}
      </ScrollArea>

      <Separator />

      <div className="px-3 py-3">
        {user && !collapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || ''} />
              <AvatarFallback className="bg-yt-red text-white text-xs">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <Badge
                variant="outline"
                className={cn('text-[10px] capitalize', planBadgeColor)}
              >
                {user.plan}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : user && collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || ''} />
              <AvatarFallback className="bg-yt-red text-white text-xs">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentRoute, navigate } = useRouter();
  const { user, logout } = useUserStore();
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (route: string) => {
    navigate(route as Parameters<typeof navigate>[0]);
    setMobileOpen(false);
  };

  const planBadgeColor =
    user?.plan === 'premium'
      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      : user?.plan === 'pro'
        ? 'bg-yt-red/20 text-yt-red border-yt-red/30'
        : 'bg-muted text-muted-foreground border-border';

  const routeLabel =
    ROUTES.find((r) => r.path === currentRoute)?.label || 'Dashboard';

  const sidebarProps: SidebarContentProps = {
    collapsed,
    currentRoute,
    user,
    planBadgeColor,
    onNavigate: handleNavigate,
    onLogout: logout,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <SidebarContent {...sidebarProps} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-6 right-[-14px] z-10 hidden lg:flex items-center justify-center w-7 h-7 rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors"
        >
          <ChevronLeft
            className={cn(
              'h-3.5 w-3.5 transition-transform',
              collapsed && 'rotate-180'
            )}
          />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SidebarContent {...sidebarProps} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold hidden sm:block">{routeLabel}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center bg-muted/50 rounded-lg px-3 py-1.5 border border-border/50 max-w-xs">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search channels, videos..."
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
              />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yt-red rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      Channel reached 100K subscribers! 🎉
                    </span>
                    <span className="text-xs text-muted-foreground">
                      2 hours ago
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      New viral trend detected in Tech niche
                    </span>
                    <span className="text-xs text-muted-foreground">
                      5 hours ago
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      Weekly analytics report is ready
                    </span>
                    <span className="text-xs text-muted-foreground">
                      1 day ago
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback className="bg-yt-red text-white text-xs">
                      {user?.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name || 'User'}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {user?.email || 'user@email.com'}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate('billing')}>
                  <Receipt className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                {user?.plan === 'premium' && (
                  <DropdownMenuItem onClick={() => handleNavigate('admin')}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
