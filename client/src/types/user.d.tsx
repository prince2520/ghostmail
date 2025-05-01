import { Mail } from "./mail.d"

export interface User {
    id: string,
    name: string,
    email: string,
    token: string,
    isAuth: boolean,
    mails? : Mail[]

}

export interface UserAction {
    success: boolean,
    token: string,
    message: string,
    data: User
}

// API RESPONSE 
export interface FetchUserDataResponse {
    data: User,
    success: boolean,
    token: string
}