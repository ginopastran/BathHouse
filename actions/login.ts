"use server"

import * as z from "zod"

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail } from "@/lib/mail";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Campos no validos!" }
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "El email no existe!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success: "Mail de confirmación enviado!" }
    }


    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credenciales no válidas" }
                default:
                    return { error: "Algo salió mal" }
            }
        }

        throw error
    }
}