const { StatusCodes } = require("http-status-codes");
const { DATE } = require("sequelize");

const Mail = require("../models/mail.model").Mail();
const Message = require("../models/message.model").Message();
const User = require("../models/user.model").User();

const MessageFrom = require("../models/message.model").MessageFrom();


// Create a ghost mail 
exports.createMail = async (req, res, next) => {
    const address = req.body.address;
    const mailAdminAddress = req.body.mailAdminAddress;

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

        if (mailAdminAddress) {
            const userFound = await User.findOne({where: { email: mailAdminAddress }});

            if (!userFound) {
                let error = new Error("Admin not found!");
                error.statusCode = StatusCodes.UNAUTHORIZED;
                throw error;
            }

            cond.defaults = {
                address: address,
                expires: null,
                userId: userFound.id
            }
        }

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
