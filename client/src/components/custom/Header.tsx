import Lottie from "lottie-react";

import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from 'react-router-dom';

import LogoAnimation from "../../assets/lottifies/LogoAnimation.json";
import { useContext } from "react";
import AuthContext from "../../context/authContext.jsx";

const Header = () => {
    const location = useLocation();
    const authCtx = useContext(AuthContext)

    return (
        <div className="flex justify-between w-full">
            <div className="flex items-center">
                <div className="w-16">
                    <Lottie animationData={LogoAnimation} loop={true} />
                </div>
                <h3 className="font-extrabold text-cyan-900">GHOSTMAIL</h3>
            </div>
            <div className="flex gap-x-4 items-center justify-center">
                <Moon />
                {location.pathname === "/home" ? 
                !authCtx.isAuth ? (<Link to={"/auth/login"} className="link"><Button>Login/SignUp</Button></Link> ) : (<Button onClick={()=>authCtx.logoutHandler()}>Logout</Button>)
                : <Link to={"/home"} className="link"><Button>Home</Button></Link>}
            </div>
        </div>
    );
};

export default Header;