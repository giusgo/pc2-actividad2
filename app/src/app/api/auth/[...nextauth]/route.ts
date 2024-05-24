import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const DB_URL = process.env.DB_URL;
const LOGIN_ENDPOINT = `${DB_URL}/aurora/login`;

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Login POST request to backend
                    const response = await axios.post(LOGIN_ENDPOINT, {
                        username: credentials?.username,
                        password: credentials?.password,
                    });

                    if (response.data == '') return null;

                    // Return fetched user
                    return { id: response.data, name: response.data };
                } catch (error) {
                    console.error("An error occurred trying to login.");
                }

                // If no user was found
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };