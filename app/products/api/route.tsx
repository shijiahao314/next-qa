import { mongodbConfig } from '@/app/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const res = await fetch(`https://${mongodbConfig.host}:${mongodbConfig.port}/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY
    }
  });
  const product = await res.json();

  return Response.json({ product });
}
