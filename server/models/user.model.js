const { DataTypes } = require('sequelize');

const { sequelize } = require("../services/connectDB")

// MODEL - USER
module.exports.User = () => {
    const User = sequelize.define("user", {
        isGoogleAuth: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
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