export async function GET() {
  return Response.json({ 
    hasKey: !!process.env.YOUTUBE_API_KEY,
    keyPrefix: process.env.YOUTUBE_API_KEY?.substring(0, 10)
  });
}
