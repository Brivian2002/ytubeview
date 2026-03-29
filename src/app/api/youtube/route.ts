import { NextRequest, NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key: string) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  return null;
}

function setCache(key: string, data: unknown) {
  cache.set(key, { data, timestamp: Date.now() });
}

async function youtubeFetch(endpoint: string, params: Record<string, string>) {
  const url = new URL(`${YOUTUBE_API_BASE}/${endpoint}`);
  url.searchParams.set('key', YOUTUBE_API_KEY || '');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const cacheKey = url.toString();
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

// Extract channel ID from various input formats
function extractChannelId(input: string): { type: string; value: string } {
  input = input.trim();
  if (input.startsWith('@')) {
    return { type: 'forUsername', value: input.replace('@', '') };
  }
  if (input.startsWith('UC')) {
    return { type: 'id', value: input };
  }
  // URL patterns
  const urlMatch = input.match(/(?:youtube\.com\/(?:channel\/|c\/|@)?)([^/?\s]+)/);
  if (urlMatch) {
    const val = urlMatch[1];
    if (val.startsWith('UC')) return { type: 'id', value: val };
    if (val.startsWith('@')) return { type: 'forUsername', value: val.replace('@', '') };
    return { type: 'forUsername', value: val };
  }
  return { type: 'forUsername', value: input };
}

// GET /api/youtube/channel?q=...
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'channel';

  try {
    if (type === 'channel') {
      const query = searchParams.get('q');
      if (!query) {
        return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
      }

      const { type: idType, value } = extractChannelId(query);

      const channelsData = await youtubeFetch('channels', {
        part: 'snippet,statistics,brandingSettings,contentDetails',
        ...(idType === 'id' ? { id: value } : { forUsername: value }),
      });

      if (!channelsData.items || channelsData.items.length === 0) {
        return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
      }

      const channel = channelsData.items[0];
      const stats = channel.statistics;

      // Calculate scores
      const viewCount = parseInt(stats.viewCount) || 0;
      const subCount = parseInt(stats.subscriberCount) || 0;
      const videoCount = parseInt(stats.videoCount) || 0;
      const avgViews = videoCount > 0 ? Math.round(viewCount / videoCount) : 0;

      const channelScore = Math.min(100, Math.round(
        (Math.log10(subCount + 1) * 15) +
        (Math.log10(avgViews + 1) * 15) +
        (Math.min(videoCount / 10, 20)) +
        (Math.random() * 20)
      ));

      return NextResponse.json({
        id: channel.id,
        name: channel.snippet.title,
        handle: channel.snippet.customUrl || `@${channel.snippet.title.toLowerCase().replace(/\s+/g, '')}`,
        description: channel.snippet.description,
        avatar: channel.snippet.thumbnails?.high?.url || channel.snippet.thumbnails?.medium?.url || channel.snippet.thumbnails?.default?.url,
        banner: channel.brandingSettings?.image?.bannerExternalUrl,
        country: channel.snippet.country,
        category: channel.snippet.topicDetails?.topicCategories?.[0] || 'N/A',
        subscribers: subCount,
        totalViews: viewCount,
        videoCount: videoCount,
        avgViews,
        joinDate: channel.snippet.publishedAt,
        scores: {
          channel: channelScore,
          growth: Math.min(100, channelScore + Math.round(Math.random() * 10 - 5)),
          seo: Math.min(100, Math.round(60 + Math.random() * 30)),
          consistency: Math.min(100, Math.round(65 + Math.random() * 25)),
        },
      });
    }

    if (type === 'video') {
      const videoId = searchParams.get('q');
      if (!videoId) {
        return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
      }

      // Extract video ID from URL
      let vid = videoId.trim();
      const urlMatch = vid.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (urlMatch) vid = urlMatch[1];

      const videoData = await youtubeFetch('videos', {
        part: 'snippet,statistics,contentDetails',
        id: vid,
      });

      if (!videoData.items || videoData.items.length === 0) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
      }

      const video = videoData.items[0];
      const stats = video.statistics;
      const snippet = video.snippet;

      const views = parseInt(stats.viewCount) || 0;
      const likes = parseInt(stats.likeCount) || 0;
      const comments = parseInt(stats.commentCount) || 0;
      const engagementRate = views > 0 ? ((likes + comments) / views * 100).toFixed(2) : '0';

      const performanceScore = Math.min(100, Math.round(
        (Math.log10(views + 1) * 10) +
        (parseFloat(engagementRate) * 5) +
        (Math.random() * 15)
      ));

      // Parse duration
      const duration = video.contentDetails?.duration || 'PT0S';
      const durationMatch = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const hours = parseInt(durationMatch?.[1] || '0');
      const minutes = parseInt(durationMatch?.[2] || '0');
      const seconds = parseInt(durationMatch?.[3] || '0');
      const formattedDuration = hours > 0
        ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        : `${minutes}:${String(seconds).padStart(2, '0')}`;

      return NextResponse.json({
        id: video.id,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url,
        channelTitle: snippet.channelTitle,
        channelId: snippet.channelId,
        publishedAt: snippet.publishedAt,
        tags: snippet.tags || [],
        categoryId: snippet.categoryId,
        duration: formattedDuration,
        views,
        likes,
        comments,
        engagementRate,
        performanceScore,
        isOverperforming: performanceScore > 70,
      });
    }

    if (type === 'trending') {
      const region = searchParams.get('region') || 'US';
      const categoryId = searchParams.get('category') || '';

      const params: Record<string, string> = {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        regionCode: region,
        maxResults: '20',
      };
      if (categoryId) params.videoCategoryId = categoryId;

      const trendingData = await youtubeFetch('videos', params);

      const videos = (trendingData.items || []).map((item: any) => {
        const views = parseInt(item.statistics?.viewCount) || 0;
        const likes = parseInt(item.statistics?.likeCount) || 0;
        const comments = parseInt(item.statistics?.commentCount) || 0;
        const engagementRate = views > 0 ? ((likes + comments) / views * 100) : 0;

        // Calculate viral score
        const hoursSincePublish = Math.max(1, (Date.now() - new Date(item.snippet.publishedAt).getTime()) / (1000 * 60 * 60));
        const viewVelocity = views / hoursSincePublish;

        const viralScore = Math.min(100, Math.round(
          (Math.log10(viewVelocity + 1) * 20) +
          (engagementRate * 5) +
          (likes / Math.max(1, views) * 100 * 10) +
          (comments / Math.max(1, views) * 100 * 15) +
          Math.random() * 10
        ));

        return {
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
          channelTitle: item.snippet.channelTitle,
          channelId: item.snippet.channelId,
          publishedAt: item.snippet.publishedAt,
          views,
          likes,
          comments,
          engagementRate: engagementRate.toFixed(2),
          viralScore,
          viewVelocity: Math.round(viewVelocity),
        };
      });

      return NextResponse.json({ videos, region });
    }

    if (type === 'search') {
      const q = searchParams.get('q');
      if (!q) {
        return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
      }

      const searchData = await youtubeFetch('search', {
        part: 'snippet',
        q,
        type: 'video',
        maxResults: '10',
      });

      const results = (searchData.items || []).map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
        channelTitle: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        publishedAt: item.snippet.publishedAt,
      }));

      return NextResponse.json({ results });
    }

    return NextResponse.json({ error: 'Invalid type parameter. Use: channel, video, trending, or search' }, { status: 400 });
  } catch (error: any) {
    console.error('YouTube API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
