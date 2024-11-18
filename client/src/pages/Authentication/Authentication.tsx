import { Outlet } from 'react-router-dom';
import AuthenticationImg from '../../assets/images/Authentication.svg';

const Authentication = () => {
    return (
        <div className='container flex justify-center content-center gap-x-12'>
            <Outlet/>
            <div className="basis-3/6">
                <img className='max-w-150' src={AuthenticationImg} alt="Authentication" />
            </div>
        </div>
    );
};

export default Authentication;