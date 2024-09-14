import { NEXT_AUTH } from "@/lib/nextAuth";
import NextAuth from "next-auth/next";

const nextAuth = NextAuth(NEXT_AUTH);

export { nextAuth as GET, nextAuth as POST };
