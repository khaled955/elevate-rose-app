/* eslint-disable @typescript-eslint/no-empty-object-type */

//^^==>types for next auth
import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      gender: string;
      phone: string;
      photo: string;
      role: "user" | "admin"| "moderator";
      wishlist?: [];
      addresses?: [];
      createdAt: string;
    };
  }

  interface Session {
    user: User["user"];
  }
}

declare module "next-auth/jwt" {
  //  include in all User interface
  //  must make import as it in adifferent module
  interface JWT extends User {}
}
