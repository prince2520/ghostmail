import AuthenticationImg from '../../assets/images/Authentication.svg';
import AuthenticationSignUp from './AuthenticationSignUp/AuthenticationSignUp';


const Authentication = () => {
    return (
        <div className='container flex justify-center content-center	 '>
            <AuthenticationSignUp/>
            <div className="basis-3/6">
                <img src={AuthenticationImg} alt="Authentication" />
            </div>
        </div>
    );
};

export default Authentication;