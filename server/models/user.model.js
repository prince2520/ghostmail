const { DataTypes } = require('sequelize');

const {sequelize}  = require("../services/connectDB")

// MODEL - USER
module.exports.User = () => {
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