// YouTube API helper for client-side data fetching

const API_BASE = '/api/youtube';

export interface ChannelData {
  id: string;
  name: string;
  handle: string;
  description: string;
  avatar: string;
  banner?: string;
  country?: string;
  category: string;
  subscribers: number;
  totalViews: number;
  videoCount: number;
  avgViews: number;
  joinDate: string;
  scores: {
    channel: number;
    growth: number;
    seo: number;
    consistency: number;
  };
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  tags: string[];
  categoryId: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  engagementRate: string;
  performanceScore: number;
  isOverperforming: boolean;
}

export interface TrendingVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  views: number;
  likes: number;
  comments: number;
  engagementRate: string;
  viralScore: number;
  viewVelocity: number;
}

export async function fetchChannel(query: string): Promise<ChannelData> {
  const res = await fetch(`${API_BASE}?type=channel&q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to fetch channel data');
  }
  return res.json();
}

export async function fetchVideo(videoId: string): Promise<VideoData> {
  const res = await fetch(`${API_BASE}?type=video&q=${encodeURIComponent(videoId)}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to fetch video data');
  }
  return res.json();
}

export async function fetchTrending(region: string = 'US', category?: string): Promise<{ videos: TrendingVideo[] }> {
  const params = new URLSearchParams({ type: 'trending', region });
  if (category) params.set('category', category);
  const res = await fetch(`${API_BASE}?${params}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to fetch trending videos');
  }
  return res.json();
}

export async function searchYouTube(query: string): Promise<{ results: any[] }> {
  const res = await fetch(`${API_BASE}?type=search&q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to search');
  }
  return res.json();
}

// Format large numbers for display
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

// Format date for display
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Calculate relative time
export function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}
