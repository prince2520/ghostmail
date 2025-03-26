import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { MailActions } from "../store/slice/mailSlice";

import { socketInitiate, socketGetSendMessage, socketDisconnect } from "../services/socket";
import { RootState } from "@/store/store";
import { Message } from "@/types/message.d";

const SocketContext = React.createContext({});

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const userId = useSelector((state: RootState) => state.user.id);

    useEffect(() => {
        socketInitiate();
        return () => {
            socketDisconnect();
        };
    }, [userId]);

    useEffect(() => {
        socketGetSendMessage((_: any, { data }: { data: Message }) => {
            toast({
                title: "New Message",
                description: `${data.messageFrom.name} sended you a message!`
            })

            dispatch(MailActions.saveMessage(data));
        });
    }, [userId])

    return (
        <SocketContext.Provider value={{}} >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;