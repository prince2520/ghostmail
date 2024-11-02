const { DataTypes } = require('sequelize');

// MODEL - MAIL
module.exports.Mail = (sequelize) => {
    const Mail = sequelize.define("mail", {
        address: {
            type: DataTypes.STRING
        }
    });
    return Mail;
};