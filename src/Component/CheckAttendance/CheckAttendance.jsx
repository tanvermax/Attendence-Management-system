import axios from 'axios';
import { useEffect, useState } from 'react';





export default function CheckAttendance() {

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState({}); // { studentId: 'Present' | 'Absent' | 'Late' }

  const [classpersubList, setClasspersubList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fethClasspersub = async () => {
    try {
      const response = await axios.get("http://localhost:5000/check-atttendence");
      console.log("response", response.data);

      // Check what comes from backend — ideally an array of classpersub
      const classpersubArray = response.data.data.classpersub; // MUST be an array
      const studentsArray = response.data.data.student;

      setClasspersubList(classpersubArray);
      setData(studentsArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fethClasspersub();
  }, []);

  console.log("data", data)
  if (loading) {
    return (<><p>loading....</p></>)
  }

  console.log(classpersubList)
  console.log(data)


  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Attendance saved:', { date: selectedDate, classname: selectedClass, attendance });
    try {
    const response = await axios.post("http://localhost:5000/attendance",{ date: selectedDate, classname: selectedClass, attendance })
    console.log('Attendance added:', response.data);
  } catch (error) {
    console.error("Error submitting Attendance data:", error);
  }
    alert('Attendance submitted successfully!');
  };
console.log("selectedClassId",selectedClass

)
  return (
    <div className="p-4 text-xs">
      <h2 className="text-xl font-semibold mb-4">Check Attendance</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Select Class per Subject:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select --</option>
            {classpersubList.map(cls => (
              <option key={cls._id} value={`${cls.class}`}>
                {cls.class} - {cls.subject} ({cls.faculty})
              </option>
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

        {selectedClass && (
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


                {data
                  .filter(student => student.class === selectedClass)
                  .map(student => (
                    <tr key={student._id}>
                      <td className="border p-2">{student.sid}</td>
                      <td className="border p-2">{student.name}</td>
                      <td className="border p-2">
                        <select
                          value={attendance[student._id] || ''}
                          onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
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

        {selectedClass && (
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
