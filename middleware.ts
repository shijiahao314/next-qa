import { NextResponse, type NextRequest } from 'next/server';
import { IsLogin } from './api/auth';

const loginPath = '/login';

export async function middleware(request: NextRequest) {
  // 检查 session 是否存在
  const session = request.cookies.get('session')?.value;
  if (!session && !request.nextUrl.pathname.startsWith(loginPath)) {
    // 不存在，且不是登录页，重定向至登录页
    return Response.redirect(new URL(loginPath, request.url));
  }
  try {
    // 存在，检查是否有效
    const [success, resp] = await IsLogin();
    if (!success) {
      // 无效，重定向至登录页
      return Response.redirect(new URL(loginPath, request.url));
    }
    console.log('====================================');
    console.log(resp);
    console.log('====================================');
    // 有效
    return NextResponse.next();
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    // 发生错误，继续
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
