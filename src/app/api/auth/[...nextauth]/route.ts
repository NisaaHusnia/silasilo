export const runtime = "edge";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getDataByField } from "@/lib/firebase/service";
import jwt from "jsonwebtoken";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        //
        const response = await getDataByField("users", "username", credentials?.username || "");
        const user: any = response[0];

        const passwordCorrect = await compare(credentials?.password || "", user.password);

        if (passwordCorrect) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            address: user.address,
            image: user.image,
            farm_name: user.farm_name,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone_number = user.phone_number;
        token.address = user.address;
        token.image = user.image;
        token.farm_name = user.farm_name;
      }

      return token;
    },

    async session({ session, token }: any) {
      const { id, name, email, phone_number, address, image, farm_name } = token;

      session.user.id = id ?? session.user.id;
      session.user.name = name ?? session.user.name;
      session.user.email = email ?? session.user.email;
      session.user.phone_number = phone_number ?? session.user.phone_number;
      session.user.address = address ?? session.user.address;
      session.user.image = image ?? session.user.image;
      session.user.farm_name = farm_name ?? session.user.farm_name;

      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });

      session.token = accessToken;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
