import { Input } from "@/components/ui/input";
import { uid } from 'uid';
import { QrCode, Copy, BadgePlus } from "lucide-react";

const ghostMailOptions = [
    {
        id: uid(16),
        icon: <QrCode size={18} />,
        auth: false
    },
    {
        id: uid(16),
        icon: <Copy size={18} />,
        auth: false

    },
    {
        id: uid(16),
        icon: <BadgePlus size={18} />,
        auth: false
    }
]

const HomeGhostMails = () => {
    return (
        <div className="rounded-md px-36 py-24 flex gap-y-6 flex-col items-center justify-center border-2">
            <h1 className="font-bold text-2xl">Your Temporary Email Address</h1>
            <div className="flex gap-x-6 w-4/5">
                <Input disabled type="email" className="" />
                {ghostMailOptions.map(option => {
                    return <span className="cursor-pointer px-2 py-2 flex items-center justify-center bg-stone-100 rounded-full" key={option.key}>{option.icon}</span>
                })}
            </div>
            <p className="text-center text-sm" >Say goodbye to spam, ads, and hackers. Ghostmail offers a free, secure, and anonymous disposable email address to keep your inbox clean and safe.</p>
        </div>
    );
};

export default HomeGhostMails;