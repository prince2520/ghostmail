const { Sequelize } = require('sequelize');

const db = {};

module.exports.connectDB = (server) => {

  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host:  process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  });

  sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    // Models 
    db.mail = require("../models/mail.model").Mail(sequelize);
    db.user = require("../models/user.model").User(sequelize);
    db.message = require("../models/message.model").Message(sequelize);
    db.messageFrom = require("../models/message.model").MessageFrom(sequelize);

    // Association
    // One user have many mails - ( One to Many Relation )
    db.user.hasMany(db.mail);
    db.mail.belongsTo(db.user);

    // One mail have many messages - ( One to Many Relation )
    db.mail.hasMany(db.message);
    db.message.belongsTo(db.mail);

    // One user can send many messages - ( One to Many Relation )
    db.messageFrom.hasMany(db.message);
    db.message.belongsTo(db.messageFrom);

    db.sequelize.sync();

    server.listen(process.env.PORT || 5000, () => {
      console.log("Server Connected!!");
    })
  }).catch(err=>{
    console.error('Unable to connect to the database:', err);
  });
};

module.exports.DB = db;

