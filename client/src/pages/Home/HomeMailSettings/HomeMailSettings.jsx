import { uid } from 'uid';
import { Button } from "@/components/ui/button";
import { Mails, Files, SquareChevronRight, RotateCw, SquarePen, Trash } from "lucide-react";
import { useCallback, useContext } from 'react';
import AuthContext from '../../../context/authContext';

import { authorizedGenerateGhostMail, unauthorizedGenerateGhostMail } from '../../../api/mail';
import { socketJoinNewMail } from '../../../services/socket';


const options = [
    {
        id: uid(8),
        title: "New Mail",
        icon: <Mails />,
        onClick: function () { }
    },

    {
        id: uid(8),
        title: "Copy",
        icon: <Files />,
        onClick: function () { }
    },

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

    },

    {
        id: uid(8),
        title: "Delete",
        icon: <Trash />,
        onClick: function () { }
    }
];

const displayGhostMailOptions = (title, icon, apiFunction, token, callBackFunction,  tempMail) => {
    return (
        <Button
            key={uid(8)}
            onClick={async () => {
                 apiFunction(token, tempMail).then(result=>{
                    callBackFunction(result.data);
                }).catch(err=>console.log(err));
            }}
            variant="outline">{icon}{title}</Button>
    )
}


const HomeMailSettings = () => {
    const authCtx = useContext(AuthContext);

    const newMailData = (data) => {
        socketJoinNewMail(data.id)
    }

    return (
        <div className="flex gap-x-4">
            {displayGhostMailOptions("New Mail", <Mails />, authCtx.isAuth ? authorizedGenerateGhostMail : unauthorizedGenerateGhostMail, authCtx.token, newMailData)}
        </div>
    );
};

export default HomeMailSettings;