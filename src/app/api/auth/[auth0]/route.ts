// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: 'https://cimi.core.api',
      scope: 'openid profile email',
    },
  }),
});
