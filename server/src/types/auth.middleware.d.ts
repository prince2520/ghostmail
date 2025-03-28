import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";


// type for auth middleware
export interface AuthRequest extends Request{
    email?: string,
    userId? : string,
    tempMailId? : string,
    isAuthUser?  : boolean | JwtPayload,
    get : any
}