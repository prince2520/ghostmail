import HomeInbox from "./HomeInbox/HomeInbox";
import HomeGhostMails from "./HomeGhostMails/HomeGhostMails";
import AllMails  from "../../components/custom/AllMails";
import HomeMailSettings from "./HomeMailSettings/HomeMailSettings";
import { useSelector } from "react-redux";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const Home = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div className='flex flex-col gap-y-6 items-center justify-center w-full'>
            <HomeGhostMails/>
            <HomeMailSettings/>
            {authCtx.isAuth && <AllMails/>}
            <HomeInbox/>
        </div>
    );
};

export default Home;