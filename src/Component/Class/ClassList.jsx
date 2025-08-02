import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


export default function ClassList({ classes, setClass }) {
  // const [classes, setClasses] = useState(fakeClasses);
  const [searchTerm, setSearchTerm] = useState('');



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
    alert(`Edit class with id: ${id}`);
    // You can add modal or navigation to edit page here
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
    </div>
  );
}
