import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // When NEXT_PUBLIC_SHOW_PAGES=top, only allow the homepage (top page).
  // All other pages redirect to the root.
  if (process.env.NEXT_PUBLIC_SHOW_PAGES === 'top') {
    const { pathname } = request.nextUrl;
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
  matcher: ['/((?!api|_next|Images|cdn|admin|.*\\..*).*)'],
};
