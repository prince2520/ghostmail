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
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: true
        },
    });
    return Mail;
};