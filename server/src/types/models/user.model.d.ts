import { UUID } from "node:crypto";
import { Model, Optional } from "sequelize";

// INTERFACE  
// Model - User
interface UserAttributes {
    isGoogleAuth: boolean;
    id: UUID,
    name: string;
    email: string;
    password: string;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }
