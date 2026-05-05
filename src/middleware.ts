import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

function isAuthorized(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (!auth) return false;

  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) return false;

  try {
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(':');
    return user === 'admin' && pass === 'mv123';
  } catch {
    return false;
  }
}

export default function middleware(request: NextRequest) {
  if (!isAuthorized(request)) {
    return new NextResponse('認証が必要です', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // When NEXT_PUBLIC_SHOW_PAGES=top, only allow the homepage (top page).
  // All other pages redirect to the root.
  if (process.env.NEXT_PUBLIC_SHOW_PAGES === 'top') {
    // Allow: "/", "/en", "/ja", "/zh" (with or without trailing slash)
    const isHomepage = /^\/?$|^\/(en|ja|zh)\/?$/.test(pathname);
    if (!isHomepage) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|Images|cdn|favicon.ico|.*\\..*).*)'],
};
