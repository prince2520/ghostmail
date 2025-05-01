import { resetState } from '@/redux/resetAction';
import { useAppDispatch } from '@/redux/store';
import { useCallback } from 'react';
import { useToast } from './use-toast';
import { LoginResponse } from '@/types/auth.d';
import { socketJoinAllMail } from '@/services/socket';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const navigate = useNavigate();


    const authTimer = useCallback((res: LoginResponse) => {

        socketJoinAllMail(res.data.mails);

        // add new token in local storage and set expiry date
        localStorage.setItem("token", res.token);
        localStorage.setItem("isAuth" , "true");

        const remainingMilliseconds = 24 * 60 * 60 * 1000;

        const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
        );

        localStorage.setItem("expiryDate", expiryDate.toISOString());
        autoLogout(remainingMilliseconds);

        navigate("/home");
    }, []);

    const logout = useCallback(() => {
        localStorage.clear();
        dispatch(resetState());
        toast({
            description: "Successfully Logout!",
        });
    }, [dispatch]);

    const autoLogout = useCallback((milliseconds: number) => {
        setTimeout(() => {
            logout();
        }, milliseconds);
    }, [logout]);

    return { logout, autoLogout, authTimer };
}
