import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "../types/auth.middleware";
import { db } from "../services/connectDB";

const  {User, Mail}  = db;

export const fetchUserData = async (req:AuthRequest, res:Response, next:NextFunction) => {
    const email = req.email;

    try {
        const userFound = await User.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email'],
            include:
            {
                model: Mail,
                required: false
            }
        });

        res.status(StatusCodes.OK).json({
            success: true,
            data : userFound
        });
    } catch (err) {
        next(err);
    }
}