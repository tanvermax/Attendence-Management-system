import { Outlet } from "react-router-dom";
import AdminDashbord from "./AdminDashbord";


const AdminHme = () => {
    return (
        <div>
            <div className="bg-blue-500 py-4 px-20 flex justify-between text-white">
                <h1>Student Attendence Management System (IIBS)</h1>
                <div>
                    <h1>Administrator</h1>
                </div>

            </div>
            <div className="grid h-screen bg-gray-800 grid-cols-6">
                <div className="col-span-1">
                    <AdminDashbord />
                </div>
                <div className=" bg-gray-200 col-span-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminHme;