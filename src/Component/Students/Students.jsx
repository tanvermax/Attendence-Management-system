import React, { useState } from 'react';

export default function Students() {
  const [students, setStudents] = useState([
    { id: 'S101', name: 'Tanveer Mahidi', subject: 'CSE', year: '1' },
    { id: 'S102', name: 'Rafiul Islam', subject: 'BBA', year: '2' },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', subject: '', year: '' });
  const [editingId, setEditingId] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update student
      setStudents(prev =>
        prev.map(s => (s.id === editingId ? formData : s))
      );
      setEditingId(null);
    } else {
      // Add new student
      setStudents(prev => [...prev, formData]);
    }

    setFormData({ id: '', name: '', subject: '', year: '' });
    setFormOpen(false);
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student.id);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
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
              name="id"
              placeholder="Student ID"
              value={formData.id}
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
          {students.map((stu,index) => (
            <tr key={stu.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{index+1}</td>
              <td className="p-2">{stu.id}</td>
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
                  onClick={() => handleDelete(stu.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
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
