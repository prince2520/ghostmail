import { z } from "zod";

// FORM VALIDATION - check the validation of login form 
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }).max(15, {
        message: "Password must be at least 6 characters long"
    })
});