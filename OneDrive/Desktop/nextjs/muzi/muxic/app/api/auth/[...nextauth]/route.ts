import { prismaClient } from "@/app/lib/db";
import nextAuth from "next-auth";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import { User } from "next-auth";

declare module "next-auth" {
    interface User {
      sub?: string;
    }
}

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
    }
}

const authoptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async signIn(params) {
            console.log("this is params",params)
            if(!params.user.email){
                return false;
            }
            try {
                const user = await prismaClient.user.upsert({
                    where: { email: params.user.email },
                    update: {},
                    create: {
                        email: params.user.email,
                        provider: "Google"
                    }
                })
                console.log(user)
            } catch (e) {
                console.error("Error during user creation:", e)
                return false;
            }
            return true
        },
        async jwt({ token}) {
            console.log('this is token',token)

            return token;
          },
        async session({ token, session}) {
            if (token) {
                (session.user as any).id = token.jti
            }
            console.log("this is session",session)
            return session;
        },
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}

export const authOptions = authoptions
export const handler = nextAuth(authoptions)
export { handler as GET, handler as POST }