import { useContext } from 'react';
import { Link } from "react-router-dom";

import { z } from "zod";
import { Icon } from '@iconify/react';
import { useForm } from "react-hook-form";
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

import AuthContext from "../../../context/authContext.jsx";

import { SignUpSchema } from "../../../schema/signup";


const AuthenticationSignUp = () => {
    const authCtx = useContext(AuthContext);
    
    // Define your form
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
        }
    });

    // Submit your sign up form 
    function onSubmit(values: z.infer<typeof SignUpSchema>) {
        authCtx.signUpHandler(values.name, values.email, values.password, values.confirmPassword);
    }

    return (
        <div className="basis-1/2 max-w-5xl flex justify-center items-center flex-col gap-y-2">
            <h1 className="text-2xl	font-bold"> Create your account </h1>

            <Button className="w-full" variant="outline">
                <Icon icon="flat-color-icons:google" />
                <p>Sign up with Google</p>
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='password' placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full'>Submit</Button>
                    </div>
                </form>
            </Form>
            <p className="text-xs">Already have an account? <Link to={"/auth/login"} className="link">Login</Link></p>
        </div>
    );
};

export default AuthenticationSignUp;