"use server";

import { RegisterSchema } from "@/app/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "input field not valid" }
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email already in use!"};
    }

    await prisma.user.create({ 
        data: { name, email, password: hashedPassword }
    });

    console.log("User created successfully");
    return { success: "User created successfully" }
}