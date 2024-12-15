const { StatusCodes } = require("http-status-codes");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");


const { Mail } = require("../services/connectDB").db;
const { Message } = require("../services/connectDB").db;
const { User } = require("../services/connectDB").db;
const { MessageFrom } = require("../services/connectDB").db;

const getMailFromDatabase = async (mailId) => {
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
        let error = new Error("Mail not Found!");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    return result;
}

const generateMail = async () => {
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
        let error = new Error("New temp mail not generated!");
        error.statusCode = StatusCodes.NOT_IMPLEMENTED;
        throw error;
    }

    return address;
};

const newGhostMail = async (authEmail = null) => {
    let address = await generateMail();

    let date = new Date();
    date.setDate(date.getDate() + 1);

    const cond = {
        where: { address: address },
        defaults: {
            address: address,
            expires: date
        }
    }

    if (authEmail) {
        const userFound = await User.findOne({ where: { email: authEmail } });

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

    const data = await getMailFromDatabase(mail.id);

    const result = { success: true, data: data, message: "Mail Created!" };

    return result;
}

// Generate a new ghost mail 
exports.generateNewGhostMail = async (req, res, next) => {
    try {
        let result = await newGhostMail();

        if (!req.isAuthUser) {
            const token = jwt.sign(
                {
                    isAuthUser: false,
                    tempMailId: result.data.id
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "24h" }
            );

            result.token = token;
            result.isNotAuth = true;
        };

        return res
            .status(StatusCodes.OK)
            .json(result);

    } catch (err) {
        next(err);
    };
}


exports.authorizedGenerateGhostMail = async (req, res, next) => {
    const authEmail = req.email;

    try {
        const result = await newGhostMail(authEmail);

        return res
            .status(StatusCodes.OK)
            .json(result);

    } catch (err) {
        next(err);
    };
}


// get mail data  
exports.getMailData = async (req, res, next) => {
    let mailId = req.query.mailId;

    if (req.isAuthUser) {
        mailId = req.tempMailId;
    }

    try {

        const mail = await getMailFromDatabase(mailId);
        
        return res
            .status(StatusCodes.OK)
            .json(mail);

    } catch (err) {
        next(err);
    };
}

// DELETE -> delete the mail for auth user
exports.deleteMail = async (req, res, next) => {
    const mailId = req.body.mailId;

    try {
        const isDeletedMail =  await Mail.destroy({
            where: { id: mailId }
        });

        if (!isDeletedMail) {
            let error = new Error("Mail not deleted!");
            error.statusCode = StatusCodes.NOT_IMPLEMENTED;
            throw error;
        }

        const data = {
            success: true,
            mailId: mailId,
            message: "Mail deleted Successfully!"
        }

        return res
            .status(StatusCodes.OK)
            .json(data);
    } catch (err) {
        next(err);
    }
}



exports.changeAddress = async (req, res, next) => {
    const userId = req.userId;
    const mailId = req.body.mailId;

    try {

        const address = await generateMail();

        await Mail.update(
            { address: address },
            { where: { id: mailId, userId: userId } }
        );

        const data = {
            mailId: mailId,
            updatedMailAddress: address,
            isChangeAddress: true
        };

        return res
            .status(StatusCodes.OK)
            .json({ data });

    } catch (err) {
        next(err);
    }
}