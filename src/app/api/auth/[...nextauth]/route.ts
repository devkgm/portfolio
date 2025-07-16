import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: "admin" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/login",
    signOut: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
