import { AuthOptions, ISODateString } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const NEXT_AUTH: AuthOptions = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("The user is : ", user);
      console.log("The account is : ", account);
      return true;
    },

    async session({
      session,
      user,
      token,
    }: {
      session: CustomSession;
      user: CustomUser;
      token: JWT;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

export interface CustomSession {
  user?: CustomUser;
  expires?: ISODateString;
}

export interface CustomUser {
  id?: String | null;
  name?: String | null;
  email?: String | null;
  image?: String | null;
  token?: String | null;
}
