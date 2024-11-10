const { Sequelize } = require('sequelize');

const db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host:  process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

exports.sequelize = sequelize;

module.exports.connectDB = (server) => {

  sequelize.authenticate().then(async ()=>{
    console.log('Connection has been established successfully.');

    // Models 
    const mail = require("../models/mail.model").Mail();
    const user = require("../models/user.model").User();
    const message = require("../models/message.model").Message();
    const messageFrom = require("../models/message.model").MessageFrom();

    // Association
    // One user have many mails - ( One to Many Relation )
    user.hasMany(mail);
    mail.belongsTo(user);

    // One mail have many messages - ( One to Many Relation )
    mail.hasMany(message);
    message.belongsTo(mail);

    // One user can send many messages - ( One to Many Relation )
    messageFrom.hasMany(message);
    message.belongsTo(messageFrom);

    await sequelize.sync({force:true});

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    server.listen(process.env.PORT || 5000, () => {
      console.log("Server Connected!!");
    })
  }).catch(err=>{
    console.error('Unable to connect to the database:', err);
  });
};

module.exports.db = db;

