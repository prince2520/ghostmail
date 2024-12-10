import React, { useEffect } from "react";
import { socketInitiate, socketGetSendMessage, socketDisconnect} from "../services/socket";
import { useDispatch } from "react-redux";
import { MailActions } from "../store/mailSlice";

const SocketContext = React.createContext({});

export const SocketContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        socketInitiate();
    
        return () => {
            socketDisconnect();
        }
    }, []);

    useEffect(()=>{
        socketGetSendMessage((err, { data }) => {
            console.log('Data', data);
            dispatch(MailActions.saveMessage(data));
        });
    },[])

    return (
        <SocketContext.Provider value={{}} >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;