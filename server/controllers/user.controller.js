const { StatusCodes } = require("http-status-codes");

const User = require("../models/user.model").User();
const Mail = require("../models/mail.model").Mail();

exports.fetchUserData = async (req, res, next) => {
    console.log("Get user data -> ", req.email);
    const email = req.email;

    try {

        const userFound = await User.findOne({ where: { email: email } });

        const userMails = await Mail.findAll({
            where: { userId: userFound.id },
            attributes: ['id', 'address']
        });

        return res.status(StatusCodes.OK).json({
            success: true,

            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            mailAddressAndIds: userMails
        });

    } catch (err) {
        next(err);
    }


}