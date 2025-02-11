import { User } from "./user.d"

// API RESPONSE 
export interface SignupResponse {
    success: boolean,
    message: string
}

export interface LoginResponse {
    success: boolean,
    token: string,
    message: string,
    data: User
}
