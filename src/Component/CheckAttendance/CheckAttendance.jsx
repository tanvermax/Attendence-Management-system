import React, { useState } from 'react';

export default function CheckAttendance() {
  // Sample class-subject entries
  const classSubjectList = [
    { id: 1, label: 'BBA 1st Year - Marketing Basics' },
    { id: 2, label: 'BBA 1st Year - Business Math' },
    { id: 3, label: 'BBA 2nd Year - Financial Accounting' },
  ];

  // Sample students grouped by class ID
  const studentData = {
    1: [
      { id: 101, name: 'Tanvir Rahman' },
      { id: 102, name: 'Shakib Hasan' },
    ],
    2: [
      { id: 201, name: 'Mim Akter' },
      { id: 202, name: 'Farhan Islam' },
    ],
    3: [
      { id: 301, name: 'Anika Chowdhury' },
    ]
  };

  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState({}); // { studentId: 'Present' | 'Absent' | 'Late' }

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Attendance saved:', { date: selectedDate, classId: selectedClassId, attendance });
    alert('Attendance submitted successfully!');
  };

  return (
    <div className="p-4 text-xs">
      <h2 className="text-xl font-semibold mb-4">Check Attendance</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Select Class per Subject:</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select --</option>
            {classSubjectList.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {selectedClassId && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Student List</h3>
            <table className="w-full border text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {(studentData[selectedClassId] || []).map(student => (
                  <tr key={student.id}>
                    <td className="border p-2">{student.id}</td>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">
                      <select
                        value={attendance[student.id] || ''}
                        onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                        className="border p-1 rounded"
                        required
                      >
                        
                        <option value="">-- Select --</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedClassId && (
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Attendance
          </button>
        )}
      </form>
    </div>
  );
}
