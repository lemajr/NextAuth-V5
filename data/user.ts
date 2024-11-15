import { prisma } from "@/lib/db";

export const getUserByEmail = async (email: string) => { 
    try {
        const user = await prisma.user.findFirst({
            where: { email },
        });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        return user;

    } catch (error) {
        return null
    }
}

export const getUserById = async (id: string) => { 
    try {
        const user = await prisma.user.findFirst({
            where: { id },
        });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        return user;

    } catch (error) {
        return null
    }
}