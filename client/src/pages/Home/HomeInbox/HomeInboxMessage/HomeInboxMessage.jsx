import dateFormat from "dateformat";
import randomColor from 'randomcolor';
import parse from 'html-react-parser';

import { ScrollArea } from "@/components/ui/scroll-area";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import DOMPurify from 'dompurify';
import { Button } from "@/components/ui/button";
import { deleteMessage } from "../../../../api/message";
import { useContext } from "react";
import AuthContext from "../../../../context/authContext";
import { useDispatch } from "react-redux";
import { MailActions } from "../../../../store/slice/mailSlice";
import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import React from "react";


const HomeInboxMessages = ({ messages, mailId }) => {
    const authCtx = useContext(AuthContext);

    const dispatch = useDispatch();
    const { toast } = useToast();


    //Generate random color 
    const generateRandomColorHandler = useCallback(() => {
        return randomColor({
            luminosity: 'dark',
            format: 'rgba',
            alpha: 0.6
        });
    }, []);

    const checkShowDateCondition = (createdAt, idx) => {
        if (idx === 0) return true;

        let prevDate, currDate;

        prevDate = dateFormat(messages[idx - 1].createdAt, "dd mmm yyyy")
        currDate = dateFormat(createdAt, "dd mmm yyyy");

        return prevDate !== currDate;
    };

    const deleteMessageHandler = (messageId) => {
        deleteMessage(authCtx.token, mailId, messageId)
            .then(res => {
                if (res.success) {
                    toast({
                        title: "Success",
                        description: res.message,
                        variant: "success"
                    });
                    dispatch(MailActions.deleteMessageFromMail(res));
                }
            }).catch(err => {
                toast({
                    title: "Error",
                    description: err.message,
                    variant: "destructive"
                });
            })
    }

    return (
        <>
            <ScrollArea className="max-h-[30rem] h-fit w-full">
                {messages.map((msg, idx) =>
                    <>
                        {checkShowDateCondition(msg.createdAt, idx) && <div className="w-full flex items-center justify-center"><span className="px md:px-2 rounded-sm mb-2 font-medium text-xs bg-stone-50 dark:bg-zinc-900">{dateFormat(msg.createdAt, "ddd, dd mmm yyyy")}</span></div>}
                        <Dialog key={msg.id}>
                            <DialogTrigger className="w-full cursor-pointer hover:bg-stone-50 dark:hover:bg-zinc-900 border-b last:border-0 mb-2">
                                <div className="flex flex-row gap-x-4 items-center py px-2 md:py-2 md:px-4" key={msg.id}>
                                    <span className="flex text-white justify-center items-center w-12 h-12 rounded-full" style={{ backgroundColor: generateRandomColorHandler() }}>
                                        <h1 className='text-xl font-bold'>{msg.messageFrom?.name.charAt(0)}</h1>
                                    </span>
                                    <div className='w-full text-left '>
                                        <div className='flex flex-row justify-between w-full'>
                                            <p className="text-xs font-semibold  text-neutral-900 dark:text-neutral-300">{msg?.messageFrom?.name}</p>
                                            <p className="text-xs font-semibold  text-neutral-900 dark:text-neutral-300">{dateFormat(msg.createdAt, "hh:MMtt")} </p>
                                        </div>
                                        <h1 className="text-sm md:text-md">{msg.subject.length > 30 ? msg.subject.slice(0, 50) + '...' : msg.subject}</h1>
                                        <p className="text-xs md:text-sm font-normal text-neutral-600 dark:text-neutral-400">{msg.text.length > 30 ? msg.text.replace(/<[^>]+>/g, '').slice(0, 50) + '...' : msg.text.replace(/<[^>]+>/g, '')}</p>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Message</DialogTitle>
                                </DialogHeader>
                                <div className="flex relative w-full flex-col gap-y-2">
                                    <div className="flex items-center gap-x-2">
                                        <span className="w-fit text-[0.8rem] text-neutral-600 dark:text-neutral-400">From : </span>
                                        <div className="flex gap-x-2 text-center border text-[0.75rem] px-2 py-1 rounded w-fit ">
                                            <span className="border px-2 rounded bg-stone-50 dark:bg-zinc-900">{msg?.messageFrom?.name}</span>
                                            <span>{msg.messageFrom?.address}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <span className="w-fit text-[0.8rem] text-neutral-600 dark:text-neutral-400">Subject  : </span>
                                        <div className=" flex gap-x-2 text-center border text-[0.75rem] px-2 py-1 rounded w-fit ">
                                            <span>{msg.subject}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex justify-between items-center	">
                                            <span className="w-fit text-[0.8rem] text-neutral-600 dark:text-neutral-400">Message</span>
                                            <div className="border bg-stone-50  dark:bg-zinc-900 w-fit px-2 rounded text-[0.65rem]">
                                                {dateFormat(msg.createdAt, "ddd, dd mmm yyyy, hh:MMtt")}
                                            </div>
                                        </div>
                                        <ScrollArea className="flex flex-wrap text-wrap w-full h-[200px] border px-2 py-2 rounded text-sm">
                                            {parse(DOMPurify.sanitize(msg.text))}
                                        </ScrollArea>
                                    </div>

                                </div>
                                <DialogFooter className="gap-y-2 sm:justify-end">
                                    <DialogClose asChild>
                                        <Button type="submit" variant="secondary">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button onClick={() => deleteMessageHandler(msg.id)} type="button" variant="destructive">
                                        Delete
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </ScrollArea>
        </>
    );
};

export default React.memo(HomeInboxMessages);