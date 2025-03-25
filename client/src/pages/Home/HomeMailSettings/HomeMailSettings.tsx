import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uid } from 'uid';
import { Button } from "@/components/ui/button";
import { Mails, Files, SquarePen, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import AuthContext from '../../../context/authContext';

import { socketJoinNewMail, socketLeaveMail } from '../../../services/socket';
import { authorizedGenerateGhostMail, unauthorizedGenerateGhostMail } from '../../../api/mail';

import { AppDispatch, RootState } from '@/store/store';
import { MailActions } from '../../../store/slice/mailSlice';
import { UserActions } from '../../../store/slice/userSlice';
import { fetchMailDetail } from '../../../store/slice/mailSlice';
import { deleteMail, changeMailAddress } from '../../../api/mail';
import {  ChangeMailAddressResponse, DeleteMailResponse, Mail, NewMailResponse } from '@/types/mail.d';


// COMPONENT FOR DISPLAYING MAIL OPTION 
const DisplayMailOption = (
    { 
        title, icon, apiFunction, token, callBackFunction, tempMail, callingServer = false, disabled, tempMailAddress 

    } : { title : string , icon: any, apiFunction : ((token: string, tempMail: string, tempMailAddress: string) => Promise<any>) | null, token:string, callBackFunction:(result?: any) => void, tempMail:string, callingServer:boolean, disabled:boolean, tempMailAddress:string}) => {
    const { toast } = useToast();

    return (
        <Button
            key={uid(8)}
            className='text-xs md:text-sm'
            onClick={async () => {
                if (callingServer && apiFunction!=null ) {
                    apiFunction!(token, tempMail, tempMailAddress).then(result => {
                        if(result.success){
                            toast({
                                title: "Success",
                                description : result.message,
                                variant : 'success'
                            })
                        }
                        callBackFunction(result);
                    }).catch((err:any) => {
                        toast({
                            title: "Error",
                            description: err.message,
                            variant: "destructive"
                        });
                    });
                } else {
                    callBackFunction();
                }

            }}
            disabled={disabled}
            variant="outline">{icon}{title}</Button>
    )
};

const HomeMailSettings = () => {
    const dispatch: AppDispatch = useDispatch();

    const authCtx = useContext(AuthContext);
    const mail = useSelector((state:RootState) => state.mail);
    const mailDetail = mail.mails.find((m:Mail)=> mail.currMailId === m.id);

    const { toast } = useToast();


    // CALLBACK FUNCTION - join to a room using socket and dispatch new mail to user and mail 
    const newMailHandler = (result:NewMailResponse) => {
        socketJoinNewMail(result.data.id);

        let userMailData : {
            id: string, address: string, isNotAuth?: boolean
        }= {
            id: result.data.id,
            address: result.data.address,
        };

        if (result.isNotAuth) {
            const prevMailId = localStorage.getItem("mailId");
            socketLeaveMail(prevMailId);
            localStorage.clear();

            const isNotAuth = result.isNotAuth;
            const mailId = result.data.id;
            const token = result.token;

            if(token) localStorage.setItem("token", token);
            if(mailId) localStorage.setItem("mailId", mailId);
            if(isNotAuth) localStorage.setItem("isNotAuth", isNotAuth.toString());


            const remainingMilliseconds = 24 * 60 * 60 * 1000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );

            localStorage.setItem("expiryDate", expiryDate.toISOString());

            const argsObj : {
                token : string | undefined , mailId : string, isNotAuth : boolean
            } = { token: token, mailId: mailId, isNotAuth: true };

            dispatch(fetchMailDetail(argsObj));
            userMailData.isNotAuth = true;
        } else {
            dispatch(UserActions.addNewMail(userMailData));
        }
    }

    // CALLBACK FUNCTION - clip the current mail address 
    const copyToClipBoardHandler = () => {
        if(mailDetail?.address === undefined) return;

        toast({
            description: `${mailDetail?.address} copied to clipboard!`
        })

        navigator.clipboard.writeText(mailDetail?.address)
    };

    // CALLBACK FUNCTION - delete the current mail and leave the socket for mail 
    const deleteMailHandler = (result:DeleteMailResponse) => {
        if (result.success) {
            socketLeaveMail(result.mailId);
            dispatch(MailActions.deleteMail({ mailId: result.mailId }))
            dispatch(UserActions.deleteMail({ mailId: result.mailId }))
        }
    };

    // CALLBACK FUNCTION - change the mail current address
    const changeAddressHandler = (result:ChangeMailAddressResponse) => {
        if (result.isChangeAddress) {
            dispatch(MailActions.changeMailAddress(result));
            dispatch(UserActions.changeMailAddress(result));
        }
    };

    // All mail options 
    const mailOptions : {
        title: string,
        icon: any,
        apiFunction: ((token: string, tempMail: string, tempMailAddress: string) => Promise<any>) | null,
        token: string | null,
        callBackFunction: (result?: any) => void,
        tempMail: string | null,
        tempMailAddress: string | null,
        callingServer: boolean,
        showAuth: boolean,
        disabled: boolean
    }[] = [
        {
            title: "New Mail",
            icon: <Mails />,
            apiFunction: authCtx.isAuth ? authorizedGenerateGhostMail : unauthorizedGenerateGhostMail,
            token: authCtx.token || '',
            callBackFunction: newMailHandler,
            tempMail: null,
            tempMailAddress : null,
            callingServer: true,
            showAuth: true,
            disabled: false
        },
        {
            title: "Copy to Clipboard",
            icon: <Files />,
            apiFunction: null,
            token: null,
            callBackFunction: copyToClipBoardHandler,
            tempMail: null,
            tempMailAddress : null,
            callingServer: false,
            showAuth: true,
            disabled: !mail.currMailId
        },
        {
            title: "Delete",
            icon: <Trash />,
            apiFunction: deleteMail,
            token: authCtx.token,
            callBackFunction: deleteMailHandler,
            tempMail: mailDetail?.id ?? null,
            tempMailAddress : mailDetail?.address ?? null,
            callingServer: true,
            showAuth: authCtx.isAuth,
            disabled: !mail.currMailId
        },
        {
            title: "Change",
            icon: <SquarePen />,
            apiFunction: changeMailAddress,
            token: authCtx.token,
            callBackFunction: changeAddressHandler,
            tempMail: mailDetail?.id ?? null,
            tempMailAddress : mailDetail?.address ?? null,
            callingServer: true,
            showAuth: authCtx.isAuth,
            disabled: !mail.currMailId
        }
    ];

    return (
        <div className="flex gap-x-4 gap-y-4 flex-wrap">
            {
                mailOptions.map(option => {
                    return option.showAuth ? <DisplayMailOption key={uid(8)} {...option} token={option.token || ''} tempMail={option.tempMail || ''} tempMailAddress={option.tempMailAddress || ''} /> : null
                })
            }
        </div>
    );
}


export default HomeMailSettings;