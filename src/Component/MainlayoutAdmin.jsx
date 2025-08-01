import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const MainlayoutAdmin = () => {

    

    return (
        <div className='bg-gray-200'>
             <ToastContainer />
            <Outlet />
        </div>
    );
};

export default MainlayoutAdmin;