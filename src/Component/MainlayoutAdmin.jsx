import { Outlet } from 'react-router-dom';

const MainlayoutAdmin = () => {
    return (
        <div className='bg-gray-200'>
            <Outlet/>
        </div>
    );
};

export default MainlayoutAdmin;