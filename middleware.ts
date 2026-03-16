import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Only treat admin.alphawrite.ai, admin.localhost, or admin.127.0.0.1 as admin subdomain
  const isAdminSubdomain =
    hostname.startsWith('admin.') ||
    hostname === 'admin.localhost' ||
    hostname === 'admin.127.0.0.1';

  // If on admin subdomain and at root, redirect to /admin/login
  if (
    isAdminSubdomain &&
    url.pathname === '/'
  ) {
    url.pathname = '/admin/login';
    const redirectResponse = NextResponse.redirect(url);
    // Add security headers to prevent clickjacking
    redirectResponse.headers.set('X-Frame-Options', 'DENY');
    redirectResponse.headers.set('Content-Security-Policy', "frame-ancestors 'none'");
    return redirectResponse;
  }

  // Only allow /admin routes on admin subdomain
  if (
    url.pathname.startsWith('/admin') &&
    !isAdminSubdomain &&
    hostname !== 'localhost' &&
    hostname !== '127.0.0.1'
  ) {
    url.pathname = '/';
    const redirectResponse = NextResponse.redirect(url);
    // Add security headers to prevent clickjacking
    redirectResponse.headers.set('X-Frame-Options', 'DENY');
    redirectResponse.headers.set('Content-Security-Policy', "frame-ancestors 'none'");
    return redirectResponse;
  }

  // Add security headers to all responses to prevent clickjacking
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'none'");
  
  return response;
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 