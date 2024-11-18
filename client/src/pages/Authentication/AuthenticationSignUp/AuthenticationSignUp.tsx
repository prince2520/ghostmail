import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input";

import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

const AuthenticationSignUp = () => {
    return (
        <div className=" basis-1/2 flex items-center justify-center flex-col gap-y-4 max-w-5xl">
            <h1 className="text-2xl	font-bold	"> Create your account </h1>

            <Button className="w-full" variant="outline">
                <Icon icon="flat-color-icons:google" />
                <h3>Sign up with Google</h3>
            </Button>

            <div className="w-full relative flex items-center justify-center">
                <span className="z-10">or</span>
                <hr className="absolute w-full" />
            </div>


            <Input type="text" placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm Password" />
            <Button className="w-full">Sign Up</Button>

            <p className="text-sm">Already have an account? <Link to={"/auth/login"} className="link">Login</Link></p>
        </div>
    );
};

export default AuthenticationSignUp;