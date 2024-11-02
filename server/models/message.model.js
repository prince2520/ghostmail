const { DataTypes } = require('sequelize');

// MODEL - MESSAGEFROM
module.exports.MessageFrom = (sequelize) => {
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
module.exports.Message = (sequelize) => {
    const Message = sequelize.define("message", {
        subject: {
            type: DataTypes.STRING
        },
        text : {
            type: DataTypes.STRING
        },
        time: {
            type: DataTypes.DATE
        }
    });
    return Message;
};