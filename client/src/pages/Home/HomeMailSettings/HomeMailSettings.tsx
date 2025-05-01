import {  useSelector } from 'react-redux';

import { uid } from 'uid';
import { Button } from "@/components/ui/button";
import { Mails, Files, SquarePen, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


import { socketJoinNewMail, socketLeaveMail } from '../../../services/socket';
import {  RootState, useAppDispatch } from '@/redux/store';

import { Mail } from '@/types/mail.d';
import { createNewMail, deleteMail, updateMailAddress } from '@/redux/thunks/mailThunk';


const HomeMailSettings = () => {
    const { toast } = useToast();
    const dispatch = useAppDispatch();

    const { mails, currMailId } = useSelector((state: RootState) => state.mail);
    const { isAuth, token } = useSelector((state: RootState) => state.user);

    const mail = mails.find((m: Mail) => currMailId === m.id);


    const createNewMailHandler = () => {
        dispatch(createNewMail({ token }))
            .unwrap()
            .then((res) => {
                socketJoinNewMail(res.data.id);

                if (!res.isAuth) {
                    const prevMailId = localStorage.getItem("mailId");
                    socketLeaveMail(prevMailId);
                    localStorage.clear();

                    if (res.token) localStorage.setItem("token", res.token);
                    if (res.data.id) localStorage.setItem("mailId", res.data.id);
                    if (res.isAuth) localStorage.setItem("isAuth", res.isAuth);


                    const remainingMilliseconds = 24 * 60 * 60 * 1000;
                    const expiryDate = new Date(
                        new Date().getTime() + remainingMilliseconds
                    );

                    localStorage.setItem("expiryDate", expiryDate.toISOString());
                }

            });
    }

    const copyToClipBoard = () => {
        if (mail?.address === undefined) return;
        navigator.clipboard.writeText(mail?.address);
        toast({
            description: `${mail?.address} copied to clipboard!`
        })
    };


    return (
        <div className="flex gap-x-4 gap-y-4 flex-wrap">

            <Button
                key={uid(8)}
                className='text-xs md:text-sm'
                onClick={() => createNewMailHandler()}
                disabled={false}
                variant="outline">
                <Mails /> <span>New Mail</span>
            </Button>

            <Button
                key={uid(8)}
                className='text-xs md:text-sm'
                onClick={() => copyToClipBoard()}
                disabled={!currMailId ? true : false}
                variant="outline">
                <Files /> <span>Clip to Clipboard</span>
            </Button>


            {isAuth && <Button
                key={uid(8)}
                className='text-xs md:text-sm'
                onClick={() => dispatch(deleteMail({ token, mailId: mail?.id, mailAddress: mail?.address }))}
                disabled={!currMailId ? true : false}
                variant="outline">
                <Trash /> <span>Delete</span>
            </Button>}

            {isAuth && <Button
                key={uid(8)}
                className='text-xs md:text-sm'
                onClick={() => dispatch(updateMailAddress({ token, mailId: mail?.id, mailAddress: mail?.address }))}
                disabled={!currMailId ? true : false}
                variant="outline">
                <SquarePen /> <span>Change</span>
            </Button>}

        </div >
    );
}


export default HomeMailSettings;