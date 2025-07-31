"use client";
import React, { useState } from "react";
import dayjs from "dayjs";

const AttendanceReport = () => {
  const [selectedClassSubject, setSelectedClassSubject] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [showReport, setShowReport] = useState(false);

  const mockClassSubjects = [
    { id: "1", label: "CSE - BBA-1 - 1st Year 1st Semester" },
    { id: "2", label: "EEE - BBA-2 - 1st Year 2nd Semester" },
  ];

  const mockReportData = [
    { id: 1, name: "Shorna Akter", present: 5, late: 0, absent: 5 },
    { id: 2, name: "Ariful Islam", present: 8, late: 0, absent: 3 },
  ];

  const handleGenerateReport = () => {
    if (selectedClassSubject && selectedMonth) {
      setShowReport(true);
    } else {
      alert("Please select class and month");
    }
  };

  return (
    <div className="max-w-4xl text-xs mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Monthly Attendance Report</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="font-medium">Class per Subject</label>
          <select
            value={selectedClassSubject}
            onChange={(e) => setSelectedClassSubject(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select</option>
            {mockClassSubjects.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Select Month</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleGenerateReport}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Section */}
      {showReport && (
        <div className="mt-6 border-t pt-4" id="print-section">
          <h2 className="text-lg font-semibold mb-2">Course: CSE</h2>
          <p>Subject: BBA-1</p>
          <p>Class: 1st Year - 1st Semester</p>
          <p>
            Total Days of Classes: <strong>10</strong>
          </p>
          <p>
            Month of:{" "}
            <strong>
              {dayjs(selectedMonth).format("MMMM , YYYY")}
            </strong>
          </p>

          {/* Table */}
          <table className="w-full mt-4 border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1 text-left">#</th>
                <th className="border px-2 py-1 text-left">Student</th>
                <th className="border px-2 py-1 text-left">Present</th>
                <th className="border px-2 py-1 text-left">Late</th>
                <th className="border px-2 py-1 text-left">Absent</th>
              </tr>
            </thead>
            <tbody>
              {mockReportData.map((student, i) => (
                <tr key={student.id}>
                  <td className="border px-2 py-1">{i + 1}</td>
                  <td className="border px-2 py-1">{student.name}</td>
                  <td className="border px-2 py-1">{student.present}</td>
                  <td className="border px-2 py-1">{student.late}</td>
                  <td className="border px-2 py-1">{student.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Print Button */}
          <div className="mt-4 no-print">
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Print Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;
