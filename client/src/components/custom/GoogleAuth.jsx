import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";

const GoogleAuth = ({ text }) => {
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log('jwt-decode -> ', jwtDecode(credentialResponse.credential));
                
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
                    .catch((err) => console.error("Authentication error:", err));
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            size='large'
            text={text}
            useOneTap
        />

    );
};

export default GoogleAuth;