import { useSelector } from "react-redux";
import HomeInboxNoMails from "./HomeInboxNoMails/HomeInboxNoMails";
import HomeInboxMessages from "./HomeInboxMessage/HomeInboxMessage";

const HomeInbox = () => {
    
    const mail = useSelector(state => state.mail);
    const currMailDetail = mail.mails.find(m => mail.currMailId === m.id);

    console.log("HOME INBOX  - mail ", mail);
    console.log("HOME INBOX  - currMailDetail ", currMailDetail);

    return (
        <div className="px-8 py-12 w-full rounded-md border-2">
            {currMailDetail?.messages.length > 0 ? <HomeInboxMessages messages={currMailDetail?.messages}/> : <HomeInboxNoMails/>}
        </div>
    );
};

export default HomeInbox;