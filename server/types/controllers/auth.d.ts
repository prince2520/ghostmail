import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AuthMiddlewareRequest } from "./middleware";


export interface GoogleAuthRequest extends AuthMiddlewareRequest {
  body: {
    credential: string;
    clientId: string;
  };
}

export interface GoogleToken {
  idToken: string;
  audience: string;
}