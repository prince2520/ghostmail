import { useNavigate } from "react-router-dom";
import React, { useState, useCallback, useEffect, ReactNode } from "react";

import { useToast } from "@/hooks/use-toast";

import { login, signup } from '../api/auth';
import { fetchUserData } from '../api/user';
import { resetState } from "../store/resetAction";
import { UserActions } from "../store/slice/userSlice";
import { fetchMailDetail } from "../store/slice/mailSlice";
import { socketJoinAllMail, socketJoinNewMail } from "../services/socket";


import store, { useAppDispatch } from "../store/store";
import { LoginResponse } from "@/types/auth.d";
import { User } from "@/types/user.d";

interface AuthContextType {
    loginHandler: (email: string, password: string) => void;
    signUpHandler: (
        userName: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => void;
    logoutHandler: () => void;
    saveloginDataHandler: (result: LoginResponse) => void;
    token: string;
    isAuth: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
    loginHandler: (email: string, password: string) => { },
    signUpHandler: (userName: string, email: string, password: string, confirmPassword: string) => { },
    logoutHandler: () => { },
    saveloginDataHandler: (result: LoginResponse) => { },
    token: "",
    isAuth: false
});


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>("");
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { toast } = useToast();

    const logoutHandler = useCallback(() => {
        localStorage.clear();

        navigate("/home");
        setToken("null");
        setIsAuth(false);

        store.dispatch(resetState());

        toast({
            description: "Successfully Logout!"
        });

    }, [navigate]);

    const autoLogout = useCallback(
        (milliseconds: number) => {
            setTimeout(() => {
                logoutHandler();
            }, milliseconds);
        },
        [logoutHandler]
    );


    // Sign Up
    const signUpHandler = useCallback(
        (name: string, email: string, password: string, confirmPassword: string) => {
            signup(name, email, password, confirmPassword)
                .then((result) => {
                    toast({
                        title: "Success",
                        description: result.message,
                        variant: "success"
                    });
                    if (result.success) {
                        navigate("/auth/login");
                    }
                })
                .catch((err) => {
                    toast({
                        title: "Error",
                        description: err.message,
                        variant: "destructive"
                    });
                })
        },
        [navigate]
    );

    // Save user data
    const saveUserDataHandler = (result: User) => dispatch(UserActions.saveUserData({
        ...result, isNotAuth: true
    }));

    const saveloginDataHandler = (result: LoginResponse) => {
        if (result.success) {
            localStorage.clear();
            store.dispatch(resetState())
            socketJoinAllMail(result.data.mails);
            saveUserDataHandler(result.data);
            setToken(result.token);
            setIsAuth(true);

            localStorage.setItem("token", result.token);

            const remainingMilliseconds = 24 * 60 * 60 * 1000;

            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem("expiryDate", expiryDate.toISOString());
            autoLogout(remainingMilliseconds);
            navigate("/home");
            toast({
                title: "Success",
                description: result.message,
                variant: "success"
            });
        }
    };

    // Login
    const loginHandler = useCallback(
        (email: string, password: string) => {
            login(email, password)
                .then((result) => {
                    saveloginDataHandler(result);
                })
                .catch((err) => {
                    toast({
                        title: "Error",
                        description: err.message,
                        variant: "destructive"
                    });
                })
        },
        [autoLogout, navigate]
    );


    useEffect(() => {
        const localToken = localStorage.getItem("token") ?? "";
        setToken(localToken);

        const localExpiryDate = localStorage.getItem("expiryDate");

        if (!localExpiryDate) {
            return;
        }

        if (new Date(localExpiryDate) <= new Date()) {
            setIsAuth(false);
            logoutHandler();
            return;
        }

        const remainingMilliseconds =
            new Date(localExpiryDate).getTime() - new Date().getTime();

        autoLogout(remainingMilliseconds);

        const isNotAuth: boolean = localStorage.getItem("isNotAuth") == "true" ? true : false;

        if (!isNotAuth) {
            setIsAuth(true);
            fetchUserData(localToken).then(result => {
                if (result.success) {
                    socketJoinAllMail(result.data.mails)
                    saveUserDataHandler(result.data);
                }
            }).catch(err => {
                toast({
                    title: "Error",
                    description: err.message,
                    variant: "destructive"
                });
            });
        } else {
            const mailId = localStorage.getItem("mailId");
            const argsObj: { token?: string , mailId: string | null, isNotAuth: boolean } = { token: localToken, mailId, isNotAuth: isNotAuth };

            socketJoinNewMail(mailId);
            dispatch(fetchMailDetail(argsObj));
        };
    }, [autoLogout, logoutHandler]);


    return (
        <AuthContext.Provider
            value={{
                loginHandler: loginHandler,
                signUpHandler: signUpHandler,
                logoutHandler: logoutHandler,
                saveloginDataHandler: saveloginDataHandler,
                token: token,
                isAuth: isAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;