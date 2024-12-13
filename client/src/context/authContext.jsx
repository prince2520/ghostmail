import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";

import { useToast } from "@/hooks/use-toast";

import { login, signup } from '../api/auth';
import { fetchUserData } from '../api/user';
import { UserActions } from "../store/slice/userSlice";
import { socketJoinAllMail, socketJoinNewMail } from "../services/socket";

import { fetchMailDetail } from "../store/slice/mailSlice";
import store from "../store/store";
import { resetState } from "../store/resetAction";

const AuthContext = React.createContext({
    loginHandler: (email, password) => { },
    signUpHandler: (userName, email, password, confirmPassword) => { },
    logoutHandler: () => { },
    token: "",
    isAuth: false
});


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState();
    const [isAuth, setIsAuth] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { toast } = useToast();

    const logoutHandler = useCallback(() => {
        localStorage.clear();

        navigate("/home");
        setToken(null);
        setIsAuth(false);

        store.dispatch(resetState())


        toast({
            title: "Logout",
            description: "Successfully Logout!",
        });

    }, [navigate]);

    const autoLogout = useCallback(
        (milliseconds) => {
            setTimeout(() => {
                logoutHandler();
            }, milliseconds);
        },
        [logoutHandler]
    );


    // Sign Up
    const signUpHandler = useCallback(
        (name, email, password, confirmPassword) => {
            signup(name, email, password, confirmPassword)
                .then((result) => {
                    toast({
                        title: "Sign Up",
                        description: result.message,
                    });
                    if (result.success) {
                        navigate("/auth/login");
                    }
                })
                .catch((err) => {
                    toast({
                        title: "Sign Up",
                        description: err,
                    });
                })
                .finally(() => {

                });
        },
        [navigate]
    );

    // Save user data
    const saveUserDataHandler = (result) => dispatch(UserActions.saveUserData(result));


    // Login
    const loginHandler = useCallback(
        (email, password) => {
            login(email, password)
                .then((result) => {
                    toast({
                        title: "Login",
                        description: result.message,
                    });
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
                    }
                })
                .catch((err) => {
                    toast({
                        title: "Login",
                        description: err,
                    });
                })
                .finally(() => {
                });
        },
        [autoLogout, navigate]
    );


    useEffect(() => {
        const localToken = localStorage.getItem("token");
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

        const isNotAuth = localStorage.getItem("isNotAuth");

        if (!isNotAuth) {
            setIsAuth(true);
            fetchUserData(localToken).then(result => {
                if (result.success) {
                    socketJoinAllMail(result.data.mails)
                    saveUserDataHandler(result.data);
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            const mailId = localStorage.getItem("mailId");
            const argsObj = { token: localToken, mailId };
           
            socketJoinNewMail(mailId);
            dispatch(fetchMailDetail(argsObj));
        }



    }, [autoLogout, logoutHandler]);


    return (
        <AuthContext.Provider
            value={{
                loginHandler: loginHandler,
                signUpHandler: signUpHandler,
                logoutHandler: logoutHandler,
                token: token,
                isAuth: isAuth
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthContext;