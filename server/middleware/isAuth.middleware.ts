import jwt, { JwtPayload } from 'jsonwebtoken';
import StatusCodes from "http-status-codes";
import { Response, NextFunction } from 'express';
import { throwError } from '../utils/throwError';
import { AuthRequest } from '../types/auth.middleware';

export const isAuth = (req:AuthRequest, res:Response, next:NextFunction) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        throwError("Not authenticated.", StatusCodes.UNAUTHORIZED);
    }

    const token = authHeader ? authHeader.split(' ')[1] : '';

    let decodedToken;
    
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    } catch (err: any) {
        err.statusCode = StatusCodes.NOT_FOUND;
        throw err;
    }

    if (!decodedToken) {
        throwError("Not authenticated", StatusCodes.UNAUTHORIZED)
    }

    const payload = decodedToken as JwtPayload & { isAuthUser: boolean, userId: string, email: string, tempMailId: string };

    if (payload.isAuthUser) {
        req.userId = payload.userId;
        req.email = payload.email;
    } else {
        req.tempMailId = payload.tempMailId;
    }

    req.isAuthUser = (decodedToken as JwtPayload & { isAuthUser: boolean }).isAuthUser;
    next();
}
