import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { compare } from "bcryptjs";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials!;
        console.log(email);
        console.log("33333");

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await dbConnect();
        const user = await User.findOne({
          email,
        });
        const isPasswordValid = await compare(password, user!.password);

        console.log(user);
        console.log(isPasswordValid);

        if (!user) {
          throw new Error("Email not found ");
        }
        if (!isPasswordValid) {
          throw new Error("Invalid password ");
        }

        if (!isPasswordValid) {
          throw new Error("Invalid password ");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePic: user.profilePic,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        console.log("-----");
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
