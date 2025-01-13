import Lottie from "lottie-react";

import { Button } from "@/components/ui/button";
import { useLocation, Link } from 'react-router-dom';

import LogoAnimation from "../../assets/lottifies/LogoAnimation.json";
import { useContext } from "react";
import AuthContext from "../../context/authContext.jsx";
import Profile from "../custom/Profile";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ModeToggle from "./ModeToggle"

const Logout = () => {
    const authCtx = useContext(AuthContext);

    return (
        <AlertDialog>
            <AlertDialogTrigger><Button>Logout</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Logout
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => authCtx.logoutHandler()}>Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

const Header = () => {
    const location = useLocation();
    const authCtx = useContext(AuthContext)

    return (
        <header className="flex justify-between w-full">
            <div className="flex items-center">
                <div className="w-14 md:w-16">
                    <Lottie animationData={LogoAnimation} loop={true} />
                </div>
                <h3 className="hidden md:block font-extrabold text-teal-700">GHOSTMAIL</h3>
            </div>
            <div className="flex gap-x-4 items-center justify-center">
                {authCtx.isAuth && <Profile/>}
                <ModeToggle/>
                {location.pathname === "/home" ?
                    !authCtx.isAuth ? (<Link to={"/auth/login"} className="link"><Button>Login/SignUp</Button></Link>) : (<Logout/>)
                    : <Link to={"/home"} className="link"><Button>Home</Button></Link>}
            </div>
        </header>
    );
};

export default Header;