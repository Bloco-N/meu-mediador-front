import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
    providers:[
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        }),
        FacebookProvider({
            clientId: String(process.env.FACEBOOK_CLIENT_ID),
            clientSecret: String(process.env.FACEBOOK_CLIENT_SECRET),
            
          }),
    ],
    secret: String(process.env.SECRET),
})
