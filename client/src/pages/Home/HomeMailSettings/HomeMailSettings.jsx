import { uid } from 'uid';
import { Button } from "@/components/ui/button";
import { Mails, Files, SquareChevronRight, RotateCw, SquarePen, Trash } from "lucide-react";
import { generateGhostMail } from '../../../api/mail';


const options = [
    {
        id: uid(8),
        title: "New Mail",
        icon: <Mails />,
        onClick: generateGhostMail
    },

    {
        id: uid(8),
        title: "Copy",
        icon: <Files />,
        onClick: function(){}
    },

    {
        id: uid(8),
        title: "Forward",
        icon: <SquareChevronRight />,
        onClick: function(){}
    },

    {
        id: uid(8),
        title: "Refresh",
        icon: <RotateCw />,
        onClick: function(){}

    },

    {
        id: uid(8),
        title: "Change",
        icon: <SquarePen />,
        onClick: function(){}

    },

    {
        id: uid(8),
        title: "Delete",
        icon: <Trash />,
        onClick: function(){}
    }
];
 

const HomeMailSettings = () => {
    return (
        <div className="flex gap-x-4">
            {options.map(option => (
                <Button onClick={()=>option.onClick("prince2520p@gmail.com")} id={option.id} variant="outline">{option.icon}{option.title}</Button>
            ))}
        </div>
    );
};

export default HomeMailSettings;