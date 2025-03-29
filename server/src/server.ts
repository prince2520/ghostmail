import helmet from "helmet";
import bodyParser from "body-parser";
import { CustomError } from "./types/error";

import {config} from "dotenv";
config();

import express from "express";
import {Server} from "http";

const app = express();
const server = new  Server(app);

import cors from 'cors';
import {init} from './services/socket/socketIO';

init(server);

app.use(cors({
  origin: [process.env.CLIENT_URL as string],
}));

import {connectDB} from "./services/connectDB";
import {socket} from "./services/socket/socket";

// Connect to Server
connectDB(server);

// Socket Initialization
socket();

import { errorHandler } from "./middleware/error.middleware";

import mailRoute from "./routes/mail.route";
import authRoute from "./routes/auth.route";
import messageRoute from "./routes/message.route";
import userRoute from "./routes/user.route";

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Server Routes
app.use("/mail", mailRoute);
app.use("/auth", authRoute);
app.use("/message", messageRoute);
app.use("/user", userRoute);

// Route for Error
app.use((err: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});
