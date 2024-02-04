import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
// import Google from "next-auth/providers/google";
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/user";
const handler=NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.Google_Client_ID,
            clientSecret:process.env.Google_Client_Secret
        })
     
    ],
    callbacks:{
        async session({session}){
            const sessionUser=await User.findOne({
                email:session.user.email
            })
            session.user.id=sessionUser._id.toString();
            return session;
            },
        async signIn({profile}){
        try {
            await connectToDB();
            const userExists=await User.findOne({
                email:profile.email
            })
            console.log(!userExists);    
            console.log(profile);  

            if (!userExists) {
                await User.create({
                    email:profile.email,
                    username:profile.name.replaceAll(" ","").toLowerCase(),
                    image:profile.picture
                });
            }
            return true;
            } catch (error) {
             console.log(error);
             return false;
            }
        }
    }
   

})
export {handler as GET,handler as POST}