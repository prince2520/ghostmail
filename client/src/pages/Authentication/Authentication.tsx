import { Outlet } from 'react-router-dom';

import AuthenticationImg from '../../assets/images/Authentication.svg';

const Authentication = () => {
    return (
        <div className='flex justify-center items-center gap-x-12 w-full'>
            <Outlet/>
            <div className="hidden md:basis-3/6 md:block">
                <img className='max-w-150' src={AuthenticationImg} alt="Authentication" />
            </div>
        </div>
    );
};

export default Authentication;