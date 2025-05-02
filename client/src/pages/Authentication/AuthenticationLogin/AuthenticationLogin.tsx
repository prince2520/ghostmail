import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";


import { LoginSchema } from "../../../schema/login";
import store, { useAppDispatch } from '@/redux/store.js';
import { loginThunk } from '@/redux/thunks/userThunk.js';
import { resetState } from '@/redux/resetAction.js';
import GoogleAuth from "../../../components/custom/GoogleAuth.jsx";
import { useAuth } from "@/hooks/useAuth.js";

const AuthenticationLogin = () => {
    const dispatch = useAppDispatch();

    const { authTimer } = useAuth();


    // Define your form
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    // Submit your login form
    function onSubmit(values: z.infer<typeof LoginSchema>) {
        store.dispatch(resetState());
        localStorage.clear();

        dispatch(loginThunk({
            email: values.email,
            password: values.password
        }))
            .unwrap()
            .then(res => {
                authTimer(res);
            }).catch((err) => console.log(err));
    };

    return (
        <div className="w-full sm:w-[90%] md:basis-1/2  max-w-5xl  flex justify-center items-center flex-col gap-y-2 ">
            <h1 className="text-xl md:text-2xl	font-bold"> Login your account </h1>

            <GoogleAuth text={"signin_with"} />

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
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Don't have an account?<Link to={"/auth/signup"} className="font-medium text-blue-950 hover:text-blue-800 dark:text-blue-800 dark:hover:text-blue-700"> Sign Up</Link></p>
        </div>
    );
};

export default AuthenticationLogin;