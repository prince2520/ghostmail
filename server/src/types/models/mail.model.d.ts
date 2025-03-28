import { UUID } from "node:crypto";
import { Model, Optional } from "sequelize";

// INTERFACE  
// Model - Mail
interface MailAttributes {
    id: UUID,
    address: string;
    expires: Date;
};

interface MailCreationAttributes
    extends Optional<MailAttributes, 'id'> { }

export interface MailInstance
    extends Model<MailAttributes, MailCreationAttributes>,
    MailAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}