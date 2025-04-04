import { NextFunction, Response } from "express";
import { throwError } from "../utils/throwError";

import {db} from "../services/connectDB";
const {Mail, Message, MessageFrom} = db;


import { StatusCodes } from "http-status-codes";
import {SOCKET_EVENT} from "../utils/socket_event";

import {getIO} from "../services/socket/socketIO";
import { AuthRequest } from "../types/auth.middleware";

const io = getIO();

// Save incoming message 
export const createMessage = async (req: AuthRequest, res:Response, next:NextFunction) => {    
    try {
        const from = { ...req.body.from.value[0] };
        const to = { ...req.body.to.value[0] };

        const mailFound = await Mail.findOne({ where: { address: to.address } });

        if (!mailFound) {
            throwError("User address not Found!", StatusCodes.NOT_FOUND);
        };

        const [messageFromFound, created] = await MessageFrom.findOrCreate({
            where: { address: from.address },
            defaults: {
                address: from.address,
                name: from.name
            }
        });

        const data = {
            mailId: mailFound.id,
            subject: req.body.subject,
            text: req.body.textAsHtml,
            createdAt: new Date(req.body.date),
            messageFromId: messageFromFound.id
        };

        const saveMessage = await Message.create(data);

        const getMessage = await Message.findOne({
            where : {id : saveMessage.id},
            include : {
                model: MessageFrom,
                required: false,
            }
        });
        
        io.to(mailFound.id).emit(SOCKET_EVENT.GET_SEND_MESSSAGE, { data :getMessage });

    } catch (err) {
        next(err);
    }
}


// Delete Message 
export const deleteMessage = async (req: AuthRequest, res: Response, next : NextFunction) => {

    let mailId = req.body.mailId;
    const messageId = req.body.messageId;

    if (req.isAuth) {
        mailId = req.mailId;
    } 

    try {
        const isDeletedMsgSuccess = await Message.destroy({where: { id : messageId, mailId : mailId}});

        if(!isDeletedMsgSuccess){
            throwError("Message not deleted, Something goes wrong. Please try again!", StatusCodes.NOT_IMPLEMENTED);
        }

        const data = {
            success : true, 
            mailId : mailId,
            messageId : messageId,
            message : `Message deleted successfully!`
        }

        res.status(StatusCodes.OK).json(data);

    }catch(err){
        next(err);
    }

}