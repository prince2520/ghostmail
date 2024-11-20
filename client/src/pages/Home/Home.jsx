import HomeInbox from "./HomeInbox/HomeInbox";
import HomeGhostMails from "./HomeGhostMails/HomeGhostMails";
import HomeMailSettings from "./HomeMailSettings/HomeMailSettings";

const Home = () => {
    return (
        <div className='flex flex-col gap-y-6 items-center justify-center w-full'>
            <HomeGhostMails/>
            <HomeMailSettings/>
            <HomeInbox/>
        </div>
    );
};

export default Home;