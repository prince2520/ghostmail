import HomeInboxNoMails from "./HomeInboxNoMails/HomeInboxNoMails";
import HomeInboxTable from "./HomeInboxTable/HomeInboxTable";

const HomeInbox = () => {
    return (
        <div className="px-8 py-12 w-full rounded-md border-2">
            {/* <HomeInboxNoMails/> */}
            <HomeInboxTable/>
        </div>
    );
};

export default HomeInbox;