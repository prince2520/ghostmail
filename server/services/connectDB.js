const { Sequelize } = require('sequelize');

const db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

exports.sequelize = sequelize;

db.Sequelize = Sequelize;
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


module.exports.connectDB = (server) => {

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

module.exports.db = db;

