const {Mail} = require("../services/connectDB").db;
const {Message} = require("../services/connectDB").db;
const {MessageFrom} = require("../services/connectDB").db;

const { StatusCodes } = require("http-status-codes");

const {SOCKET_EVENT} = require("../utils/socket_event");
const { where } = require("sequelize");

const io = require("../services/socket/socketIO").getIO();

// Save incoming message 
exports.saveMessage = async (req, res, next) => {    
    try {
        console.log("message -> ", req.body)
        const from = { ...req.body.from.value[0] };
        const to = { ...req.body.to.value[0] };
        console.log("to -> ", req.body.to);

        const mailFound = await Mail.findOne({ where: { address: to.address } });

        if (!mailFound) {
            let error = new Error("User address not Found!");
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
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
exports.deleteMessage = async (req, res, next) => {
    let mailId = req.body.mailId;
    const messageId = req.body.messageId;

    if (req.isAuthUser) {
        mailId = req.tempMailId;
    } 

    try {
        const isDeletedMsgSuccess = await Message.destroy({where: { id : messageId, mailId : mailId}});

        if(!isDeletedMsgSuccess){
            let error = new Error("Message not deleted, Something goes wrong. Please try again!")
            error.statusCode = StatusCodes.NOT_IMPLEMENTED;
            throw Error;
        }

        const data = {
            success : true, 
            mailId : mailId,
            messageId : messageId,
            message : `Message deleted successfully!`
        }

        return res.status(StatusCodes.OK).json(data);

    }catch(err){
        next(err);
    }

}