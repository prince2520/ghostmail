import jwt from "jsonwebtoken";
import randomstring from "randomstring";

import {db} from "../services/connectDB";
import {  Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { throwError } from "../utils/throwError";
import { AuthRequest } from "../types/auth.middleware";

const {Message, MessageFrom, Mail, User} = db;

const getMailFromDatabase = async (mailId : string | undefined | null) => {
    const result = await Mail.findOne({
        where: { id: mailId },
        include: {
            model: Message,
            required: false,
            include: {
                model: MessageFrom,
                required: false
            }
        }
    });

    if (!result) {
        throwError("Mail not Found!", StatusCodes.NOT_FOUND);
    }

    return result;
};



const generateMail = async () : Promise<string> => {
    let address = null;

    while (!address) {
        let newAddress = randomstring.generate({
            length: 12,
            charset: ['alphabetic', 'numeric']
        });

        newAddress += `@${process.env.MAIL_DOMAIN_ADDRESS}`;

        const newAddressFound = await Mail.findOne({ where: { address: newAddress } });

        if (!newAddressFound) {
            address = newAddress;
        }
    }

    if (!address) {
        throwError("New temp mail not generated!", StatusCodes.NOT_IMPLEMENTED);
    }

    return address;
};

const newGhostMail = async (authEmail : string | null = null ) => {
    let address = await generateMail();

    let date = new Date();
    date.setDate(date.getDate() + 1);

    const cond : {
        where: { address: string },
        defaults: {
            address: string,
            expires: Date | null,
            userId?: string
        }
    } = {
        where: { address: address },
        defaults: {
            address: address,
            expires: date
        }
    }

    if (authEmail) {
        const userFound = await User.findOne({ where: { email: authEmail } });

        if (!userFound) {
            throwError(`${authEmail} is not Found!`, StatusCodes.NOT_FOUND);
        }

        cond.defaults = {
            address: address,
            expires: null,
            userId: userFound.id
        }

        const countMail = await Mail.count({where:{userId: userFound.id}});

        if(countMail >= 10){
            throwError(`You can only generate only 10 mails!`, StatusCodes.NOT_FOUND);
        }
    }


    const [mail, created] = await Mail.findOrCreate(cond);

    if (!created) {
        throwError("Mail already exist! Please try another mail.", StatusCodes.BAD_REQUEST);
    }

    const data = await getMailFromDatabase(mail.id);

    const result = { success: true, data: data, message: `${address} mail created!` };

    return result;
}

// Generate a new ghost mail 
export const generateNewGhostMail = async (req:AuthRequest, res:Response, next:NextFunction) => {
    try {
        let result:{
            success: boolean,
            data: any,
            token?: string,
            isNotAuth?: boolean
        } = await newGhostMail();

        if (!req.isAuthUser) {
            const token = jwt.sign(
                {
                    isAuthUser: false,
                    tempMailId: result.data.id
                },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: "24h" }
            );

            result.token = token;
            result.isNotAuth = true;
        };

        res
            .status(StatusCodes.OK)
            .json(result);

    } catch (err) {
        next(err);
    };
}




export const authorizedGenerateGhostMail = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authEmail = req.email;

    try {
        const result = await newGhostMail(authEmail);

        res
            .status(StatusCodes.OK)
            .json(result);

    } catch (err) {
        next(err);
    };
}


// get mail data  
export const getMailData = async (req: AuthRequest, res:Response, next:NextFunction) => {
    let mailId = req.query.mailId as string | null | undefined;

    if (!req.isAuthUser) {
        mailId = req.tempMailId;
    }

    try {
        const mail = await getMailFromDatabase(mailId);

        res
            .status(StatusCodes.OK)
            .json(mail);

    } catch (err) {
        next(err);
    };
}

// DELETE -> delete the mail for auth user
export const deleteMail = async (req: AuthRequest, res:Response, next:NextFunction)  : Promise<void> => {
    
    const mailId = req.body.mailId;
    const mailAddress = req.body.mailAddress;

    try {
        const isDeletedMail =  await Mail.destroy({
            where: { id: mailId }
        });

        if (!isDeletedMail) {
            throwError("Mail not deleted!", StatusCodes.NOT_IMPLEMENTED);
        }

        const data = {
            success: true,
            mailId: mailId,
            message: `${mailAddress} is deleted successfully!`
        }

        res
            .status(StatusCodes.OK)
            .json(data);
    } catch (err) {
        next(err);
    }
}



export const changeAddress = async (req : AuthRequest, res : Response, next: NextFunction) => {
    const userId = req.userId;
    const mailId = req.body.mailId;
    const mailAddress = req.body.mailAddress;

    try {

        const address = await generateMail();

        await Mail.update(
            { address: address },
            { where: { id: mailId, userId: userId } }
        );

        const data = {
            success: true,
            mailId: mailId,
            updatedMailAddress: address,
            isChangeAddress: true,
            message: `${mailAddress} changed to ${address}`
        };

        res
            .status(StatusCodes.OK)
            .json( data );

    } catch (err) {
        next(err);
    }
}