const { DataTypes } = require('sequelize');

const { sequelize } = require("../services/connectDB")

// MODEL - MESSAGEFROM
module.exports.MessageFrom = () => {
    const MessageFrom = sequelize.define("messageFrom", {
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
        mailId: {
            type: DataTypes.INTEGER,
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
        },
        messageFromId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'messageFroms',
                key: 'id'
            },
            allowNull: false
        }
    });
    return Message;
};