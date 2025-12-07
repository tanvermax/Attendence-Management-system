import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { useAuth } from '../../PrivetRoute/AuthContext';

export default function CheckAttendance() {

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState({});
  const [classpersubList, setClasspersubList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClasspersub = async () => {
    try {
      const response = await axios.get("http://localhost:5000/check-atttendence");
      setClasspersubList(response.data.data.classpersub);
      setData(response.data.data.student);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasspersub();
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/attendance", {
        date: selectedDate,
        classname: selectedClass,
        attendance
      });
      console.log('Attendance added:', response.data);
      toast.success('Attendance submitted successfully!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
      });
    } catch (error) {
      console.error("Error submitting Attendance data:", error);
    }
  };

  const filteredStudents = data.filter(student => student.class === selectedClass);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-600">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance Panel</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Select Class */}
        <div className="bg-white shadow-sm rounded-xl p-4 border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">-- Select class --</option>
            {classpersubList.map(cls => (
              <option key={cls._id} value={cls.class}>
                {cls.class} - {cls.subject} ({cls.faculty})
              </option>
            ))}
          </select>
        </div>

        {/* Select Date */}
        <div className="bg-white shadow-sm rounded-xl p-4 border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Student Table */}
        {selectedClass && (
          <div className="bg-white shadow-sm rounded-xl p-4 border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-700">
                Student Attendance
              </h3>
              <span className="text-xs text-gray-500">
                Total: {filteredStudents.length}
              </span>
            </div>

            {filteredStudents.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No students found for this class.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-2 border">ID</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="p-2 border text-center">{student.sid}</td>
                        <td className="p-2 border">{student.name}</td>
                        <td className="p-2 border text-center">
  <div className="flex gap-3 justify-center text-xs">
    {["Present", "Absent", "Late"].map(status => (
      <label key={status} className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          name={student._id}
          value={status}
          checked={attendance[student._id] === status}
          onChange={() => handleAttendanceChange(student._id, status)}
          className="h-3 w-3"
        />
        {status[0]}
      </label>
    ))}
  </div>
</td>


                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        {selectedClass && (
          <div className="sticky bottom-2 mt-4">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Save Attendance
            </button>
          </div>
        )}

      </form>
    </div>
  );
}
