import io from "socket.io-client";

import { SOCKET_EVENT } from "../utils/socket_event";


let socket = null;

// USER - initiate socket
export const socketInitiate = () => {
  socket = io(import.meta.env.VITE_API_SERVER_URL, { transports: ["websocket"] });
};

export const socketJoinNewMail= (mailId) => {
  if (socket) {
    console.log("SOCKET CLIENT - joining MailId=", mailId);
    socket.emit(SOCKET_EVENT.JOIN_NEW_MAIL, { mailId });
  }
};

export const socketJoinAllMail = (mails) => {
  if(socket) {
    console.log("SOCKET CLIENT - ALL MAILS ", mails);
    socket.emit(SOCKET_EVENT.JOIN_ALL_MAIL, {mails});

  }
}

// Message - get send message
export const socketGetSendMessage = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_SEND_MESSSAGE, ({ data }) => {
      console.log('data', data);
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