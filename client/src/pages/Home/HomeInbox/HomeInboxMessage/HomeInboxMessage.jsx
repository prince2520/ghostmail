import dateFormat from "dateformat";
import randomColor from 'randomcolor';

import { ScrollArea } from "@/components/ui/scroll-area";

const HomeInboxMessages = ({ messages }) => {

    //Generate random color 
    const generateRandomColorHandler = () => {
        return randomColor({
            luminosity: 'dark',
            format: 'rgba',
            alpha: 0.6
        });
    };

    return (
        <>
            <ScrollArea className="max-h-[30rem] h-fit w-full">
                {messages.map(msg =>
                    <div className="cursor-pointer hover:bg-stone-50 dark:hover:bg-zinc-900 rounded-md flex flex-row gap-x-4 items-center border-b py-2 px-4 last:border-0" key={msg.id}>
                        <span className="flex text-white justify-center items-center w-12 h-12 rounded-full" style={{ backgroundColor: generateRandomColorHandler() }}>
                            <h1 className='text-xl font-bold'>{msg.messageFrom?.name.charAt(0)}</h1>
                        </span>
                        <div className='w-full'>
                            <div className='flex flex-row justify-between w-full'>
                                <p className="text-xs font-semibold  text-neutral-900 dark:text-neutral-300">{msg?.messageFrom?.name}</p>
                                <p className="text-xs font-semibold  text-neutral-900 dark:text-neutral-300">{dateFormat(msg.createdAt, "ddd, dd mmm yyyy, hh:MMtt")} </p>
                            </div>
                            <h1 className="font-medium	">{msg.subject}</h1>
                            <p className="text-sm font-normal  text-neutral-600 dark:text-neutral-400">{msg.text}</p>
                        </div>
                    </div>)}
            </ScrollArea>
        </>
    );
};

export default HomeInboxMessages;