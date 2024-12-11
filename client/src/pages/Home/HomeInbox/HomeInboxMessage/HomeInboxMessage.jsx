import randomColor from 'randomcolor';
import dateFormat from "dateformat";
import { ScrollArea } from "@/components/ui/scroll-area"


const HomeInboxMessages = ({ messages }) => {
    const generateRandomColor = () => {
        return randomColor({
            luminosity: 'dark',
            format: 'rgba',
            alpha: 0.6
        });
    };

    return (
        <>
            <ScrollArea className="max-h-[30rem] h-fit w-full">
                {messages.map(msg => <div className="flex flex-row gap-x-4 items-center border-b py-2 px-4 last:border-0" key={msg.id}>
                    <span className="flex text-white justify-center items-center w-12 h-12 rounded-full" style={{ backgroundColor: generateRandomColor() }}>
                        <h1 className='text-xl font-bold'>{msg.messageFrom?.name.charAt(0)}</h1>

                    </span>

                    <div className='w-full'>
                        <div className='flex flex-row justify-between w-full'>
                            <p className="text-xs font-semibold">{msg?.messageFrom?.name}</p>
                            <p className="text-xs font-semibold">{dateFormat(msg.createdAt, "ddd, dd mmm yyyy, hh:MMtt")} </p>
                        </div>
                        <h1 className="font-medium	">{msg.subject}</h1>
                        <p className="text-sm font-normal">{msg.text}</p>
                    </div>

                </div>)}
            </ScrollArea>
        </>
    );
};

export default HomeInboxMessages;