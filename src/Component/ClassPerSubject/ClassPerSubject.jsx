import React, { useState } from 'react';

export default function ClassPerSubject() {
  const [entries, setEntries] = useState([
    { id: 1, class: 'BBA 1st Year', subject: 'Marketing Basics', faculty: 'John Doe' }
  ]);

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

  const handleAdd = (e) => {
    e.preventDefault();
    const newEntry = {
      id: entries.length + 1,
      ...formData
    };
    setEntries(prev => [...prev, newEntry]);
    setFormData({ class: '', subject: '', faculty: '' });
    setIsFormVisible(false);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

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
          <input
            type='text'
            name='class'
            placeholder='Class (e.g. BBA 1st Year)'
            value={formData.class}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          />
          <input
            type='text'
            name='subject'
            placeholder='Subject'
            value={formData.subject}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          />
          <input
            type='text'
            name='faculty'
            placeholder='Faculty Name'
            value={formData.faculty}
            onChange={handleChange}
            className='block w-full border p-2 rounded'
            required
          />
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
          {entries.map(entry => (
            <tr key={entry.id}>
              <td className='border p-2'>{entry.id}</td>
              <td className='border p-2'>{entry.class}</td>
              <td className='border p-2'>{entry.subject}</td>
              <td className='border p-2'>{entry.faculty}</td>
              <td className='border p-2 space-x-2'>
                <button className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600'>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
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
