import { Socket } from "socket.io";

const { SOCKET_EVENT } = require("../../utils/socket_event");

const io = require("./socketIO").getIO();

export const socket = () => {
    io.on("connection", function (socket: Socket) {
        // New User connected 
        console.log("User connected!");

        //MAIL -join a new temp mail
        socket.on(SOCKET_EVENT.JOIN_NEW_MAIL, ({ mailId } : {mailId: string}) => {
            console.log("SOCKET SERVER - joining MailId=", mailId);
            socket.join(mailId);
        });

        // MAIL - join all mails 
        socket.on(SOCKET_EVENT.JOIN_ALL_MAIL, ({mails} : {mails:Array<any>}) => {
            console.error("mails ", mails)
            for(let mail of mails){
                socket.join(mail.id);
            }    
        });

        // MAIL - leave mail id
        socket.on(SOCKET_EVENT.LEAVE_MAIL, ({mailId}: {mailId: string}) => {
            console.log("SOCKET LEAVE MAIL ", mailId)
            socket.leave(mailId);
        });
        
        // USER - disconnect socket
        socket.on(SOCKET_EVENT.DISCONNECT, () => {
            console.log("User disconnected!")
            // socket.leave();
        });
    })
}