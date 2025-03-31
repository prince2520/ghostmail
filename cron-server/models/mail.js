import { DataTypes } from 'sequelize';
import { db } from "../server.js";


// MODEL - MAIL
export const Mail = () => {
    const Mail = db.sequelize.define("mail", {
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
        }
    });
    return Mail;
};