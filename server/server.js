require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").Server(app);
const session = require("express-session");

const passport = require("passport");
var cors = require('cors')

const initSocket = require('./services/socket/socketIO');

initSocket.init(server);

console.log("session key ", process.env.SESSION_KEY)
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_KEY, // A secret key for signing the session ID cookie
        resave: false, // Don't save session if unmodified
        saveUninitialized: true, // Create a session even if the user is not authenticated
        cookie: {
            secure: false, // Set to true if you're using HTTPS
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        }
    })
);

// Set COOP and COEP headers
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");  // COOP header
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");  // COEP header
    next();
});

require("./services/connectDB").connectDB(server);
require("./services/socket/socket")();
require("./config/passport");


const { errorHandler } = require("./middleware/error.middleware");

const mailRoute = require("./routes/mail.route");
const authRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");
const userRoute = require('./routes/user.route');


const bodyParser = require("body-parser");
const helmet = require("helmet");


// Initialize Passport.js and session support
app.use(passport.initialize());
app.use(passport.session());


app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors error handling 

app.use("/mail", mailRoute);
app.use("/auth", authRoute);
app.use("/message", messageRoute);
app.use("/user", userRoute);

app.use(errorHandler);
