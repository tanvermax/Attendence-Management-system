import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Students() {
  // const [students, setStudents] = useState([
  //   { id: 'S101', name: 'Tanveer Mahidi', subject: 'CSE', year: '1' },
  //   { id: 'S102', name: 'Rafiul Islam', subject: 'BBA', year: '2' },
  // ]);
  const [student, setStudent] = useState([]);

  const fethCourse = async () => {
    try {
      axios.get("http://localhost:5000/student")
        .then(response => {
          console.log(response.data);
          setStudent(response.data);

        })
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    fethCourse();
  }, []);


  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ sid: '', name: '', subject: '', year: '' });
  const [editingId, setEditingId] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:5000/student', formData);

      console.log('Student added:', response.data);
      toast.success('Student added successfully!');

      // 👇 Add the newly added student to state
      setStudent(prev => [...prev, response.data]);

      // Clear form and close
      // setFormData({ sid: '', name: '', subject: '', year: '' });
      // setFormOpen(false);
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Failed to add student');
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student.id);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete?")) {
      axios.delete(`http://localhost:5000/student/${id}`)
        .then(response => {
          console.log(response.data);
          if (response.data.message) {
            toast.warning(response.data.message)
          }
        })
        .catch(err => {
          console.error('Delete error:', err);
          toast.error("Failed to delete student class.");
        });

      setStudent(prev => prev.filter(s => s._id !== id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setFormOpen(!formOpen);
          setFormData({ id: '', name: '', subject: '', year: '' });
          setEditingId(null);
        }}
      >
        {formOpen ? 'Close Form' : 'Add Student +'}
      </button>

      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="sid"
              placeholder="Student ID"
              value={formData.sid}
              onChange={handleInput}
              className="w-1/3 px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInput}
              className="w-1/3 px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Class (e.g., CSE, BBA)"
              value={formData.subject}
              onChange={handleInput}
              className="w-1/3 px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleInput}
              className="w-1/4 px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingId ? 'Update Student' : 'Add Student'}
          </button>
        </form>
      )}

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2"></th>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Class</th>
            <th className="p-2">Year</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {student.map((stu, index) => (
            <tr key={stu._id} className="border-t hover:bg-gray-50">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{stu.sid}</td>
              <td className="p-2">{stu.name}</td>
              <td className="p-2">{stu.subject}</td>
              <td className="p-2">{stu.year}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(stu)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stu._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {student.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 p-4">
                No students available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
