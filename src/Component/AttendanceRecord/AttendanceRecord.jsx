import axios from "axios";
import { useEffect, useState } from "react";

export default function AttendanceRecord() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showData, setShowData] = useState(false);

  const [attendanceData, setAttendanceData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
console.log(attendanceData)
  useEffect(() => {
    axios
      .get("http://localhost:5000/attendance")
      .then((res) => {
        setAttendanceData(res.data.attendance || []);
        setStudentData(res.data.student || []);
      })
      .catch((err) => console.error("Error fetching attendance:", err));
  }, []);

 const handleCheck = () => {
  if (!selectedClass || !selectedDate) return;

  const selected = new Date(selectedDate).toDateString(); // e.g. "Sun Dec 07 2025"

  const matchedRecord = attendanceData.find(
    (record) =>
      record.classname === selectedClass &&
      new Date(record.date).toDateString() === selected
  );

  if (!matchedRecord) {
    setFilteredStudents([]);
    setShowData(true);
    return;
  }

  const attendanceMap = matchedRecord.attendance;

  const result = Object.entries(attendanceMap).map(([id, status]) => {
    const student = studentData.find((s) => s._id === id);
    return {
      id,
      sid: student?.sid || "Unknown ID",
      name: student?.name || "Unknown Name",
      attendance: status,
    };
  });

  setFilteredStudents(result);
  setShowData(true);
};

  // Better Print Logic
  const handlePrint = () => {
    const contents = document.getElementById("print-section").innerHTML;
    const printWindow = window.open("", "", "height=800,width=1000");

    printWindow.document.write(`
      <html>
      <head>
        <title>Attendance Report</title>
        <style>
          body {
            font-family: sans-serif;
            padding: 30px;
            color: #000;
          }
          h1, h2 {
            text-align: center;
            margin: 0;
          }
          .meta {
            margin-top: 15px;
            font-size: 14px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 13px;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          th {
            background: #f2f2f2;
            font-weight: 600;
          }
          tr:nth-child(even) {
            background: #fafafa;
          }
        </style>
      </head>
      <body>
        <h1>Attendance Report</h1>
        <h2>Department of CSE</h2>

        ${contents}
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const uniqueClasses = [...new Set(studentData.map((s) => s.class))];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm text-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Attendance Records
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          className="border px-3 py-2 rounded-lg w-48 focus:ring-2 focus:ring-indigo-300"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {uniqueClasses.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-indigo-700"
          onClick={handleCheck}
        >
          View
        </button>
      </div>

      {/* Actions */}
      {showData && (
        <div className="flex justify-end gap-3 mb-3 print:hidden">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
            Edit
          </button>

          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Print
          </button>
        </div>
      )}

      {/* Result */}
      {showData && (
        <div
          id="print-section"
          className="bg-gray-50 border rounded-lg p-5 mt-4 shadow-sm"
        >
          {/* Header */}
          <div className="grid grid-cols-2 text-sm mb-4">
            <div>
              <p><strong>Department:</strong> CSE</p>
              <p><strong>Subject:</strong> {selectedClass}</p>
            </div>
            <div>
              <p><strong>Class:</strong> {selectedClass}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  dateStyle: "medium",
                })}
              </p>
            </div>
          </div>

          {/* Table */}
          {filteredStudents.length > 0 ? (
            <table className="w-full border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border px-3 py-2">#</th>
                  <th className="border px-3 py-2">Student Name</th>
                  <th className="border px-3 py-2">Student ID</th>
                  <th className="border px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={index % 2 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border px-3 py-2 text-center">{index + 1}</td>
                    <td className="border px-3 py-2">{student.name}</td>
                    <td className="border px-3 py-2">{student.sid}</td>
                    <td className="border px-3 py-2">{student.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-red-600 font-medium text-center py-4">
              No attendance data available for this class on this date.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
