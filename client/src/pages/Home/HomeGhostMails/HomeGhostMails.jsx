import { Input } from "@/components/ui/input";
import { QrCode, Copy } from "lucide-react";
import { useSelector } from "react-redux";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import GenerateQRCode from "../../../components/custom/GenerateQRCode";

const HomeGhostMails = () => {
    const mail = useSelector(state => state.mail);
    const mailDetail = mail.mails.find(m => mail.currMailId === m.id);

    return (
        <div className="rounded-md px-36 py-24 flex gap-y-6 flex-col items-center justify-center border-2">
            <h1 className="font-bold text-2xl">Your Temporary Email Address</h1>
            <div className="flex gap-x-6 w-4/5">
                <Input disabled type="email" defaultValue={mailDetail?.address} />
                <Popover>
                    <PopoverTrigger>
                        <span className="cursor-pointer px-2 py-2 flex items-center justify-center bg-stone-100 rounded-full">
                            <QrCode size={18} />
                        </span>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-40"><GenerateQRCode mailAddress={mailDetail?.address} /></PopoverContent>
                </Popover>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <span onClick={() => navigator.clipboard.writeText(mailDetail?.address) } className="cursor-pointer px-2 py-2 flex items-center justify-center bg-stone-100 rounded-full">
                                <Copy size={18} />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copy to clipboard</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


            </div>
            <p className="text-center text-sm" >Say goodbye to spam, ads, and hackers. Ghostmail offers a free, secure, and anonymous disposable email address to keep your inbox clean and safe.</p>
        </div>
    );
};

export default HomeGhostMails;