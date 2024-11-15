"use server";
import {z} from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { sendVerificationMail,sendTwoFactorMail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { prisma } from '@/lib/db';
import { LoginSchema } from '@/app/schemas';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/token';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-comfirmation';
import { DEFAULT_REDIRECT } from '@/lib/routes';



export const login = async (values:z.infer<typeof LoginSchema>) =>

{
// console.log("Login action", values);

const valid = LoginSchema.safeParse(values);
if(!valid.success){
    return {error: "Invalid data"};

}
const {email,password,code}=valid.data;

const existingUser = await getUserByEmail(email);

if(!existingUser || !existingUser.password || !existingUser.email){
    return {error: "Invalid credentials"};
}

if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email);
    // console.log(existingUser);
    await sendVerificationMail(existingUser.email, verificationToken.token);
    return {success: "Confirm your email!"};
}

if(existingUser.isTwoFactorEnabled && existingUser.email){
    if(code){
        const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
        if(!twoFactorToken || twoFactorToken.token !== code){
            return {error: "Invalid two factor code"};
        }
        const hasExpired = new Date(twoFactorToken.expires)< new Date();

        if(hasExpired){
            return {error: "Two factor code has expired"};
        }

        await prisma.twoFactorToken.delete({
            where: {id: twoFactorToken.id}
        })

        const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if(existingConfirmation){
            await prisma.twoFactorConfirmation.delete({
                where: {id: existingConfirmation.id}
            })
        }

        await prisma.twoFactorConfirmation.create({
            data: {
                userId: existingUser.id
            }
        })
    }
    else{
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);

        await sendTwoFactorMail(existingUser.email, twoFactorToken.token);

        return {twoFactor : true};
    }

}


try {
    await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_REDIRECT,
    });
    } 
    
    
 catch (error) {
    if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
                return {error: "Invalid credentials"};
            default:
                return {error: "An error occurred"};
        }

    }
    throw error;    
}

};