import crypto from "crypto";
import { v4 as uuid } from "uuid"
import { getVerificationTokenByEmail } from "../data/verification-token";

import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { prisma } from "./db";

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100000, 1000000).toString()
    const expires = new Date(new Date().getTime() +  10 * 60 * 1000); //expires in 10 min

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
            await prisma.twoFactorToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }

        const twoFactorToken = await prisma.twoFactorToken.create({
            data: {
                email,
                token,
                expires,
            },
        })
        return twoFactorToken;
}


export const generatePasswordResetToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() +  60 * 60 * 1000); //expires in 1 hour

    const existingToken = await getPasswordResetTokenByEmail(email);

    if(existingToken){
            await prisma.passwordResetToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }

        const passwordResetToken = await prisma.passwordResetToken.create({
            data: {
              email,
              token,    
              expires,
            },
        })
        return passwordResetToken;
}



export const generateVerificationToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() +  60 * 60 * 1000); //expires in 1 hour

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
            await prisma.verificationToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }

        const verificationToken = await prisma.verificationToken.create({
            data: {
                token,
                expires,
                email,
            },
        })
        return verificationToken;
    
    }

   