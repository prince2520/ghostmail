import { throwError } from "../../utils/throwError";
import { FetchUserDataResponse } from "@/types/user.d";
import { LoginResponse, SignupResponse } from "@/types/auth.d";
import { CredentialResponse } from '@react-oauth/google';
import { USER_ROUTES } from "@/config/routes";

// POST - generate a new mail for authorized user
export const getUserAPI = async (token:string) : Promise<FetchUserDataResponse> => {
    const response = await fetch(
        USER_ROUTES.GET_USER__ADDRESS,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        }
    );

    const result = throwError(response);
    return result;
};


// POST -> Sign up
export const signupAPI = async (name:string, email:string, password:string, confirmPassword:String) : Promise<SignupResponse>  => {
    const response = await fetch(USER_ROUTES.SIGNUP__ADDRESS, {
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
export const loginAPI = async (email:string, password:string) : Promise<LoginResponse> => {
    const response = await fetch(USER_ROUTES.LOGIN__ADDRESS, {
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
export const googleAuthAPI = async ( credentialResponse : CredentialResponse) : Promise<LoginResponse>=> {
    const response = await fetch(USER_ROUTES.GOOGLE_AUTH__ADDRESS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialResponse),
    });

    const result = throwError(response);
    return result;
}