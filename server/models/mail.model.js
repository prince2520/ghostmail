const { DataTypes } = require('sequelize');

const { sequelize } = require("../services/connectDB")

// MODEL - MAIL
module.exports.Mail = () => {
    const Mail = sequelize.define("mail", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: true
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: true
        },
    });
    return Mail;
};