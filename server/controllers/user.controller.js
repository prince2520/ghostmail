const { StatusCodes } = require("http-status-codes");

const { User } = require("../services/connectDB").db;
const { Mail } = require("../services/connectDB").db;

exports.fetchUserData = async (req, res, next) => {
    const email = req.email;

    try {

        const userFound = await User.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email'],
            include:
            {
                model: Mail,
                required: false
            }
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            data : userFound
        });

    } catch (err) {
        next(err);
    }
}