import HomeInbox from "./HomeInbox/HomeInbox";
import HomeGhostMails from "./HomeGhostMails/HomeGhostMails";
import AllMails  from "../../components/custom/AllMails";
import HomeMailSettings from "./HomeMailSettings/HomeMailSettings";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector((state) => state.user);

    return (
        <div className='flex flex-col gap-y-6 items-center justify-center w-full'>
            <HomeGhostMails/>
            <HomeMailSettings/>
            <AllMails/>
            <HomeInbox/>
        </div>
    );
};

export default Home;