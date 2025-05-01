import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import HomeMail from "./HomeMail/HomeMail";
import HomeInbox from "./HomeInbox/HomeInbox";
import AllMails from "../../components/custom/AllMails";
import HomeMailSettings from "./HomeMailSettings/HomeMailSettings";


const Home = () => {
    const {isAuth} = useSelector((state:RootState)=>state.user);

    return (
        <div className='flex flex-col gap-y-6 items-center justify-center w-full'>
            <HomeMail />
            <HomeMailSettings />
            {isAuth && <AllMails />}
            <HomeInbox />
        </div>
    );
};

export default Home;