import { useContext } from "react";

import AuthContext from "../../context/authContext";

import HomeMail from "./HomeMail/HomeMail";
import HomeInbox from "./HomeInbox/HomeInbox";
import AllMails  from "../../components/custom/AllMails";
import HomeMailSettings from "./HomeMailSettings/HomeMailSettings";

const Home = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div className='flex flex-col gap-y-6 items-center justify-center w-full'>
            <HomeMail/>
            <HomeMailSettings/>
            {authCtx.isAuth && <AllMails/>}
            <HomeInbox/>
        </div>
    );
};

export default Home;