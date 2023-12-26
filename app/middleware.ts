import { log } from 'console';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { isAuthenticated } from "@lib/auth";

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/*',
//     '/about/:path*',
//     '/dashboard/:path*',
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     '/api/:function*'
//   ]
// };

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

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('nextjs');
  console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  request.cookies.has('nextjs'); // => true
  request.cookies.delete('nextjs');
  request.cookies.has('nextjs'); // => false

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  response.cookies.set('vercel', 'fast');
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/'
  });
  cookie = response.cookies.get('vercel');
  console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

  return response;
}
