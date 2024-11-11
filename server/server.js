const express = require("express");
const app = express();
const server = require("http").Server(app);

require("dotenv").config();
require("./services/connectDB").connectDB(server);


const {errorHandler} = require("./middleware/error.middleware");

const mailRoute = require("./routes/mail.route");
const authRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route")
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


app.use(errorHandler);
