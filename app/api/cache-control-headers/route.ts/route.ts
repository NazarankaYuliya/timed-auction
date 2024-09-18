export async function GET() {
  return new Response("Cache Control example", {
    status: 200,
    headers: {
      "Cache-Control": "max-age=2592000",
      "CDN-Cache-Control": "max-age=3600",
      "Vercel-CDN-Cache-Control": "max-age=3600",
    },
  });
}
