import { Mail } from "./mail.d";

export interface User {
    id: string,
    name: string,
    email:  string,
    mails:  Mail[]
}

// API RESPONSE 
export interface FetchUserDataResponse {
    data: User,
    success : boolean
}