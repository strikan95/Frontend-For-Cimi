export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/profile',
    '/hosting/:path*',
    '/create-a-listing/:path*',
    '/messenger/:path*',
  ],
};
