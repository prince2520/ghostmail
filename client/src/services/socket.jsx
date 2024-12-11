import io from "socket.io-client";

import { SOCKET_EVENT } from "../utils/socket_event";


let socket = null;

// USER - initiate socket
export const socketInitiate = () => {
  socket = io(import.meta.env.VITE_API_SERVER_URL, { transports: ["websocket"] });
};

export const socketJoinNewMail = (mailId) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.JOIN_NEW_MAIL, { mailId });
  }
};

export const socketJoinAllMail = (mails) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.JOIN_ALL_MAIL, { mails });
  }
}

export const socketLeaveMail = (mailId) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.LEAVE_MAIL, { mailId });
  }
};

// Message - get send message
export const socketGetSendMessage = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_SEND_MESSSAGE, ({ data }) => {
      cb(null, { data });
    });
  }
};

// USER - disconnect socket
export const socketDisconnect = () => {
  if (socket) {
    socket.disconnect();
  }
};