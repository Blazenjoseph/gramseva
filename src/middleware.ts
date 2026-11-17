import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames, avoid static files and api routes
  matcher: ['/', '/(kn|en|hi|ta|ml)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
