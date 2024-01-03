import { log } from 'console';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { IsLoginResponse } from './api/model/auth';
import { IsLogin } from './api/auth';
// import { isAuthenticated } from "@lib/auth";

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/chat'
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico|theme.js|login).*)',
    // '/api/:function*'
  ]
};

// This function can be marked `async` if using `await` inside
// export default function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   console.log('====================================');
//   console.log(url, url.pathname);
//   console.log('====================================');
//   if (url.pathname === '/') {
//     url.pathname = '/dashboard';
//     return NextResponse.redirect(url);
//   }
// }

export async function middleware(request: NextRequest) {
  console.log('====================================');
  console.log('middleware: ', request.url);
  const allCookies = request.cookies.getAll();
  console.log(allCookies);

  // const [success, resp]: [boolean, IsLoginResponse] = await IsLogin({});
  // if (!success) {
  //   console.log('not login');
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  console.log('====================================');

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  return response;
}
