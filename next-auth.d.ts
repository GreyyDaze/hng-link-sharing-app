import NextAuth from 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      profilePic?: string;
    } & DefaultSession['user'];
    accessToken?: string; // Add this line
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string;
    accessToken?: string; // Add this line
  }
  
  interface JWT {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string;
    accessToken?: string; // Add this line to JWT interface
  }
}
