import io from "socket.io-client";

import { SOCKET_EVENT } from "../utils/socket_event";


let socket = null;

// USER
// USER - initiate socket
export const socketInitiate = () => {
  socket = io(import.meta.env.VITE_API_SERVER_URL, { transports: ["websocket"] });
};

// USER - disconnect socket
export const socketDisconnect = () => {
  if (socket) {
    socket.disconnect();
  }
};


// MAIL
// MAIL - join single mail
export const socketJoinNewMail = (mailId) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.JOIN_NEW_MAIL, { mailId });
  }
};

// MAIL - join multiple mail
export const socketJoinAllMail = (mails) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.JOIN_ALL_MAIL, { mails });
  }
}

// MAIL - leave mail 
export const socketLeaveMail = (mailId) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.LEAVE_MAIL, { mailId });
  }
};


// MESSAGE
// MESSAGE - get send message
export const socketGetSendMessage = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_SEND_MESSSAGE, ({ data }) => {
      cb(null, { data });
    });
  }
};