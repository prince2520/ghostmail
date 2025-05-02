import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "../types/auth.middleware";
import { db } from "../services/connectDB";

const { User, Mail, Message, MessageFrom } = db;

export const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const email = req.email;
    try {
        const userFound = await User.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email'],
            include:
            {
                model: Mail,
                required: false,

                include: {
                    model: Message,
                    required: false,
                    
                    include: {
                        model: MessageFrom,
                        required: false
                    }
                }
            }
        });

        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
                mails: userFound.mails
            },
            token: req.body.token
        });
    } catch (err) {
        next(err);
    }
}