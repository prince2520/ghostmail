import { Server } from 'http';
const socketio = require('socket.io');
let io : any;

export const init = (server : Server) =>  {
    io = socketio(server);
    return io;
}

export const getIO  = ()  =>{
    if (!io) {
       throw new Error("Can't get io instance before calling .init()");
    }
    return io;
}