import { NextResponse, type NextRequest } from 'next/server';
import { IsLoginResponse } from './action/model/auth';

const loginPath = '/login';
const userInfoPath = '/userInfo';

export async function middleware(request: NextRequest) {
  // console.log('====================================');
  // console.log(request.url);
  // console.log('====================================');
  // 获取 session
  const session = request.cookies.get('session')?.value;

  // 检查是否需要重定向到登录页
  if (!session && !request.nextUrl.pathname.startsWith(loginPath)) {
    // session 不存在且不是登录页，重定向至登录页
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // session 存在，检查是否有效
  if (session) {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/islogin`;
      const res: IsLoginResponse = await fetch(url).then((response) => response.json());

      if (res.code === 100) {
        // 已经登录
        if (request.nextUrl.pathname.startsWith(loginPath)) {
          // 是登录页，重定向至用户信息页
          return NextResponse.redirect(new URL(userInfoPath, request.url));
        }
      } else {
        // 无效，重定向至登录页
        return NextResponse.redirect(new URL(loginPath, request.url));
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      // 发生错误，可以选择记录日志、发送通知等，但不应继续处理请求
      // 这里假设在错误情况下，我们也希望用户登录，因此重定向到登录页
      return Response.redirect(new URL(loginPath, request.url));
    }
  }

  // 如果 session 存在且有效，或者不是登录页且 session 不存在，则继续处理请求
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
