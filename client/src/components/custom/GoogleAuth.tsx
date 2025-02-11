import { useContext } from 'react';

import { useToast } from "@/hooks/use-toast";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '@/api/auth';
import AuthContext from '../../context/authContext';

const GoogleAuth = ({ text }: { text: any }) => {
    const { toast } = useToast();
    const authCtx = useContext(AuthContext);

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                googleLogin(credentialResponse).then(res=>{
                    authCtx.saveloginDataHandler(res);
                }).catch((err) => {
                    toast({
                        title: "Error",
                        description: err.message,
                        variant: "destructive"
                    })
                });
            }}
            onError={() => {
                toast({
                    title: "Error",
                    description: "Something goes wrong!",
                    variant: "destructive"
                })
            }}
            theme='filled_black'
            size='medium'
            shape='circle'
            text={text}
            useOneTap
        />

    );
};

export default GoogleAuth;