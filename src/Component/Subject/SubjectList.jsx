import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// const initialSubjects = [
//   { id: 1, name: '' },
//   { id: 2, name: 'Physics' },
//   { id: 3, name: 'Chemistry' },
//   { id: 4, name: 'Biology' },
// ];

export default function SubjectList() {
  // const [subjects, setSubjects] = useState(initialSubjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [subject, setSubject] = useState([]);

  const fethCourse = async () => {
    try {
      axios.get("http://localhost:5000/subject")
        .then(response => {
          console.log(response.data);
          setSubject(response.data);

        })
    } catch (error) {
      console.error('Error fetching subject:', error);
    }
  }

  useEffect(() => {
    fethCourse();
  }, []);
  // Filter subjects by search term
  const filteredSubjects = subject.filter(subject =>
    subject.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      console.log(id)
       axios.delete(`http://localhost:5000/subject/${id}`)
      .then(response => {
               console.log(response.data);
               if (response.data.message) {
                 toast.warning(response.data.message)
               }
             })
              .catch(err => {
        console.error('Delete error:', err);
        toast.error("Failed to delete subject.");
      });
      setSubject(subject.filter(subject => subject._id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Edit subject with id: ${id}`);
    // You can open modal or navigate to edit page here
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering is live on input change, so no extra action needed here
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Subject List</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          placeholder="Search subjects"
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

      {/* Subject Table */}
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left"></th>
            <th className="border px-4 py-2 text-left">Subject</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-500">
                No subjects found.
              </td>
            </tr>
          ) : (
            filteredSubjects.map(({ _id, subject,description },index) => (
              <tr key={_id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index+1}</td>

                <td className="border px-4 py-2">
                  <p>
                    {subject}
                  </p>
                  <p className='text-[10px]'>{description}</p>
                </td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(_id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(_id)}
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
