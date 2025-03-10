import { Request } from "express"

// type for auth middleware
export interface AuthRequest extends Request{
    email?: string,
    userId? : string,
    tempMailId? : string,
    isAuthUser?  : boolean | JwtPayload,
    get : any
}