require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").Server(app);
const initSocket = require('./services/socket/socketIO');

initSocket.init(server);

require("./services/connectDB").connectDB(server);
require("./services/socket/socket")();

const {errorHandler} = require("./middleware/error.middleware");

const mailRoute = require("./routes/mail.route");
const authRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");
const userRoute = require('./routes/user.route');

const {cors} = require("./middleware/cors.middleware");

const bodyParser = require("body-parser");
const helmet = require("helmet");


app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors error handling 
app.use(cors);

app.use("/mail", mailRoute);
app.use("/auth", authRoute);
app.use("/message", messageRoute);
app.use("/user", userRoute);

app.use(errorHandler);
