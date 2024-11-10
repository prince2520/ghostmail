const { DataTypes } = require('sequelize');

const { sequelize } = require("../services/connectDB")

// MODEL - MAIL
module.exports.Mail = () => {
    const Mail = sequelize.define("mail", {
        address: {
            type: DataTypes.STRING
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });
    return Mail;
};