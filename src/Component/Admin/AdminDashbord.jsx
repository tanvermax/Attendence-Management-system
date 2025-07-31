import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import { CiCircleList } from 'react-icons/ci';
import { FaBook, FaCalendarCheck, FaUserGraduate, FaUsers, FaUsersCog } from 'react-icons/fa';
import { FaUsersViewfinder } from 'react-icons/fa6';
import { MdChecklist } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { TbFileReport } from 'react-icons/tb';

const links = [
    { to: '/', label: 'Dashboard', icon: <AiOutlineDashboard /> },
    { to: '/course', label: 'Course', icon: <CiCircleList /> },
    { to: '/subject', label: 'Subject', icon: <FaBook /> },
    { to: '/class', label: 'Class', icon: <SiGoogleclassroom /> },
    { to: '/faculty', label: 'Faculty', icon: <FaUserGraduate /> },
    { to: '/student', label: 'Student', icon: <FaUsers /> },
    { to: '/class-subject', label: 'Class per Subject', icon: <FaUsersViewfinder /> },
    { to: '/check-attendance', label: 'Check Attendance', icon: <FaCalendarCheck /> },
    { to: '/attendance-record', label: 'Attendance Record', icon: <MdChecklist /> },
    { to: '/attendance-report', label: 'Attendance Report', icon: <TbFileReport /> },
    { to: '/users', label: 'User', icon: <FaUsersCog /> },
];

const AdminDashboard = () => {
    return (
        <div className=' bg-gray-300  w-full'>
            {links.map(({ to, label, icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `flex items-center gap-2 text-[14px] py-2 px-4 w-full ${isActive ? 'bg-gray-700 text-white ' : 'hover:bg-blue-200'}`
                    }
                >
                    {icon} {label}
                </NavLink>
            ))}
        </div>
    );
};

export default AdminDashboard;
