import * as z from "zod"

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Se requiere email"
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Se requiere email"
    }),
    password: z.string().min(1, {
        message: "Se requiere contraseña"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Se requiere email"
    }),
    password: z.string().min(6, {
        message: "Se requiere mínimo 6 caracteres"
    }),
    name: z.string().min(1, {
        message: "Se requiere nombre"
    })
})
