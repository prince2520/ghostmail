import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";


// type for auth middleware
export interface AuthRequest extends Request{
    email?: string,
    userId? : string,
    mailId? : string,
    isAuth?  : boolean | JwtPayload,
    get : any
}