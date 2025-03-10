import { DataTypes } from 'sequelize';
import { db } from "../services/connectDB";
import { MessageFromInstance , MessageInstance} from "../types/models/message.model";


// MODEL - MESSAGEFROM
export const MessageFrom = () => {
    const MessageFrom = db.sequelize.define<MessageFromInstance>("messageFrom", {
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
export const Message = () => {
    const Message = db.sequelize.define<MessageInstance>("message", {
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
            type: DataTypes.TEXT
        },
        createdAt: {
            type: DataTypes.DATE
        }
    });
    return Message;
};