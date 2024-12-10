import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";

import { z } from "zod";

import { LoginSchema } from "../../../schema/login";

import AuthContext from "../../../context/authContext.jsx";


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useContext } from 'react';

const AuthenticationLogin = () => {
    const authCtx = useContext(AuthContext);
    // define your form
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
        }
    });

    // submit your form
    function onSubmit(values: z.infer<typeof LoginSchema>) {
        authCtx.loginHandler(values.email, values.password);
    };

    return (
        <div className="basis-1/2 max-w-5xl flex justify-center items-center flex-col gap-y-2 ">
            <h1 className="text-2xl	font-bold"> Login your account </h1>

            <Button className="w-full" variant="outline">
                <Icon icon="flat-color-icons:google" />
                <p>Sign in with Google</p>
            </Button>

            <div className="w-full relative flex items-center justify-center">
                <span className="z-10 text-xs font-semibold	">or</span>
                <hr className="absolute w-full" />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
                    <div className='w-full flex flex-col gap-y-4'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input width={"100%"} type='email' placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='password' placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        <Button type="submit" className='w-full'>Submit</Button>
                    </div>
                </form>
            </Form>
            <p className="text-xs">Don't have an account?<Link to={"/auth/signup"} className="text-blue-950 hover:text-blue-800 active:text-blue-800"> Sign Up</Link></p>
        </div>
    );
};

export default AuthenticationLogin;