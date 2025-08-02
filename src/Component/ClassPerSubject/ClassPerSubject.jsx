import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ClassPerSubject() {
  // const [entries, setEntries] = useState([
  //   { id: 1, class: 'BBA 1st Year', subject: 'Marketing Basics', faculty: 'John Doe' }
  // ]);
  const [data, setData] = useState([]);
  const [classpersub, setClasspersub] = useState({
    classes: [],
    subjects: [],
    faculties: []
  });
  const [loading, setLoading] = useState(true);

  const fethCourse = async () => {
    try {
      axios.get("http://localhost:5000/classpersubject")
        .then(response => {
          console.log(response.data.data);
          setClasspersub(response.data.data);

        })
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fethCourse();
  }, []);

    const fethClasspersub = async () => {
    try {
      axios.get("http://localhost:5000/new-classpersubject")
        .then(response => {
          console.log("new-classpersubject",response.data);
          setData(response.data);

        })
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fethClasspersub();
  }, []);

  // console.log(classpersub.classes)

  const classdata = classpersub.classes
  const subjectsdata = classpersub.subjects
  const facultiesdata = classpersub.faculties

  console.log("classdata", classdata)
  console.log("subjectsdata", subjectsdata)
  console.log("facultiesdata", facultiesdata)

  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    faculty: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleAdd = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/new-classpersubject", formData);
    console.log('Class added:', response.data);
    setData(prev => [...prev, response.data]);
    toast.success("submited class data")
    setIsFormVisible(false);
    setFormData({ class: '', subject: '', faculty: '' });
  } catch (error) {
    console.error("Error submitting class data:", error);
  }
};


  const handleDelete = (id) => {
     if (window.confirm('Are you sure you want to delete this class?')) {
      console.log(id);
      axios.delete(`http://localhost:5000/new-classpersubject/${id}`)
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
    }
    setData(data.filter(entry => entry._id !== id));
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }


  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Class per Subject</h2>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className='mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        {isFormVisible ? 'Cancel' : 'New Entry'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleAdd} className='mb-6 space-y-4'>
          <select
            name='class'
            value={formData.class}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          >
            <option value=''>Select a Class</option>
            {classpersub.classes?.map((data, index) => (
              <option key={index} value={`${data.subject}${data.year} ${data.semester}`}>
                {data.subject} {data.year} {data.semester}
              </option>
            ))}
          </select>

          <select
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          >
            <option value=''>Select a subject</option>
            {subjectsdata.map((data, index) => (
              <option key={index} value={`${data.subject}`}>
                {data.subject}
              </option>
            ))}
          </select>

          <select
            name='faculty'
            value={formData.faculty}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          >
            <option value=''>Select a faculty</option>
            {facultiesdata.map((data, index) => (
              <option key={index} value={`${data.name}`}>
                {data.name}
              </option>
            ))}
          </select>

          <button
            type='submit'
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
          >
            Submit
          </button>
        </form>
      )}

      <table className='w-full border text-left'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border p-2'>ID</th>
            <th className='border p-2'>Class</th>
            <th className='border p-2'>Subject</th>
            <th className='border p-2'>Faculty</th>
            <th className='border p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={entry._id}>
              <td className='border p-2'>{index}</td>
              <td className='border p-2'>{entry.class}</td>
              <td className='border p-2'>{entry.subject}</td>
              <td className='border p-2'>{entry.faculty}</td>
              <td className='border p-2 space-x-2'>
                <button className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600'>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry._id)}
                  className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
