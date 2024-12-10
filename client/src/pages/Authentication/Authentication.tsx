import { Outlet } from 'react-router-dom';
import AuthenticationImg from '../../assets/images/Authentication.svg';

const Authentication = () => {
    return (
        <div className='flex  gap-x-12 w-full'>
            <Outlet/>
            <div className="basis-3/6">
                <img className='max-w-150' src={AuthenticationImg} alt="Authentication" />
            </div>
        </div>
    );
};

export default Authentication;