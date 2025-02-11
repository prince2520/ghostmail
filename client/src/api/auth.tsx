import { LoginResponse, SignupResponse } from "@/types/auth.d";
import { throwError } from "./throwError";
import { CredentialResponse } from '@react-oauth/google';


// POST -> Sign up
export const signup = async (name:string, email:string, password:string, confirmPassword:String) : Promise<SignupResponse>  => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    });

    const result = throwError(response);
    return result;
};

// POST -> Login
export const login = async (email:string, password:string) : Promise<LoginResponse> => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    });
    const result = throwError(response);
    return result;
}


// POST -> Google Login
export const googleLogin = async ( credentialResponse : CredentialResponse) : Promise<LoginResponse>=> {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/google-auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialResponse),
    });

    const result = throwError(response);
    return result;
}