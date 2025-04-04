import { useToast } from "@/hooks/use-toast";
import { GoogleLogin } from '@react-oauth/google';
import store, { useAppDispatch } from '@/redux/store';
import { googleAuth } from "@/redux/thunks/userThunk";
import { MailActions } from "@/redux/slices/mailSlice";
import { useAuth } from "@/hooks/useAuth";
import { resetState } from "@/redux/resetAction";

const GoogleAuth = ({ text }: { text: any }) => {
    const { toast } = useToast();
    const { authTimer } = useAuth();

    const dispatch = useAppDispatch();

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                store.dispatch(resetState());
                localStorage.clear();
                dispatch(googleAuth({ credentialResponse }))
                    .unwrap()
                    .then((res) => {
                        dispatch(MailActions.getMails(res.data.mails));
                        authTimer(res);
                        toast({
                            title: text,
                            description: `${res.message} successfully!`,
                            variant: "success",
                            
                        })
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