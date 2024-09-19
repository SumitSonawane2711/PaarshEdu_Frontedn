import { z } from "zod";


export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, { message: "mail is required" }),
    password: z.string().min(8,{message:'Password must be at least 8 characters.'}),
    phone: z.string().min(10,{message: "Number is required"})
})


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});