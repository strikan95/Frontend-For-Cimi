import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`http://localhost:8080/api/v1/login_check`, {
            method: 'POST',
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          console.log(res);

          if (!res.ok) {
            return null;
          }

          const userData = await res.json();

          return userData;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session, account }) => {
      if (trigger == 'update') {
        return {
          ...token,
          ...user,
          ...session.user,
        };
      }

      return { ...token, ...user };
    },
    session: async ({ session, token, user }) => {
      return {
        ...session,
        token: token.token as string,
        user: {
          ...session.user,
          image: token.image as string,
          id: token.sub,
          roles: token?.roles,
        },
      };
    },
  },
};
