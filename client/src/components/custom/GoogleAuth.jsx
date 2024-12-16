import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { useToast } from "@/hooks/use-toast";


const GoogleAuth = ({ text }) => {
    const { toast } = useToast();

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/google/callback`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: credentialResponse }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("User data from backend:", data);
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