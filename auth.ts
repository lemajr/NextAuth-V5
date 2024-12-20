import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { getUserById } from "./data/user"
// import { JWT } from "next-auth/jwt"
import { prisma } from "./lib/db"
import { UserRole } from "@prisma/client"
import { getAccountByUserId } from "./data/account"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-comfirmation"




// declare module "next-auth" {
//   interface Session {
//     /** The user's postal address. */
//   user:{
//     role: "ADMIN" | "USER";
//     // customField: string;
//   }
//   }
// }

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
//   interface JWT {
//     role?: "ADMIN" | "USER";
//   }
// }



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages:{
    signIn:"/auth/signin",
    error:"/auth/error",
  },
  events:{
    async linkAccount({user}){
      await prisma.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async signIn({user ,account}){
      if(account?.provider !== "credentials" ){
        return true;
      }
      const existingUser = await getUserById(user.id as string);
      if(!existingUser?.emailVerified){
        return false;
      }

      //2fa
      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        if(!twoFactorConfirmation){
          return false;
        }

        await prisma.twoFactorConfirmation.delete({
          where: {id: twoFactorConfirmation.id}
        })
      }
      
      return true;
    },
    async session({session, token}){
      // console.log("session callback", token);
      
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }


      if(token.role && session.user){
        session.user.role = token.role as UserRole;
      }
      if(token.isTwoFactorEnabled && session.user){
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      // session.user.customField="custom"


      if(session.user){
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({token}){
      // console.log("jwt callback", token);
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if(existingUser){

          const existingAccount = await getAccountByUserId(existingUser.id);

        token.isOAuth = !!existingAccount;
        token.name = existingUser.name;
        token.email = existingUser.email;
      token.role = existingUser.role
      }else{
        return token;
      }
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
     return token;
    }
    },
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
  ...authConfig,
})