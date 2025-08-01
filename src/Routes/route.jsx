import { createBrowserRouter } from "react-router-dom";
import MainlayoutAdmin from "../Component/MainlayoutAdmin";
import AdminHome from "../Component/Admin/AdminHome";
import Course from "../Component/Course/Course";
import Maindashbord from "../Component/Maindashbord";
import Subject from "../Component/Subject/Subject";
import Class from "../Component/Class/Class";
import Students from "../Component/Students/Students";
import Faculty from "../Component/Faculty/Faculty";
import ClassPerSubject from "../Component/ClassPerSubject/ClassPerSubject";
import CheckAttendance from "../Component/CheckAttendance/CheckAttendance";
import AttendanceRecord from "../Component/AttendanceRecord/AttendanceRecord";
import AttendanceReport from "../Component/AttendanceReport/AttendanceReport";
import Login from "../Component/Auth/Login/Login";
import Ragistration from "../Component/Auth/Registration/Ragistration";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import User from "../Component/User/User";



const router = createBrowserRouter([

    {
        path: "/",
        element: <PrivetRoute><MainlayoutAdmin /></PrivetRoute>,
        children: [
            {
                path: "/",
                element: <AdminHome />,
                children: [
                    {
                        path: "/",
                        element: <Maindashbord />
                    }
                    ,
                    {
                        path: "/course",
                        element: <Course />
                    },
                    {
                        path: "/subject",
                        element: <Subject />
                    },
                    {
                        path: "/class",
                        element: <Class />
                    },
                    {
                        path: "/student",
                        element: <Students />
                    },
                    {
                        path: "/faculty",
                        element: <Faculty />
                    },
                    {
                        path: "/class-subject",
                        element: <ClassPerSubject />
                    },
                    {
                        path: "/check-attendance",
                        element: <CheckAttendance />
                    },
                    {
                        path: "/attendance-record",
                        element: <AttendanceRecord />
                    },
                    {
                        path: "/attendance-report",
                        element: <AttendanceReport />
                    },
                    {
                        path: "/users",
                        element: <User />
                    }
                ]
            },

        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/registration",
        element: <Ragistration />
    }
])


export default router;