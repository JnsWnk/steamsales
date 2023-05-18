import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserById } from "@/util/db";
import { toast } from "react-toastify";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any;
        const res = await fetch(`${url}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SECRET,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      if (trigger === "update" && session) {
        try {
          const res = await fetch(`${url}/user/updateUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: token.id,
              ...session,
            }),
          });
          if (res.ok) {
            toast("Profile updated successfully!", {
              type: "success",
            });
            token.user.email = session.email;
            token.user.name = session.name;
            token.user.steamid = session.steamid;
          } else {
            toast("Error updating profile.", {
              type: "error",
            });
          }
        } catch (error) {
          console.error(error);
          toast("An error occurred while updating your profile.", {
            type: "error",
          });
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
};

export default NextAuth(authOptions);
