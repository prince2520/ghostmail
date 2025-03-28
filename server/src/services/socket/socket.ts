import { Socket } from "socket.io";

import { SOCKET_EVENT } from "../../utils/socket_event";

import {getIO} from "./socketIO";

const io = getIO();

export const socket = () => {
    io.on("connection", function (socket: Socket) {
        // New User connected 
        console.log("User connected!");

        //MAIL -join a new temp mail
        socket.on(SOCKET_EVENT.JOIN_NEW_MAIL, ({ mailId }: { mailId: string }) => {
            socket.join(mailId);
        });

        // MAIL - join all mails 
        socket.on(SOCKET_EVENT.JOIN_ALL_MAIL, ({ mails }: { mails: Array<any> }) => {
            for (let mail of mails) {
                socket.join(mail.id);
            }
        });

        // MAIL - leave mail id
        socket.on(SOCKET_EVENT.LEAVE_MAIL, ({ mailId }: { mailId: string }) => {
            socket.leave(mailId);
        });

        // USER - disconnect socket
        socket.on(SOCKET_EVENT.DISCONNECT, () => {
            // socket.leave();
        });
    })
}