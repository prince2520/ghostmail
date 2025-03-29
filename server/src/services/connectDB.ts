import { Server } from 'http';
import { Sequelize } from "sequelize-typescript";

export const db: {
  sequelize: Sequelize,
  Mail?: any,
  User?: any,
  Message?: any,
  MessageFrom?: any
} = {
  sequelize: {} as Sequelize
};

//  // Local use
// const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string , process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT as Dialect
// });

const sequelize = new Sequelize(process.env.SUPABASE_DB_URL as string);


exports.sequelize = sequelize;

db.sequelize = sequelize;

// Models 
db.Mail = require("../models/mail.model").Mail();
db.User = require("../models/user.model").User();
db.Message = require("../models/message.model").Message();
db.MessageFrom = require("../models/message.model").MessageFrom();

// Association
// One user have many mails - ( One to Many Relation )
db.User.hasMany(db.Mail);
db.Mail.belongsTo(db.User);

// One mail have many messages - ( One to Many Relation )
db.Mail.hasMany(db.Message);
db.Message.belongsTo(db.Mail);

// One user can send many messages - ( One to Many Relation )
db.MessageFrom.hasMany(db.Message);
db.Message.belongsTo(db.MessageFrom);

export const connectDB = (server: Server) => {
  sequelize.authenticate().then(async () => {
    console.log('Connection has been established successfully.');

    //await sequelize.sync({force : true});
    await sequelize.sync();

    server.listen(process.env.PORT || 5000, () => {
      console.log("Server Connected!!");
    });

  }).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
};

