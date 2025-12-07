import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


export default function ClassList({ classes, setClass }) {
  // const [classes, setClasses] = useState(fakeClasses);
  const [searchTerm, setSearchTerm] = useState('');

  const [editData, setEditData] = useState(null); // store selected class data
  const [isEditing, setIsEditing] = useState(false);


  const filteredClasses = classes.filter(cls =>
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      console.log(id);
      axios.delete(`http://localhost:5000/class/${id}`)
        .then(response => {
          console.log(response.data);
          if (response.data.message) {
            toast.warning(response.data.message)
          }
        })
        .catch(err => {
          console.error('Delete error:', err);
          toast.error("Failed to delete class.");
        });
      setClass(classes.filter(cls => cls._id !== id));
    }
  };

  const handleEdit = (id) => {
    const cls = classes.find(c => c._id === id);
    setEditData(cls);
    setIsEditing(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/class/${editData._id}`, editData)
      .then(res => {
        console.log(res)
        toast.success("Class updated!");

        // Update state
        const updated = classes.map(c =>
          c._id === editData._id ? editData : c
        );
        setClass(updated);
        setIsEditing(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to update class");
      });
  };

  return (
    <div className="w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">Class List</h2>

      <input
        type="text"
        placeholder="Search by subject"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full mb-6 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {filteredClasses.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No classes found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredClasses.map(({ _id, subject, year, semester }) => (
            <li
              key={_id}
              className="flex items-center justify-between border rounded px-4 py-3 hover:bg-gray-50"
            >
              <span className="text-xs font-medium">
                {subject} {year}  {semester}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(_id)}
                  className="bg-green-500  text-xs hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="bg-red-500 text-xs hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isEditing && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Class</h3>

            <input
              type="text"
              value={editData.subject}
              onChange={e => setEditData({ ...editData, subject: e.target.value })}
              className="w-full mb-3 border px-3 py-2 rounded"
              placeholder="Subject"
            />

            <input
              type="text"
              value={editData.year}
              onChange={e => setEditData({ ...editData, year: e.target.value })}
              className="w-full mb-3 border px-3 py-2 rounded"
              placeholder="Year"
            />

            <input
              type="text"
              value={editData.semester}
              onChange={e => setEditData({ ...editData, semester: e.target.value })}
              className="w-full mb-5 border px-3 py-2 rounded"
              placeholder="Semester"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
