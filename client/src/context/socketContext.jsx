import React, { useEffect } from "react";
import { socketInitiate, socketGetSendMessage, socketDisconnect} from "../services/socket";

const SocketContext = React.createContext({});

export const SocketContextProvider = ({ children }) => {

    useEffect(() => {
        socketInitiate();
    
        return () => {
            socketDisconnect();
        }
    }, []);

    useEffect(()=>{
        socketGetSendMessage((err, { data }) => {
            console.log('Data', data);
        });
    },[])

    return (
        <SocketContext.Provider value={{}} >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;