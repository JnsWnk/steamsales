/* eslint-disable no-unused-vars */
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { User } from "./types";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    steamid?: string;
    accessToken: string;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      steamid?: string;
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    steamid?: string;
    user: User;
  }
}
