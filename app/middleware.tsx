import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { isAuthenticated } from "@lib/auth";

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
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
export function middleware(request: NextRequest) {
  //   // (4)
  //   // Call our authentication function to check the request
  //   if (!isAuthenticated(request)) {
  //     // Respond with JSON indicating an error message
  //     return Response.json(
  //       { success: false, message: "authentication failed" },
  //       { status: 401 }
  //     );
  //   }

  // (3)
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders
    }
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello');
  return response;

  //   // (2)
  //   // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  //   // Getting cookies from the request using the `RequestCookies` API
  //   let cookie = request.cookies.get("nextjs");
  //   console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  //   const allCookies = request.cookies.getAll();
  //   console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  //   request.cookies.has("nextjs"); // => true
  //   request.cookies.delete("nextjs");
  //   request.cookies.has("nextjs"); // => false

  //   // Setting cookies on the response using the `ResponseCookies` API
  //   const response = NextResponse.next();
  //   response.cookies.set("vercel", "fast");
  //   response.cookies.set({
  //     name: "vercel",
  //     value: "fast",
  //     path: "/",
  //   });
  //   cookie = response.cookies.get("vercel");
  //   console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
  //   // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.
  //   return response;

  //   // (1)
  //   if (request.nextUrl.pathname.startsWith("/about")) {
  //     return NextResponse.rewrite(new URL("/about-2", request.url));
  //   }

  //   if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //     return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  //   }
  //   return NextResponse.redirect(new URL("/home", request.url));
}
