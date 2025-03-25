import { DataTypes } from 'sequelize';
import { db } from "../services/connectDB";
import { MailInstance } from '../types/models/mail.model';


// MODEL - MAIL
export const Mail = () => {
    const Mail = db.sequelize.define<MailInstance>("mail", {
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