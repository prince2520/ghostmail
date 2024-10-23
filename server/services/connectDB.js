const mongoose = require("mongoose");
const { MONGO_URL } = require("../constants/constants");

module.exports.connectDB = (server) => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected");
      server.listen(process.env.PORT || 5000);
    });
};