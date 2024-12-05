const {Mail} = require("../services/connectDB").db;
const {Message} = require("../services/connectDB").db;
const {MessageFrom} = require("../services/connectDB").db;

const { StatusCodes } = require("http-status-codes");

const {SOCKET_EVENT} = require("../utils/socket_event");

const io = require("../services/socket/socketIO").getIO();

// Save incoming message 
exports.saveMessage = async (req, res, next) => {    
    try {
        const from = { ...req.body.from.value[0] };
        const to = { ...req.body.to.value[0] };

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
            text: req.body.text,
            createdAt: new Date(req.body.date),
            messageFromId: messageFromFound.id
        };

        const saveMessage = await Message.create(data);

        console.log("SOCKET SERVER - sending message to client MailId=", mailFound.id);

        io.to(mailFound.id).emit(SOCKET_EVENT.GET_SEND_MESSSAGE, { data : saveMessage});

    } catch (err) {
        next(err);
    }
}
