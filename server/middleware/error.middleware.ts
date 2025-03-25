import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/error';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err?.statusCode || 500;
    const errorMessage = err?.message || "Internal Server Error";

    return res.status(errorStatus).json({
        success: false,
        message: errorMessage
    });
};
