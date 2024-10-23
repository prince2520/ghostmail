const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const mailRoute = require("./routes/mail.route");
const {cors} = require("./middleware/cors.middleware");

const bodyParser = require("body-parser");
const helmet = require("helmet");

require("dotenv").config();
require("./services/connectDB").connectDB(server);

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors error handling 
app.use(cors);

app.use("/mail", mailRoute);
