import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { MailActions } from "@/redux/slices/mailSlice";

import { socketInitiate, socketGetSendMessage, socketDisconnect } from "../services/socket";
import { RootState } from "@/redux/store";
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
            if (data) {
                toast({
                    title: "New Message",
                    description: `${data.messageFrom.name} sended you a message!`
                })

                dispatch(MailActions.createMessage(data));
            } else {
                toast({
                    title: "Error",
                    description: `Something goes wrong!`
                })
            }
        });
    }, [userId])

    return (
        <SocketContext.Provider value={{}} >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;