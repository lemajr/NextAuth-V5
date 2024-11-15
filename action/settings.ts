"use server";
import bcrypt from "bcryptjs";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendVerificationMail } from "@/lib/mail";
import { z } from "zod";
import { SettingsSchema } from "@/app/schemas";
import { generateVerificationToken } from "@/lib/token";

 export const settings = async (
    values:z.infer<typeof SettingsSchema>
 )=>{
const user = await currentUser();
if(!user){
    return {error: "unauthorized"}
}
const prismaUser = await getUserById(user.id as string);

if(!prismaUser){
    return {error: "unauthorized"}
    
}
if(user.isOAuth){
    values.email=undefined;
    values.password=undefined;
    values.newPassword=undefined;
    values.isTwoFactorEnabled=undefined;
}

if(values.email && values.email !== user.email){
    const existingUser = await prisma.user.findFirst({
        where:{email:values.email}
    });
    if(existingUser && existingUser.id !== user.id){
        return {error: "Email already in use"}
    }

    const verifiacationToken = await generateVerificationToken(values.email);
    await sendVerificationMail(values.email,verifiacationToken.token);
    return {success: "New verification mail sent"}
}

if(values.password && values.newPassword && prismaUser.password){
    const  passMatch = await bcrypt.compare(values.password,prismaUser.password);
    if(!passMatch){
        return {error: "Invalid password"}
    }
    const hashedPassword = await bcrypt.hash(values.newPassword,10);
    values.password = hashedPassword;
    values.newPassword = undefined;

}

await prisma.user.update({
    where:{id:prismaUser.id},
    data:{...values}
});

return {success : "Setting updated!"}
 }