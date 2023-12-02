import { log } from 'console';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { isAuthenticated } from "@lib/auth";

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/*',
    '/about/:path*',
    '/dashboard/:path*',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/api/:function*'
  ]
};

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  console.log('====================================');
  console.log(url, url.pathname);
  console.log('====================================');
  if (url.pathname === '/') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }
}
