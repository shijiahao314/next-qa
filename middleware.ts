import { NextResponse, type NextRequest } from 'next/server';
import { IsLoginResponse } from './action/model/auth';

const loginPath = '/login';
const userInfoPath = '/userInfo';

export async function middleware(request: NextRequest) {
  console.log('====================================');
  console.log(request.url);
  console.log(request.cookies.getAll());
  console.log('====================================');

  // 获取 session
  const session = request.cookies.get('session')?.value;
  if (!session) {
    // session 不存在
    if (!request.nextUrl.pathname.startsWith(loginPath)) {
      // 不是登录页，重定向至登录页
      return NextResponse.redirect(new URL(loginPath, request.url));
    }
    // 是登录页，继续
    return NextResponse.next();
  }

  // session 存在，检查是否有效
  // 请求头中为 'Cookie'
  // 响应头中为 'Set-Cookie'
  // 两者意义不同
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/islogin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `session=${session}`
    }
  });
  const resp: IsLoginResponse = await res.json();
  // console.log('====================================');
  // console.log(resp);
  // console.log('====================================');
  if (resp.code != 0) {
    // 未登录，重定向至登录页
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // 已登录
  if (request.nextUrl.pathname.startsWith(loginPath)) {
    // 是登录页，重定向至用户信息页
    return NextResponse.redirect(new URL(userInfoPath, request.url));
  }
  // 不是登录页，继续
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // exclude: /backend
    '/((?!api|_next/static|_next/image|favicon.ico|backend).*)'
  ]
};
