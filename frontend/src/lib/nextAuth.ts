import { Account, Session,AuthOptions, ISODateString } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { APP_URL, LOGIN_URL } from "./apiEndPoints";

export const NEXT_AUTH: AuthOptions = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) token.user = user;
      if (account) token.accessToken = account.access_token;
      return token;
    },

    async session({
      session,
      user,
      token,
    }: {
      session: Session;
      user: CustomUser;
      token: JWT;
    }) {
      if (token?.user) session.user = token.user as CustomUser;
      return session;
    },

    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        console.log("The user is : ", user);
        console.log("The account is : ", account);

        if (account?.provider == "google") {
          const payload = {
            email: user.email,
            name: user.name,
            oauth: account?.providerAccountId,
            image: user?.image,
          };

          const { data } = await axios.post(LOGIN_URL, payload);
          user.id = data?.user?.id.toString();
          user.token = data?.user?.token;
        } else {
          const { data } = await axios.post(APP_URL, {
            email: user.email,
            provider: account?.provider,
            accessToken: account?.access_token,
          });
          user.id = data?.user?.id.toString();
          user.token = data?.user?.token;
        }

        return true;
      } catch (error) {
        console.log("Catch error", error);
        return false;
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
  ],
  debug: true,
};

export interface CustomSession {
  user?: CustomUser;
  expires?: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null;
}
