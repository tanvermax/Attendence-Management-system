import React, { useState } from 'react';

const initialCourses = [
  { id: 1, subject: 'Mathematics', description: 'Algebra and Geometry' },
  { id: 2, subject: 'Physics', description: 'Mechanics and Optics' },
  { id: 3, subject: 'Chemistry', description: 'Organic and Inorganic' },
];

export default function CourseList() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter courses based on searchTerm
  const filteredCourses = courses.filter(course =>
    course.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Edit course with id: ${id}`);
    // Here you can open a modal or navigate to edit form
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled live on input change, so prevent default here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Course List</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          placeholder="Search by subject"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Courses Table */}
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left"></th>
            <th className="border px-4 py-2 text-left">Subject</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No courses found.
              </td>
            </tr>
          ) : (
            filteredCourses.map(({ id, subject, description }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{id}</td>
                <td className="border px-4 py-2">{subject}</td>
                <td className="border px-4 py-2">{description}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
