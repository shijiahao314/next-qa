import { IsLoginResponse } from '@/action/model/auth';

export async function GET() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/islogin`;
  const req = await fetch(url);
  const resp: IsLoginResponse = await req.json();
  return Response.json(resp);
}
