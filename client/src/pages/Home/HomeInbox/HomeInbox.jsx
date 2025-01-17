import { useSelector } from "react-redux";

import HomeInboxNoMails from "./HomeInboxNoMails/HomeInboxNoMails";
import HomeInboxMessages from "./HomeInboxMessage/HomeInboxMessage";

const HomeInbox = () => {
    const mail = useSelector(state => state.mail);
    const currMailDetail = mail.mails.find(m => mail.currMailId === m?.id);

    return (
        <div className="flex flex-col gap-y-4 px py-2 md:px-2 md:py-4 md:px-4 md:py-6 w-full rounded-md border">
            {currMailDetail?.messages.length > 0 ? <HomeInboxMessages messages={currMailDetail?.messages} mailId={currMailDetail.id}/> : <HomeInboxNoMails/>}
        </div>
    );
};

export default HomeInbox;