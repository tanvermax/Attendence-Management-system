import React, { useState } from 'react';

const dummyData = [
    { id: 1, name: 'Shorna Akter', attendance: 'Present' },
    { id: 2, name: 'Ariful Islam', attendance: 'Present' },
    { id: 3, name: 'Rahim Uddin', attendance: 'Late' },
    { id: 4, name: 'Selina Parvin', attendance: 'Absent' },
];

export default function AttendanceRecord() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [showData, setShowData] = useState(false);

    const handleCheck = () => {
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
                    <option value="">Select Class per Subject</option>
                    <option value="CSE_BBA_1">CSE / BBA-1 / 1st year-1st semester</option>
                    <option value="EEE_BBA_2">EEE / BBA-2 / 2nd year-2nd semester</option>
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
                         <div >
                            <p><strong>Course:</strong> CSE</p>
                            <p><strong>Subject:</strong> BBA-1</p>
                        </div>
                        <div>
                            <p><strong>Class:</strong> 1st year-1st semester</p>
                        <p><strong>Date of Class:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
                        </div>
                       </div>

                        <table className="w-full mt-4 border border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-3 py-2">#</th>
                                    <th className="border px-3 py-2">Student</th>
                                    <th className="border px-3 py-2">Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyData.map((student, index) => (
                                    <tr key={student.id}>
                                        <td className="border px-3 py-2">{index + 1}</td>
                                        <td className="border px-3 py-2">{student.name}</td>
                                        <td className="border px-3 py-2">{student.attendance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
