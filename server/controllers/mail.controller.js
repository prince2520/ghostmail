const { StatusCodes } = require("http-status-codes");
var randomstring = require("randomstring");
const { DATE } = require("sequelize");

const Mail = require("../models/mail.model").Mail();
const Message = require("../models/message.model").Message();
const User = require("../models/user.model").User();


const MessageFrom = require("../models/message.model").MessageFrom();

// Generate a new ghost mail 
exports.generateNewGhostMail = async (req, res, next) => {
    console.log("generateNewGhostMail called! ")
    const mailAdminAddress = req.query.mailAdminAddress === 'undefined' ? undefined :  req.query.mailAdminAddress;

    console.log("mailAdminAddress", typeof(mailAdminAddress));

    let address = null;

    // Generate a new mail until we get a address which does not exist in database;
    while(!address){

        let newAddress = randomstring.generate({
            length: 12,
            charset: ['alphabetic', 'numeric']
        });
        
        newAddress+=`@${process.env.MAIL_DOMAIN_ADDRESS}`;

        const newAddressFound = await Mail.findOne({where: {address:newAddress}});

        if(!newAddressFound){
            address =  newAddress;
        }
    }

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
            .json({ success: true, address: mail.address,  message: "Mail Created!" });

    } catch (err) {
        next(err);
    }
}
