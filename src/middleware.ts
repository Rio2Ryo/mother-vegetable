import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);
const SEFS_HOST_REGEX = /^sefs\./i;

function isSefsHost(host: string): boolean {
  if (!host) return false;
  if (host === 'sefs.mothervegetable.co.jp') return true;
  if (host.startsWith('sefs.localhost')) return true;
  return SEFS_HOST_REGEX.test(host);
}

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase() ?? '';
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // SEFS subdomain handling: rewrite to /sefs route tree, skip intl + show-pages-top.
  if (isSefsHost(host)) {
    // Already targeting /sefs — let it pass through without intl middleware.
    if (pathname === '/sefs' || pathname.startsWith('/sefs/')) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    if (pathname === '/' || pathname === '') {
      url.pathname = '/sefs';
    } else {
      // Map any other path under the SEFS subdomain into /sefs/<path>
      url.pathname = `/sefs${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Main domain — if someone hits /sefs directly (e.g. for QA without DNS),
  // skip next-intl since /sefs is outside the locale routing tree.
  if (pathname === '/sefs' || pathname.startsWith('/sefs/')) {
    return NextResponse.next();
  }

  // Dedicated short event LP paths. Keep public URLs short,
  // while rendering the Japanese localized pages inside the existing site shell.
  if (/^\/(ath|wn|ti)(\/|$)/.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/(ath|wn|ti)/, '/ja/$1');
    return NextResponse.rewrite(url);
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
