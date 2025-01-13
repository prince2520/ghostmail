import { GoogleLogin } from '@react-oauth/google';
import { useToast } from "@/hooks/use-toast";
import { useContext } from 'react';
import AuthContext from '../../context/authContext';


const GoogleAuth = ({ text }) => {
    const { toast } = useToast();
    const authCtx = useContext(AuthContext);

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log("credential Response => ", credentialResponse);
                fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/google-auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentialResponse),
                })
                    .then((res) => res.json())
                    .then((result) => {
                        console.log("Google data from backend:", result);
                        authCtx.saveloginDataHandler(result);
                    })
                    .catch((err) => toast({
                        title: "Error",
                        description: err.message,
                        variant: "destructive"
                    }));
            }}
            onError={() => {
                console.log('Login Failed');
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