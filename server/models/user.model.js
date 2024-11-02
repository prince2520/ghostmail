const { DataTypes } = require('sequelize');

// MODEL - USER
module.exports.User = (sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    });
    return User;
};