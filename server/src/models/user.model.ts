import { DataTypes } from 'sequelize';
import { db } from "../services/connectDB";
import { UserInstance } from '../types/models/user.model';

// MODEL - USER
export const User = () => {
    const User = db.sequelize.define<UserInstance>("user", {
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