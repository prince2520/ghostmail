import React, { useState, useCallback, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { login, signup } from '../api/auth';
import { useToast } from "@/hooks/use-toast"

const AuthContext = React.createContext({
    loginHandler: (email, password) => { },
    signUpHandler: (userName, email, password, confirmPassword) => { },
    logoutHandler: () => { },
    token: "",
    userId: "",
    isAuth: false,
});


export const AuthContextProvider = (props) => {
    const { toast } = useToast()

    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [isAuth, setIsAuth] = useState();

    const navigate = useNavigate();

    const logoutHandler = useCallback(() => {
        navigate("/auth/login");
        setToken(null);
        setIsAuth(false);
        localStorage.clear();
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

    // Login
    const loginHandler = useCallback(
        (email, password, setLoading) => {
            login(email, password)
                .then((result) => {
                    toast({
                        title: "Login",
                        description: result.message,
                    });

                    if (result.success) {
                        setToken(result.token);
                        setUserId(result.user?._id);
                        setIsAuth(true);

                        localStorage.setItem("token", result.token);
                        localStorage.setItem("userId", result.user._id);

                        const remainingMilliseconds = 5 * 60 * 60 * 1000;

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
        const localUserId = localStorage.getItem("userId");
        setUserId(localUserId);

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
        setIsAuth(true);

    }, [autoLogout, logoutHandler]);


    return (
        <AuthContext.Provider
            value={{
                loginHandler: loginHandler,
                signUpHandler: signUpHandler,
                logoutHandler: logoutHandler,
                token: token,
                userId: userId,
                isAuth: isAuth,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthContext;