import { uid } from 'uid';
import { Button } from "@/components/ui/button";
import { Mails, Files, SquareChevronRight, RotateCw, SquarePen, Trash } from "lucide-react";
import { useContext } from 'react';
import AuthContext from '../../../context/authContext';

import { authorizedGenerateGhostMail, unauthorizedGenerateGhostMail } from '../../../api/mail';
import { socketJoinNewMail } from '../../../services/socket';
import { useDispatch } from 'react-redux';
import { MailActions } from '../../../store/slice/mailSlice';
import { UserActions } from '../../../store/slice/userSlice';
import { useSelector } from 'react-redux';

import { deleteMail } from '../../../api/mail';

const options = [
    {
        id: uid(8),
        title: "Forward",
        icon: <SquareChevronRight />,
        onClick: function () { }
    },

    {
        id: uid(8),
        title: "Refresh",
        icon: <RotateCw />,
        onClick: function () { }

    },
    {
        id: uid(8),
        title: "Change",
        icon: <SquarePen />,
        onClick: function () { }
    }
];

const displayGhostMailOptions = (title, icon, apiFunction, token, callBackFunction, tempMail, callingServer = false) => {
    return (
        <Button
            key={uid(8)}
            onClick={async () => {
                console.log("DisplayGhostMailOptions -> ", { title, icon, apiFunction, token, callBackFunction, tempMail, callingServer })
                if (callingServer) {
                    apiFunction(token, tempMail).then(result => {
                        console.log("api function", result)
                        callBackFunction(result.data);
                    }).catch(err => console.log(err));
                } else {
                    callBackFunction();
                }

            }}
            variant="outline">{icon}{title}</Button>
    )
}


const HomeMailSettings = () => {
    const authCtx = useContext(AuthContext);
    const mail = useSelector(state => state.mail);
    const dispatch = useDispatch();
    const mailDetail = mail.mails.find(m => mail.currMailId === m.id);

    const newMailData = (data) => {
        socketJoinNewMail(data.id);

        dispatch(MailActions.addNewMail(data));
        dispatch(UserActions.addNewMail({
            id: data.id,
            address: data.address
        }));
    }

    const copyToClipBoard = () => navigator.clipboard.writeText(mailDetail?.address);

    const deleteMAilHandler = (data) => {
        console.log("Delete Mail Handler -> ", data);
        if (data.isDeleted) {
            dispatch(MailActions.deleteMail({ mailId: data.mailId }))
            dispatch(UserActions.deleteMail({ mailId: data.mailId }))
        }
    };

    return (
        <div className="flex gap-x-4">
            {displayGhostMailOptions("New Mail", <Mails />, authCtx.isAuth ? authorizedGenerateGhostMail : unauthorizedGenerateGhostMail, authCtx.token, newMailData, null, true)}
            {displayGhostMailOptions("Copy to Clipboard", <Files />, null, null, copyToClipBoard, null, false)}
            {authCtx.isAuth && displayGhostMailOptions("Delete", <Trash />, deleteMail, authCtx.token, deleteMAilHandler, mailDetail?.id, true)}
        </div>
    );
}


export default HomeMailSettings;