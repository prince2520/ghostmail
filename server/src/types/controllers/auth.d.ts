import { AuthRequest } from "../auth.middleware";



export interface GoogleAuthRequest extends AuthRequest {
  body: {
    credential: string;
    clientId: string;
  };
}

export interface GoogleToken {
  idToken: string;
  audience: string;
}