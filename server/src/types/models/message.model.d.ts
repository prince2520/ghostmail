import { UUID } from "node:crypto";
import { Model, Optional } from "sequelize";

// INTERFACE  
// Model - MailFrom
interface MessageFromAttributes {
    id: UUID,
    address: string;
    name: string;
};

interface MessageFromCreationAttributes
    extends Optional<MessageFromAttributes, 'id'> { }


export interface MessageFromInstance
    extends Model<MessageFromAttributes, MessageFromCreationAttributes>,
    MessageFromAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

// Model - Message
interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> { }

export interface MessageInstance extends Model<MessageAttributes, MessageCreationAttributes>, MessageAttributes {
    updatedAt?: Date;
}
