import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input";

const AuthenticationSignUp = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl	font-bold	"> Create your account </h1>

            <Input type="text" placeholder="Name"/>
            <Input type="email" placeholder="Email"/>
            <Input type="password" placeholder="Password"/>
            <Input type="password" placeholder="Confirm Password"/> 
            <Button>Sign Up</Button>          

        </div>
    );
};

export default AuthenticationSignUp;