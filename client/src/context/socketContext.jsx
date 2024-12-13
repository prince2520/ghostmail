import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MailActions } from "../store/slice/mailSlice";
import { socketInitiate, socketGetSendMessage, socketDisconnect} from "../services/socket";


const SocketContext = React.createContext({});

export const SocketContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state=>state.user.id);

    useEffect(() => {
        socketInitiate();
        return () => {
            socketDisconnect();
        };
    }, [userId]);

    useEffect(()=>{
        socketGetSendMessage((err, { data }) => {
            dispatch(MailActions.saveMessage(data));
        });
    },[userId])

    return (
        <SocketContext.Provider value={{}} >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;