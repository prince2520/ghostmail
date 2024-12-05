const { DataTypes } = require('sequelize');

const { sequelize } = require("../services/connectDB")

// MODEL - MESSAGEFROM
module.exports.MessageFrom = () => {
    const MessageFrom = sequelize.define("messageFrom", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        }
    });
    return MessageFrom;
};


// MODEL - MESSAGE
module.exports.Message = () => {
    const Message = sequelize.define("message", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        mailId: {
            type: DataTypes.UUID,
            references: {
                model: 'mails',
                key: 'id'
            },
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        }
    });
    return Message;
};