import {io } from "socket.io-client";

import { SOCKET_EVENT } from "../utils/socket_event";
import { Mail } from "@/types/mail.d";
import { Message } from "@/types/message.d";


let socket:any = null;

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
export const socketJoinNewMail = (mailId:string | null) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.JOIN_NEW_MAIL, { mailId });
  }
};

// MAIL - join multiple mail
export const socketJoinAllMail = (mails: Mail[] |null) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.JOIN_ALL_MAIL, { mails });
  }
}

// MAIL - leave mail 
export const socketLeaveMail = (mailId: string | null) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.LEAVE_MAIL, { mailId });
  }
};


// MESSAGE
// MESSAGE - get send message
export const socketGetSendMessage = (cb :any ) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_SEND_MESSSAGE, ({ data  }: {data: Message}) => {
      cb(null, { data });
    });
  }
};