import { Outlet } from "react-router-dom";
import AdminDashbord from "./AdminDashbord";
import { useAuth } from "../../PrivetRoute/AuthContext";


const AdminHme = () => {
    const { user, logout } = useAuth();
    return (
        <div>
            <div className="bg-blue-500 py-4 px-20 flex text-xs md:text-base justify-between text-white">
                <h1>Student Attendence Management System (IIBS)</h1>
                <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Administrator</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box text-black">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p>{user.email}</p>

                            <button className="btn mt-5" onClick={logout}>Logout</button>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
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