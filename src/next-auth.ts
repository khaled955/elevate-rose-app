import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAction } from "./app/[locale]/(auth)/login/_actions/login.action";

export const authOptions: NextAuthOptions = {
  //^^==>configs
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // tools that used for authentication  ex: credentials , OAuthentication:google,twitter , etc...
  providers: [
    CredentialsProvider({
      // The name to display on the sign  in form (e.g. 'Sign in with...')
      //  optional
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // !!==> Guard
        if (!credentials?.email || !credentials.password)
          throw new Error("Credentials Are Required!");

        const payload = await loginAction({
          email: credentials?.email,
          password: credentials?.password,
        });

        //  user data could not be retrieved return error by check property in error response
        if ("error" in payload)
          throw new Error(payload?.error || "Error During LogIn!");

        // If no error and we have user data, return it
        //  user is object must have id property and its value is string
        return {
          id: payload.user._id,
          accessToken: payload.token,
          user: payload.user,
        };
      },
    }),
  ],

  // after user login in what happen next in callbacks
  // account is what we return in async function
  callbacks: {
    //  token will be encrypted and saved in cookies
    async jwt({ token, user, trigger, session }) {
      // first time after login
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      }

      // When use useSession and update user info fn on client

      if (trigger === "update" && session?.user) {
        token.user = {
          ...(token.user ?? {}),
          ...(session.user ?? {}),
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user ?? session.user;
      return session;
    },
  },

  jwt: {
    //  7 days
    maxAge: 7 * 24 * 60 * 60,
  },
};
