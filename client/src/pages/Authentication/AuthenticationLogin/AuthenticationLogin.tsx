import { Icon } from "@iconify/react/dist/iconify.js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Link } from "react-router-dom";

const AuthenticationLogin = () => {
    return (
        <div className="basis-1/2 flex items-center justify-center flex-col gap-y-4 max-w-5xls">
            <h1 className="text-2xl	font-bold	"> Login your account </h1>

            <Button className="w-full" variant="outline">
                <Icon icon="flat-color-icons:google" />
                <h3>Sign in with Google</h3>
            </Button>

            <div className="w-full relative flex items-center justify-center">
                <span className="z-10">or</span>
                <hr className="absolute w-full" />
            </div>

            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button className="w-full">Login</Button>

            <p className="text-sm">Don't have an account?<Link to={"/auth/signup"} className="text-blue-950 hover:text-blue-800 active:text-blue-800"> Sign Up</Link></p>

        </div>
    );
};

export default AuthenticationLogin;