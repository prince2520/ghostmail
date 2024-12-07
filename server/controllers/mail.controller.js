const { StatusCodes } = require("http-status-codes");
var randomstring = require("randomstring");

const {Mail} = require("../services/connectDB").db;
const {Message} = require("../services/connectDB").db;
const {User} = require("../services/connectDB").db;


const newGhostMail = async (mailAdminAddress = undefined) => {
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
        const userFound = await User.findOne({ where: { email: mailAdminAddress } });

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

    console.log("Cond => ", cond);

    const [mail, created] = await Mail.findOrCreate(cond);

    if (!created) {
        let error = new Error("Mail already exist! Please try another mail.");
        error.statusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    const data = mail.dataValues;

    const result = { success: true, data: data, message: "Mail Created!" };

    return result;
}

// Generate a new ghost mail 
exports.generateNewGhostMail = async (req, res, next) => {
    try {
        const result = await newGhostMail();

        return res
            .status(StatusCodes.OK)
            .json(result);

    } catch (err) {
        next(err);
    };
}


exports.authorizedGenerateGhostMail = async (req, res, next) => {
    const mailAdminAddress = req.email;

    try {
        const result = await newGhostMail(mailAdminAddress);

        return res
            .status(StatusCodes.OK)
            .json(result);

    } catch (err) {
        next(err);
    };
}


// get mail data  
exports.getMailData = async (req, res, next) => {
    const mailAddress = req.query.mailAddress;
    console.log("get Mail data", mailAddress)

    try {
        const mail = await Mail.findOne({
            where: { address: mailAddress }, 
            include:
            {
                model: Message,
                required: false
            }
        })

        return res
            .status(StatusCodes.OK)
            .json(mail);

    } catch (err) {
        next(err);
    };
}


