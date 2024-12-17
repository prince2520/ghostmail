import { useSelector } from "react-redux";
import { QrCode, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";


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

const HomeMail = () => {
    const mail = useSelector(state => state.mail);
    const mailDetail = mail.mails.find(m => mail.currMailId === m.id);

    const { toast } = useToast();

    return (
        <div className="bg-stone-50 flex items-center justify-center dark:bg-zinc-900 rounded-md w-full py-24  border shadow-sm">
            <div className="w-[95%] flex gap-y-6 flex-col items-center justify-center">
                <h1 className="font-bold text-2xl">Your Temporary Email Address</h1>
                <div className="flex gap-x-6 w-4/5">
                    <Input className="border-neutral-300 dark:border-neutral-500" disabled type="email" defaultValue={mailDetail?.address} />
                    <Popover>
                        <PopoverTrigger>
                            <button disabled={!mailDetail?.address} className="border border-neutral-300 dark:border-0 text-zinc-800 cursor-pointer px-2 py-2 flex items-center justify-center bg-white rounded-full">
                                <QrCode size={18} />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-40"><GenerateQRCode mailAddress={mailDetail?.address} /></PopoverContent>
                    </Popover>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <button disabled={!mailDetail?.address} onClick={() => {
                                    toast({
                                        description: `${mailDetail?.address} copied to clipboard!`
                                    })
                                    navigator.clipboard.writeText(mailDetail?.address)
                                }} className="border border-neutral-300 dark:border-0 text-zinc-800 cursor-pointer px-2 py-2 flex items-center justify-center bg-white rounded-full">
                                    <Copy size={18} />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Copy to clipboard</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <p className="text-center text-xs text-neutral-600 dark:text-neutral-400" >Say goodbye to spam, ads, and hackers. Ghostmail offers a free, secure, and anonymous disposable email address to keep your inbox clean and safe.</p>

            </div>

        </div>
    );
};

export default HomeMail;