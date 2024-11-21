import { z } from "zod";

export const SignUpSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    name: z.string().min(5, {
        message: "Name should be atleast 5 character long",
    }).max(15, {
        message: "Name should be atleast 15 character long",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }).max(15, {
        message: "Password must be at least 6 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }).max(15, {
        message: "Password must be at least 6 characters long"
    }),
});