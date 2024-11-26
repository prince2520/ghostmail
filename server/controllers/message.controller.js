const Mail = require("../models/mail.model").Mail();
const Message = require("../models/message.model").Message();
const User = require("../models/user.model").User();

const MessageFrom = require("../models/message.model").MessageFrom();

const { StatusCodes } = require("http-status-codes");

// Save incoming message 
exports.saveMessage = async (req, res, next) => {

    console.log("Message Received");

    console.log("Message Data ", req.body);

    
    try {
        const from = { ...req.body.from.value[0] };
        const to = { ...req.body.to.value[0] };

        const mailFound = await Mail.findOne({ where: { address: to.address } });

        console.log("to address -> ", mailFound);
        console.log("mailfound -> ", to);

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

        await Message.create(data);

    } catch (err) {
        next(err);
    }
}
