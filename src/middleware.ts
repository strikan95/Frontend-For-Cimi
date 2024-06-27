import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge';
import { ApiProfile } from '@/lib/cimi/types/profile.types';

// This function can be marked `async` if using `await` inside
export default withMiddlewareAuthRequired(async (req: NextRequest) => {
  const res = NextResponse.next();

  const user = await getSession(req, res);

  if (user) {
    try {
      const apiRes = await fetch(`http://localhost:8080/api/v1/users/me`, {
        method: 'GET',
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
        cache: 'no-cache',
      });

      if (!apiRes.ok) {
        return res;
      }

      const data: ApiProfile = await apiRes.json();

      console.log(data);

      if (
        data.roles.includes('ROLE_HOST') ||
        data.roles.includes('ROLE_STUDENT')
      ) {
        return res;
      }

      return NextResponse.redirect('http://localhost:3000/profile-setup');
    } catch (e) {
      console.error(e);
      return res;
    }
  }
  return res;
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|profile-setup).*)',
    },
  ],
};
