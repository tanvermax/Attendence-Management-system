import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MonthlyAttendanceSummary() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(''); // Format: "2025-07"
    const [attendanceData, setAttendanceData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/attendance")
            .then(res => {
                setAttendanceData(res.data.attendance || []);
                setStudentData(res.data.student || []);
            })
            .catch(err => console.error("Error fetching attendance:", err));
    }, []);

    const calculateSummary = () => {
        if (!selectedClass || !selectedMonth) return;

        // Filter attendance by selected class and month
        const filteredRecords = attendanceData.filter(record => {
            return (
                record.classname === selectedClass &&
                record.date.startsWith(selectedMonth) // e.g., "2025-07"
            );
        });

        // Get student list for that class
        const students = studentData.filter(s => s.class === selectedClass);

        // Create summary per student
        const studentSummary = students.map(student => {
            let present = 0, absent = 0, late = 0;

            filteredRecords.forEach(record => {
                const status = record.attendance[student._id];
                if (status === "Present") present++;
                else if (status === "Absent") absent++;
                else if (status === "Late") late++;
            });

            return {
                id: student._id,
                sid: student.sid,
                name: student.name,
                present,
                absent,
                late,
                total: present + absent + late
            };
        });

        setSummary(studentSummary);
    };

    return (
        <div className="p-6 bg-white text-xs rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Monthly Attendance Summary</h2>

            <div className="flex flex-wrap gap-4 mb-4">
                <select
                    className="border px-3 py-2 rounded"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="">Select Class</option>
                    {[...new Set(studentData.map(s => s.class))].map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                    ))}
                </select>

                <input
                    type="month"
                    className="border px-3 py-2 rounded"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                />

                <button
                    onClick={calculateSummary}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Generate Summary
                </button>
            </div>

            {summary.length > 0 && (
                <table className="w-full mt-4 border border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-2 py-1">#</th>
                            <th className="border px-2 py-1">Student</th>
                            <th className="border px-2 py-1">SID</th>
                            <th className="border px-2 py-1">Present</th>
                            <th className="border px-2 py-1">Absent</th>
                            <th className="border px-2 py-1">Late</th>
                            <th className="border px-2 py-1">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summary.map((student, idx) => (
                            <tr key={student.id}>
                                <td className="border px-2 py-1">{idx + 1}</td>
                                <td className="border px-2 py-1">{student.name}</td>
                                <td className="border px-2 py-1">{student.sid}</td>
                                <td className="border px-2 py-1">{student.present}</td>
                                <td className="border px-2 py-1">{student.absent}</td>
                                <td className="border px-2 py-1">{student.late}</td>
                                <td className="border px-2 py-1">{student.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
