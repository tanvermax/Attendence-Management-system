import React, { useState } from 'react';

const fakeClasses = [
  { id: 1, subject: 'BBA', year: '1', semester: '1' },
  { id: 2, subject: 'CSE', year: '2', semester: '2' },
  { id: 3, subject: 'EEE', year: '3', semester: '1' },
  { id: 4, subject: 'LAW', year: '1', semester: '2' },
];

// Helper to convert number to ordinal string (1 → 1st, 2 → 2nd, etc.)
const toOrdinal = (num) => {
  const j = num % 10,
        k = num % 100;
  if (j === 1 && k !== 11) return num + "st";
  if (j === 2 && k !== 12) return num + "nd";
  if (j === 3 && k !== 13) return num + "rd";
  return num + "th";
};

export default function ClassList() {
  const [classes, setClasses] = useState(fakeClasses);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = classes.filter(cls =>
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(cls => cls.id !== id));
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
          {filteredClasses.map(({ id, subject, year, semester }) => (
            <li
              key={id}
              className="flex items-center justify-between border rounded px-4 py-3 hover:bg-gray-50"
            >
              <span className="text-xs font-medium">
                {subject} {toOrdinal(year)} Year {toOrdinal(semester)} Semester
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(id)}
                  className="bg-green-500  text-xs hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id)}
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
