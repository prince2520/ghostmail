import { Server } from 'http';
import { Sequelize, Dialect } from 'sequelize';

export const db :{
  sequelize: Sequelize,
  Mail?: any,
  User?: any,
  Message?: any,
  MessageFrom?: any
} = {
  sequelize: {} as Sequelize
};

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string , process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as Dialect
});

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

// let test = cron.schedule('10 * * * *', () => {
//   console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
// });

// test.start();

export const connectDB = (server: Server) => {

  sequelize.authenticate().then(async () => {
    console.log('Connection has been established successfully.');

    //await sequelize.sync({force : true});
    await sequelize.sync();

    server.listen(process.env.PORT || 5000, () => {
      console.log("Server Connected!!");
    });

  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
};

