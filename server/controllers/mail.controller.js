const { StatusCodes } = require("http-status-codes");
const { DATE } = require("sequelize");

const Mail = require("../models/mail.model").Mail();
const Message = require("../models/message.model").Message();
const User = require("../models/user.model").User();

const MessageFrom = require("../models/message.model").MessageFrom();


exports.getMail = async (req, res, next) => {
    try {
        const address = req.body.to.value[0].address;
        const mailFromAddress = req.body.from.value[0].address;

        let mailFound = await Mail.findOne({ address: address });
        let messageFrom = await MailFrom.findOne({ address: mailFromAddress })

        if (!mailFound) {
            mailFound = await User.create({
                address: address
            });
        }

        if (!messageFrom) {
            messageFrom = await User.create({
                address: mailFromAddress,
                name: req.body.from?.value[0].name
            });
        }

        const data = {
            from: {
                address: req.body.from.value[0].address,
                name: req.body.from?.value[0].name
            },
            to: mailFound.id,
            subject: req.body.subject,
            text: req.body.text,
            time: new Date(req.body.date)
        };

        const createMessage = new Message(data);
        await createMessage.save();

        mailFound.messages?.push(createMessage);

        await mailFound.save();
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// Create a ghost mail 
exports.createMail = async (req, res, next) => {
    const address = req.body.address;
    const mailAdminAddress = req.body.mailAdminAddress;

    console.log(req.body);

    try {
        let date = new Date();
        date.setDate(date.getDate() + 1);


        const cond = {
            where: { address: address },
            defaults: {
                address: address,
                expires: date
            }
        }

        const userFound = mailAdminAddress ? (await User.findOne({where: { email: mailAdminAddress }})) : null;

        if (userFound) {
            cond.defaults = {
                address: address,
                expires: null,
                userId: userFound.id
            }
        }

        console.log("cond ", cond);

        const [mail, created] = await Mail.findOrCreate(cond);

        if (!created) {
            let error = new Error("Mail already exist! Please try another mail.");
            error.statusCode = StatusCodes.BAD_REQUEST;
            throw error;
        }

        return res
            .status(StatusCodes.OK)
            .json({ success: true, message: "Mail Created!" });

    } catch (err) {
        next(err);
    }
}
