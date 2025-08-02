import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AttendanceRecord() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [showData, setShowData] = useState(false);

    const [attendanceData, setAttendanceData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);


    useEffect(() => {
        // Fetch data from your backend
        axios.get("http://localhost:5000/attendance")
            .then(res => {
                setAttendanceData(res.data.attendance || []);
                setStudentData(res.data.student || []);
            })
            .catch(err => console.error("Error fetching attendance:", err));
    }, []);


    const handleCheck = () => {
        if (!selectedClass || !selectedDate) return;

        // Format the selected date in YYYY-MM-DD
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

        const matchedRecord = attendanceData.find(
            record =>
                record.classname === selectedClass &&
                record.date === formattedDate
        );

        if (!matchedRecord) {
            setFilteredStudents([]);
            setShowData(true);
            return;
        }

        const attendanceMap = matchedRecord.attendance; // {studentId: "Present"}

        const result = Object.entries(attendanceMap).map(([id, status]) => {
            const student = studentData.find(s => s._id === id);
            return {
                id,
                sid: student?.sid || 'Unknown ID',
                name: student?.name || 'Unknown Name',
                attendance: status
            };
        });
        setFilteredStudents(result);
        setShowData(true);
    };

    const handlePrint = () => {
        const printContent = document.getElementById('print-section').innerHTML;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Attendance Report</title></head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };


    return (
        <div className="p-6 bg-white text-xs rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>

            <div className="flex flex-wrap gap-4 mb-4">
                <select
                    className="border px-3 py-2 rounded"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="">Select Class</option>
                    {/* Dynamically populate class options from studentData */}
                    {[...new Set(studentData.map(s => s.class))].map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                    ))}
                </select>

                <input
                    type="date"
                    className="border px-3 py-2 rounded"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleCheck}
                >
                    Check Attendance
                </button>
            </div>

            {showData && (
                <>
                    <div className="flex justify-end gap-3 mb-2">
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                        <button
                            onClick={handlePrint}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Print
                        </button>
                    </div>

                    <div id="print-section" className="border p-4 rounded bg-gray-50">
                        <div className='grid grid-cols-2'>
                            <div>
                                <p><strong>Course:</strong> CSE</p>
                                <p><strong>Subject:</strong> {selectedClass}</p>
                            </div>
                            <div>
                                <p><strong>Class:</strong> {selectedClass}</p>
                                <p><strong>Date of Class:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
                            </div>
                        </div>

                        {filteredStudents.length > 0 ? (
                            <table className="w-full mt-4 border border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border px-3 py-2">#</th>
                                        <th className="border px-3 py-2">Student</th>
                                        <th className="border px-3 py-2">SID</th>
                                        <th className="border px-3 py-2">Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student, index) => (
                                        <tr key={student.id}>
                                            <td className="border px-3 py-2">{index + 1}</td>
                                            <td className="border px-3 py-2">{student.name}</td>
                                            <td className="border px-3 py-2">{student.sid}</td>
                                            <td className="border px-3 py-2">{student.attendance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="mt-4 text-red-600">No attendance data found for this class and date.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );

}
